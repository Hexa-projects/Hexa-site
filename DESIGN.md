---
name: Hexamedical
description: Uma equipe só, da compra ao reparo, vista de dentro do túnel da ressonância.
colors:
  paper: "#ffffff"
  wash: "#fff5ed"
  wash-2: "#ffeadb"
  wash-3: "#ffdcc2"
  line-strong: "#d9cdc1"
  sand-50: "#fdfbf8"
  sand-100: "#f6f1eb"
  white: "#ffffff"
  ink: "#16191c"
  ink-2: "#4b535a"
  ink-3: "#6b737a"
  rule-light: "rgba(22, 25, 28, 0.14)"
  veil: "rgba(255, 255, 255, 0.92)"
  orange: "#f87517"
  orange-ink: "#a34800"
  scan: "#e9f6ff"
typography:
  display:
    fontFamily: "Archivo, Source Sans 3, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 1.1rem + 4.4vw, 5.25rem)"
    fontWeight: 650
    lineHeight: 0.98
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 112"
  headline:
    fontFamily: "Archivo, Source Sans 3, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.5rem + 4.4vw, 5rem)"
    fontWeight: 640
    lineHeight: 1.05
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 112"
  title:
    fontFamily: "Archivo, Source Sans 3, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 2.4vw, 3.25rem)"
    fontWeight: 620
    lineHeight: 1.05
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 112"
  title-sm:
    fontFamily: "Archivo, Source Sans 3, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.2rem + 1.1vw, 2rem)"
    fontWeight: 620
    lineHeight: 1.1
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 112"
  lead:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1
  caption:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    letterSpacing: "0.02em"
rounded:
  sm: "6px"
  md: "14px"
  pill: "999px"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "5": "1.5rem"
  "6": "2rem"
  "7": "3rem"
  "8": "4.5rem"
  "9": "7rem"
  gutter: "clamp(1rem, 4vw, 3.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0 1.5rem"
    height: "48px"
  button-primary-hover:
    backgroundColor: "#ff8a33"
  button-quiet:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0 1.5rem"
    height: "48px"
  chip:
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "0 1rem"
    height: "44px"
  chip-pressed:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
  showroom-plinth:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "1.5rem"
  triage-row:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "2rem"
  triage-row-hover:
    backgroundColor: "{colors.sand-100}"
  proof-play:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 1.5rem"
    height: "48px"
---

# Design System: Hexamedical

Documentado a partir do código em 2026-11-02. Tokens em `src/styles/tokens.css`; movimento em `src/lib/motion.ts`. Fora do sistema: a página Magnifico Open publicada e a antiga LP Careverse Digital Heart (`careverse-site`, `/lp/careverse`, que agora redireciona para `/solucoes/careverse`, montada com o kit).

## Overview

**Creative North Star: "Dentro do túnel"**

A home entra pelo anel da ressonância e depois acende a luz. A abertura acontece num palco branco (`paper`) com o anel do túnel desenhado em WebGL, em traços finos de grafite quente: ele mostra o vídeo real do Magnifico Open e se abre com o scroll até o equipamento ocupar a tela. Todo o resto da página fica na superfície clara (`sand-50`), que sobe sobre o palco; ali o anel continua como desenho em SVG (linha do tempo, emblemas, triagem). Todo o conteúdo é HTML e existe sem JavaScript. O equipamento real aparece inteiro, sobre base branca; a única cor de sinal é o laranja Hexamedical.

**Key Characteristics:**
- Nenhum fundo escuro (paleta branco e laranja); a abertura é o único momento de palco, branco com anéis; o resto da home é claro e plano, com profundidade por fios e pela base branca dos equipamentos.
- Um laranja só (`orange`), usado em ação, progresso e na borda do anel.
- Archivo expandida (largura 112%) nos títulos, Source Sans 3 no texto.
- Três dispositivos de assinatura: o anel/abertura, o hexágono que vira anel e a varredura de 1 px.
- Mídia exclusivamente real, do site oficial, com proveniência em `public/media/home/SOURCES.md`.

### Palco e movimento

