# Site Unaro

Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 + Sanity CMS. Pronto para deploy na Vercel.

## Rodar localmente

```bash
npm install
cp .env.example .env.local   # preencha o que tiver
npm run dev                  # http://localhost:3000
npm run build                # build de produção (o mesmo da Vercel)
npm run build:preview        # versão estática em out/ para apresentação
```

## Estrutura

| Pasta | O que tem |
|---|---|
| `app/` | Rotas: `/`, `/sobre`, `/servicos` + 6 páginas, `/projetos`, `/sites` + páginas individuais, `/blog` + artigos + categorias, `/contato`, `/politica-de-privacidade`, `sitemap.xml`, `robots.txt`, `api/contato`, `api/revalidate` |
| `app/globals.css` | **Sistema visual**: cores, fontes, escala tipográfica. Trocar a identidade oficial = editar os tokens do `@theme` |
| `components/` | Header, menu mobile, footer, Método ROD, mockups, cards, formulário |
| `content/` | Conteúdo base (seed): serviços, Método ROD, artigos, projetos demonstrativos |
| `lib/site.ts` | Dados oficiais (endereço, redes, WhatsApp). Campo vazio = oculto no site |
| `lib/cms.ts` | Camada de dados: usa o Sanity quando configurado, senão o conteúdo local |
| `studio/` | Painel Sanity (artigos, categorias, autores, projetos, serviços, depoimentos, configurações) |
| `docs/` | Plano editorial |

## O que precisa ser conectado (nada disso está ativo ainda)

1. **WhatsApp oficial**: `NEXT_PUBLIC_WHATSAPP=55419XXXXXXXX`. Ativa todos os botões com mensagens por contexto, o botão flutuante e o envio do formulário para o WhatsApp. Enquanto vazio, os botões levam para `/contato`.
2. **Recebimento do formulário** (opcional, além do WhatsApp): `CONTACT_WEBHOOK_URL` com a URL de um webhook (CRM, n8n, Make, Zapier). Sem WhatsApp e sem webhook, o formulário avisa que o envio não está conectado.
3. **Sanity CMS**:
   - Criar projeto em sanity.io/manage (plano gratuito atende).
   - `cd studio && npm install && SANITY_STUDIO_PROJECT_ID=xxx npx sanity deploy` publica o painel em `unaro.sanity.studio`.
   - Na Vercel: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`.
   - Webhook no Sanity apontando para `https://SEU-DOMINIO/api/revalidate?secret=SANITY_REVALIDATE_SECRET` para o site atualizar ao publicar. Sem webhook, o site atualiza sozinho em até 5 minutos.
   - Ao conectar o CMS, os projetos demonstrativos somem e o site passa a mostrar só o que estiver publicado. Cadastre os artigos atuais (em `content/posts.ts`) no painel antes de ligar.
   - **Fase 2**: hoje o painel já gerencia blog e portfólio. Os textos das páginas de serviço e as "Configurações do site" existem no schema, mas o site ainda lê esses dados de `content/services.ts` e `lib/site.ts`.
4. **Mensuração**: o GTM oficial `GTM-MQX8778M` já está no layout global (`app/layout.tsx`, via `@next/third-parties/google`), com Consent Mode v2. O GA4 `G-VDK4W0ZJ5G` roda dentro do GTM; não instale o GA4 direto no código para não duplicar. `NEXT_PUBLIC_GTM_ID` só é necessário para trocar o contêiner. Cliques em elementos com `data-event` e o envio do formulário (`form_submit`) já vão para o `dataLayer`.
5. **Domínio**: `NEXT_PUBLIC_SITE_URL` (canonical, sitemap, Open Graph).

## Pendências de conteúdo (não inventamos nada)

- [ ] Logotipo oficial (SVG) e confirmação das fontes e cores de destaque do site atual. A marca está em texto e a paleta segue o briefing (#101010, #FFFFFF, #F5F5F3, #888888).
- [ ] Fotografia profissional do fundador e fotos reais da agência (há espaços marcados).
- [ ] Informações confirmadas do fundador (formação, ano de fundação, trajetória) em `components/sections.tsx` > `Founder`.
- [ ] WhatsApp, e-mail, telefone, CEP e razão social em `lib/site.ts` (redes sociais já preenchidas).
- [ ] Projetos reais com prints desktop (1440×900) e mobile (390×844), autorização de link e resultados comprovados.
- [ ] Revisão jurídica da Política de Privacidade.

## Verificado

- `next build` sem erros, 38 rotas geradas.
- Páginas principais renderizadas em 1440 px e 390 px sem rolagem horizontal e sem erros de JavaScript.
- Não testado: Lighthouse/Core Web Vitals em produção, envio real do formulário, Studio do Sanity conectado a um projeto.

## Blog Insights Unaro

- 16 artigos em `content/posts.ts` (4 originais) e `content/posts-*.ts` (12 novos, nov/2026).
- Cada artigo tem title e description próprios, palavra-chave principal (hipótese editorial, sem volume de busca validado), FAQ com dados estruturados FAQPage, referências e links internos no formato `[texto](/blog/slug)`.
- Capas em `public/images/blog/` (composições gráficas próprias, sem imagens de terceiros).
- **CMS:** o Sanity ainda não está conectado. Para cadastrar todo o conteúdo no painel: `SITE_URL=https://seu-dominio npm run export:sanity` e depois `cd studio && npx sanity dataset import seed/conteudo.ndjson production`. Com o CMS ativo, o site passa a ler os artigos de lá (rascunhos, publicação e edição pelo painel).
