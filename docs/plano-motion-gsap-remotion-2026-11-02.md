# Plano de motion — GSAP + vídeo por código gratuito + design próprio

**Status:** proposta para decisão. Nada foi instalado nem implementado.
**Data:** 2026-11-02
**Atualização (2026-11-02):** o Remotion saiu do plano, a pedido do Lucas, por ter licença paga. Em seu lugar entram só ferramentas gratuitas: HyperFrames, com FFmpeg e Revideo de reserva (seção 8). O nome do arquivo foi mantido para não quebrar links.
**Base:**
- [auditoria-visual-reinvencao-2026-11-02.md](auditoria-visual-reinvencao-2026-11-02.md), que traz o conceito "a vida inteira do equipamento";
- [auditoria-impeccable-2026-11-02.md](auditoria-impeccable-2026-11-02.md), com nota 9/20;
- [higgsfield-site-playbook-2026-10-26.md](higgsfield-site-playbook-2026-10-26.md), com as regras de fidelidade de equipamento em vídeo gerado.

**Fora do escopo:** Magnifico Open e Careverse Digital Heart.

---

## 1. Ideia central: o movimento conta a vida do equipamento

O site deve parecer uma operação acontecendo, e não um folheto que se mexe. O movimento só entra quando ajuda a explicar uma de três coisas:

1. **Escala e presença:** o equipamento é grande, caro e físico. A câmera chega perto, o túnel se abre e o objeto ocupa o palco.
2. **Processo:** escolha, projeto da sala, instalação, operação, manutenção e laboratório. O scroll avança o processo, como uma linha do tempo.
3. **Prova:** antes e depois no HexAI, sem carga e com carga no G-scan, a planta da sala em escala. O visitante manipula a prova em vez de só ler.

Todo o resto (hover, foco, abertura de menu, troca de página) é discreto, rápido e consistente.

### Duas formas de assinatura

| Forma | Origem | Uso em movimento |
|---|---|---|
| **O anel** | O túnel (bore) da ressonância | Máscara que se abre (`clip-path: circle()`), indicador de progresso desenhado (DrawSVG), moldura do vídeo de abertura |
| **O hexágono** | O logo Hexamedical | Marcador das etapas do processo e ícones de serviço; no máximo uma metamorfose hexágono → anel (MorphSVG) na transição de "equipamento" para "serviço" |

### Material de movimento: a "varredura"

A ressonância adquire a imagem em cortes. A revelação do site faz o mesmo: uma linha fina e clara atravessa a imagem, e o conteúdo aparece atrás dela, com máscara e não com fade. É a assinatura do site. Aparece em poucos lugares-chave, nunca em todo bloco.

### Regras de ouro

- **Uma cena autoral por página.** O resto fica quieto.
- **O conteúdo é visível sem JavaScript.** A animação parte do estado final e nunca esconde texto por padrão.
- **Movimento reduzido é um projeto à parte, não um "desliga tudo".** Ver a seção 6.
- **Equipamento real nunca é deformado.** Fotos e renders oficiais entram como camada intacta. Vídeo gerado por IA só como atmosfera, conforme o playbook do Higgsfield.

---

## 2. Quem faz o quê: GSAP, HyperFrames e CSS

| Ferramenta | Papel | Onde roda | Exemplos aqui |
|---|---|---|---|
| **GSAP 3.15 + `@gsap/react`** | Movimento interativo e ligado ao scroll, no navegador | Site (React) | Abertura do anel, linha do tempo fixada, comparador, planta desenhada, antes e depois arrastável |
| **HyperFrames** (Apache 2.0, gratuito) | Fábrica de vídeo: transforma HTML, CSS e GSAP em MP4, quadro a quadro, no Chrome sem janela e no FFmpeg | Projeto separado, render local | Vídeo de abertura em loop, vídeos-explicação por produto, cortes para Instagram e LinkedIn, legendas do vídeo do CEO, pôsteres |
| **FFmpeg** (gratuito) | Pós-produção: corte, compressão, AV1/WebM e H.264, pôster | Linha de comando, local | Todos os vídeos antes de entrar no site |
| **CSS e View Transitions** | Estados simples e troca de página | Site | Hover e foco, menu, transição entre lista e página de produto (`viewTransition` do React Router 6.30) |

**Decisão importante:** no site, os vídeos entram **pré-renderizados**, como arquivos `<video>` leves. Nenhum player de vídeo por código roda nas páginas públicas. Ele pesaria mais, competiria com o GSAP pelo scroll e não traria ganho para o visitante.

**Por que vídeo por código e não só editar vídeo:**
- o vídeo é código, então uma atualização de dado em `src/data/solutions.ts` gera de novo todos os vídeos de produto com a mesma identidade;
- os tokens (cores, fontes, curvas de movimento) são os mesmos do site, e a animação GSAP do site pode virar vídeo quase sem reescrever;
- dá para gerar em lote, nos formatos 16:9, 9:16, 1:1 e 4:5, sem retrabalho.

---

## 3. Sistema de motion (tokens)

Fica num arquivo `src/lib/motion.ts` e é espelhado no projeto de vídeo (`hexamedical-video/`).

