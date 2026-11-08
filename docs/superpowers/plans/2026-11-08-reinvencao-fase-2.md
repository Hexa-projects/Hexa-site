# Reinvenção, fase 2: site inteiro no sistema novo — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Levar todas as rotas do site institucional para o sistema da home (DESIGN.md), com copy nova, redirecionamento das URLs antigas, Magnifico Open e Careverse incluídos.

**Architecture:** Um kit de páginas internas (`src/components/page/` + `src/styles/page.css`) montado sobre os tokens da home; cada página é dado tipado em `src/data/pages/` renderizado por poucos templates (`ProductPage`, `ServicePage`, `LinePage`). Motion moderado por um hook único sobre `useMotionScope`. Redirecionamentos 301 no `vercel.json`, conferidos por teste.

**Tech Stack:** Vite 5, React 18, TypeScript, react-router 6.30, GSAP 3.15 (ScrollTrigger), Vitest + Testing Library, Vercel.

**Spec:** `docs/superpowers/specs/2026-11-08-reinvencao-fase-2-design.md`

## Global Constraints

- Tokens, tipos e regras visuais só da DESIGN.md; nenhuma cor ou fonte fora de `src/styles/tokens.css`.
- Copy em português do Brasil, sem travessão, sem "não X, é Y", sem frase de efeito, sem fato fora das fontes do spec (oficial > `concepts/negocio` do cérebro > site atual).
- Nada de formulário ou coleta de dados; contato por `whatsappHref(texto)` de `src/data/home.ts`, e-mail e telefone.
- "Sem hélio" só para Magnifico Open e S-scan. Sem preço, prazo, estoque, SLA, garantia ou representação além do que o site atual já afirma.
- Motion: estado de repouso visível; `prefers-reduced-motion` desliga tudo; palco WebGL e Lenis só na home.
- Cada página nova é um pacote `lazy` no `App.tsx`; GSAP importado só por páginas com motion.
- Commits com `git -c user.name="Lucas" -c user.email="hexaos@hexamedical.com.br" commit -F <arquivo>`, mensagem terminando em `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Nada vai para produção; só push na branch `reinvencao/fase-0-1` (prévia).

## Review Focus

1. URL antiga com e sem barra final (`/rm-esaote-s-scan` e `/rm-esaote-s-scan/`) deve cair na rota nova: testar as duas formas no teste de redirecionamento (Task 1).
2. Slug inexistente em `/solucoes/:slug`, `/servicos/:slug` e `/blog/:slug` deve mostrar a 404 do sistema, não página vazia nem tela branca (Tasks 3, 5, 7).
3. Página interna aberta com movimento reduzido ou sem `IntersectionObserver` deve mostrar todo o conteúdo (Task 2).
4. Link de WhatsApp de cada página deve abrir com a mensagem da própria página, codificada (acentos e `?`) (Task 2).
5. Leitor de tela: uma só `h1` por página, migalha com `aria-current`, FAQ operável por teclado (Tasks 2 e 12).

---

### Task 1: Mapa de rotas, navegação e redirecionamentos

**Files:**
- Create: `src/data/routes.ts`, `src/test/routes-redirects.test.ts`
- Modify: `vercel.json`, `src/data/navigation.ts`, `src/App.tsx`, `src/components/layout/Footer.tsx`

**Interfaces:**
- Produces: `legacyRedirects: { source: string; destination: string }[]` em `src/data/routes.ts` (fonte única; `vercel.json` é conferido contra ela). `navigation` com os links novos.

- [ ] **Step 1: Teste que falha.** `routes-redirects.test.ts`: (a) cada par da tabela de rotas do spec existe em `legacyRedirects`, incluindo `/lp/careverse`, `/produtos/`, `/apoio/`, `/ouvidoria/`, os slugs internos antigos (`/solucoes/rm-s-scan`, `/solucoes/rm-o-scan`, `/solucoes/rm-g-scan`, `/solucoes/rm-magnifico-open`, `/solucoes/mindray`, `/solucoes/veterinario`, `/sobre`, `/estrutura`, `/conteudo`, `/segmentos`, `/cases`); (b) `vercel.json.redirects` contém cada `legacyRedirects` com `permanent: true`, e cada fonte casa com e sem barra final; (c) nenhum destino é outra fonte (sem cadeia); (d) `navigation` só aponta para rotas do spec.
- [ ] **Step 2:** `npx vitest run src/test/routes-redirects.test.ts` → FAIL (`legacyRedirects` não existe).
- [ ] **Step 3:** Escrever `routes.ts`, a seção `redirects` do `vercel.json` (fonte com `:slash(/?)` ou par com/sem barra), atualizar `navigation` (Soluções: RM, Magnifico Open, Bombas injetoras, Radiografia digital, Densitometria, HexAI, Careverse, Veterinária; Serviços: 4; Empresa: A Hexamedical, Materiais de apoio, Blog, Ouvidoria, Contato) e o rodapé. No `App.tsx`, rotas novas apontando por enquanto para os componentes atuais.
- [ ] **Step 4:** Teste → PASS; suíte inteira verde.
- [ ] **Step 5:** Commit `feat(rotas): mapa de rotas da fase 2 e redirecionamento 301 das URLs antigas`.

### Task 2: Kit das páginas internas

**Files:**
- Create: `src/components/page/{PageHero,PageSection,PointList,SpecTable,CardGrid,FactStrip,Faq,PageVideo,PageContact,PageShell}.tsx`, `src/motion/usePageReveal.ts`, `src/styles/page.css`, `src/test/page-kit.test.tsx`
- Modify: `src/components/home/ContactTriage.tsx` (aceitar `title`, `intro` opcionais), `DESIGN.md` (seção "Páginas internas")

**Interfaces:**
- Produces:
  - `PageShell({ title, description, children })`: `Layout` + `Helmet` (`<title>{title} | Hexamedical</title>`) + importa `page.css`.
  - `PageHero({ tone: "dark" | "light", eyebrow, title, lead, crumbs: {label, href?}[], media?: MediaImage | MediaVideo, actions?: {label, href, kind: "primary" | "quiet"}[] })`.
  - `PageSection({ id?, title, intro?, tone?, children })`; `PointList({ items: string[] })`; `SpecTable({ caption, source, rows: [string, string][] })`; `CardGrid({ items: {title, body?, href?, image?, meta?}[] })`; `FactStrip({ items: CompanyFact[] })`; `Faq({ items: {q, a}[] })`; `PageVideo({ video: MediaVideo, caption })`.
  - `PageContact({ title?, intro?, paths: TriagePath[] })` reaproveita `ContactTriage`.
  - `usePageReveal(root: RefObject<HTMLElement>)`: anima `[data-reveal="title"]`, `[data-reveal="media"]`, `[data-reveal="item"]`.

- [ ] **Step 1: Testes que falham** em `page-kit.test.tsx`: PageHero renderiza uma `h1` e a migalha com `aria-current="page"` no último item; SpecTable tem `<caption>` e mostra a fonte; Faq abre e fecha com Enter e Espaço e liga `aria-expanded`/`aria-controls`; PageContact gera `href` igual a `whatsappHref(texto)` com acentos e `?`; com `matchMedia` de movimento reduzido e sem `IntersectionObserver`, nenhum elemento do kit fica com `opacity: 0` ou `visibility: hidden` inline.
- [ ] **Step 2:** `npx vitest run src/test/page-kit.test.tsx` → FAIL (módulos inexistentes).
- [ ] **Step 3:** Implementar o kit. Hero escuro em grafite com o equipamento sobre a base clara da vitrine; hero claro em mineral. Reveal: título por máscara (`clip-path` + `yPercent`), mídia por `inset()` 7% → 0, itens com `stagger` 0.06, `ScrollTrigger` `start: "top 85%"`, `once: true`. Mobile no mesmo ritmo, durações ×0.8.
- [ ] **Step 4:** Teste → PASS; suíte verde; `npx eslint src/components/page src/motion`.
- [ ] **Step 5:** Commit `feat(internas): kit de páginas internas no sistema da home`.

### Task 3: Soluções (hub, linha de RM, O-scan, S-scan, G-scan)

**Files:**
- Create: `src/data/pages/solutions.ts`, `src/pages/solucoes/{SolucoesHub,RmLinePage,ProductPage}.tsx`, `src/test/solutions-pages.test.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: kit da Task 2.
- Produces: `ProductPage` lendo `products[slug]: ProductContent` (`{ slug, name, line, hero: MediaImage, lead, points, specs: [string,string][], specSource, faq, whatsappText, related: string[] }`); slug desconhecido → `NotFound`.

