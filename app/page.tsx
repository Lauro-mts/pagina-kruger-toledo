import MultiStepForm from '@/components/MultiStepForm'

export default function Home() {
  return (
    <main className="min-h-screen relative" style={{ backgroundColor: '#12100A' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #0D0B07 0%, #12100A 40%, #1A1610 100%)' }}
      />

      {/* HERO */}
      <section className="relative z-10 px-6 md:px-12 py-12 md:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#F5F0DC99' }}>
                Diagnóstico Gratuito
              </span>
            </div>

            <h1
              className="text-2xl md:text-3xl xl:text-4xl font-light leading-tight mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0DC' }}
            >
              Em <span className="font-semibold italic">10 segundos</span> faremos um diagnóstico se a sua dívida pode ser{' '}
              <span className="font-semibold">reduzida em até 90%</span>
            </h1>

            <div className="w-12 h-px mb-6" style={{ backgroundColor: '#F5F0DC44' }} />

            <div className="mt-10 pt-6 border-t flex items-center gap-3" style={{ borderColor: '#F5F0DC18' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F5F0DC15' }}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#F5F0DC" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#F5F0DC66' }}>
                Escritório especializado em direito bancário e renegociação de dívidas corporativas e pessoais.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:pl-4">
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{ backgroundColor: '#ffffff', boxShadow: '0 25px 60px rgba(0,0,0,0.35)' }}
            >
              <MultiStepForm />
            </div>

            <p className="text-center text-xs mt-4" style={{ color: '#F5F0DC66' }}>
              As vagas para a análise são limitadas e podem encerrar a qualquer momento!
            </p>
            <ul className="flex justify-center gap-8 mt-3">
              {[
                'Análise urgente',
                'Sem compromisso',
                'Resultado em segundos',
              ].map((text) => (
                <li key={text} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#F5F0DC66' }} />
                  <span className="text-xs font-medium tracking-wide" style={{ color: '#F5F0DCB3' }}>
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="relative z-10 h-1 w-full" style={{ background: 'linear-gradient(90deg, transparent, #F5F0DC33, transparent)' }} />
    </main>
  )
}
