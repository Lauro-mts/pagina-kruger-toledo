import Link from 'next/link'

export const metadata = {
  title: 'Termos de Uso | KRUGER TOLEDO SOCIEDADE INDIVIDUAL DE ADVOCACIA',
}

export default function TermosDeUso() {
  return (
    <main className="min-h-screen relative" style={{ backgroundColor: '#20264F' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #1a2040 0%, #20264F 40%, #2a3060 100%)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs mb-10 transition-opacity hover:opacity-70"
          style={{ color: '#F5F0DC66' }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Voltar
        </Link>

        <h1
          className="text-3xl md:text-4xl font-light mb-2"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0DC' }}
        >
          Termos de Uso
        </h1>
        <p className="text-xs mb-10" style={{ color: '#F5F0DC44' }}>Última atualização: abril de 2026</p>

        <div className="space-y-8 text-sm leading-relaxed" style={{ color: '#F5F0DCCC' }}>

          <section>
            <h2 className="text-base font-semibold mb-3" style={{ color: '#F5F0DC' }}>1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e utilizar o site e os serviços da <strong>KRUGER TOLEDO SOCIEDADE INDIVIDUAL DE ADVOCACIA</strong> (CNPJ 51.110.147/0001-75), você concorda com os presentes Termos de Uso. Caso não concorde com qualquer disposição aqui prevista, não utilize nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-3" style={{ color: '#F5F0DC' }}>2. Descrição dos Serviços</h2>
            <p>
              A KRUGER TOLEDO SOCIEDADE INDIVIDUAL DE ADVOCACIA é um escritório especializado em direito bancário e renegociação de dívidas corporativas e pessoais. Por meio deste site, disponibilizamos um diagnóstico inicial gratuito para verificar a elegibilidade do usuário à redução de dívidas, sem qualquer compromisso ou cobrança prévia.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-3" style={{ color: '#F5F0DC' }}>3. Aviso Legal sobre Resultados</h2>
            <p>
              Resultados individuais variam conforme o volume de operação, segmento e estratégia de negócio. Todos os negócios envolvem riscos e resultados dependem de múltiplos fatores. As informações fornecidas neste site têm caráter meramente informativo e não constituem garantia de resultado específico.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-3" style={{ color: '#F5F0DC' }}>4. Uso das Informações Fornecidas</h2>
            <p>
              As informações inseridas no formulário de diagnóstico são utilizadas exclusivamente para fins de análise de elegibilidade e contato pela nossa equipe jurídica. Não compartilhamos seus dados com terceiros para fins comerciais. Para mais detalhes, consulte nossa{' '}
              <Link href="/politica-de-privacidade" className="underline underline-offset-2 hover:opacity-80" style={{ color: '#F5F0DC' }}>
                Política de Privacidade
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-3" style={{ color: '#F5F0DC' }}>5. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo deste site, incluindo textos, logotipos, imagens e código, é de propriedade exclusiva da KRUGER TOLEDO SOCIEDADE INDIVIDUAL DE ADVOCACIA ou de seus licenciantes, sendo vedada a reprodução, distribuição ou uso não autorizado.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-3" style={{ color: '#F5F0DC' }}>6. Limitação de Responsabilidade</h2>
            <p>
              A KRUGER TOLEDO SOCIEDADE INDIVIDUAL DE ADVOCACIA não se responsabiliza por danos diretos, indiretos ou consequentes decorrentes do uso ou da impossibilidade de uso deste site. As informações aqui disponibilizadas não substituem orientação jurídica individualizada.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-3" style={{ color: '#F5F0DC' }}>7. Modificações</h2>
            <p>
              Reservamo-nos o direito de alterar estes Termos a qualquer momento. As alterações entram em vigor na data de publicação nesta página. O uso continuado dos serviços após as alterações implica aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-3" style={{ color: '#F5F0DC' }}>8. Legislação Aplicável</h2>
            <p>
              Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de domicílio do usuário para dirimir eventuais controvérsias, nos termos do Código de Defesa do Consumidor.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-3" style={{ color: '#F5F0DC' }}>9. Contato</h2>
            <p>
              Dúvidas sobre estes Termos podem ser enviadas para o e-mail de contato disponível em nosso site.
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}
