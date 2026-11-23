/**
 * BLACK UNARO 2026 | dados da campanha /black-friday-sites
 * Tudo o que é comercial fica aqui. Campos vazios ("") ficam ocultos na página.
 * Itens marcados com PENDENTE precisam ser confirmados antes da publicação.
 */
import fs from "node:fs";
import path from "node:path";
import { waLink } from "./site";

export const campanha = {
  nome: "BLACK UNARO 2026",
  etiqueta: "BLACK FRIDAY UNARO 2026",
  rota: "/black-friday-sites",
  produto: "Criação de site profissional",
  precoRegular: 1350,
  precoPromo: 595,
  /** PENDENTE: validade da promoção. Ex.: "Condição válida até 30/11/2026." Vazio = não exibe. */
  validade: "",
  /** PENDENTE: forma de pagamento. Ex.: "Pagamento via Pix ou cartão." Vazio = não exibe. */
  pagamento: "",
  mensagemWhatsapp:
    "Olá! Vi a Black Friday Unaro e gostaria de aproveitar a condição especial para criar meu site por R$ 595,00.",
};

export const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const economia = campanha.precoRegular - campanha.precoPromo; // 755
export const descontoPct = Math.round((economia / campanha.precoRegular) * 100); // 56

/** Link oficial do WhatsApp (número em lib/site.ts) com a mensagem da campanha. */
export const waCampanha = waLink(campanha.mensagemWhatsapp);

export const beneficios = [
  { t: "Identidade profissional", d: "Uma apresentação digital desenvolvida de acordo com as características da sua empresa." },
  { t: "Experiência responsiva", d: "Site adaptado para diferentes tamanhos de tela, incluindo smartphones." },
  { t: "Informações organizadas", d: "Apresentação clara do negócio, dos serviços e dos canais de contato." },
  { t: "Estrutura preparada para o Google", d: "Aplicação de boas práticas básicas de SEO técnico." },
  { t: "Mensuração de acessos", d: "Configuração das ferramentas previstas no escopo para acompanhar a interação dos visitantes." },
];

/** Escopo comercial aprovado: quatro entregas. Não adicionar itens sem confirmação. */
export const escopo = [
  { t: "Design personalizado e responsivo", d: "Desenvolvimento de um novo layout institucional, moderno e adaptado para computadores, tablets e celulares." },
  { t: "Desenvolvimento e estruturação técnica", d: "Organização do código e implementação das funcionalidades previstas para o site." },
  { t: "SEO básico", d: "Otimização de títulos, descrições, URLs e estrutura das páginas para mecanismos de busca." },
  { t: "Mensuração e tagueamento", d: "Configuração do Google Analytics 4, Google Tag Manager e eventos de conversão." },
];

export const etapas = [
  { t: "Primeiro contato", d: "Conversamos para entender o negócio e as necessidades do projeto." },
  { t: "Envio das informações", d: "Organizamos os conteúdos, referências e materiais necessários para o desenvolvimento." },
  { t: "Desenvolvimento", d: "Criamos o layout e implementamos as funcionalidades previstas no escopo." },
  { t: "Revisão e publicação", d: "Realizamos a revisão acordada e preparamos o site para publicação." },
];

export type ProjetoCampanha = {
  id: string;
  nome: string;
  segmento: string;
  url: string;
  descricao: string;
  /** Capturas reais. Arquivos em /public/images/black-friday/ (desktop 1440×900, mobile 390×844). */
  desktop: string;
  mobile: string;
};

