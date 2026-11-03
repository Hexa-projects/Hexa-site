# Auditoria técnica `$impeccable audit` — prévia Hexamedical

Data: 2026-11-02
Escopo: a prévia em `hexamedical-site-redesign`, rodando em `http://localhost:8080`, com 28 rotas. Ficaram de fora a Magnifico Open e a Careverse Digital Heart.
Complementa: [auditoria-visual-reinvencao-2026-11-02.md](auditoria-visual-reinvencao-2026-11-02.md).

## Como foi medido

- **Detector impeccable, código:** varredura estática de `src/pages`, `src/components/layout`, `src/components/sections` e de todos os CSS. Não apontou nada.
- **Detector impeccable, páginas renderizadas:** varredura das 28 rotas em 1280×800, com 177 achados, e em 390×844, com 181 achados.
- **Script no navegador:** verificou em cada rota:
  - transbordo horizontal;
  - landmarks e hierarquia de títulos;
  - `alt` das imagens;
  - nome acessível de links e botões;
  - alvos de toque menores que 44 px;
  - imagens superdimensionadas ou carregadas antes da hora;
  - peso dos recursos.

  Rodou em 390×844 nas rotas principais.
- **Build de produção:** `vite build`, gerado numa pasta temporária, sem tocar no `dist` do projeto.
- **Busca no código:** tokens, `prefers-reduced-motion`, `:focus-visible`, componentes órfãos e redirecionamentos.

**O que não deu para verificar:**
- O painel do navegador estava oculto. Isso bloqueia o `requestAnimationFrame`, então não consegui confirmar se o `react-helmet-async` atualiza o `<title>` no cliente. O HTML inicial é o mesmo em todas as rotas, e isso continua valendo.
- O foco por teclado e os gestos de toque não foram exercitados de verdade. A avaliação deles vem do CSS e das medidas.
- A largura de desktop foi verificada só pelo detector, porque o script rodou em viewport reduzida. Os números de transbordo dessa rodada foram descartados.

## Nota geral

| # | Dimensão | Nota | Achado principal |
|---|---|---|---|
| 1 | Acessibilidade | 2 | O CTA principal da home tem texto branco sobre laranja com contraste de 2,8:1, e não há link "pular para o conteúdo" |
| 2 | Performance | 2 | Logo de 6561 px de largura em todas as páginas, hero PNG de 2 MB, JS único de 410 kB e imagens sem dimensões |
| 3 | Responsivo | 3 | Sem transbordo em 390 px e menu móvel correto, mas os CTAs de texto têm 31 a 33 px de altura |
| 4 | Tematização | 1 | `index.css` e `editorial.css` usam zero `var(--…)`, 136 cores fixas e 8 tons de laranja |
| 5 | Integridade da implementação | 1 | O mesmo molde em todas as rotas, três sistemas de CSS paralelos, 404 genérico em inglês e redirecionamentos só no cliente |
| **Total** | | **9/20** | **Fraco: precisa de revisão estrutural** |

## Veredito de integridade da implementação: **reprovado**

A prévia não expressa um sistema próprio da Hexamedical. Expressa um molde editorial repetido.

- **Eyebrow sobre o H1 em 27 das 27 páginas com conteúdo.** "Portfólio Hexamedical", "Suporte técnico Hexamedical", "Conteúdo" e outros.
- **Kicker sobre os H2 em 26 casos.** Por exemplo "Escopo", "Próximo passo" e "Na prática".
- **Tracking negativo extremo em 57 títulos.** Vai de −0,06 a −0,07 em, contra o limite de −0,04 em.
- **Caixa alta em trechos de texto corrido em 11 casos.**
- **Numeração 01/02/03 nos cards** dos hubs Conteúdo, Empresa e Estrutura.

O detector de código não acusou nada, porque o molde está no CSS minificado, e não em classes utilitárias.

Por baixo há três sistemas convivendo:

| Sistema | Onde está | Situação |
|---|---|---|
| Home | `index.css`, 26 kB | Cores fixas |
| Páginas internas | `editorial.css` | Uma única linha minificada de 6 kB, impossível de manter |
| WDM | `wdm.css` e `wdm-ct.css` | É o único que usa variáveis |