- [ ] **Step 1: Testes que falham:** hub lista as linhas (Ressonância magnética, Bombas injetoras, Radiografia digital, Densitometria, HexAI, Careverse, Veterinária); RM line mostra a tabela comparativa com O-scan SMART 0,31 T e a partir de 9 m², S-scan Open 0,25 T e até 20 m², Magnifico Open 0,4 T e até 20 m², G-scan com os dados de `editorial.ts`; página do O-scan não contém "hélio"; página do S-scan contém "não usa hélio"; `/solucoes/nao-existe` renderiza a 404.
- [ ] **Step 2:** → FAIL.
- [ ] **Step 3:** Dados a partir de `editorial.ts`, `solutions.ts` e notas `O-Scan`, `S-Scan`, `Comparativo de RM Esaote`, `Regra de escolha de RM humana`. Pergunta de escolha da RM como bloco ("extremidades, musculoesquelético amplo ou RM aberta de corpo inteiro").
- [ ] **Step 4:** → PASS; suíte verde.
- [ ] **Step 5:** Commit `feat(solucoes): hub, linha de RM e páginas de O-scan, S-scan e G-scan`.

### Task 4: Demais linhas (injetoras, radiografia, densitometria, HexAI, veterinária)

**Files:**
- Create: `src/pages/solucoes/LinePage.tsx`, `src/test/lines-pages.test.tsx`
- Modify: `src/data/pages/solutions.ts`, `src/App.tsx`; remover `WdmVetPage`, `WdmCtPage`, `SolutionPage` e `ProductEditorialPage` quando nada mais os usar.

