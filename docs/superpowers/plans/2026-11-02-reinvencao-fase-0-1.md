# Reinvenção — Fase 0 (fundação) e Fase 1 (home imersiva) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Trocar a home da prévia por uma home imersiva no palco grafite (anel e túnel em WebGL, linha do tempo da vida do equipamento, showroom, prova em vídeo e contato por triagem). Também assentar a fundação de tokens, fontes e motion que as outras páginas vão herdar.

**Architecture:**
- Tokens CSS únicos em `src/styles/tokens.css`. Motion com GSAP 3 (`@gsap/react`) e Lenis só no desktop.
- Um canvas WebGL fixo e procedural, sem three.js, desenha o anel e o túnel atrás do conteúdo HTML da home.
- Uma camada de capacidade decide entre os modos "imersivo" e "leve". Todo o conteúdo existe em HTML sem JavaScript, e a animação parte do estado visível.

**Tech Stack:** Vite 5, React 18, TypeScript, Tailwind 3 (só utilitários existentes), GSAP 3.13+ com plugins gratuitos, Lenis 1.3, WebGL1, Vitest e Testing Library, FFmpeg 9 (local) e Pillow (derivação de imagens).

**Spec:** [docs/plano-motion-gsap-remotion-2026-11-02.md](../../plano-motion-gsap-remotion-2026-11-02.md). Seções 1–7.1 e 13. Direção A+B escolhida por Lucas.

## Global Constraints

- **Material:** só material já existente no site oficial (`hexamedical.com.br`) e no acervo local. Nada de 3D, filmagem nova ou imagem gerada representando equipamento (instrução do Lucas, 2026-11-02).
- **Fontes dos vídeos:**
  - `10213-web.mp4`: promo Magnifico Open da Esaote, com textos em inglês queimados em alguns trechos;
  - `V3-1920-x-1080-Horizontal-1.mp4`: CEO;
  - `Hexamedical-Video-site-2.mp4`: depoimentos em feira, vertical dentro de 16:9.
- **Dados:** nenhum número, cliente, prazo ou claim que não esteja em `src/data/*.ts` ou no site oficial.
- **Fora do escopo:** Magnifico Open e Careverse. A Magnifico entra só como card com link para a página dela.
- **Cor:** um único laranja `#f87517`. Texto laranja sobre fundo claro usa `--orange-ink` com AA. Botão laranja tem texto grafite, nunca branco.
- **Proibido:**
  - eyebrow ou kicker acima de título;
  - numeração 01/02/03 decorativa;
  - bounce ou elastic;
  - fade-up em todo bloco;
  - cursor customizado;
  - mudar direção ou velocidade final do scroll.
- **Movimento reduzido:** cada cena tem versão própria (tabela da seção 6 da spec). Lenis desliga.
- **Orçamento:**
  - GSAP e plugins por rota ≤ 60 kB gzip;
  - shader e código WebGL ≤ 15 kB gzip;
  - vídeo de abertura ≤ 2,5 MB no desktop e ≤ 1,5 MB no celular;
  - CLS < 0,05.
- **Palco:**
  - DPR ≤ 1,5;
  - pausa com aba oculta ou palco fora de vista;
  - sem canvas fixo abaixo de 1024 px;
  - modo leve automático com: reduced-motion, Save-Data, sem WebGL, menos de 4 núcleos, ou média de quadros abaixo de 45 fps nos primeiros 2 s.
- **Prévia local apenas.** Sem deploy, sem push, sem Supabase.

## Review Focus

1. **Visitante sem WebGL ou com aparelho fraco:** a home precisa ficar completa no modo leve, sem área preta vazia. Teste em `stage.test.tsx`.
2. **Teclado e leitor de tela:**
   - o canvas fica `aria-hidden`;
   - o conteúdo da linha do tempo está todo no DOM;
   - os filtros do showroom são botões com `aria-pressed`.
   Testes em `home.test.tsx`.
3. **Movimento reduzido:** nada fica com opacidade 0 ou `clip-path` fechado quando o GSAP não roda. Teste em `home.test.tsx`, renderizando sem animação.
4. **Links do showroom e da triagem:** todo `href` interno corresponde a uma rota do `App.tsx` e toda imagem existe em `public/`. Teste em `home-data.test.ts`.
5. **Celular a 390 px:** sem overflow horizontal e alvos de toque ≥ 44 px. Verificação no navegador (Task 8).

---

### Task 1: Fundação — dependências, fontes, tokens e correções P1 globais