- **Palco imersivo** (`src/motion/stage/`): canvas fixo atrás do conteúdo (`z-index: -1`, `pointer-events: none`), shader procedural próprio, sem three.js. Desenha anéis em perspectiva (densidade 1/r), 72 linhas de campo finas, a borda laranja da abertura com halo curto, luz que acende os anéis em laranja perto do cursor e vinheta em areia. Densidade de pixels limitada a 1,5×; não desenha com a aba oculta, com a home fora de vista ou com o vídeo cobrindo a tela (abertura > 2,05). Só desenha enquanto a abertura está na tela; depois dela a superfície clara o cobre.
- **Modo imersivo ou leve** (`src/motion/capability.ts`): vai para o leve com movimento reduzido, Save-Data, sem WebGL ou menos de 4 núcleos. A largura da tela não rebaixa: o celular tem a versão adaptada (docs/superpowers/specs/2026-11-03-animacoes-mobile-design.md). Depois do `load` + 800 ms, mede janelas de 1 s; duas seguidas abaixo de 45 fps, ou perda do contexto WebGL, rebaixam a página para o leve. `?palco=leve` e `?palco=imersivo` fixam o modo para revisão.
- **Reserva leve**: SVG estático com nove anéis e a borda laranja (r = 13), opacidade 0,5. No desktop leve com movimento, fica fixo e deslocado 20% para a direita, acompanhando a abertura; no celular (< 640 px) a borda laranja some para não passar atrás dos botões.
- **Rolagem suave**: Lenis (`lerp: 0.1`, `syncTouch: false`, âncoras ativas) só no desktop imersivo; no toque a rolagem é a nativa. Links com âncora deslizam até a seção (`src/components/RouteScroll.tsx`) e página nova abre no topo. Não muda direção nem velocidade final.
- **Tokens de movimento**: `--dur-instant` 120 ms (feedback), `--dur-quick` 240 ms (hover, troca de estado), `--dur-base` 450 ms (painéis, Flip, troca de cor de etapa), `duration.focal` 0,8 s (a cena autoral: título, varredura, transições do anel; existe só no JS). Curvas: `--ease-out` = `cubic-bezier(0.16, 1, 0.3, 1)` / `expo.out`; `--ease-in-out` = `cubic-bezier(0.45, 0, 0.55, 1)` / `power2.inOut`; scrub sempre linear.
- **Três contextos fixos de `gsap.matchMedia`** (`MEDIA` em `src/lib/motion.ts`, aplicados por `useMotionScope`): `desktop` = min-width 1024 px sem redução; `mobile` = max-width 1023 px sem redução; `reduced` = `prefers-reduced-motion: reduce`. Cada cena declara as três versões; trocar de modo reverte a cena anterior (`revertOnUpdate`).
- **Por cena**: hero fixado por 200% da altura com `scrub: 0.6` (desktop); no celular e no tablet imersivos, a abertura fica presa por 80% da altura da tela enquanto o vídeo sai de um círculo e vira o banner 16:9 (`clip-path: inset(... round ...)`), com o anel do palco abrindo junto, centrado no vídeo; a linha do tempo ganha uma faixa fixa no topo com o anel de 11 rem, a foto, o progresso e a varredura. No celular leve, o banner se abre uma vez de uma moldura 7% menor e cada etapa traz seu emblema. Título sobe por trás de máscara (`clip-path`), uma vez, em 0,8 s. Linha do tempo: texto rola livre, coluna do anel em `sticky`, anel de progresso desenhado com DrawSVG em scrub. Portfólio: Flip carregado sob demanda ao primeiro hover ou foco nos filtros. Com movimento reduzido, nada é fixado, o vídeo do hero não toca sozinho e a foto da etapa troca por opacidade em 0,2 s.

## Colors

**Paleta da marca: branco e laranja (decisão do Lucas, 2026-11-09).** Nenhum fundo escuro: preto só em texto, ícones e detalhes. Branco e areia quente para a leitura, faixa laranja clara (`wash`) para equipamento e destaque, e um único laranja de sinal. O teste `src/test/light-theme.test.tsx` falha se alguma folha de estilo pintar fundo com luminância abaixo de 0,1. Contrastes conferidos em `tokens.css`: `ink-2` sobre `wash` 7,3:1; `orange-ink` sobre `wash` 5,6:1 e sobre branco 6,1:1; tinta sobre laranja 6,3:1.

### Primary
- **Laranja de sinal** (`orange`): botão primário, pílula "Assistir", CTA do cabeçalho, chip selecionado, progresso do anel, hexágonos alcançados, borda do anel, ícones e seleção de texto. Nunca em texto pequeno sobre o claro.
- **Laranja tinta** (`orange-ink`): o laranja em texto e no anel de foco (links de texto, link ativo e hover da navegação, contato do rodapé).