Ainda restam do Lovable:
- seções legadas, como `HeroSection`, `CTABanner` e `TrustBlock`, usadas só por páginas que nenhuma rota carrega;
- 38 componentes `ui/*` sem uso;
- `App.css`, o boilerplate do Vite com o logo girando;
- a página 404 padrão: "Oops! Page not found", sem cabeçalho nem rodapé.

## Resumo executivo

- **Nota:** 9/20, faixa "fraco".
- **Contagem:** 0 P0, 7 P1, 8 P2 e 3 P3.
- **Mais críticos:**
  1. CTA principal da home reprovado em contraste (P1).
  2. Logo de 6561 px e 191 kB carregado em todas as páginas, e hero PNG de 2 MB (P1).
  3. O mesmo HTML inicial, com o mesmo `<title>` e a mesma description, em todas as rotas, e redirecionamentos feitos só no cliente (P1).
  4. Ausência de tokens: 8 laranjas e 136 cores fixas (P1).
  5. Molde repetido de eyebrow, kicker e tracking negativo em todo o site (P1).
- **Próximo passo recomendado:** antes de corrigir peça por peça, decidir a nova direção visual (o `shape` da reinvenção). Vários P1 desaparecem sozinhos se a fundação de tokens e de tipografia for refeita.

## Achados por severidade

### P1 — corrigir antes de publicar

**[P1] CTA principal da home com contraste insuficiente**
- **Onde:** `.home-hero__primary-action`, em `src/index.css:285-290`.
- **Categoria:** Acessibilidade.
- **Impacto:** o botão "Encontrar a solução certa", a ação mais importante do site, tem texto branco sobre `#f87517` com contraste de 2,8:1. Fica difícil de ler sob sol, em telas fracas ou para quem tem baixa visão.
- **Norma:** WCAG 1.4.3 (AA). Texto de 16 px pede 4,5:1.
- **Recomendação:** usar texto grafite `#111416` sobre o laranja, como o `.ed-button` já faz, ou escurecer o laranja do botão até cerca de `#c2530a`.
- **Comando:** `$impeccable colorize`.

**[P1] Textos laranja e cinza abaixo do contraste mínimo**
- **Onde:**
  - `.ed-lineup-item__number` em `#ef6b1d` sobre `#f7f7f7`: 2,9:1;
  - legendas `.ed-product-scene figcaption` em `#7b858a`: 3,5:1;
  - `.ed-footnote` em `#6d777d`: 4,3:1, em `/contato` e `/estrutura`;
  - páginas WDM com cinzas `#7c8a8f`, `#74838a` e `#707b80`: de 3,6 a 4,0:1.
- **Categoria:** Acessibilidade.
- **Impacto:** fontes do fabricante, ressalvas e legendas são justamente o texto que dá credibilidade técnica, e estão ilegíveis para parte do público.
- **Norma:** WCAG 1.4.3.
- **Recomendação:** criar dois tokens, `--text-muted` com pelo menos 4,6:1 e `--accent-text` (um laranja escurecido) com pelo menos 4,5:1, e usar só eles.
- **Comando:** `$impeccable colorize`.

**[P1] Logo superdimensionado em todas as páginas**
- **Onde:** `public/assets/hexa/Logo-Hexamedical.png`, com 6561 px de largura e 191 kB, exibido a 180 px no cabeçalho e no rodapé.
- **Categoria:** Performance.
- **Impacto:** cerca de 190 kB desperdiçados em cada visita, antes de qualquer conteúdo. No 4G isso atrasa o primeiro desenho do cabeçalho.
- **Recomendação:** exportar o logo em SVG. Na falta dele, um PNG ou WebP de 360 px (2×), com cerca de 10 kB.
- **Comando:** `$impeccable optimize`.

**[P1] Hero da home em PNG de 2 MB e imagens sem dimensões**
- **Onde:**
  - `public/assets/plates/hero-clinical-photo.png`, com 2.003 kB;
  - todas as `<img>` do site: 0 de 6 a 0 de 7 por página têm `width` e `height`;
  - de 2 a 5 imagens por página abaixo da dobra são carregadas sem `loading="lazy"`.
- **Categoria:** Performance.
- **Impacto:**
  - o LCP da home depende de 2 MB;
  - sem dimensões, o layout "pula" enquanto as fotos chegam (CLS);
  - as fotos de produto em WebP de 1200 a 3922 px aparecem a cerca de 200 px no mobile;
  - a home transferiu cerca de 3,7 MB no carregamento de desenvolvimento.
