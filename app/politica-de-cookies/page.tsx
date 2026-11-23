import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CookiePrefsButton } from "@/components/CookieConsent";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({ title: "Política de Cookies", description: "Quais cookies o site da Unaro utiliza, para que servem e como gerenciar suas preferências.", path: "/politica-de-cookies" });

const rows = [
  ["Necessários", "Registro da sua escolha sobre cookies (armazenado no próprio navegador) e recursos essenciais de funcionamento e segurança do site.", "Sempre ativos"],
  ["Análise", "Google Analytics 4, por meio do Google Tag Manager. Mostram páginas visitadas, origem do acesso e tipo de dispositivo, de forma agregada. Podem incluir cookies como _ga e _ga_*.", "Somente com consentimento"],
  ["Marketing", "Tags do Google Ads e Meta Pixel. Medem conversões de campanhas e permitem anúncios para quem já visitou o site. Podem incluir cookies como _gcl_au e _fbp.", "Somente com consentimento"],
];

export default function PoliticaCookies() {
  return (
    <article className="container-x pb-24 pt-36 sm:pt-44">
      <Breadcrumbs items={[{ href: "/politica-de-cookies", label: "Política de Cookies" }]} />
      <h1 className="t-h1 mt-10 max-w-[14ch]">Política de Cookies</h1>
      <p className="mt-6 text-ash">Última atualização: novembro de 2026. Documento-base, revisar com assessoria jurídica antes da publicação.</p>
      <div className="prose-unaro mt-14 max-w-3xl">
        <p>Esta política explica como o site da {site.name} usa cookies e tecnologias semelhantes, e como você pode controlar o uso delas. Ela complementa a nossa <Link href="/politica-de-privacidade">Política de Privacidade</Link>.</p>
        <h2 id="o-que-sao">O que são cookies</h2>
        <p>Cookies são pequenos arquivos guardados no seu navegador quando você visita um site. Eles permitem lembrar preferências, entender como as páginas são usadas e medir o resultado de campanhas. Tecnologias parecidas, como o armazenamento local do navegador, têm funções semelhantes e seguem as mesmas regras descritas aqui.</p>
        <h2 id="categorias">Quais categorias usamos</h2>
        <div className="-mx-1 overflow-x-auto px-1">
          <table>
            <thead><tr><th scope="col">Categoria</th><th scope="col">Finalidade</th><th scope="col">Quando é usado</th></tr></thead>
            <tbody>{rows.map(([c, f, q]) => <tr key={c}><th scope="row" className="!text-ink !normal-case !tracking-normal !text-[0.98rem]">{c}</th><td>{f}</td><td>{q}</td></tr>)}</tbody>
          </table>
        </div>
        <p>Cookies de análise e de marketing só são ativados depois que você aceita no aviso exibido na primeira visita. Se você recusar, o site continua funcionando normalmente.</p>
        <h2 id="terceiros">Cookies de terceiros</h2>
        <p>Alguns cookies são definidos por serviços de terceiros, como Google e Meta, que têm suas próprias políticas de privacidade. Ao clicar em links para redes sociais ou abrir o WhatsApp, você passa a estar sujeito às políticas dessas plataformas.</p>
        <h2 id="duracao">Por quanto tempo ficam armazenados</h2>
        <p>Cada cookie tem um prazo próprio, definido pelo serviço que o criou. Alguns expiram ao fechar o navegador e outros permanecem por meses. Sua escolha sobre cookies fica salva no navegador até que você a altere ou limpe os dados de navegação.</p>
        <h2 id="gerenciar">Como gerenciar suas preferências</h2>
        <p>Você pode mudar sua escolha a qualquer momento pelo link &quot;Preferências de cookies&quot;, no rodapé do site, ou pelo botão abaixo. Também é possível bloquear ou apagar cookies nas configurações do seu navegador.</p>
      </div>
      <CookiePrefsButton className="mt-10 inline-flex min-h-12 items-center rounded-full bg-ink px-6 text-[0.95rem] font-medium text-paper hover:bg-[#2b2b2b]" />
      <div className="prose-unaro mt-14 max-w-3xl">
        <h2 id="contato">Contato</h2>
        <p>Dúvidas sobre esta política podem ser enviadas pelo WhatsApp {site.phoneDisplay} ou pelos demais canais da <Link href="/contato">página de contato</Link>.</p>
      </div>
    </article>
  );
}
