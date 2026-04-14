import MultiStepForm from '@/components/MultiStepForm'

export default function Home() {
  return (
    <main className="min-h-screen relative" style={{ backgroundColor: '#20264F' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #1a2040 0%, #20264F 40%, #2a3060 100%)' }}
      />

      {/* HERO */}
      <section className="relative z-10 px-6 md:px-12 py-4 md:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-20 items-center">

          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 mb-3 md:mb-6">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#F5F0DC99' }}>
                Diagnóstico Gratuito
              </span>
            </div>

            <h1
              className="text-2xl md:text-3xl xl:text-4xl font-light leading-tight mb-3 md:mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0DC' }}
            >
              Em <span className="font-semibold italic">10 segundos</span> faremos um diagnóstico se a sua dívida pode ser{' '}
              <span className="font-semibold">reduzida em até 90%</span>
            </h1>

            <div className="w-12 h-px mb-3 md:mb-6" style={{ backgroundColor: '#F5F0DC44' }} />

            <div className="mt-3 md:mt-10 pt-3 md:pt-6 border-t flex items-center gap-3" style={{ borderColor: '#F5F0DC18' }}>
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

      {/* FOOTER */}
      <footer className="relative z-10 px-6 md:px-12 py-8" style={{ borderTop: '1px solid #F5F0DC12' }}>
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 text-center">
          <p className="text-xs leading-relaxed max-w-2xl" style={{ color: '#F5F0DC44' }}>
            <span className="font-semibold" style={{ color: '#F5F0DC66' }}>AVISO LEGAL:</span> Resultados individuais variam conforme o volume de operação, segmento e estratégia de negócio. Todos os negócios envolvem riscos e resultados dependem de múltiplos fatores.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
            <span className="text-xs" style={{ color: '#F5F0DC33' }}>
              © 2026 KRUGER TOLEDO SOCIEDADE INDIVIDUAL DE ADVOCACIA · CNPJ 51.110.147/0001-75 · Todos os direitos reservados.
            </span>
            <div className="flex items-center gap-4">
              <a href="/termos-de-uso" className="text-xs underline underline-offset-2 transition-colors hover:opacity-80" style={{ color: '#F5F0DC55' }}>
                Termos de Uso
              </a>
              <span style={{ color: '#F5F0DC22' }}>·</span>
              <a href="/politica-de-privacidade" className="text-xs underline underline-offset-2 transition-colors hover:opacity-80" style={{ color: '#F5F0DC55' }}>
                Política de Privacidade
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