**Interfaces:**
- Produces: `LinePage` lendo `lines[slug]: LineContent` (`{ slug, title, lead, hero, models: CardGrid items, points, faq?, whatsappText }`). Rotas `/solucoes/{bombas-injetoras,radiografia-digital,densitometria,hexai,veterinaria}`; modelos veterinários WDM continuam em `/solucoes/{ispace-1-5t-vet,turbotom-1s-vet,turbotom-1s-lite-vet}` via `ProductPage`.

- [ ] **Step 1: Testes que falham:** injetoras lista Accutron CT/CT-D, MR (não magnética, até 3T, bateria) e HP; radiografia mostra DRGEM XVISION-525, TOPAZ, RAYMO e placas Rayence, e cita Mindray; densitometria mostra só a descrição DXA confirmada e nenhum número; HexAI lista DeepBrain, Chest X-ray, BoneAge e o SwiftMR e não contém "garante"; veterinária mostra Esaote veterinária e WDM com contato da Hexamedical.
- [ ] **Step 2:** → FAIL.
- [ ] **Step 3:** Conteúdo das notas `Injetoras Medtron Accutron`, `Raio-X Digital DRGEM`, `Placas DR`, `Densitometria`, `IA VUNO HexAI`, `Linha Veterinária` e `src/data/wdm.ts`; texto da página veterinária do site atual (`/area-veterinaria-hexamedical/`).
- [ ] **Step 4:** → PASS; suíte verde.
- [ ] **Step 5:** Commit `feat(solucoes): injetoras, radiografia, densitometria, HexAI e veterinária`.

### Task 5: Serviços (hub e quatro serviços)

**Files:**
- Create: `src/data/pages/services.ts`, `src/pages/servicos/{ServicosHub,ServicePage}.tsx`, `src/test/services-pages.test.tsx`
- Modify: `src/App.tsx`; remover páginas e dados antigos de serviço sem uso.

