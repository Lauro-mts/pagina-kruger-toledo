# Krüger Toledo Advocacia — Página de Captura

## Como rodar

1. Instale as dependências:
```bash
npm install
```

2. Rode em modo desenvolvimento:
```bash
npm run dev
```

3. Acesse: http://localhost:3000

## Lógica de qualificação

Lead qualificado quando atende TODOS:
- Dívida acima de R$ 100 mil
- Situação: em atraso (Sim)
- Garantias: Não ou Parcialmente
- Banco: Itaú, Bradesco, Santander ou Banco do Brasil

Qualificado → dispara fbq('track', 'Lead') + redireciona WhatsApp 5551981385297
Não qualificado → exibe mensagem de encerramento (sem evento Pixel)
