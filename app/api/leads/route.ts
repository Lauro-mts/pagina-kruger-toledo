import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL
    if (!webhookUrl) {
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
    }

    const payload = {
      data: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
      nome: data.nome,
      whatsapp: data.whatsapp,
      valorDivida: data.valorDivida,
      situacaoDivida: data.situacaoDivida,
      garantias: data.garantias,
      bancos: data.bancos.join(', '),
      qualificado: data.qualificado ? 'Sim' : 'Não',
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