/** Portfólio da campanha: cinco sites reais desenvolvidos pela Unaro. Descrições a partir do conteúdo publicado. */
export const projetos: ProjetoCampanha[] = [
  {
    id: "piva",
    nome: "Piva Arquitetura",
    segmento: "Arquitetura e interiores",
    url: "https://pivaarquitetura.com.br/",
    descricao: "Site do estúdio de arquitetura e interiores de Curitiba, com projetos em destaque, o método de trabalho do escritório e a apresentação da arquiteta Gabriella Piva.",
    desktop: "/images/black-friday/piva-desktop.webp",
    mobile: "/images/black-friday/piva-mobile.webp",
  },
  {
    id: "viva4you",
    nome: "Viva4You",
    segmento: "Moda feminina",
    url: "https://www.viva4you.com.br/",
    descricao: "Site da marca de moda feminina do Água Verde, em Curitiba, com peças para o dia a dia, festas e ocasiões especiais, e espaço para o Clube Viva4You.",
    desktop: "/images/black-friday/viva4you-desktop.webp",
    mobile: "/images/black-friday/viva4you-mobile.webp",
  },
  {
    id: "natan-lacerda",
    nome: "Natan Lacerda Advocacia",
    segmento: "Advocacia",
    url: "https://www.natanlacerda.com.br/",
    descricao: "Site de advocacia com foco em Direito Trabalhista, do Consumidor e de Família, organizado por áreas de atuação e com atendimento online em todo o Brasil.",
    desktop: "/images/black-friday/natan-lacerda-desktop.webp",
    mobile: "/images/black-friday/natan-lacerda-mobile.webp",
  },
  {
    id: "stati-uniti",
    nome: "Stati Uniti Moda",
    segmento: "Moda feminina | atacado", // confirmar a descrição exata do segmento
    url: "https://www.statiunitimoda.com.br/",
    descricao: "Site editorial da fábrica de moda feminina de Curitiba, construído em torno da coleção Bassa Marea Verão 2027, inspirada na maré baixa da Costa Amalfitana, com manifesto, looks e catálogo para lojistas.",
    desktop: "/images/black-friday/stati-uniti-desktop.webp",
    mobile: "/images/black-friday/stati-uniti-mobile.webp",
  },
  {
    id: "klein",
    nome: "Klein Vidraçaria",
    segmento: "Vidraçaria e esquadrias",
    url: "https://kleinvidracaria.com.br/",
    descricao: "Site da vidraçaria de Curitiba especializada em vidros temperados, esquadrias de alumínio e espelhos com LED, com galeria de projetos, blog e pedido de orçamento pelo WhatsApp.",
    desktop: "/images/black-friday/klein-desktop.webp",
    mobile: "/images/black-friday/klein-mobile.webp",
  },
];

/** A captura existe em /public? Sem arquivo, a página mostra o espaço reservado (nada de imagem fictícia). */
export function temCaptura(src: string) {
  try { return fs.existsSync(path.join(process.cwd(), "public", src)); } catch { return false; }
}

export const faq = [
  { q: "O site será personalizado para minha empresa?", a: "Sim. O layout é desenvolvido de acordo com as características da sua empresa, com base nas informações, referências e materiais que você enviar." },
  { q: "O site funciona no celular?", a: "Sim. O design é responsivo e adaptado para computadores, tablets e celulares." },
  { q: "O que está incluso no valor de R$ 595?", a: "Quatro entregas: design personalizado e responsivo, desenvolvimento e estruturação técnica, SEO básico e mensuração e tagueamento (Google Analytics 4, Google Tag Manager e eventos de conversão)." },
  // PENDENTE: confirmar a orientação comercial sobre domínio e hospedagem.
  { q: "O domínio e a hospedagem estão inclusos?", a: "Não. Domínio e hospedagem não fazem parte das quatro entregas da condição promocional. Na conversa pelo WhatsApp, conversamos sobre esse ponto de acordo com a situação da sua empresa." },
  // PENDENTE: confirmar se haverá prazo padrão para a promoção.
  { q: "Quanto tempo leva para desenvolver o site?", a: "O prazo é combinado no primeiro contato, de acordo com o projeto e com o envio dos conteúdos e materiais necessários." },
  // PENDENTE: confirmar forma de pagamento e substituir esta resposta.
  { q: "Como funciona o pagamento?", a: "As condições de pagamento são apresentadas no primeiro contato pelo WhatsApp, antes do início do projeto." },
  { q: "Quais informações preciso enviar?", a: "Os conteúdos sobre a empresa e os serviços, o logotipo, as fotos que você quiser usar, os canais de contato e as referências que ajudam a entender o estilo desejado. Orientamos esse envio na etapa de organização das informações." },
  { q: "Posso solicitar alterações?", a: "Sim, dentro da revisão acordada no início do projeto, antes da publicação." },
  { q: "O site terá integração com Google Analytics?", a: "Sim. A mensuração e o tagueamento fazem parte do escopo: configuração do Google Analytics 4, do Google Tag Manager e de eventos de conversão." },
  { q: "Posso contratar funcionalidades adicionais?", a: "Sim. Funcionalidades além das quatro entregas da promoção podem ser avaliadas e orçadas à parte." },
];