**Files:**
- Modify: `package.json` (deps `gsap`, `@gsap/react`, `lenis`, `@fontsource-variable/archivo`, `@fontsource-variable/source-sans-3`)
- Create: `src/styles/tokens.css`; `src/lib/motion.ts`
- Modify: `src/main.tsx` (importa fontes e tokens primeiro)
- Modify: `index.html` (remove Google Fonts e ADLaM; título e descrição da home)
- Modify: `src/index.css:1` (remove o `@import` do Google Fonts; foco e seleção usam tokens)
- Modify: `src/components/layout/Layout.tsx` (skip link para `#conteudo`; `<main id="conteudo" tabIndex={-1}>`)
- Modify: `src/App.tsx` (remove o `<Toaster />` do shadcn e mantém o Sonner, que o `ContactForm` usa)
- Modify: `src/pages/NotFound.tsx` (pt-BR, com links para home e soluções)
- Create: `public/assets/brand/hexamedical-logo.webp` e `public/assets/brand/hexamedical-logo-light.webp` (derivados do logo oficial, 480 px de largura)
- Test: `src/test/foundation.test.tsx`

**Interfaces:**
- **Produz `src/lib/motion.ts`:**
  - `duration = { instant: 0.12, quick: 0.24, base: 0.45, focal: 0.8 } as const`
  - `ease = { out: "expo.out", inOut: "power2.inOut", scan: "none", exit: "power2.in" } as const`
  - `stagger = { list: 0.06, max: 0.4 } as const`
  - `MEDIA = { desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)", mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)" } as const`
  - `registerMotion(): void`: idempotente; registra `useGSAP`, `ScrollTrigger`, `SplitText`, `Flip`, `DrawSVGPlugin`, `MorphSVGPlugin`.
- **Produz os tokens CSS:**
  - cores: `--graphite-950`, `--graphite-900`, `--graphite-800`, `--graphite-700`, `--mineral-50`, `--white`, `--ink`, `--ink-2`, `--on-dark`, `--on-dark-2`, `--orange`, `--orange-ink`, `--scan`;
  - tipo: `--font-display`, `--font-body`, `--step--1` a `--step-5`;
  - espaço: `--space-1` a `--space-9`;
  - `--radius-sm`, `--radius-md`;
  - movimento: `--dur-quick`, `--dur-base`, `--ease-out`.

- [ ] Step 1: Write the failing tests in `src/test/foundation.test.tsx`:
  - `motion tokens match spec`: `expect(duration).toEqual({ instant: 0.12, quick: 0.24, base: 0.45, focal: 0.8 })` and `expect(ease.out).toBe("expo.out")`;
  - `layout renders a skip link to #conteudo`: `getByRole("link", { name: "Pular para o conteúdo" })` has `href="#conteudo"`, and `main` has `id="conteudo"`;
  - `NotFound speaks Portuguese`: `getByRole("heading", { level: 1, name: /página não encontrada/i })` and a link `/`.
- [ ] Step 2: Run `npx vitest run src/test/foundation.test.tsx`. Expected: FAIL.
- [ ] Step 3: Install the deps. Write tokens, motion, layout, NotFound, the font imports and the logo derivatives (Pillow: resize to 480 px wide, WebP q90; the light version recolors the dark lettering to `#eef0ee` and keeps the orange mark).
- [ ] Step 4: Run `npx vitest run`. Expected: all pass, including the old tests.
- [ ] Step 5: Commit `feat(fundacao): tokens, fontes próprias, motion base e correções globais`.

### Task 2: Mídia da home a partir do acervo oficial

**Files:**
- Create: `scripts/build-home-media.sh` (FFmpeg + Pillow; lê `media-src/oficial/` e `public/assets/`, escreve `public/media/home/`)
- Create: `src/data/homeMedia.ts`
- Test: `src/test/home-data.test.ts` (parte de mídia)

**Interfaces:**
- **Produz:**
  - `type MediaImage = { src: string; width: number; height: number; alt: string }`
  - `type MediaVideo = { mp4: string; webm?: string; poster: string; width: number; height: number; label: string }`
  - `homeMedia: { tunnel: { desktop: MediaVideo; mobile: MediaVideo }; ceo: MediaVideo; testimonials: MediaVideo; stages: Record<StageId, MediaImage> }`
  - `type StageId = "escolha" | "projeto" | "instalacao" | "operacao" | "manutencao" | "laboratorio"`
- **Cortes:**
  - **túnel:** trecho sem texto queimado do `10213-web.mp4`, 6 a 8 s, sem áudio, em loop. Desktop 1280×720 com H.264 CRF ~30 e WebM VP9, ≤ 2,5 MB. Celular 720×900 (4:5), ≤ 1,5 MB;
  - **CEO:** vídeo inteiro, 1280×720, H.264 CRF 27, AAC 96k, com `-movflags +faststart`;
  - **depoimentos:** recorte vertical central de `Hexamedical-Video-site-2.mp4` em 540×960, com áudio;
  - **pôsteres:** WebP q82.