- **Recomendação:**
  - AVIF ou WebP com `srcset` e `sizes`;
  - `width` e `height` explícitos;
  - `loading="lazy"` e `decoding="async"` abaixo da dobra;
  - `fetchpriority="high"` só no hero.
- **Comando:** `$impeccable optimize`.

**[P1] SEO: o mesmo documento para todas as rotas e redirecionamentos só no cliente**
- **Onde:** `index.html` e `vercel.json`, que reescreve tudo para `index.html`. Também `SegmentPage.tsx`, `CasesPage.tsx` e `ServicePage.tsx:9`, que usam `<Navigate>`.
- **Categoria:** Integridade da implementação.
- **Impacto:**
  - toda URL responde com o título "Hexamedical — Especialistas em Ressonância Magnética" e a mesma description até o JavaScript rodar;
  - `/segmentos/*`, `/cases` e `/servicos/visita-tecnica` devolvem 200 e só redirecionam no navegador. Para o Google isso é conteúdo duplicado, e não um 301;
  - uma URL inexistente também devolve 200.
- **Recomendação:**
  - pré-renderizar as rotas em SSG, por exemplo com `vite-react-ssg`, ou migrar para um framework com SSG;
  - declarar os redirecionamentos 301 em `vercel.json`;
  - responder 404 de verdade.
- **Comando:** `$impeccable harden`.

**[P1] Sem tokens de design: 8 laranjas e 136 cores fixas**
- **Onde:** `src/index.css` com 99 hex e zero `var()`, e `src/editorial.css` com 37 hex e zero `var()`. No CSS final aparecem `#f87517`, `#ff7a1a`, `#e96000`, `#f37021`, `#f27021`, `#ef6b1d`, `#e96517` e `#e96010`.
- **Categoria:** Tematização.
- **Impacto:**
  - a marca muda de tom de uma página para outra;
  - qualquer ajuste de contraste ou de identidade exige caçar valores em três arquivos;
  - os tokens shadcn de `:root` existem, mas o site não os usa.
- **Recomendação:** uma camada única de tokens com um laranja de marca, um laranja de texto, uma escala de grafite e uma escala de neutros. Depois, migrar `index.css`, `editorial.css` e os CSS da WDM para essa camada.
- **Comando:** `$impeccable extract`.

**[P1] Molde visual repetido em todas as páginas**
- **Onde:**
  - `.ed-eyebrow` e `.ed-intro` em `editorial.css`;
  - `.home-hero` e os `span` "Rede em operação" em `index.css`;
  - os cards `0{index+1}` em `EstruturaPage`, `ConteudoHub` e `EmpresaHub`.
- **Categoria:** Integridade da implementação.
- **Impacto:** 27 heros iguais (eyebrow, H1 gigante com tracking −0,07 em e um parágrafo) e 26 kickers. O visitante não distingue um hub de outro, e o site "parece feito por IA", que é exatamente o que a marca quer evitar (PRODUCT.md).
- **Recomendação:**
  - tirar os eyebrows e kickers e integrar o contexto ao título ou ao breadcrumb;
  - limitar o tracking a −0,03 em;
  - remover a numeração decorativa;
  - dar a cada tipo de página uma abertura própria, conforme o relatório de reinvenção.
- **Comando:** `$impeccable typeset`, depois `$impeccable layout`.

### P2 — próxima rodada

**[P2] Alvos de toque pequenos no mobile**
- **Onde:**
  - `.ed-text-link` ("Explorar linha", "Conhecer serviço", "Ficha da fabricante"), com 31 px de altura;
  - CTA do rodapé, com 33 px;
  - links "← Voltar" de 20 px;
  - âncoras da WDM ("Tecnologia", "Fluxo de exame"), com 20 px;
  - e-mail e Ouvidoria no rodapé, com 21 px.

  São de 7 a 15 por página em 390 px.
- **Categoria:** Responsivo.
- **Impacto:** toques errados, sobretudo nos links empilhados do rodapé.
- **Norma:** WCAG 2.5.8 (AA, mínimo de 24 px) passa. A recomendação de 44 px da Apple e do Google não é atingida.
- **Recomendação:** `min-height: 44px` e `padding-block` nos links de ação, com a área clicável maior que o texto.
- **Comando:** `$impeccable adapt`.