```ts
export const duration = {
  instant: 0.12,  // feedback de clique e foco
  quick: 0.24,    // hover, troca de estado
  base: 0.45,     // menus, painéis, troca de página
  focal: 0.8,     // a cena autoral da página
} as const;

export const ease = {
  out: "expo.out",                  // chegadas confiantes; equivale a cubic-bezier(0.16, 1, 0.3, 1)
  inOut: "power2.inOut",            // movimentos de câmera e de máscara
  scan: "none",                     // tudo que é "scrub" de scroll fica linear
  exit: "power2.in",                // saídas mais rápidas que entradas
} as const;

export const stagger = { list: 0.06, max: 0.4 } as const; // atraso total limitado a 0,4 s
```

**Proibidos:**
- bounce e elastic;
- "fade-up" em toda seção;
- parallax decorativo sem significado;
- cursor customizado;
- scroll suave que sequestra a rolagem. O Lenis entra na fase 1 só no desktop, nas condições da peça B3 (seção 7.1); nunca muda direção nem velocidade final.

---

## 4. Cenas por página

Cada cena traz: o que o visitante vê, como é feita, a versão para celular, a versão com movimento reduzido e o material necessário.

### Home

**H1 — Abertura do túnel** (cena autoral da home)
- **O que se vê:** o vídeo de abertura roda dentro de um anel no centro do palco grafite. Ao rolar, o anel se expande até ocupar a tela inteira, como se a câmera entrasse no túnel. O título fica fixo e some na metade do caminho.
- **Como:**
  - `ScrollTrigger` com `pin: true` e `scrub: true`;
  - um timeline que anima `clip-path: circle(18% → 75%)` no `<figure>` do vídeo e um leve `scale` (1,08 → 1) no próprio vídeo;
  - título em `SplitText` por linha, só no carregamento e uma única vez, em até 800 ms.
- **Celular:** sem fixar. O anel já começa maior (40%) e abre por `IntersectionObserver` em 0,6 s. O vídeo de abertura é a versão 4:5 de cerca de 1,5 MB.
- **Movimento reduzido:** imagem estática (pôster extraído do vídeo) já em tela cheia, sem scrub. O título aparece com opacidade em 0,2 s.
- **Material:** vídeo de 8 a 12 s de aproximação lenta a uma ressonância real, produzido no HyperFrames a partir de filmagem real, com versões 16:9 e 4:5, mais o pôster.

**H2 — A vida inteira do equipamento** (linha do tempo fixada)
- **O que se vê:** uma seção fixada com seis etapas: Escolha → Projeto da sala → Instalação → Operação (HexAI) → Manutenção → Laboratório. No canto, um anel de progresso (o túnel) é desenhado conforme o scroll, e cada hexágono marca uma etapa. A foto de cada etapa entra com a **varredura**: uma linha clara cruza a imagem e a revela, com `clip-path: inset()` animado e uma `div` de 1 px de brilho que segue a borda.
- **Como:** `ScrollTrigger` com `pin`, `scrub: 0.5` e `snap` para as etapas; `DrawSVG` no anel; `matchMedia` para os pontos de quebra.
- **Celular:** sem fixar. Lista vertical, com o anel pequeno e fixo (`position: sticky`) mostrando a etapa atual. Cada foto faz a varredura uma vez ao entrar.
- **Movimento reduzido:** lista vertical comum, anel estático com a etapa preenchida e troca de foto por opacidade.
- **Material:** seis fotos reais, uma por etapa. Hoje existem as de instalação, manutenção, reparo e contrato. Faltam a da escolha (consultoria, visita) e a do laboratório (bancada).

**H3 — Showroom**
- **O que se vê:** palco grafite com todas as linhas (RM humana, veterinária, HexAI, bombas, Mindray). Filtros "Humano / Veterinário" e "Ressonância / Tomografia / Software". Ao filtrar, os equipamentos se reorganizam suavemente, sem pular.
- **Como:** `Flip.getState()` e `Flip.from()` com `duration.base` e `ease.out`. No hover, uma sombra de "piso" sob o equipamento (`box-shadow` só no hover e só no desktop).
- **Celular:** lista com rolagem horizontal por arrasto nativo (scroll-snap), sem GSAP.
- **Movimento reduzido:** os filtros trocam o conteúdo sem animação de posição.

**H4 — Triagem de contato**
- **O que se vê:** três caminhos, Comprar, Manter e Reparar. Ao passar o mouse ou focar, o hexágono do caminho se transforma no ícone do serviço.
- **Como:** `MorphSVG` em 0,24 s. Funciona igual com teclado (`:focus-visible` dispara o mesmo timeline).
- **Movimento reduzido:** troca direta de ícone.

### Página de ressonância (linha)

**R1 — Comparador por anatomia**
- **O que se vê:** uma silhueta humana em linha fina. O visitante clica em joelho, ombro, coluna, mão ou tornozelo, e os sistemas compatíveis se destacam enquanto os outros recuam.
- **Como:**
  - `DrawSVG` desenha a região escolhida;
  - `Flip` reordena os cards dos sistemas;
  - o estado fica num `<fieldset>` de rádios acessível, e o GSAP só anima a consequência.
- **Dado necessário:** uma tabela anatomia × sistema **confirmada pela ficha da Esaote**. Nada é inventado: se a ficha não confirma, o item não aparece.