- **Fotos das etapas:** WebP em 1200 px de largura máxima, com `width` e `height` reais:
  - escolha → `Foto-Solucao-ideal-com-baixo-risco.png`;
  - projeto → `estrutura-1.png`;
  - instalação → `Desinstalacao-e-Instalacao.webp`;
  - operação → `varredura-hexai.png` (oficial);
  - manutenção → `Imagem-manutencao.png` (oficial);
  - laboratório → `Reparo-de-Pecas-e-Eletronicas-foto.webp`.

- [ ] Step 1: Write the failing test `every home media file exists with the declared size`. For each entry, `fs.existsSync(path.join("public", src))` holds. Images are measured by reading the WebP header (helper `readWebpSize` in the test) and must equal `width` and `height`. Video budgets are asserted with `fs.statSync().size`: tunnel desktop ≤ 2_500_000, tunnel mobile ≤ 1_500_000.
- [ ] Step 2: Run it. Expected: FAIL (files missing).
- [ ] Step 3: Write and run the script. Write `homeMedia.ts` with the measured values.
- [ ] Step 4: Run the test. Expected: PASS.
- [ ] Step 5: Commit `feat(midia): cortes e derivados da home a partir do acervo oficial`.

### Task 3: Capacidade, scroll suave e escopo de motion

**Files:**
- Create: `src/motion/capability.ts`; `src/motion/SmoothScroll.tsx`; `src/motion/useMotionScope.ts`
- Test: `src/test/capability.test.ts`

**Interfaces:**
- **Produz:**
  - `type StageMode = "immersive" | "light"`
  - `decideStageMode(input: { reducedMotion: boolean; saveData: boolean; webgl: boolean; cores: number | undefined; viewportWidth: number }): StageMode`: retorna `"light"` se qualquer condição da spec valer; `cores` indefinido conta como suficiente.
  - `detectStageMode(): StageMode`: lê o navegador.
  - `FPS_FLOOR = 45`
  - `<SmoothScroll enabled: boolean />`: Lenis 1.3 com `lerp: 0.1`, `syncTouch: false` e `respectReducedMotion` implícito pelo próprio `enabled`, integrado via `lenis.on("scroll", ScrollTrigger.update)` e `gsap.ticker`.
  - `useMotionScope(ref, setup: (ctx: { desktop: boolean; mobile: boolean; reduced: boolean }) => void, deps?)`: wrapper de `useGSAP` com `gsap.matchMedia(MEDIA)`.

- [ ] Step 1: Write the failing table test `decideStageMode` with these rows (all other fields healthy):
  - `reducedMotion: true` → light;
  - `saveData: true` → light;
  - `webgl: false` → light;
  - `cores: 2` → light;
  - `viewportWidth: 800` → light;
  - all healthy with `cores: 8` and `viewportWidth: 1440` → immersive;
  - `cores: undefined` → immersive.
- [ ] Step 2: Run it. Expected: FAIL.
- [ ] Step 3: Implement.
- [ ] Step 4: Run it. Expected: PASS.
- [ ] Step 5: Commit `feat(motion): decisão de capacidade, Lenis no desktop e escopo matchMedia`.

### Task 4: Palco WebGL (anel, túnel e luz do cursor)

**Files:**
- Create:
  - `src/motion/stage/ringTunnel.frag.ts` (fonte GLSL como string exportada);
  - `src/motion/stage/gl.ts` (compila programa e quad de tela cheia);
  - `src/motion/stage/StageCanvas.tsx`;
  - `src/motion/stage/stageState.ts`.
- Test: `src/test/stage.test.tsx`

**Interfaces:**
- **Produz:**
  - `type StageParams = { progress: number; aperture: number; rings: number; glow: number; tint: [number, number, number]; pointer: [number, number] }`
  - `stageState: { params: StageParams; set(partial: Partial<StageParams>): void }`: objeto mutável lido a cada quadro, sem re-render React.
  - `<StageCanvas mode: StageMode />`: em `"immersive"`, renderiza um `<canvas aria-hidden="true" class="stage-canvas">` fixo. Em `"light"`, renderiza `<div class="stage-fallback" aria-hidden="true">` com anéis em SVG estático.
  - `measureFps(ms: number): Promise<number>`: chama `onDowngrade` quando a média fica abaixo de `FPS_FLOOR`.
