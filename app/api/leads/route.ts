import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL
    if (!webhookUrl) {
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
    }

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

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Leads webhook error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
