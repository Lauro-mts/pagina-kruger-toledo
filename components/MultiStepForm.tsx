'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type FormData = {
  valorDivida: string
  situacaoDivida: string
  garantias: string
  bancos: string[]
  nome: string
  email: string
  whatsapp: string
}

type UtmData = {
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
  fbclid: string
}

const QUALIFIED_BANKS = ['Itaú', 'Bradesco', 'Santander', 'Banco do Brasil']

function isQualified(data: FormData): boolean {
  const highValue = [
    'Entre R$ 101 mil a R$ 300 mil',
    'Entre R$ 301 mil a R$ 500 mil',
    'Entre R$ 501 mil a R$ 1 milhão',
    'Acima de R$ 1 milhão',
  ].includes(data.valorDivida)

  const inArrears = data.situacaoDivida === 'Sim'
  const noOrPartialGuarantee = data.garantias === 'Não' || data.garantias === 'Parcialmente'
  const hasQualifiedBank = data.bancos.some((b) => QUALIFIED_BANKS.includes(b))

  return highValue && inArrears && noOrPartialGuarantee && hasQualifiedBank
}

function formatWhatsApp(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

const slideVariants = {
  enter: { x: 60, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -60, opacity: 0 },
}

export default function MultiStepForm() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [qualified, setQualified] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    valorDivida: '',
    situacaoDivida: '',
    garantias: '',
    bancos: [],
    nome: '',
    email: '',
    whatsapp: '',
  })

  const utmRef = useRef<UtmData>({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
    fbclid: '',
  })

  const leadIdRef = useRef<string>(generateId())

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    utmRef.current = {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
      utm_term: params.get('utm_term') || '',
      fbclid: params.get('fbclid') || '',
    }
  }, [])

  const totalSteps = 5

  const selectSingle = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setTimeout(() => setStep((s) => s + 1), 300)
  }

  const toggleBank = (bank: string) => {
    setFormData((prev) => {
      const exists = prev.bancos.includes(bank)
      return {
        ...prev,
        bancos: exists ? prev.bancos.filter((b) => b !== bank) : [...prev.bancos, bank],
      }
    })
  }

  const handleSubmit = async () => {
    const qual = isQualified(formData)
    setQualified(qual)

    if (qual) {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        ;(window as any).fbq('track', 'Lead')
      }
    }

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: leadIdRef.current,
          ...formData,
          qualificado: qual,
          ...utmRef.current,
        }),
      })
    } catch (err) {
      console.error('Erro ao enviar lead:', err)
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-8 px-4"
      >
        {qualified ? (
          <>
            <div className="mb-6">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-400/40 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3
                className="text-2xl font-semibold mb-2 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: '#20264F' }}
              >
                Sua dívida possui ALTAS chances de Redução!
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Você acabou de receber do nosso escritório uma{' '}
                <strong>Análise de Passivos!</strong>
              </p>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                Envie uma mensagem agora clicando no botão para agendar um horário com um dos
                nossos especialistas em redução.
              </p>
            </div>
            <a
              href={`https://wa.me/5551981385297?text=${encodeURIComponent(
                'Olá, fui aprovado e gostaria de agendar minha análise de passivos!'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 px-6 rounded-lg font-semibold text-white text-sm tracking-widest uppercase transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ backgroundColor: '#25D366' }}
            >
              💬 Falar com Especialista
            </a>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3
              className="text-xl font-semibold mb-3 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#20264F' }}
            >
              Resultado da Análise
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Puxa, infelizmente a sua dívida foge do escopo de atuação do nosso escritório e
              não conseguiremos reduzir as suas dívidas.
            </p>
          </>
        )}
      </motion.div>
    )
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-gray-500">
            Etapa {step + 1} de {totalSteps}
          </span>
          <span className="text-xs font-medium" style={{ color: '#20264F' }}>
            {Math.round(((step + 1) / totalSteps) * 100)}%
          </span>
        </div>
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: '#20264F' }}
            initial={{ width: '20%' }}
            animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 0 — Valor da dívida */}
        {step === 0 && (
          <motion.div
            key="step0"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: '#20264F' }}>
              Pergunta 1
            </p>
            <h3
              className="text-xl font-semibold mb-5 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#20264F' }}
            >
              Qual o valor da sua dívida?
            </h3>
            <div className="space-y-2">
              {[
                'Entre R$ 0 a R$ 50 mil',
                'Entre R$ 51 mil a R$ 100 mil',
                'Entre R$ 101 mil a R$ 300 mil',
                'Entre R$ 301 mil a R$ 500 mil',
                'Entre R$ 501 mil a R$ 1 milhão',
                'Acima de R$ 1 milhão',
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => selectSingle('valorDivida', option)}
                  className="w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-150 hover:border-[#20264F] hover:bg-[#20264F]/5 active:scale-[0.99]"
                  style={{
                    borderColor: formData.valorDivida === option ? '#20264F' : '#e5e7eb',
                    backgroundColor: formData.valorDivida === option ? '#20264F10' : 'white',
                    color: '#20264F',
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 1 — Situação da dívida */}
        {step === 1 && (
          <motion.div
            key="step1"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: '#20264F' }}>
              Pergunta 2
            </p>
            <h3
              className="text-xl font-semibold mb-5 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#20264F' }}
            >
              Sua dívida está em atraso?
            </h3>
            <div className="space-y-2">
              {[
                'Sim',
                'Não, mas não tenho mais condições de pagar as próximas parcelas',
                'Não, e não ficará em atraso',
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => selectSingle('situacaoDivida', option)}
                  className="w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-150 hover:border-[#20264F] hover:bg-[#20264F]/5 active:scale-[0.99]"
                  style={{
                    borderColor: formData.situacaoDivida === option ? '#20264F' : '#e5e7eb',
                    backgroundColor: formData.situacaoDivida === option ? '#20264F10' : 'white',
                    color: '#20264F',
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 2 — Garantias */}
        {step === 2 && (
          <motion.div
            key="step2"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: '#20264F' }}>
              Pergunta 3
            </p>
            <h3
              className="text-xl font-semibold mb-5 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#20264F' }}
            >
              Sua dívida possui garantias?
            </h3>
            <div className="space-y-2">
              {['Sim', 'Não', 'Parcialmente'].map((option) => (
                <button
                  key={option}
                  onClick={() => selectSingle('garantias', option)}
                  className="w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-150 hover:border-[#20264F] hover:bg-[#20264F]/5 active:scale-[0.99]"
                  style={{
                    borderColor: formData.garantias === option ? '#20264F' : '#e5e7eb',
                    backgroundColor: formData.garantias === option ? '#20264F10' : 'white',
                    color: '#20264F',
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 3 — Bancos */}
        {step === 3 && (
          <motion.div
            key="step3"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: '#20264F' }}>
              Pergunta 4
            </p>
            <h3
              className="text-xl font-semibold mb-1 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#20264F' }}
            >
              Quais bancos você possui dívida?
            </h3>
            <p className="text-xs text-gray-500 mb-4">Pode escolher mais de um</p>
            <div className="grid grid-cols-2 gap-2 mb-5">
              {[
                'Itaú',
                'Bradesco',
                'Santander',
                'Banco do Brasil',
                'Caixa Econômica Federal',
                'Banco Pan',
                'Banco Original',
                'Banco Inter',
                'Banco BMG',
                'Nubank',
                'Cooperativas',
                'Outros',
              ].map((bank) => {
                const selected = formData.bancos.includes(bank)
                return (
                  <button
                    key={bank}
                    onClick={() => toggleBank(bank)}
                    className="text-left px-3 py-3 rounded-lg border text-xs font-medium transition-all duration-150 active:scale-[0.98] flex items-center gap-2"
                    style={{
                      borderColor: selected ? '#20264F' : '#e5e7eb',
                      backgroundColor: selected ? '#20264F' : 'white',
                      color: selected ? 'white' : '#20264F',
                    }}
                  >
                    <span
                      className="w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center"
                      style={{
                        borderColor: selected ? 'white' : '#20264F',
                        backgroundColor: selected ? 'white' : 'transparent',
                      }}
                    >
                      {selected && (
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M2 6l3 3 5-5"
                            stroke="#20264F"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    {bank}
                  </button>
                )
              })}
            </div>
            <button
              onClick={() => setStep(4)}
              disabled={formData.bancos.length === 0}
              className="w-full py-3 rounded-lg text-sm font-semibold tracking-widest uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.99]"
              style={{ backgroundColor: '#20264F', color: 'white' }}
            >
              Continuar →
            </button>
          </motion.div>
        )}

        {/* STEP 4 — Dados de contato */}
        {step === 4 && (
          <motion.div
            key="step4"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: '#20264F' }}>
              Última etapa
            </p>
            <h3
              className="text-xl font-semibold mb-5 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#20264F' }}
            >
              Para onde enviamos o resultado?
            </h3>
            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Nome completo</label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData((p) => ({ ...p, nome: e.target.value }))}
                  placeholder="Seu nome"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none transition-all focus:border-[#20264F]"
                  style={{ color: '#20264F' }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">E-mail</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none transition-all focus:border-[#20264F]"
                  style={{ color: '#20264F' }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">WhatsApp</label>
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, whatsapp: formatWhatsApp(e.target.value) }))
                  }
                  placeholder="(00) 00000-0000"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none transition-all focus:border-[#20264F]"
                  style={{ color: '#20264F' }}
                />
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!formData.nome || formData.whatsapp.length < 15}
              className="w-full py-4 rounded-lg text-sm font-semibold tracking-widest uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.99]"
              style={{ backgroundColor: '#20264F', color: 'white' }}
            >
              Quero Calcular a Redução Agora
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">
              🔒 Seus dados estão protegidos. Não enviamos spam.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