- **Shader:** fragment shader procedural com:
  - anéis concêntricos em perspectiva (túnel), com profundidade guiada por `progress`;
  - linhas de campo finas;
  - abertura central em `aperture` (raio normalizado, recortando o vídeo DOM por baixo via fundo transparente no centro);
  - realce laranja de baixa intensidade;
  - brilho próximo a `pointer`.
  - Uniforms `u_time` (pausado com movimento reduzido), `u_res`, `u_progress`, `u_aperture`, `u_rings`, `u_glow`, `u_tint`, `u_pointer`.
  - DPR limitado a 1,5. `IntersectionObserver` e `visibilitychange` pausam o loop.

- [ ] Step 1: Write the failing tests:
  - `renders fallback in light mode`: `container.querySelector(".stage-fallback")` exists, and there is no canvas;
  - `canvas is hidden from assistive tech`: in immersive mode under jsdom (no WebGL), the component falls back by itself, so assert the fallback exists and `aria-hidden="true"`;
  - `stageState.set merges`: `set({ progress: 0.5 })` keeps `rings`.
- [ ] Step 2: Run them. Expected: FAIL.
- [ ] Step 3: Implement.
- [ ] Step 4: Run them. Expected: PASS.
- [ ] Step 5: Commit `feat(palco): canvas WebGL procedural do anel e do túnel com reserva leve`.

### Task 5: Conteúdo da home como dado

**Files:**
- Create: `src/data/home.ts`
- Test: `src/test/home-data.test.ts` (parte de conteúdo)

**Interfaces:**
- **Produz:**
  - `lifecycle: { id: StageId; title: string; body: string; href: string; linkLabel: string }[]`: seis etapas, na ordem da spec. Os textos vêm dos serviços e soluções existentes.
  - `type ShowroomFilter = "todos" | "rm" | "veterinaria" | "radiologia" | "contraste" | "software"`
  - `showroom: { id: string; name: string; line: string; filters: ShowroomFilter[]; image: MediaImage; href: string; external?: boolean }[]`:
    - Magnifico Open (externo, página oficial);
    - S-scan Open, O-scan SMART, G-scan Open;
    - TurboTom 1S-VET, TurboTom 1S LITE VET, i_Space 1.5T-VET;
    - Accutron MR (bombas);
    - DigiEye 350 (Mindray);
    - HexAI.
  - `triage: { id: "comprar" | "manter" | "reparar"; title: string; body: string; whatsappText: string; href: string }[]`
  - `whatsappHref(text: string): string`: `https://wa.me/5511973140914?text=` + `encodeURIComponent(text)`. É o número do rodapé e do WDM.

- [ ] Step 1: Write the failing tests:
  - `lifecycle has the six stages in order`: ids equal `["escolha","projeto","instalacao","operacao","manutencao","laboratorio"]`;
  - `every internal href is a declared route`: match against the patterns from `App.tsx`, `/solucoes/:slug` resolving to a slug in `solutions`, `rmStories`, `commercialLines` or `wdm`;
  - `every showroom image exists in public/`;
  - `no showroom item invents numbers`: names and lines contain no digits outside model names (allowlist: `1S`, `1.5T`, `350`, `MR`);
  - `whatsappHref encodes text`.
- [ ] Step 2: Run them. Expected: FAIL.
- [ ] Step 3: Implement.
- [ ] Step 4: Run them. Expected: PASS.
- [ ] Step 5: Commit `feat(home): conteúdo da home como dado verificado`.

### Task 6: Seções da home e composição

**Files:**
- Create:
  - `src/components/home/HomeHero.tsx` (H1 túnel);
  - `src/components/home/LifecycleTimeline.tsx` (H2);
  - `src/components/home/Showroom.tsx` (H3, Flip);
  - `src/components/home/ProofVideos.tsx` (CEO e depoimentos, clique para tocar);
  - `src/components/home/ContactTriage.tsx` (H4, hexágono → ícone com MorphSVG);
  - `src/components/home/ScanImage.tsx` (varredura: `clip-path: inset()` + linha de 1 px).
- Create: `src/styles/home.css`
- Modify: `src/pages/Index.tsx` (substitui o conteúdo atual)
- Test: `src/test/home.test.tsx`

**Interfaces:**
- **Consome:** `homeMedia`, `lifecycle`, `showroom`, `triage`, `whatsappHref`, `StageCanvas`, `stageState`, `detectStageMode`, `useMotionScope`, `registerMotion`, `duration`, `ease`.
- **Produz:**
  - `<HomeHero />`;
  - `<LifecycleTimeline items={lifecycle} />`;
  - `<Showroom items={showroom} />`;
  - `<ProofVideos ceo testimonials />`;
  - `<ContactTriage items={triage} />`;
  - `<ScanImage image={MediaImage} />`.
