import Link from 'next/link'

export const metadata = {
  title: 'Política de Privacidade | KRUGER TOLEDO SOCIEDADE INDIVIDUAL DE ADVOCACIA',
}

export default function PoliticaDePrivacidade() {
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
          Política de Privacidade
        </h1>
        <p className="text-xs mb-10" style={{ color: '#F5F0DC44' }}>Última atualização: abril de 2026</p>

        <div className="space-y-8 text-sm leading-relaxed" style={{ color: '#F5F0DCCC' }}>

          <section>
            <h2 className="text-base font-semibold mb-3" style={{ color: '#F5F0DC' }}>1. Quem somos</h2>
            <p>
              A <strong>KRUGER TOLEDO SOCIEDADE INDIVIDUAL DE ADVOCACIA</strong> (CNPJ 51.110.147/0001-75) é responsável pelo tratamento dos dados pessoais coletados por meio deste site, na qualidade de controladora, nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-3" style={{ color: '#F5F0DC' }}>2. Dados Coletados</h2>
            <p className="mb-3">Coletamos as seguintes informações quando você preenche o formulário de diagnóstico:</p>
            <ul className="list-disc list-inside space-y-1 pl-2" style={{ color: '#F5F0DCAA' }}>
              <li>Nome completo</li>
              <li>Número de telefone (WhatsApp)</li>
              <li>Endereço de e-mail</li>
              <li>Valor estimado da dívida</li>
              <li>Dados de navegação (UTM, identificadores de anúncio)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-3" style={{ color: '#F5F0DC' }}>3. Finalidade do Tratamento</h2>
            <p className="mb-3">Seus dados são utilizados para:</p>
            <ul className="list-disc list-inside space-y-1 pl-2" style={{ color: '#F5F0DCAA' }}>
              <li>Realizar o diagnóstico inicial de elegibilidade;</li>
              <li>Entrar em contato para apresentar proposta de serviço;</li>
              <li>Melhorar nossos serviços e experiência do usuário;</li>
              <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-3" style={{ color: '#F5F0DC' }}>4. Base Legal</h2>
            <p>
              O tratamento de dados é realizado com base no consentimento do titular (art. 7º, I, LGPD), no legítimo interesse para contato comercial (art. 7º, IX, LGPD) e no cumprimento de obrigação legal (art. 7º, II, LGPD), conforme aplicável a cada situação.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-3" style={{ color: '#F5F0DC' }}>5. Compartilhamento de Dados</h2>
            <p>
              Não vendemos nem alugamos seus dados pessoais a terceiros. Podemos compartilhar informações com prestadores de serviços tecnológicos (ex.: plataformas de CRM, ferramentas de analytics) estritamente necessários para a operação do diagnóstico, mediante acordos de confidencialidade.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-3" style={{ color: '#F5F0DC' }}>6. Cookies e Rastreamento</h2>
            <p>
              Utilizamos cookies e tecnologias similares para melhorar a navegação e mensurar o desempenho de campanhas. Dados como <em>fbclid</em> e parâmetros UTM podem ser coletados para atribuição de anúncios. Você pode desativar cookies nas configurações do seu navegador, o que pode afetar funcionalidades do site.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-3" style={{ color: '#F5F0DC' }}>7. Retenção dos Dados</h2>
            <p>
              Seus dados são mantidos pelo período necessário para a prestação do serviço ou cumprimento de obrigação legal, e excluídos após o término da relação, salvo obrigação de guarda prevista em lei.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-3" style={{ color: '#F5F0DC' }}>8. Seus Direitos</h2>
            <p className="mb-3">Nos termos da LGPD, você tem direito a:</p>
            <ul className="list-disc list-inside space-y-1 pl-2" style={{ color: '#F5F0DCAA' }}>
              <li>Confirmar a existência de tratamento;</li>
              <li>Acessar seus dados;</li>
              <li>Corrigir dados incompletos ou desatualizados;</li>
              <li>Solicitar anonimização, bloqueio ou eliminação de dados desnecessários;</li>
              <li>Revogar o consentimento a qualquer momento;</li>
              <li>Solicitar a portabilidade dos dados.</li>
            </ul>
            <p className="mt-3">
              Para exercer seus direitos, entre em contato pelo e-mail de atendimento disponível em nosso site.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-3" style={{ color: '#F5F0DC' }}>9. Segurança</h2>
            <p>
              Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição, incluindo transmissão via HTTPS e controle de acesso restrito.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-3" style={{ color: '#F5F0DC' }}>10. Alterações nesta Política</h2>
            <p>
              Esta Política pode ser atualizada periodicamente. Publicaremos a nova versão nesta página com a data de atualização revisada. Recomendamos consulta regular.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-3" style={{ color: '#F5F0DC' }}>11. Contato e Encarregado (DPO)</h2>
            <p>
              Dúvidas, solicitações ou reclamações relacionadas à privacidade devem ser encaminhadas ao nosso canal de atendimento disponível no site. Também é possível registrar reclamação perante a Autoridade Nacional de Proteção de Dados (ANPD).
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}