### Tertiary
- **Luz de varredura** (`scan`): só a linha de 1 px da varredura e seu brilho.

### Neutral
- **Papel** (`paper`): o palco branco da abertura da home (o shader pinta sobre branco, com vinheta em areia).
- **Faixa laranja clara** (`wash`, `wash-2`, `wash-3`): rodapé, hero de produto (`tone="accent"`), faixa de destaque das páginas, cena do Magnifico; `wash` também no hover da navegação e do botão discreto.
- **Linha forte** (`line-strong`): polegar da barra de rolagem.
- **Areia** (`sand-50`, `sand-100`): fundo das seções da home depois da abertura, das páginas claras, do cabeçalho e do menu móvel; `sand-100` no fundo das fotos de etapa, do vídeo e no hover da triagem.
- **Branco** (`white`): a base dos equipamentos no portfólio, as linhas da triagem e o painel da navegação.
- **Tinta** (`ink`, `ink-2`, `ink-3`): texto sobre claro e sobre laranja; texto secundário em claro; `ink-3` (4,3:1) só em texto grande, como a etapa inativa, e em traços.
- **Fios** (`rule-light`): divisórias de 1 px, trilho do anel, anéis em SVG, contorno de chips e da pílula de pausa.
- **Véu** (`veil`): branco a 92% no cabeçalho rolado da home, na pílula de pausa e sob os dados do vídeo do Magnifico.

**The One Signal Rule.** O laranja é o único acento. Nada de segunda cor de destaque, e nenhum laranja diferente de `#f87517` (o hover `--orange-hover` `#ff8a33` é o único derivado).

## Typography

**Display Font:** Archivo, eixo de largura em 112% (`font-stretch: var(--display-stretch)`), servida pelo site (`/fonts`, OFL).
**Body Font:** Source Sans 3, servida pelo site, com itálico.

**Character:** a largura expandida dá aos títulos o peso de placa técnica; o Source Sans 3 mantém a leitura neutra e longa.

### Hierarchy
- **Display** (650, até 5,25 rem, entrelinha 0,98, -0,03em): só o título do hero, coluna de até `min(36rem, 44vw)`.
- **Headline** (640, `--step-4`, 1,05, -0,025em): o `h2` de cada seção da home.
- **Title** (620, `--step-3`, 1,05): nome da etapa na linha do tempo. **Title-sm** (620, `--step-2`, 1,1): caminhos da triagem. O nome do equipamento usa Archivo 620 em `--step-1`.
- **Lead** (400, `--step-1`, 1,45, até 40–52ch): texto de apoio do hero e das cabeças de seção.
- **Body** (400, `--step-0`): corpo. **Label** (600, `--step-0`, entrelinha 1): botões. **Caption** (`--step--1`): créditos, rótulo de etapa, chamada "Ver equipamento".

**The Accent Clearance Rule.** Entrelinha de `h2` é 1,05 e de display fica entre 0,98 e 1: acentos e descendentes do português não podem se tocar entre linhas. Títulos usam `text-wrap: balance`; parágrafos, `pretty`.

## Layout

Coluna de conteúdo com `--content-max` 88rem e `--gutter` `clamp(1rem, 4vw, 3.5rem)`. Seções com `--space-9` (7rem) em cima e embaixo no desktop e `--space-8` abaixo de 1024 px. Cabeça de seção até 46rem; parágrafos até 52ch. Cabeçalho com 80 px (68 px abaixo de 1024 px).

Pontos de quebra: 1024 px separa desktop de celular/tablet (mesmo corte do matchMedia e da decisão de modo); 640 px ajusta o celular pequeno. Abaixo de 1024 px o conteúdo vem antes da imagem (no imersivo, só a abertura e a faixa do anel ficam presas): o hero empilha texto, o vídeo em banner 16:9 na largura do conteúdo (raio `md`), crédito e pausa; a coluna do anel vira a faixa fixa no topo (imersivo) ou some, com um emblema em cada etapa (leve).

Grades: linha do tempo `1.05fr / 1fr` com o anel `min(38vw, 36rem)`; portfólio `auto-fill` a partir de 16,5rem (duas colunas abaixo de 640 px); prova `1fr / 0.316fr`, a proporção que alinha o vídeo vertical ao horizontal; triagem `3.5rem | 1fr | auto`.