- **Texto do H1 (fixo):**
  - título "Do projeto da sala à última manutenção.";
  - subtítulo "Equipamentos de diagnóstico por imagem, instalação e suporte técnico especializado em uma só operação, durante toda a vida do equipamento.";
  - CTAs "Encontrar a solução certa" (`/solucoes`) e "Falar com especialista" (`/contato`).
- **Comportamento:**
  - **Desktop imersivo:**
    - H1 fixado por ~120 % da altura da tela; o scroll leva `stageState.progress` de 0 a 1 e `aperture` de 0,18 a 0,75, e o vídeo do túnel aparece na abertura;
    - H2 fixado com `snap` em seis passos; o anel de progresso usa `DrawSVG`;
    - H3 reorganiza com `Flip` ao filtrar;
    - H4 faz o hexágono virar o ícone em 0,24 s.
  - **Celular:** sem fixar nada; abertura por `IntersectionObserver`; lista vertical com o anel `sticky` pequeno.
  - **Reduzido:** pôster estático; tudo visível; troca direta.

- [ ] Step 1: Write the failing tests (render `Index` inside `HelmetProvider` + `MemoryRouter`, with GSAP not executing animations in jsdom):
  - exactly one `h1` with the fixed text;
  - `h2`s in order: "A vida inteira do equipamento", "Portfólio", "Quem responde pela Hexamedical", "Como podemos ajudar?";
  - six `h3`s inside the lifecycle region, all visible (no inline `opacity:0`);
  - clicking the "Ressonância" filter (button with `aria-pressed`) leaves only RM items, plus Magnifico, in the list;
  - the triage links point to `wa.me` with the encoded text;
  - the videos have `preload="none"` and a poster;
  - the stage is `aria-hidden`.
- [ ] Step 2: Run them. Expected: FAIL.
- [ ] Step 3: Implement the components and CSS. Read `C:\Users\lucas\.claude\skills\impeccable\reference\craft-floor.md` before the CSS.
- [ ] Step 4: Run `npx vitest run`. Expected: PASS.
- [ ] Step 5: Commit `feat(home): nova home imersiva A+B`.

### Task 7: Cabeçalho e rodapé no novo sistema

**Files:**
- Modify: `src/components/layout/Header.tsx`; `src/components/layout/Footer.tsx`
- Create: `src/styles/chrome.css` (substitui as regras `.site-header*` e `.site-footer*` de `index.css`, que são removidas)
- Test: `src/test/foundation.test.tsx` (acréscimos)

**Interfaces:**
- **Produz:** `Header` com variante `site-header--stage` na rota `/`, com logo claro e fundo transparente. Some ao rolar para baixo e volta ao subir, em `duration.quick`. Não some quando o menu está aberto ou o foco está nele.
- **Rodapé:** grafite, com o mesmo conteúdo atual (contatos e links preservados).

- [ ] Step 1: Write the failing tests:
  - on `/`, the header has class `site-header--stage` and uses the light logo;
  - on `/contato`, it does not;
  - the footer keeps `tel:+5511973140914` and `mailto:comercial@hexamedical.com.br`.
- [ ] Step 2: Run them. Expected: FAIL.
- [ ] Step 3: Implement.
- [ ] Step 4: Run them. Expected: PASS.
- [ ] Step 5: Commit `feat(layout): cabeçalho e rodapé no sistema grafite`.

### Task 8: Verificação real e documentação

- [ ] Step 1: Run `npm run build`, `npx vitest run` and `npx eslint src/components/home src/motion src/data/home.ts`. Expected: build OK and tests passing. Record the gzip sizes of the JS and CSS.
- [ ] Step 2: In the preview browser (`hexa-site-preview`):
  - capture desktop 1440 and mobile 390;
  - capture reduced motion (emulated);
  - capture light mode (forced with `?stage=light`);
  - measure overflow, average FPS of the stage over 3 s, and CLS through `PerformanceObserver`.
- [ ] Step 3: Run `impeccable detect --json` on the home at 1280×800 and 390×844. Fix what is mechanical.
- [ ] Step 4: Run a fresh-eyes review (degraded finish reviewer), using `impeccable/reference/degraded/finish-reviewer.md` with the screenshots and the direction contract. Apply one batch of fixes, at most two rounds.
- [ ] Step 5: Update the surface brief with the new direction contract, rewrite `DESIGN.md` from the built world, and add the media provenance to `public/media/home/SOURCES.md`.
- [ ] Step 6: Commit `docs: contrato de direção, DESIGN.md e proveniência da mídia da home`.
