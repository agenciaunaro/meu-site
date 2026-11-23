import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({ title: "Política de Privacidade", description: "Como a Unaro coleta, usa e protege os dados pessoais enviados pelo site, de acordo com a LGPD.", path: "/politica-de-privacidade" });

export default function Privacidade() {
  return (
    <article className="container-x pb-24 pt-36 sm:pt-44">
      <Breadcrumbs items={[{ href: "/politica-de-privacidade", label: "Política de Privacidade" }]} />
      <h1 className="t-h1 mt-10 max-w-[14ch]">Política de Privacidade</h1>
      <p className="mt-6 text-ash">Última atualização: novembro de 2026. Documento-base, revisar com assessoria jurídica antes da publicação.</p>
      <div className="prose-unaro mt-14 max-w-3xl">
        <p>Esta política explica como a {site.name} trata os dados pessoais de quem visita este site e entra em contato pelos nossos canais, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).</p>
        <h2 id="dados">Quais dados coletamos</h2>
        <p>Pelo formulário de contato e pelo WhatsApp: nome, empresa, número de WhatsApp, serviço de interesse e a mensagem enviada. Durante a navegação, e somente com o seu consentimento, ferramentas de análise e de marketing podem coletar dados de uso, como páginas visitadas, tipo de dispositivo e origem do acesso, por meio de cookies.</p>
        <h2 id="uso">Para que usamos</h2>
        <ul><li>Responder ao seu contato e apresentar nossos serviços.</li><li>Entender como o site é utilizado para melhorar conteúdos e navegação.</li><li>Medir o desempenho de campanhas de marketing.</li></ul>
        <h2 id="base-legal">Base legal</h2>
        <p>O tratamento dos dados do formulário se baseia no seu consentimento e em procedimentos preliminares relacionados a um possível contrato. Os dados de navegação se baseiam no legítimo interesse ou no consentimento, conforme a ferramenta.</p>
        <h2 id="compartilhamento">Compartilhamento</h2>
        <p>Não vendemos dados pessoais. Os dados podem ser processados por fornecedores que nos ajudam a operar o site e o atendimento, como serviços de hospedagem, CRM, mensageria e análise, sempre limitados à finalidade descrita aqui.</p>
        <h2 id="cookies">Cookies</h2>
        <p>Utilizamos cookies necessários ao funcionamento do site e, apenas com o seu consentimento, cookies de análise e de marketing (Google Analytics, Google Tag Manager, Google Ads e Meta Pixel). Os detalhes e a forma de alterar sua escolha estão na <Link href="/politica-de-cookies">Política de Cookies</Link>.</p>
        <h2 id="direitos">Seus direitos</h2>
        <p>Você pode solicitar a confirmação do tratamento, o acesso, a correção, a exclusão ou a portabilidade dos seus dados, além de revogar o consentimento a qualquer momento, pelos nossos canais de contato.</p>
        <h2 id="retencao">Retenção e segurança</h2>
        <p>Mantemos os dados pelo tempo necessário para atender à finalidade do contato ou cumprir obrigações legais, com medidas técnicas e administrativas para protegê-los.</p>
        <h2 id="contato">Contato</h2>
        <p>Para dúvidas sobre esta política, fale com a {site.name}: {site.address.street}, {site.address.district}, {site.address.city}, {site.address.region}. WhatsApp: {site.phoneDisplay}.{site.email ? ` E-mail: ${site.email}.` : ""}</p>
      </div>
    </article>
  );
}