**[P2] Sem link "pular para o conteúdo"**
- **Onde:** `src/components/layout/Layout.tsx` e `Header.tsx`.
- **Categoria:** Acessibilidade.
- **Impacto:** quem navega por teclado ou leitor de tela atravessa o menu inteiro em toda página.
- **Norma:** WCAG 2.4.1.
- **Recomendação:** um `<a href="#conteudo">` visível no foco, e `id="conteudo"` no `<main>`.
- **Comando:** `$impeccable harden`.

**[P2] Anel de foco laranja com contraste insuficiente sobre o branco**
- **Onde:** `:focus-visible { outline: 2px solid #f87517 }`, em `src/index.css:600`.
- **Categoria:** Acessibilidade.
- **Impacto:** o anel tem 2,8:1 sobre o branco e fica pouco visível nas áreas claras.
- **Norma:** WCAG 1.4.11 e 2.4.11 pedem 3:1.
- **Recomendação:** anel duplo, com contorno grafite e halo laranja, ou o laranja de texto escurecido.
- **Comando:** `$impeccable polish`.

**[P2] Saltos de título nos hubs**
- **Onde:** `/conteudo`, `/empresa` e `/cases` (que redireciona para `/conteudo`). Os cards começam em `<h3>` logo depois do `<h1>`.
- **Categoria:** Acessibilidade.
- **Norma:** WCAG 1.3.1.
- **Recomendação:** um `<h2>` de seção (pode ser visualmente oculto) ou cards em `<h2>`.
- **Comando:** `$impeccable harden`.

**[P2] Página 404 genérica do template**
- **Onde:** `src/pages/NotFound.tsx`.
- **Categoria:** Integridade da implementação.
- **Impacto:**
  - a página diz em inglês "Oops! Page not found" e "Return to Home";
  - não tem cabeçalho, rodapé nem `<main>`;
  - o `<a href="/">` recarrega o app inteiro;
  - registra `console.error` em produção.
- **Recomendação:** usar o `Layout`, texto em português, atalhos para Soluções, Serviços e Contato, e `<Link>`.
- **Comando:** `$impeccable harden`.

**[P2] Texto pequeno demais no mobile**
- **Onde:**
  - `.ed-facts span` (`font-size: .72rem`, 11,5 px) em S-scan, O-scan e G-scan;
  - WDM TurboTom e i_Space com 11,8 px;
  - `.ed-eyebrow` com `.76rem`;
  - `figcaption` com `.75rem`.
- **Categoria:** Responsivo.
- **Impacto:** os dados técnicos do fabricante, que são a prova do produto, ficam no limite da leitura.
- **Recomendação:** mínimo de 14 px no mobile para os rótulos de dados.
- **Comando:** `$impeccable typeset`.

**[P2] JS único de 410 kB, sem divisão por rota**
- **Onde:** `assets/index-*.js` com 409,8 kB, ou 123,9 kB gzip, e CSS de 113 kB, ou 21 kB gzip.
- **Categoria:** Performance.
- **Impacto:** quem chega numa página de produto baixa o código de todas as páginas. `Toaster` e `Sonner` são montados juntos sem uso visível.
- **Recomendação:**
  - `React.lazy` por rota;
  - remover os `ui/*` e as `sections/*` órfãos;
  - remover os dois toasters, se não houver uso.
- **Comando:** `$impeccable optimize`.

**[P2] Movimento reduzido coberto só em parte**
- **Onde:**
  - `index.css:1250` cobre cinco seletores da home;
  - `.ed-button:hover` (`translateY`) e `.site-header__cta` não são cobertos;
  - a WDM tem regra própria.
- **Categoria:** Acessibilidade.
- **Impacto:** pequeno hoje, porque o movimento é discreto, mas não há política única. A reinvenção, com cena de rolagem e vídeo, vai precisar de uma.
- **Recomendação:** uma única regra `@media (prefers-reduced-motion: reduce)` nos tokens de movimento, que troque deslocamento por opacidade, sem um corte global de `0.01ms`.
- **Comando:** `$impeccable animate`, quando a cena de rolagem existir.

### P3 — se houver tempo

**[P3] CSS de produção minificado no código-fonte**
- **Onde:** `editorial.css`, `editorial-models.css` e `editorial-scenes.css`, cada um numa única linha.
- **Impacto:** é impossível revisar diffs.
- **Recomendação:** desminificar ao migrar para os tokens.
- **Comando:** `$impeccable extract`.