## Elevation & Depth

Na abertura, profundidade pelo próprio túnel; no claro, por fios `rule-light` e pela base branca sobre a areia, não por sombra. Sombra só aparece em estado ou em peça que flutua sobre mídia.

### Shadow Vocabulary
- **Piso do equipamento** (`0 22px 36px -22px rgba(22,25,28,0.3)`): sob a base branca, só no hover.
- **Pílula sobre pôster** (`0 10px 24px -14px rgba(22,25,28,0.45)`): botão "Assistir".
- **Painel de navegação** (`0 18px 40px rgba(17,20,22,0.16)` no claro; `rgba(0,0,0,0.5)` no palco).
- **Brilho da varredura** (`0 0 14px 2px rgba(233,246,255,0.55)`).

**The Flat Stage Rule.** Cartões e linhas ficam planos em repouso; o hover muda o tom, não levanta o elemento.

## Shapes

Dois raios: `sm` (6 px) para botões, skip link e itens de menu; `md` (14 px) para bases do portfólio, vídeos, linhas da triagem e painéis. Pílula (999 px) para chips, pausa e "Assistir". O círculo é a forma da marca: a abertura do hero (`clip-path: circle()`), o portal das etapas e os emblemas do celular. O hexágono do logo aparece pequeno, como marcador de etapa.

### Dispositivos de assinatura
- **O anel / abertura**: hero (abertura que mostra o vídeo e se abre com o scroll; no modo leve, anéis estáticos em SVG) e, no claro, o anel SVG da linha do tempo, que desenha o progresso em volta da foto da etapa.
- **O hexágono que vira anel**: seis hexágonos nos vértices do anel da linha do tempo, preenchidos em laranja ao serem alcançados; na triagem, o hexágono de cada caminho vira anel (transição CSS de `d`, 800 ms) ao entrar na tela, e o nó laranja aponta a etapa correspondente.
- **A varredura de 1 px**: só na foto da etapa ativa da linha do tempo, no desktop. A linha `scan` cruza o portal e a foto aparece atrás dela com `clip-path: inset()`, em 0,8 s.

## Components

### Buttons
- **Primário**: laranja com texto `ink`, 48 px de altura, raio `sm`, Source Sans 600. Hover `--orange-hover`; a seta interna anda 3 px.
- **Discreto**: contorno de 1 px em `currentColor`, herda a cor; hover com véu claro de 8%.
- **Link de texto**: `orange-ink` 600 (fica no claro), sublinhado transparente que aparece no hover, alvo de 44 px.

### Chips
Filtros do portfólio em pílula, 44 px, contorno `rule-light`, texto `ink-2`. Pressionado (`aria-pressed`): fundo `ink`, texto branco. A contagem visível é anunciada num `role="status"`.

### Cards / Containers
- **Ladrilho do portfólio**: base branca 4:3 com fio interno `rule-light`, raio `md`, equipamento inteiro com `object-fit: contain` e 1,5rem de folga (0,75rem abaixo de 640 px). Hover: piso de sombra e escala de 1,035 na imagem. Variante **fill**, só para foto de cena e não recorte (hoje Vet-MR Grande e HexAI): a imagem cobre o ladrilho.
- **Linha da triagem**: branca com fio `rule-light`, raio `md`, hexágono/anel, título, texto, etapa e, à direita, o botão do WhatsApp com o link de página embaixo. Hover e foco interno: `sand-100`.
- **Números da empresa**: lista de definições em duas colunas; número em Archivo 650 `--step-3`, rótulo `ink-2`; fio `rule-light` em cima, e o primeiro com fio laranja de 2 px (o único destaque).
- **Itens da etapa**: lista curta sob o texto de cada etapa, com marcador em hexágono laranja.
- **Vídeo de prova**: pôster com a pílula laranja "Assistir"; os controles nativos só aparecem depois do clique, e o foco vai para o vídeo.