**R2 — A sala em escala**
- **O que se vê:** a planta de uma sala é desenhada no scroll: paredes, a área do equipamento e a área de comando. Ao trocar entre S-scan, O-scan e G-scan, a área ocupada muda de tamanho, com as cotas em metros.
- **Como:** SVG da planta, `DrawSVG` com scrub, `Flip` ou `attr` para trocar a área e números com `textContent` interpolado (`snap: 1`).
- **Dado necessário:** dimensões e requisitos mínimos de sala **oficiais** de cada sistema. Sem eles, a cena não vai ao ar.

### Página do G-scan

**G1 — Sem carga × com carga**
- **O que se vê:** o equipamento gira de deitado para em pé conforme o scroll, e ao lado aparece a mesma articulação nas duas condições.
- **Como (escolher uma, conforme o material):**
  - **a)** um vídeo curto renderizado no HyperFrames e recodificado no FFmpeg, com codificação "toda imagem é quadro-chave" (`-g 1`), controlado pelo scroll (`video.currentTime` com `scrub`);
  - **b)** uma sequência de 60 a 90 imagens WebP num `<canvas>` (técnica usada pela Apple), que é mais pesada e mais suave.
- **Celular:** o vídeo toca uma vez ao entrar, sem scrub.
- **Movimento reduzido:** duas fotos lado a lado.
- **Material:** filmagem real da rotação do G-scan, em vídeo oficial da Esaote **com direito de uso** ou filmagem própria em cliente. Imagens clínicas só **anonimizadas e autorizadas**.

### Página do HexAI

**X1 — Antes e depois com varredura**
- **O que se vê:** a mesma imagem antes e depois do HexAI. Uma linha de varredura arrastável divide as duas. Ao entrar na tela, a linha passa sozinha uma vez, devagar, para ensinar o gesto.
- **Como:**
  - `Draggable` limitado ao eixo X, com `clip-path: inset(0 X% 0 0)` na camada "depois";
  - a passada automática é um `gsap.fromTo` de 1,2 s, executado uma única vez;
  - por baixo há um `<input type="range">` de verdade, que dá teclado, leitor de tela e toque.
- **Movimento reduzido:** sem a passada automática; o controle continua funcionando.
- **Material:** pares antes e depois reais, **anonimizados e com autorização** (hoje só existe a `varredura-hexai-1024x576.webp`).

### Serviços

**S1 — Linha do tempo do chamado**
- **O que se vê:** um caminho em SVG percorre seis estados: Chamado aberto → Diagnóstico remoto → Visita técnica → Peça no laboratório → Teste → Equipamento de volta. Um marcador (hexágono) anda pelo caminho no scroll, e cada estado acende ao ser alcançado.
- **Como:** `MotionPathPlugin` no marcador, `DrawSVG` no traço e `ScrollTrigger` com scrub.
- **Celular:** caminho vertical simples e estados que acendem ao entrar.
- **Cuidado:** prazos e números (SLA, horas) só se forem confirmados pela operação.

**S2 — Ensaio do laboratório**
- **O que se vê:** fotos grandes da bancada, de peças e de mãos trabalhando, cada uma revelada pela varredura uma vez, com legenda técnica curta.
- **Material:** depende do dia de foto e vídeo (seção 9).

### Em todo o site

- **Troca de página:** a foto do equipamento na lista "voa" para o topo da página do produto. Usa `viewTransition` do React Router 6.30 com `view-transition-name` no `<img>`, sem GSAP. Onde o navegador não suporta, a troca é normal.
- **Cabeçalho:** some ao rolar para baixo e volta ao rolar para cima (`ScrollTrigger.create({ onUpdate: self => self.direction })`), em 0,24 s.
- **Botões e links:** só cor e sublinhado, em 0,12 a 0,24 s. Nenhum "levanta 2 px" em todo card.

---

## 5. Arquitetura no código do site

```
src/lib/motion.ts           tokens, registro de plugins, matchMedia padrão
src/motion/
  useMotionScope.ts         wrapper do useGSAP com matchMedia (desktop / celular / reduzido)
  ApertureReveal.tsx        anel que abre (H1)
  ScanReveal.tsx            a varredura (H2, S2) — reutilizável
  LifecycleTimeline.tsx     linha do tempo fixada (H2)
  ScanCompare.tsx           antes/depois com range acessível (X1)
  FloorPlan.tsx             planta em escala (R2)
  ScrubVideo.tsx            vídeo controlado pelo scroll (G1)
  VideoLoop.tsx             <video> com pôster, lazy, pausa fora da tela e versão reduzida
  stage/
    StageCanvas.tsx         canvas WebGL fixo da home (B1, B2, B6), com pausa e reserva automática
    ringTunnel.frag         shader do anel e do túnel (fonte única, também usada nos vídeos)
    stageTimeline.ts        mapeia as seções da home para os parâmetros do shader
    capability.ts           detecta aparelho fraco e escolhe imersivo ou leve
  SmoothScroll.tsx          Lenis + ScrollTrigger (B3), só desktop e sem movimento reduzido
  ImageSequence.tsx         sequência em canvas (B4)
  RouteRing.tsx             transição de página pelo anel (B5)
```

O mesmo `ringTunnel.frag` pode ser usado no HyperFrames, por um `<canvas>` WebGL dentro da composição HTML renderizada quadro a quadro. O tempo do shader vem da timeline pausada, e não do relógio. Assim o túnel do vídeo e o do site são idênticos.