**Interfaces:**
- Produces: `services[slug]: ServiceContent` (`{ slug, title, lead, hero, scope: string[], process: {title, body}[], faq, whatsappText }`).

- [ ] **Step 1: Testes que falham:** hub com Manutenção, Contratos, Instalação, Reparo e laboratório; reparo lista criogenia (compressor Sumitomo F-70H, coldhead RDK-408L3), tubos de CT (Dunlee, Varex), bobinas e placas, e não contém "pronta entrega", "prazo" nem "estoque"; manutenção cita RM e TC, contrato full service para RM Esaote e todo o território nacional; `/servicos/nao-existe` → 404.
- [ ] **Step 2:** → FAIL.
- [ ] **Step 3:** Conteúdo de `Serviços Técnicos Hexamedical`, `Criogenia tubos e peças` e das quatro páginas de serviço do site atual.
- [ ] **Step 4:** → PASS; suíte verde.
- [ ] **Step 5:** Commit `feat(servicos): hub e páginas de serviço no sistema novo`.

### Task 6: Institucional (empresa, contato, ouvidoria, materiais, privacidade, termos)

**Files:**
- Create: `src/data/pages/company.ts`, `src/pages/empresa/{EmpresaPage,ContatoPage,OuvidoriaPage,MateriaisPage,LegalPage}.tsx`, `src/test/company-pages.test.tsx`
- Modify: `src/App.tsx`, `src/data/home.ts` (rótulo das 3 salas)

**Interfaces:**
- Produces: `/empresa` com números (`companyFacts`), estrutura e público atendido; `/contato` com a triagem completa, telefone, e-mail e horário como texto selecionável; `/ouvidoria` com os canais do site atual, sem formulário.

- [ ] **Step 1: Testes que falham:** `/empresa` mostra "3 salas de teste para tomografia, raio-X e mamografia", laboratório de eletrônica e de criogenia, salas de treinamento e showroom; `companyFacts` da home usa o mesmo rótulo de salas; `/contato` tem os três caminhos de WhatsApp e mostra o e-mail e o telefone como texto; `/ouvidoria` não tem `<form>`; privacidade e termos mostram o aviso de revisão jurídica e uma só `h1`.
- [ ] **Step 2:** → FAIL.
- [ ] **Step 3:** Textos de `/estrutura/`, `/ouvidoria/`, `/apoio/` e `/contato/` do site atual, nota `Público atendido Hexamedical`.
- [ ] **Step 4:** → PASS; suíte verde.
- [ ] **Step 5:** Commit `feat(empresa): institucional, contato, ouvidoria, materiais e páginas legais`.

### Task 7: Blog migrado

**Files:**
- Create: `src/pages/blog/{BlogIndex,BlogPost}.tsx`, `src/test/blog-pages.test.tsx`
- Modify: `src/data/blog.ts` (se precisar de capa, autor e resumo), `src/App.tsx`

**Interfaces:**
- Produces: `/blog` e `/blog/:slug` com os artigos de `blog.ts`, ordenados por data, com `<article>`, `<time dateTime>`, leitura em 65 caracteres e artigos relacionados.

- [ ] **Step 1: Testes que falham:** `/blog` lista todos os posts de `blog.ts` do mais novo ao mais antigo; post mostra título como `h1`, `<time dateTime="AAAA-MM-DD">` e todos os parágrafos; `/blog/nao-existe` → 404.
- [ ] **Step 2:** → FAIL. **Step 3:** implementar. **Step 4:** → PASS; suíte verde.
- [ ] **Step 5:** Commit `feat(blog): artigos migrados para o sistema novo`.

### Task 8: Página-vitrine do Magnifico Open

**Files:**
- Create: `src/pages/solucoes/MagnificoPage.tsx`, `src/data/pages/magnifico.ts`, `src/styles/magnifico.css`, `src/test/magnifico-page.test.tsx`
- Modify: `src/App.tsx` (`/solucoes/magnifico-open`), `src/data/home.ts` (card da vitrine aponta para a rota nova, sem `external`)