### Navigation
- **Cabeçalho normal** (páginas internas): `position: sticky` no topo, fundo `sand-50`, fio `rule-light`, logo original, CTA "Falar com especialista" laranja (hover `orange-hover`).
- **Cabeçalho da home**: `position: fixed` o tempo todo (`site-header--overlay`): transparente sobre a abertura e, depois de 24 px de rolagem, fundo `veil` (branco a 92%) com fio `rule-light`. Logo sempre o original (não existe mais modo escuro do cabeçalho).
- Os dois somem ao rolar para baixo (após 160 px) e voltam ao subir, nunca com menu aberto ou foco dentro. Painéis abrem por hover e foco; Esc fecha e devolve o foco. Abaixo de 1024 px, botão de menu de 44 px.
- **Rodapé**: `wash` (laranja claro), logo original, contato em `orange-ink`, três grupos com títulos em Archivo 620 e links de 44 px (a Ouvidoria fica no grupo Empresa); telefone e e-mail acima da linha legal.

### Linha do tempo e emblema
Anel SVG com trilho `rule-light`, progresso laranja e seis hexágonos (contorno `ink-3`, laranja quando alcançados); portal circular com a foto da etapa. No celular, cada etapa traz um emblema: a foto dentro do anel, os seis hexágonos e o arco até a etapa atual.

## Do's and Don'ts

### Do:
- **Do** manter o conteúdo visível sem JavaScript; a animação parte do estado final.
- **Do** declarar cada cena nos três contextos (`desktop`, `mobile`, `reduced`) e prever o modo leve.
- **Do** dar pausa a todo vídeo que toca sozinho; o vídeo do hero pausa fora da tela.
- **Do** manter alvos de toque de 44 px (48 px nos botões), o skip link "Pular para o conteúdo" e o anel de foco (2 px `orange-ink`, afastado 3 px, sem halo).
- **Do** trazer de volta o texto do hero quando o foco do teclado voltar a ele (`:focus-within`).
- **Do** registrar a origem de toda mídia em `SOURCES.md` antes de publicar.

### Don't:
- **Don't** usar eyebrows (rótulo pequeno acima do título) nem numeração decorativa (01, 02).
- **Don't** usar bounce, elastic, fade-up em toda seção, parallax sem significado ou cursor customizado.
- **Don't** sequestrar a rolagem: nada de mudar direção ou velocidade final, nem rolagem suave no toque.
- **Don't** usar texto em gradiente.
- **Don't** cortar ou deformar equipamento real; corte só na variante fill, para foto de cena.
- **Don't** inventar clientes, números, depoimentos, certificações ou prazos. Só material do site oficial.
- **Don't** aplicar este sistema à página Magnifico Open publicada.
- **Don't** trazer da antiga LP Careverse as cores, as fontes (Manrope, mono) ou o movimento: na página do Careverse, o azul e o cobre do produto ficam só dentro das imagens.

## Páginas internas

Kit único em `src/components/page/`, CSS em `src/styles/page.css`, movimento em `src/motion/usePageReveal.ts`. Toda interna é montada com ele e só com dados; nada de CSS próprio por página. A 404 do sistema (`src/pages/NotFound.tsx`) já usa o kit.

Exceção única: a página-vitrine do Magnifico Open (`src/pages/solucoes/MagnificoPage.tsx`, CSS em `src/styles/magnifico.css`, importado só por ela). Logo depois do hero, o vídeo do túnel da home abre de um círculo até o quadro inteiro (`bannerClip`) com a seção presa ao scroll, e os três dados (0,4 T, sem hélio, cerca de 20 m²) entram em sequência. A trava só existe no modo imersivo (`detectStageMode`, desktop e celular) e quando o quadro cabe na altura da tela (piso de 520 px no desktop); no modo leve, com movimento reduzido ou com o quadro mais alto que a tela (celular deitado, notebook baixo) não há trava e tudo nasce visível. O anel laranja é um elemento da página, centrado no vídeo; sem palco WebGL e sem Lenis. O gatilho que liga e desliga o vídeo na tela é criado depois da trava.