**Regras de implementação:**
1. `gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, Flip, DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin, Draggable)` num único lugar. Desde a versão 3.13 todos os plugins são gratuitos, inclusive para uso comercial; a seção 10 traz a confirmação.
2. Sempre `useGSAP(() => {...}, { scope: ref })`, nunca seletor global. A limpeza é automática ao trocar de rota.
3. `gsap.matchMedia()` com três contextos fixos:
   ```ts
   mm.add({
     desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
     mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
     reduced: "(prefers-reduced-motion: reduce)",
   }, (ctx) => { /* cada cena declara as três versões */ });
   ```
4. Cada componente de cena é **carregado só na rota que o usa** (`React.lazy`). O GSAP não entra no pacote inicial da home antes do primeiro desenho.
5. Chamar `ScrollTrigger.refresh()` depois que as imagens com `width` e `height` carregam. As dimensões explícitas, cobradas na auditoria, são pré-requisito para os pontos de scroll não errarem.
6. Vídeos:
   - `muted playsInline loop preload="none"`, com pôster;
   - fonte AV1/WebM, com H.264 de reserva;
   - `IntersectionObserver` para tocar e pausar;
   - botão de pausa visível nos loops com mais de 5 s (WCAG 2.2.2).
7. Fica compatível com o pré-render (SSG) recomendado na auditoria, porque o GSAP só roda no cliente, dentro do `useGSAP`.

**Orçamento de desempenho:**

| Item | Limite |
|---|---|
| GSAP e plugins usados, por rota | ≤ 60 kB gzip, carregados depois do primeiro desenho |
| Vídeo de abertura | ≤ 2,5 MB no desktop e ≤ 1,5 MB no celular (8 a 12 s, sem áudio) |
| Sequência de imagens (se G1-b) | ≤ 3 MB no total, carregada só quando a seção se aproxima |
| CLS | < 0,05 |
| INP | < 200 ms |
| Taxa de quadros | 60 fps no notebook comum; sem quedas visíveis num Android médio |

---

## 6. Movimento reduzido e acessibilidade

| Cena | Movimento completo | Movimento reduzido |
|---|---|---|
| Abertura do túnel | Anel abre com scroll e vídeo em loop | Pôster estático em tela cheia, sem loop |
| Linha do tempo | Seção fixada com scrub | Lista vertical, anel estático |
| Varredura | Linha cruza a imagem | Opacidade em 0,2 s |
| Showroom | Reorganização com Flip | Troca direta |
| Comparador e planta | Desenho com scrub | Desenho completo já visível |
| Antes e depois | Passada automática e arraste | Só o controle |
| Troca de página | Imagem "voa" | Troca direta |

Também valem estas regras:
- nenhum texto depende da animação para existir;
- tudo é operável por teclado;
- nada pisca mais de três vezes por segundo;
- os vídeos têm pausa.

---

## 7. Abordagens consideradas

| | **A. Uma cena autoral por página** (recomendada) | **B. Imersão contínua** | **C. Vídeo primeiro** |
|---|---|---|---|
| O que é | GSAP em uma cena forte por página e micro-movimento discreto no resto; fábrica de vídeos pré-renderizados (hoje HyperFrames) | Lenis (scroll suave) em todo o site, sequências de imagens e WebGL (shader do anel em three.js) em várias seções | Quase tudo em vídeo, com player de vídeo por código em algumas seções e pouco GSAP |
| Impacto visual | Alto e focado | Muito alto | Médio, porque o visitante assiste e não manipula |
| Peso e desempenho | Leve | Pesado: modelos 3D e sequências de imagens | Médio a alto, pelos vídeos |
| Acessibilidade | Fácil de cumprir | Difícil: o scroll suave atrapalha teclado e leitor de tela | Média |
| Material necessário | Fotos e vídeos reais e dados confirmados | Modelos 3D dos equipamentos, que **não temos** | Muita filmagem |
| Risco para o público (decisores, PCs de hospital) | Baixo | Alto | Médio |
| Custo | Médio | Alto | Médio a alto |

**Escolhida por Lucas em 2026-11-02: a mistura de A e B ("A+B").** A recomendação original era só A.

### 7.1 Como fica a abordagem A+B

**De A ficam:**
- a cena autoral por página;
- a verdade dos dados;
- o conteúdo visível sem JavaScript;
- os vídeos pré-renderizados;
- a acessibilidade completa.

**De B entra a imersão, com seis peças:**