**Interfaces:**
- Consumes: `bannerClip` de `src/components/home/heroClip.ts`, `homeMedia.tunnel`, kit da Task 2.

- [ ] **Step 1: Testes que falham:** página mostra 0,4 T, ímã permanente, "não usa hélio", até 20 m², monofásica 220 V, True-Motion, Speed-Up e MAR; tabela de cobertura clínica com a fonte; o card da vitrine da home aponta para `/solucoes/magnifico-open`; com movimento reduzido, os três fatos ficam visíveis e não há pin.
- [ ] **Step 2:** → FAIL.
- [ ] **Step 3:** Cena presa ao scroll só no desktop e no celular imersivo: vídeo abre do círculo ao quadro (`bannerClip`), fatos entram em sequência; criar o ScrollTrigger dependente de altura depois do pin. Fatos da nota `Magnifico Open` e das brochuras oficiais.
- [ ] **Step 4:** → PASS; suíte verde.
- [ ] **Step 5:** Commit `feat(magnifico): página-vitrine do Magnifico Open`.

### Task 9: Careverse no sistema

**Files:**
- Create: `src/pages/solucoes/CareversePage.tsx`, `src/data/pages/careverse.ts`, `src/test/careverse-page.test.tsx`; copiar a mídia de `careverse-site/assets` usada para `public/media/careverse/` e registrar em `public/media/SOURCES.md`.

**Interfaces:**
- Produces: `/solucoes/careverse` com os módulos Digital Heart, Digital Brain, StrokeFusion e Digital Artery e CTA único "Solicitar demonstração" via WhatsApp.

- [ ] **Step 1: Testes que falham:** os quatro módulos aparecem; todas as afirmações numéricas da página existem em `careverse-site/index.html` (o teste lê o HTML antigo e confere cada número); há um único CTA de conversão, apontando para `whatsappHref` com texto de demonstração.
- [ ] **Step 2:** → FAIL. **Step 3:** portar seção a seção, no sistema da DESIGN.md (laranja como sinal; a cor do Careverse só nas imagens). **Step 4:** → PASS; suíte verde.
- [ ] **Step 5:** Commit `feat(careverse): landing do Careverse dentro do site`.

### Task 10: Home, limpeza e SEO

**Files:**
- Modify: `src/components/home/Showroom.tsx` (frase do hélio só para modelos confirmados), `src/data/home.ts` (links novos), `src/main.tsx` (remover `editorial*.css`, `wdm.css`), `index.html`
- Create: `public/sitemap.xml`, `public/robots.txt`, `src/test/seo.test.ts`
- Delete: componentes de `src/components/sections/` e páginas antigas sem uso

- [ ] **Step 1: Testes que falham:** a vitrine da home não afirma "não usa hélio" para a linha inteira; `sitemap.xml` lista exatamente as rotas públicas de `routes.ts`; toda página tem `<title>` e `meta description` únicos; nenhum link interno do site aponta para fonte de redirecionamento.
- [ ] **Step 2:** → FAIL. **Step 3:** implementar e remover código morto (conferir com `rg` que nada importa). **Step 4:** → PASS; suíte verde; `npm run build`.
- [ ] **Step 5:** Commit `chore(site): limpeza do sistema antigo, sitemap e títulos`.

### Task 11: Auditoria e revisão

- [ ] **Step 1:** Rodar a auditoria da skill impeccable (audit) em 390, 412, 768 e 1440 px com os scripts CDP (`cdp-capture.mjs`), em cada template: hub, produto, linha, serviço, empresa, blog, Magnifico, Careverse.
- [ ] **Step 2:** Corrigir os P0 e P1 numa passada, cada um com teste quando for comportamento.
- [ ] **Step 3:** Revisão independente do branch inteiro (subagente no modelo mais capaz) com este plano, o spec e a Review Focus.
- [ ] **Step 4:** Corrigir Critical e Important com TDD; suíte, lint e build verdes.
- [ ] **Step 5:** Push na branch da prévia, conferir o deploy e o link compartilhável.
