import { NextRequest, NextResponse } from 'next/server'

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

    // phone: só dígitos com DDI 55 (ex: "5545999999999")
    const phoneDigits = String(data.whatsapp ?? '').replace(/\D/g, '')
    const phone = phoneDigits ? (phoneDigits.startsWith('55') ? phoneDigits : `55${phoneDigits}`) : ''

    // atraso: derivado da situação da dívida
    const atrasoMap: Record<string, string> = {
      'Sim': 'atraso',
      'Não, mas não tenho mais condições de pagar as próximas parcelas': 'atraso',
      'Não, e não ficará em atraso': 'em dia',
    }

    // garantia_tipo: o form só informa se há garantia, não o tipo (imóvel/veículo)
    const garantiaMap: Record<string, string> = {
      'Não': 'sem garantia',
      'Sim': '',
      'Parcialmente': '',
    }

    // Payload de pré-popular contexto da IA: phone na raiz + dados_coletados como objeto.
    const aiContextPayload = {
      phone,
      name: data.nome || '',
      dados_coletados: {
        valor_divida_total: data.valorDivida || '', // faixa como texto
        bancos_envolvidos: Array.isArray(data.bancos)
          ? data.bancos.map((b: string) => b.toLowerCase()).join(', ')
          : '',
        modalidades_credito: '', // não coletado no formulário
        atraso: atrasoMap[data.situacaoDivida] ?? '',
        garantia_tipo: garantiaMap[data.garantias] ?? '',
        conclusao: data.qualificado ? 'Concluso' : 'Pendente',
      },
    }

    const lexaWebhookUrl = 'https://apicrm.lexa-ia.com.br/webhooks/automation/805ce1f5-2155-4f66-bde4-d6f2cb01f5fe'

    const requests = [fetchWithLog('google-sheets', webhookUrl)]
    if (extraWebhookUrl) requests.push(fetchWithLog('extra-webhook', extraWebhookUrl))
    requests.push(fetchWithLog('lexa-ai-context', lexaWebhookUrl, aiContextPayload))

    await Promise.all(requests)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Leads webhook error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