| # | Peça de imersão | O que o visitante sente | Como, sem modelo 3D | Limites |
|---|---|---|---|---|
| B1 | **O palco contínuo** | Um único objeto, o anel do túnel, atravessa a home inteira e muda de papel em cada seção, sem "cortes" entre blocos | Um `<canvas>` WebGL fixo atrás do conteúdo (`position: fixed`, `pointer-events: none`). Um shader desenha o anel com luz e campo; uma timeline do ScrollTrigger mapeia cada seção para os parâmetros do shader (raio, brilho, número de anéis, cor) | Só na home. O conteúdo continua em HTML por cima |
| B2 | **Entrar no túnel** | No topo da home, a câmera atravessa anéis de luz até "entrar" na ressonância, e o vídeo real aparece dentro da abertura | Shader de túnel procedural: anéis concêntricos em perspectiva e linhas de campo magnético, com o tempo ligado ao scroll. Sem three.js; um fragment shader próprio de poucos kB | Substitui a versão em `clip-path` da H1, que vira a alternativa de reserva |
| B3 | **Scroll suave** | Rolagem macia e "pesada", de produto premium | Lenis 1.3, com `lerp` suave, integrado ao ScrollTrigger e com `respectReducedMotion: true` | No toque usa a rolagem nativa (`syncTouch: false`). Nunca muda direção nem velocidade final. Âncoras, teclado e busca do navegador funcionam. Desliga com movimento reduzido |
| B4 | **Equipamento que gira com o scroll** | G-scan girando de deitado para em pé; vista "explodida" de magneto, bobinas e mesa | Sequência de imagens em `<canvas>` (técnica Apple) ou vídeo com scrub, a partir de filmagem real ou de renders oficiais | Só onde o material existir; carrega só perto da seção |
| B5 | **Transição entre páginas pelo anel** | Ao trocar de página, um anel se fecha e se abre, como o túnel | `clip-path: circle()` com GSAP na troca de rota, em ≤ 500 ms; a foto do produto continua "voando" com View Transitions | Desliga com movimento reduzido |
| B6 | **Luz que reage ao cursor** | No palco grafite, a luz do anel acompanha o mouse de leve | Parâmetro do mesmo shader do B1 | Só no desktop com mouse |

**Reserva automática para o modo A:** o site detecta aparelho fraco (`prefers-reduced-motion`, `Save-Data`, WebGL indisponível, menos de 4 núcleos, ou queda de quadros medida nos primeiros 2 s). Nesse caso troca o palco WebGL pela versão leve em CSS e `clip-path`. O visitante nunca fica com tela vazia nem travada.

**No celular:** sem canvas fixo. O túnel vira o vídeo de abertura (HyperFrames) com a máscara do anel, e o resto segue a versão celular de cada cena (seção 4).

**Fica de fora de B:** o scroll suave no celular, o sequestro de direção e as cenas 3D que dependem de modelos que não temos. A seção 12 traz a decisão sobre o 3D.

**Orçamento extra da imersão:**

| Item | Limite |
|---|---|
| Shader e código WebGL | ≤ 15 kB gzip, sem three.js |
| Lenis | cerca de 5 kB gzip |
| GPU | O palco renderiza em no máximo 1,5× a densidade da tela, pausa quando a aba está oculta ou o palco sai de vista, e mantém 60 fps num notebook com vídeo integrado |

---

## 8. Fábrica de vídeos gratuita

O Remotion foi descartado pelo Lucas em 2026-11-02, porque exigiria licença paga (mínimo de US$ 100 por mês). Pesquisei alternativas gratuitas para uso comercial:

| Ferramenta | Licença | Como funciona | Encaixe aqui |
|---|---|---|---|
| **[HyperFrames](https://github.com/heygen-com/hyperframes)** (HeyGen) | Apache 2.0. Uso comercial em qualquer escala, sem taxa por render, sem limite de pessoas | A composição é uma página HTML com CSS e GSAP. O renderizador pausa a timeline, avança quadro a quadro num Chrome sem janela e monta o MP4 com FFmpeg (`npx hyperframes render`). Requer Node 22+ e FFmpeg | **Escolhido.** Usa a mesma linguagem do site (GSAP, tokens CSS, o shader WebGL), então animações do site viram vídeo quase sem reescrever. A skill `hyperframes` já está instalada, e esta máquina já tem Node 24 e FFmpeg 9 |
| **[Revideo](https://github.com/redotvideo/revideo)** | MIT | Cenas em TypeScript (derivado do Motion Canvas), com render sem interface (`renderVideo()`) e `<Player>` React | **Reserva**, se o HyperFrames falhar. Ativo (versão 0.11.0 em julho de 2026), mas exige reescrever as animações numa API própria |
| **[Motion Canvas](https://github.com/motion-canvas/motion-canvas)** | MIT | Editor com prévia ao vivo; cenas em TypeScript | Bom para explicações técnicas feitas à mão; menos adequado para lote |
| **FFmpeg** | LGPL/GPL, uso livre | Corte, compressão, AV1/WebM e H.264, `-g 1` para scrub, extração do pôster | Pós-produção de todos os vídeos |
| **faster-whisper** | MIT | Transcrição local | Legendas do `DepoimentoCEO` |
| **Blender** | GPL; o que se renderiza nele é livre | 3D e vista explodida | Só se houver modelos 3D (seção 12) |
| **DaVinci Resolve (versão gratuita) ou Kdenlive (GPL)** | Gratuitos | Edição manual | Corte da filmagem bruta antes de ela entrar nas composições |

**Cuidados com o HyperFrames:**
- é mais novo que o Remotion, com menos exemplos e tutoriais;
- a composição precisa seguir três regras: timeline pausada, nada de relógio real (`Date.now`, `performance.now`) e aleatoriedade com semente fixa. Quebrar uma regra **falha em silêncio**, então todo vídeo é conferido quadro a quadro antes de ir ao ar;
- o repositório ainda não publica versões numeradas na página de releases, então a versão fica travada no `package.json` com lockfile;
- o render fica local. Render na nuvem (AWS Lambda, Cloud Run ou a nuvem da HeyGen) não entra, porque geraria custo.

**Projeto separado:** `hexamedical-video/` ao lado do site. Ele importa os mesmos tokens (`motion.ts` e as cores) e lê os mesmos dados (`src/data/*.ts`).

| Composição | Formatos | Duração | Uso |
|---|---|---|---|
| `HeroLoop` | 16:9, 4:5 e pôster | 8 a 12 s | Abertura da home (H1) |
| `ProdutoExplainer` | 16:9, 9:16 e 1:1 | 20 a 40 s | Página de cada produto e redes. **Gerado a partir de `solutions.ts`**: nome, tese, dados com fonte, CTA |
| `ChamadoTimeline` | 16:9 e 9:16 | 15 a 25 s | Serviços e redes; anima os mesmos seis estados da cena S1 |
| `GscanCarga` | 16:9, codificado para scrub | 4 a 6 s | Cena G1-a |
| `DepoimentoCEO` | 16:9 e 9:16 com legenda | variável | Vídeo do Fábio já existente, com legendas geradas localmente (faster-whisper, conforme a skill) e revisadas |
| `CorteSocial` | 9:16 e 4:5 | 6 a 15 s | Cortes automáticos por produto e serviço |

**Linguagem visual dos vídeos:** a mesma do site. Palco grafite, um laranja, o anel como moldura, a varredura como transição, a tipografia do site e as curvas `expo.out`. Nada de transições prontas de editor (zoom, giro, brilho).

**Fluxo:**
1. cada composição é um HTML com GSAP em `hexamedical-video/compositions/`, com prévia no navegador;
2. o `ProdutoExplainer` e os cortes sociais são gerados por um script Node que lê `src/data/solutions.ts` e preenche um modelo HTML por produto e formato. O HyperFrames não documenta templates por dados, então essa camada é nossa e pequena;
3. renderizar localmente (`npx hyperframes render`);
4. no FFmpeg, gerar AV1/WebM e H.264 e extrair o pôster de um quadro escolhido;
5. publicar os arquivos em `public/media/`. A Vercel Blob ou uma CDN própria só entra com autorização, por gerar custo.

**Custo de licença:** zero. Todas as ferramentas desta seção são gratuitas para uso comercial.

**Higgsfield:** só para atmosfera (luz, ambiente, partículas), conforme o playbook. O equipamento entra como camada real intacta.

---

## 9. O que precisamos produzir (material)

Sem isso, as cenas viram ilustração genérica. É a mesma conclusão da auditoria visual.

**Dia de foto e vídeo, com os planos já pensados para as animações:**
- aproximação lenta e estável até o túnel de uma ressonância (H1), em 4K, câmera em slider ou gimbal, 10 a 20 s, com luz controlada;
- uma foto ou vídeo por etapa da vida do equipamento (H2): consultoria, projeto, guindaste e instalação, operação, técnico em campo e bancada do laboratório;
- mãos e peças no laboratório, em macro (S2);
- rotação do G-scan, se houver acesso a um cliente (G1);
- fundos limpos para recorte dos equipamentos (showroom H3).

**Dados confirmados:**
- dimensões e requisitos de sala de S-scan, O-scan e G-scan (R2);
- tabela anatomia × sistema da Esaote (R1);
- pares antes e depois do HexAI **anonimizados e autorizados** (X1).

**Direitos:** uso dos vídeos oficiais Esaote e WDM, se forem usados.

---

## 10. Referências visuais e técnicas

Pesquisa feita em 2026-11-02. O WebFetch lê só texto, então os efeitos descritos vêm de Awwwards, cases das agências ou artigos técnicos. ⚠ marca o que não foi conferido ao vivo.

### Narrativa de produto no scroll (hardware e medtech)

| Referência | O que faz | O que aproveitar | Onde entra |
|---|---|---|---|
| [Keikku, estetoscópio digital](https://keikku.madebyburo.com/) ([Awwwards SOTD, 13/12/2024](https://www.awwwards.com/sites/keikku-next-gen-stethoscope)) | Um aparelho como herói; os estados do LED acendem conforme o scroll | O caso medtech mais próximo: o equipamento como protagonista e seus estados como micro-história | H1, H2 |
| [Apple Vision Pro, análise técnica](https://css-tricks.com/recreating-apples-vision-pro-animation-in-css/) | Vista explodida, seguida de vídeo controlado pelo scroll | Vista explodida de magneto, bobinas e mesa, ligando "operação" a "manutenção" | G1 e uma cena futura de laboratório |
| [Apple AirPods Pro](https://www.apple.com/airpods-pro/) ([técnica explicada](https://css-tricks.com/lets-make-one-of-those-fancy-scrolling-animations-used-on-apple-product-pages/)) | Sequência de imagens em `<canvas>` guiada pelo scroll | A técnica do G1-b, com atenção ao peso ⚠ (não sei se a página atual ainda usa) | G1 |
| [Serve Robotics](https://www.serverobotics.com/) ([Awwwards SOTD, 11/06/2026](https://www.awwwards.com/sites/serve-robotics)) | Introdução no hero, 3D e microinterações que humanizam a robótica; stack React + Tailwind | Mesma stack que a nossa; tom de "tecnologia complexa que passa confiança" ⚠ | Tom geral |
| [Elecctro, case da Lynksen](https://blog.spline.design/how-lynksen-brought-a-complex-b2b-platform-to-life-with-spline) | Hardware B2B como espaço a percorrer (Spline + GSAP), premiado pelo GSAP | Referência para uma futura fase 3D, se tivermos os modelos ⚠ | Abordagem B (futuro) |
| [Hyperfine Swoop](https://www.hyperfinemri.com/) | Concorrente em RM; seção "From Set Up to Scan" | Referência de conteúdo: contam da instalação ao exame. Nós contamos a vida inteira | H2 |

### Anel, abertura e varredura

| Referência | O que faz | O que aproveitar | Onde entra |
|---|---|---|---|
| [GSAP Circle Mask](https://webflow.com/made-in-webflow/website/gsap-circle-mask) | A seção fica fixa e uma abertura circular cresce com o scroll, revelando o conteúdo | É exatamente a mecânica da abertura do túnel | H1 |
| [AIRS Medical, SwiftMR](https://www.airsmed.com/) | Pares antes e depois de reconstrução de RM por IA | Benchmark direto do HexAI. Fazer melhor: linha de varredura arrastável e acessível ⚠ | X1 |
| [Liron Moran, efeito "raio-x" no hover](https://www.awwwards.com/inspiration/liron-moran-interiors-design-invert-color-image-hover-effect) | O cursor vira uma lente que mostra outra camada | Possível variação do X1 no desktop, como lente do HexAI ⚠ | X1 (opcional) |

### Processo e linha do tempo

| Referência | O que faz | O que aproveitar | Onde entra |
|---|---|---|---|
| [NRG, Build Your Data Center](https://business.nrg.com/campaigns/build-your-data-center/) ([Awwwards](https://www.awwwards.com/inspiration/homepage-nrg-build-your-data-center)) | Cinco fases no scroll, do terreno até a operação | Quase o nosso conceito de vida inteira do equipamento, contado em fases | H2, S1 |
| [Hydro-Québec, Mission 2035](https://mission2035.hydroquebec.com/en) ([Awwwards](https://www.awwwards.com/inspiration/scroll-hydro-quebec-mission-2035)) | Narrativa institucional de energia em scroll, com motion contido | O tom: sério, institucional, sem exagero ⚠ | Ritmo geral |

### Vídeo por código gratuito

- [HyperFrames no GitHub](https://github.com/heygen-com/hyperframes): licença Apache 2.0, requisitos e o comando de render.
- [HyperFrames × Remotion](https://hyperframes.heygen.com/guides/hyperframes-vs-remotion), comparação do próprio projeto. Mostra o render com GSAP pausado e as limitações: menos maduro, regras de determinismo que falham em silêncio.
- [Revideo](https://github.com/redotvideo/revideo) (MIT) e [Motion Canvas](https://github.com/motion-canvas/motion-canvas) (MIT) são as reservas.
- A ideia do `ProdutoExplainer` gerado a partir de dados continua: texto e dados viram vídeo de produto em lote, como fazem as ferramentas do tipo Typeframes.

### GSAP

- **Licença:** 100% gratuito desde a versão 3.13, inclusive para uso comercial e com todos os plugins (SplitText, MorphSVG e os demais). Fontes: [anúncio da 3.13](https://gsap.com/blog/3-13/) e a [licença padrão](https://gsap.com/community/standard-license/). A licença só proíbe ferramentas visuais concorrentes do Webflow, o que não nos afeta.
- **React:** [guia oficial](https://gsap.com/resources/React/). Usar `useGSAP` com `scope`, reversão automática e compatibilidade com o StrictMode do React 18.
- **Acessibilidade:**
  - o [guia de a11y](https://www.gsap.com/resources/a11y/) e o [`gsap.matchMedia()`](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()) sugerem também um botão no site para reduzir movimento, com `gsap.matchMediaRefresh()`. **Proposta: incluir esse botão no rodapé;**
  - o SplitText 3.13+ aplica `aria-label` e `aria-hidden` sozinho, mas quebra links dentro do texto, então não usar em títulos com links.
- **Lenis:** é [compatível com o ScrollTrigger](https://github.com/darkroomengineering/lenis) e respeita movimento reduzido. Com a escolha A+B, entra na fase 1 só no desktop (peça B3). Todo ScrollTrigger é integrado e testado com ele desde o início, e nunca muda a direção da rolagem (anti-referência 1).
- **[Showcase do GSAP](https://www.gsap.com/showcase/):** hoje é dominado por portfólios; não há caso industrial.

### Anti-referências: o que não fazer

1. **Scrolljacking.** O [NN/g](https://www.nngroup.com/articles/scrolljacking-101/) mostra que mudar a velocidade ou a direção da rolagem desorienta, sobretudo quando o texto muda ao mesmo tempo. Seções fixadas curtas são toleradas quando revelam conteúdo. Por isso H2 e S1 têm `snap` em etapas e duração limitada, e o celular não fixa nada.
2. **Fade-up em tudo.** O [NN/g](https://www.nngroup.com/articles/scroll-fading-101/) mostra que fades acima de cerca de 500 ms fazem o usuário pular conteúdo e criam a "ilusão de que a página acabou". Por isso a regra de uma cena autoral por página, com o resto em 100 a 400 ms, executado uma vez.
3. **Sequências de imagens pesadas.** No 4G brasileiro, preferir vídeo curto renderizado ou poucos quadros em AVIF/WebP, sempre com pôster.
4. **SplitText letra por letra em todo título.** Cansa e atrapalha leitores de tela. Fica restrito ao título da home, por linha.
5. **Imagem clínica real sem anonimização.** No HexAI, usar phantom ou imagem anonimizada e autorizada.

**Não encontrei** nenhum site premiado específico de ressonância ou radiologia com motion forte. É uma oportunidade de diferenciação para a Hexamedical.

---

## 11. Ordem de execução sugerida

| Fase | Entrega | Depende de | Critério de pronto |
|---|---|---|---|
| 0 | Fundação: tokens de cor, tipografia e movimento; correções P1 da auditoria; `motion.ts`; `VideoLoop` e `ScanReveal` | Aprovação da direção | Auditoria impeccable ≥ 14/20; detector sem achados de molde |
| 1 | Home: H1 abertura do túnel (com pôster provisório), H2 linha do tempo, H3 showroom, H4 triagem, mais a imersão: palco WebGL contínuo (B1, B2, B6), scroll suave (B3) e reserva automática | Fase 0; fotos de etapa (provisórias do acervo) | 60 fps num notebook com vídeo integrado; a reserva leve funciona sem WebGL; versão reduzida revisada; CLS < 0,05 |
| 1b | Transição de página pelo anel (B5) | Fase 1 | ≤ 500 ms; teclado e voltar do navegador funcionam |
| 2 | Produtos: R1 comparador, R2 planta, X1 HexAI, G1 G-scan | Dados confirmados e pares HexAI | Nenhum dado sem fonte; controles acessíveis por teclado |
| 3 | Serviços: S1 chamado, S2 laboratório | Fotos do laboratório | Prazos só confirmados |
| 4 | Vídeo (HyperFrames + FFmpeg): projeto, `HeroLoop` final, `ProdutoExplainer` em lote, cortes sociais | Dia de filmagem | Vídeos dentro do orçamento de peso e aprovados quadro a quadro |
| 5 | Troca de página com View Transitions, polimento e nova auditoria | Fases 1 a 3 | Auditoria ≥ 17/20 |

**Antes da fase 1 completa:** um protótipo descartável só do palco (túnel + anel contínuo) para validar visual e desempenho. Se não atingir 60 fps no notebook de referência, a imersão é reduzida antes de seguir.

Cada fase termina com captura em desktop e celular, teste de movimento reduzido e teclado, Lighthouse, e revisão sua antes de seguir. Publicação em produção só com autorização explícita.

---

## 12. Decisões em aberto

| Decisão | Por que importa | Opções |
|---|---|---|
| **3D real dos equipamentos** | É o que mais muda a imersão: com modelos, o visitante gira a ressonância, vê a vista explodida e entra na sala | a) Sem 3D: a imersão vem do palco procedural, de vídeo e de sequências de imagens. b) Pedir os arquivos 3D ou CAD à Esaote e à WDM. c) Contratar a modelagem, o que é gasto novo |
| **Dia de foto e vídeo** | Sem filmagem real, o túnel, as etapas e o laboratório usam material provisório | Data e local (sede e uma instalação em cliente) |
| **Notebook de referência** | Define o limite de desempenho da imersão | Sugestão: o computador mais comum na equipe comercial ou num cliente típico |

## 13. Escolhas feitas pelo Claude (revisar)

Decisões que um construtor precisaria e que eu tomei. Cada uma pode ser corrigida.

1. **Pré-render:** o site continua em Vite + React Router 6.30, com pré-render por rota via `vite-react-ssg` na fase 0. Sem migração para Astro ou Next, o que preserva o `viewTransition`, o `React.lazy` por rota e o canvas da home.
2. **Home escura:** a home inteira fica no palco grafite, para o anel atravessar sem cortes. As páginas internas continuam claras, com palcos escuros só nos heróis de produto. Isso **substitui** a regra "base branca ou cinza-claro" do DESIGN.md atual, que será reescrito na fase 0. O texto sobre o palco segue o contraste AA.
3. **Vídeo:** a fase 1 usa trechos do acervo existente, cortados no FFmpeg, ou só o pôster. O HyperFrames entra na fase 4, mas é testado antes, junto com o protótipo do palco: renderizar o túnel do shader num vídeo de 5 s e conferir quadro a quadro. Se falhar, a reserva é o Revideo. Se os dois falharem, os vídeos são editados no DaVinci Resolve ou no Kdenlive, sem geração a partir dos dados. Nenhum caminho tem custo de licença.
4. **Magnifico Open:** entra no showroom (H3) como card com link para a página dela, que continua isolada e sem o novo template. Entra no comparador (R1) e na planta (R2) só com os dados da ficha oficial.
5. **Cenas sem dados confirmados** (R1, R2, X1, G1 e as fotos de escolha e laboratório do H2): o componente é construído, mas fica desligado por uma chave por cena até os dados chegarem. Na prévia, a seção aparece numa versão estática honesta, sem números nem imagens inventados.
6. **3D:** até haver decisão, vale a opção "sem 3D".
