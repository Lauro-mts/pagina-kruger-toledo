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

  const inArrears = data.situacaoDivida === 'Sim' || data.situacaoDivida === 'Não, mas não tenho mais condições de pagar as próximas parcelas'
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
  const [submitting, setSubmitting] = useState(false)
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
    if (submitting) return
    setSubmitting(true)

    const qual = isQualified(formData)
    setQualified(qual)

    if (qual) {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        ;(window as any).fbq('track', 'Lead')
      }
      if (typeof window !== 'undefined' && (window as any).gtag) {
        ;(window as any).gtag('event', 'conversion', { send_to: 'AW-11079538677' })
      }
    }

    setSubmitted(true)

    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: leadIdRef.current,
        ...formData,
        qualificado: qual,
        ...utmRef.current,
      }),
    }).catch((err) => console.error('Erro ao enviar lead:', err))
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
              <div className="mb-4">
                <div className="flex justify-end items-center mb-2">
                  <span className="text-xs font-bold" style={{ color: '#E07B2A' }}>80%</span>
                </div>
                <style>{`
                  @keyframes shimmerBar {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(500%); }
                  }
                `}</style>
                <div className="w-full h-2 rounded-full relative overflow-hidden" style={{ backgroundColor: '#EBEBEB' }}>
                  <motion.div
                    className="h-full rounded-full relative overflow-hidden"
                    style={{ background: 'linear-gradient(90deg, #C45F1A, #E07B2A, #F0A050)' }}
                    initial={{ width: '0%' }}
                    animate={{ width: '80%' }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '25%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)',
                        animation: 'shimmerBar 0.9s ease-in-out infinite',
                      }}
                    />
                  </motion.div>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="flex items-center justify-center gap-2 mt-1 mb-6 py-2.5 px-4 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #FFF4EC 0%, #FFE8D6 100%)',
                  border: '1.5px solid #E07B2A55',
                }}
              >
                <motion.span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: '#E07B2A' }}
                  animate={{ opacity: [1, 0.25, 1], scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#C45F1A' }}>
                  Restam poucas vagas para essa semana
                </span>
              </motion.div>
              <h3
                className="text-2xl font-semibold mb-2 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: '#20264F' }}
              >
                Sua dívida possui ALTAS chances de Redução!
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Portanto, você acabou de receber do nosso escritório uma{' '}
                <strong className="text-gray-800">Consultoria de Passivos!</strong>
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mt-4">
                <strong>Aperte no botão abaixo</strong> e agende essa Consultoria agora mesmo. Restam poucas vagas essa semana, devido ao volume de empresários que nosso escritório atende diariamente.
              </p>
            </div>
            <style>{`
              @keyframes btnPulse {
                0%, 100% {
                  transform: scale(1);
                  box-shadow: 0 6px 24px #25D36655;
                }
                50% {
                  transform: scale(1.08);
                  box-shadow: 0 18px 64px #25D366cc;
                }
              }
              .btn-agendar {
                animation: btnPulse 1s ease-in-out infinite;
              }
              .btn-agendar:active {
                animation: none;
                transform: scale(0.96);
              }
            `}</style>
            <a
              href={`https://wa.me/5551981902430?text=${encodeURIComponent(
                'Olá, fui aprovado e gostaria de agendar minha análise de passivos!'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-agendar flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl font-bold text-white text-base relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1EB854 0%, #25D366 60%, #2EE076 100%)',
                letterSpacing: '0.03em',
              }}
            >
              <svg width="40" height="40" viewBox="0 0 9144 9144" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" fillRule="nonzero" d="m3603 6051c170 108 348 185 531 232 188 50 383 68 577 56 512-30 964-264 1280-620 317-355 498-831 468-1344l-1-4v-1c-31-510-265-960-619-1275-356-316-832-497-1344-468l-5 1h-1c-509 31-959 265-1275 620s-497 831-467 1344v5c11 176 44 341 98 497 57 162 135 314 234 455 17 24 20 55 9 80l-327 799 759-382c27-13 59-11 83 5zm1380-484c-265-15-623-266-911-576-289-311-513-688-507-952-2-57 6-118 22-182s40-130 73-199c11-26 23-50 35-73 11-21 25-45 41-72 10-16 25-28 41-35 99-49 175-71 249-60 79 12 143 57 216 145 35 41 68 89 100 143 30 51 58 107 84 166 27 51 31 110 11 173-16 53-48 109-96 166-14 16-32 26-51 29-9 3-17 7-22 12-9 8-17 22-25 42-1 3-2 6-3 8-3 5 8 5 16 23 34 79 119 192 217 298 97 105 203 199 279 239 17 9 16 20 21 18 3-2 6-3 8-4 21-6 35-13 44-20 6-6 10-14 14-25 6-19 17-34 32-44v-1c59-43 117-71 171-83 63-13 119-6 167 23 59 31 113 63 161 97 50 34 95 71 133 109 82 79 122 146 128 225 5 75-23 149-80 245-9 16-22 27-36 34v1c-23 11-48 23-75 34-25 11-50 21-73 30-71 27-139 46-202 57-65 11-127 14-182 9zm-782-696c262 282 576 509 793 520h5c40 5 86 2 136-7 53-9 110-25 170-47 22-9 43-17 65-27 13-6 27-12 43-20 30-53 44-91 42-120-2-31-26-64-74-112-31-30-69-61-112-91s-91-59-143-85v-1c-3-1-6-3-9-5-7-5-20-5-37-1-25 5-53 19-85 40-13 28-31 52-54 72-28 26-63 43-107 57-47 17-103 6-164-26-94-49-217-157-327-276-109-118-206-249-249-347-28-65-35-124-12-170 17-41 37-74 63-99 23-22 48-37 77-48 24-31 40-60 47-84 6-17 6-30 2-38-2-3-3-6-5-9-23-56-49-107-75-152-27-44-55-84-84-119-44-53-76-79-107-84-30-4-70 8-126 34-7 13-15 27-23 42-12 23-23 44-32 63-27 59-48 116-61 168-13 51-19 96-17 137v4c-7 216 197 548 460 831zm-110 1576c-185-48-365-124-538-229l-914 460c-22 12-49 14-74 4-43-17-63-67-45-110l395-965c-96-143-173-296-229-458-59-170-96-351-107-542-1-3-1-7-1-11-31-557 166-1074 510-1461 344-386 834-642 1391-676 3 0 7-1 11-1v1c557-32 1075 165 1461 510 386 343 642 834 676 1390 0 4 1 8 1 11v1c31 557-166 1074-510 1461-345 387-838 643-1398 676-211 12-422-7-629-61z"/>
              </svg>
              Agendar Consultoria Agora
            </a>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-yellow-500/20 border border-yellow-400/30 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3
              className="text-xl font-semibold mb-3 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#20264F' }}
            >
              Resultado da Análise
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Seu caso exige uma análise mais profunda. Nossa equipe irá entrar em contato para analisar com mais profundidade e criar um plano estratégico de redução de até 90%.
              <br /><br />
              Até daqui a pouco!
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
              disabled={!formData.nome || formData.whatsapp.length < 15 || submitting}
              className="w-full py-4 rounded-lg text-sm font-semibold tracking-widest uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.99]"
              style={{ backgroundColor: '#E07B2A', color: 'white' }}
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