### Componentes
- **PageShell** `({ title, description, children })`: `Layout` com o cabeçalho normal (sticky, claro), `<title>{title} | Hexamedical</title>`, meta description, link canônico da rota (`canonicalUrl` em `src/data/routes.ts`), importa `page.css` e roda o `usePageReveal` uma vez para a página toda. As páginas não chamam o hook de novo; só marcam `data-reveal`.
- **PageHero** `({ tone, eyebrow?, title, lead, crumbs, media?, actions? })`: migalha (`nav` "Você está em", separador em hexágono, último item com `aria-current="page"`), `h1` em Archivo 650 `--step-4` (o display de 5,25 rem continua só na home), lead `--step-1` até 44ch, ações (`primary` laranja, `quiet` contorno). Rota interna vira `Link`; endereço externo (WhatsApp) abre em nova aba. O `eyebrow` não vira eyebrow: aparece como placa técnica embaixo das ações (fio + `--step--1`), por exemplo "Esaote · Ressonância magnética aberta".
- **Mídia de tela** (`MediaImage.screen`): tela de software ou arte em fundo escuro. No hero e no `PageSection`, aparece inteira, na proporção dela, sobre a faixa clara com fio `rule-light`, sem o recorte 4:3 nem a base branca do equipamento. Usada no Careverse.
- **PageSection** `({ id?, title, intro?, tone?, media?, children })`: `section` rotulada pelo próprio `h2` (Archivo 620 `--step-3`), intro em lead até 52ch. Duas seções claras seguidas ganham um fio `rule-light` na coluna em vez de somar dois respiros. Com `media` (foto), vira texto com mídia: foto 4:3 ao lado no desktop, depois do texto no celular. Filhos do corpo ficam a `--space-7` um do outro. `.page-prose` dá a coluna de leitura de 62ch para texto corrido.
- **PointList** `({ items })`: lista com o marcador em hexágono laranja da linha do tempo, um fio por item, em colunas a partir de 22 rem.
- **SpecTable** `({ caption, source, rows })`: ficha técnica em painel branco com fio, `caption` em Archivo, rótulo `ink-2` e valor `ink` 600 com números tabulares; "Fonte: …" sempre embaixo. Só dados do fabricante.
- **CompareTable** `({ caption, source, columns: { label, href? }[], rows: { label, values }[] })`: comparativo no mesmo painel da ficha, um modelo por coluna (nome com link para a página dele) e um dado por linha, "Fonte: …" embaixo. Título visível fora da rolagem e `caption` para leitor de tela; no celular a tabela rola dentro do painel (região focável) com o rótulo da linha fixo, e número e unidade não se separam. Usado na linha de RM (`/solucoes/ressonancia-magnetica`).
- **CardGrid** `({ items: { title, body?, href?, image?, meta?, fill? }[] })`: com imagem, o ladrilho da vitrine (base branca 4:3, equipamento inteiro em `contain`; `fill` só para foto de cena); sem imagem, painel branco com fio que muda de tom no hover. Só endereço de outro site (`http`) leva a seta diagonal; rota e âncora da página levam a seta reta. Grade só de equipamentos fica em duas colunas abaixo de 640 px, como a vitrine.
- **Ressalva** (`.page-note`): texto pequeno (`--step--1`, `ink-2`) na coluna de 62ch, para ressalva de uso clínico ou de fonte.
- **FactStrip** `({ items: CompanyFact[] })`: números como os da empresa na home; o primeiro com o fio laranja de 2 px.
- **Faq** `({ items: { q, a }[] })`: accordion com botão nativo dentro de `h3`, `aria-expanded` e `aria-controls`, resposta `role="region"`; cada pergunta abre sozinha; o "+" laranja gira 45°.
- **PageVideo** `({ video, caption })`: pôster com a pílula laranja "Assistir", `preload="none"`, controles só depois do clique; vídeo vertical limitado a 22 rem (16 rem no celular).
- **ChannelList** `({ items: { label, value, action? }[] })`: canais de atendimento numa lista de definição (`dl`), um painel branco com fio por canal: rótulo, o dado como texto selecionável (telefone, e-mail, horário) e, se houver, um atalho (`text-link`, seta diagonal para fora do site, reta para rota interna). Usado em `/contato`. Nada de formulário para contato comercial: o canal é o WhatsApp, o telefone e o e-mail.
- **OuvidoriaForm** `({ hostname? })`: o único formulário do site, com o contrato da Ouvidoria do site atual (`src/data/ouvidoria.ts`: endpoint, nomes de campo, ações `challenge` e `submit`). Três `fieldset` com legenda (Identificação, Manifestação, Anexos e envio), rótulo visível em todo campo, "(obrigatório)" escrito, ajuda e erro ligados por `aria-describedby`. Ao enviar com erro, um resumo `role="alert"` recebe o foco e cada item leva ao campo. O envio só sai com a pergunta de verificação carregada; resposta sem protocolo vira erro com o e-mail da ouvidoria. A armadilha para robôs fica com `aria-hidden` e `tabIndex={-1}`. O comprovante (protocolo, copiar, registrar outra) entra numa região `aria-live` e o título dele recebe o foco. Anexos: até 5 de 15 MB, tamanho em KB abaixo de 0,1 MB. O envio só fica ativo em `www.hexamedical.com.br` e `hexamedical.com.br` (`canSubmitOuvidoria`); em outro endereço (prévia) os campos ficam desativados, o aviso `page-form__preview` mostra o e-mail da ouvidoria e a pergunta de verificação não é pedida. `hostname` existe só para os testes.
- **PageContact** `({ title?, intro?, paths })`: a triagem da home (`ContactTriage`, com CSS próprio em `src/styles/triage.css`) com a mensagem pronta da página. Sem título, usa "Fale com a equipe certa".

