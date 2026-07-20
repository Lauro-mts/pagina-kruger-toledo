import { NextRequest, NextResponse } from 'next/server'

// Telefone em dígitos E.164 (com DDI 55) para o CRM — o form envia
// "(DD) 9XXXX-XXXX" e, sem o DDI, o CRM não consegue deduplicar o lead
// pelas variações do número (com/sem 9º dígito).
function phoneForCrm(raw: string): string {
  const digits = (raw || '').replace(/\D/g, '')
  if (!digits) return ''
  if (digits.startsWith('55') && (digits.length === 12 || digits.length === 13)) return digits
  if (digits.length === 10 || digits.length === 11) return `55${digits}`
  return digits
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL
    if (!webhookUrl) {
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
    }

    const extraWebhookUrl = process.env.EXTRA_WEBHOOK_URL

    const payload = {
      id: data.id,
      valor_divida: data.valorDivida,
      situacao_divida: data.situacaoDivida,
      garantias: data.garantias,
      bancos: data.bancos,
      qualificado: data.qualificado ? 'Sim' : 'Não',
      name: data.nome,
      email: data.email,
      phone: data.whatsapp,
      timestamp: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign,
      utm_content: data.utm_content,
      utm_term: data.utm_term,
      fbclid: data.fbclid,
    }

    const fetchWithLog = async (name: string, url: string, body: unknown = payload) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const text = await res.text().catch(() => '(sem body)')
      if (!res.ok) {
        console.error(`[leads] ${name} falhou — status ${res.status}: ${text.slice(0, 300)}`)
      } else {
        console.log(`[leads] ${name} ok — status ${res.status}`)
      }
    }

    const lexaWebhookUrl = 'https://apicrm.lexa-ia.com.br/webhooks/automation/805ce1f5-2155-4f66-bde4-d6f2cb01f5fe'

    const requests = [fetchWithLog('google-sheets', webhookUrl)]
    if (extraWebhookUrl) requests.push(fetchWithLog('extra-webhook', extraWebhookUrl))
    requests.push(
      fetchWithLog('lexa-crm', lexaWebhookUrl, {
        ...payload,
        phone: phoneForCrm(data.whatsapp),
      }),
    )

    await Promise.all(requests)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Leads webhook error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