**[P3] Brilho colorido e borda lateral na WDM TurboTom**
- **Onde:** `box-shadow` com `#133740` sobre fundo escuro, e uma `border-top: 3px` de destaque.
- **Impacto:** sinais visuais de template e uma paleta à parte do resto do site.
- **Comando:** `$impeccable quieter`.

**[P3] Achado do detector que não se confirmou: "transition: height"**
O detector o aponta em todas as 28 rotas, mas nenhum elemento renderizado tem `height` em `transition-property`. A origem é a classe `transition-[width,height,padding]` do `ui/sidebar.tsx` do shadcn, que não é usado. Desaparece com a limpeza dos componentes órfãos.

## Padrões sistêmicos

- **Cor fora de token:** 136 hex fixos em dois arquivos centrais e oito variações do laranja da marca.
- **Contraste de texto secundário:** todos os cinzas "suaves" (`#6d777d` a `#7c8a8f`) e o laranja usado como texto ficam abaixo de 4,5:1.
- **Molde de abertura:** um único componente `.ed-intro` com eyebrow cobre 27 páginas, e um molde de kicker cobre 26 seções.
- **Mídia sem pipeline:**
  - nenhuma imagem com `srcset` ou dimensões;
  - `public/assets` com 70 MB e 14 arquivos acima de 900 kB.
- **Links de ação com aparência de texto e altura de 31 px** no site inteiro.
- **Código legado do Lovable** convivendo com o novo: seções, páginas órfãs (`SolutionPage`, `StaticPage` e outras), `App.css` e a 404.

## O que está funcionando

- Nenhuma imagem sem `alt`. Nenhum link ou botão sem nome acessível.
- `lang="pt-BR"` está correto, e cada página tem um único `<h1>`, `<header>`, `<nav>`, `<main>` e `<footer>`.
- O botão do menu móvel está correto: 44×44 px, `aria-label="Abrir menu"`, `aria-expanded` e `aria-controls`.
- Nenhum transbordo horizontal em 390 px nas 17 rotas medidas.
- Existe um estilo global de `:focus-visible`, e nenhum `outline: none` no CSS do site.
- Lazy loading já aparece em 15 pontos.
- Fotos de produto em WebP com `object-fit: contain`, que respeitam o objeto inteiro, como pede o DESIGN.md.
- O cuidado editorial com a verdade se mantém: ressalvas de fonte e configuração, e nenhum formulário simulando envio.

## Ações recomendadas, em ordem

1. **[P1] `$impeccable shape`:** decidir a direção da reinvenção antes de corrigir peça por peça. Os achados de molde, tracking e numeração dependem disso.
2. **[P1] `$impeccable extract`:** criar a camada única de tokens (cores, texto suave acessível, laranja de texto, foco, movimento) e migrar `index.css`, `editorial.css` e a WDM.
3. **[P1] `$impeccable colorize`:** corrigir o CTA da home e todos os textos abaixo de 4,5:1 usando os novos tokens.
4. **[P1] `$impeccable optimize`:**
   - logo em SVG;
   - hero em AVIF ou WebP com `srcset`;
   - `width` e `height` explícitos;
   - lazy loading abaixo da dobra;
   - divisão de código por rota;
   - remoção de `ui/*` e `sections/*` órfãos.
5. **[P1] `$impeccable harden`:**
   - SSG ou pré-render por rota;
   - redirecionamentos 301 em `vercel.json`;
   - 404 real em português;
   - link "pular para o conteúdo";
   - correção dos saltos de título.
6. **[P1] `$impeccable typeset`:** tirar eyebrows e kickers, limitar o tracking a −0,03 em, usar no mínimo 14 px no mobile e remover a caixa alta em texto corrido.
7. **[P2] `$impeccable adapt`:** alvos de toque de 44 px para links de ação, voltar e rodapé.
8. **[P2] `$impeccable animate`:** política única de movimento reduzido, quando a cena de rolagem entrar.
9. **[P3] `$impeccable quieter`:** brilho e borda de destaque da WDM TurboTom.
10. **`$impeccable polish`:** passada final, incluindo o anel de foco.

Depois das correções, rodar `$impeccable audit` de novo para comparar a nota.