### Hero de destaque ou claro
- **Destaque** (`tone="accent"`, `wash`): páginas de produto. O equipamento aparece inteiro sobre a base branca da vitrine e, no desktop, os anéis do túnel em `rule-light` ficam atrás dele (sem laranja). Vídeo no hero é mudo, em loop, só toca na tela e sempre tem "Pausar vídeo"; com movimento reduzido fica no pôster. O cabeçalho é o claro.
- **Claro** (`sand-50` com fio embaixo): serviços, institucional, contato, blog e 404. Mídia é foto de cena em quadro 4:3 de raio `md`, cobrindo o quadro.
- Fora o hero, no máximo uma faixa de destaque (`tone="accent"`, `wash`) por página, para equipamento ou vídeo. O resto é branco e areia.

### Movimento (`usePageReveal`)
Três movimentos, uma vez cada, quando o elemento chega a 85% da altura da tela (`ScrollTrigger`, `start: "top 85%"`, `once: true`):
- `data-reveal="title"`: o título sobe por trás da máscara (`clip-path: inset(0 0 100% 0)` + `yPercent: 18`), 0,8 s, `expo.out`; o recorte é removido no fim para não cortar acentos.
- `data-reveal="media"`: a mídia abre de `inset(7% 7% round 14px)` até o quadro inteiro, 0,6 s.
- `data-reveal="item"`: os itens de um mesmo pai entram em sequência (opacidade e 16 px), `stagger` 0,06 limitado a 0,4 s no total.

No celular o ritmo é o mesmo, com durações ×0,8. Com movimento reduzido, ou sem `IntersectionObserver`, nada é animado. O HTML nasce no estado final e o contexto do GSAP desfaz tudo ao trocar de rota. Sem Lenis e sem palco WebGL nas internas.

## Desempenho

Medido no build de 2026-11-02: pacote principal ≈ 97,6 kB gzip; chunk da home ≈ 64 kB gzip, incluindo GSAP, ScrollTrigger, DrawSVG e Lenis; Flip ≈ 9,6 kB, carregado só quando o visitante usa o filtro. Vídeo do túnel: 0,41 MB (MP4 1280), 0,27 MB (WebM) e 0,26 MB (MP4 720×900 do celular). Os vídeos de prova usam `preload="none"`.

## Estado de transição e pendências

- **Páginas internas migradas para o kit** (2026-11-08): o CSS editorial antigo (`src/editorial*.css`), as seções `src/components/sections/*` e as páginas provisórias saíram do repositório. Fica só `src/wdm-ct.css`/`src/wdm-ct-standalone.css`, importados pela `WdmCtPage` do build avulso `wdm-ct-main.tsx`, fora do site.
- **Tokens legados**: `src/index.css` mantém as variáveis HSL do shadcn (`--primary` 28 100% 50%, um laranja diferente de `#f87517`) e força Source Sans 3 em `h1`–`h6`. As páginas novas devem usar os tokens de `tokens.css`.
- **Drift a resolver**: `ease.exit` e `ease.scan` estão declarados em `motion.ts` e ainda não são usados; `stagger` passou a ser usado pelo `usePageReveal`.
- **Mídia**: confirmar o direito de uso do vídeo da Esaote fora do site atual e se as fotos de manutenção e laboratório são próprias ou de banco. A foto de `/servicos/contratos` (`public/assets/hexa/Contrato-de-manutencoes-foto-1024x683.webp`, aperto de mãos sobre a prancheta, do acervo do site oficial) tem cara de banco de imagens: confirmar a licença antes de publicar.
- **Teste de 60 fps**: falta definir o notebook de referência.
