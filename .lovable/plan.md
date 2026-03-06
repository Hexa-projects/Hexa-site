

# Plano de Implementacao - Site Institucional Hexamedical

Este e um projeto extenso com ~25 paginas e dezenas de componentes. Dado o limite de uma unica resposta, a implementacao sera dividida em fases. A **Fase 1** sera entregue agora e contera a base completa do projeto: design system, layout global, Home, hubs de Solucoes/Servicos, e 2-3 paginas de solucao como template funcional. As demais paginas seguem o mesmo template e serao adicionadas em sequencia.

---

## Fase 1 - Entrega Inicial (esta implementacao)

### 1. Design System e Fundacao

**Paleta CSS (index.css):** Substituir variáveis HSL pelos valores Hexamedical:
- Primary: `#0B2E59` (210 78% 20%)
- Secondary: `#1E4E8C` (214 64% 33%)
- Accent/Cyan: `#00A9E0` (196 100% 44%)
- Background: `#F7FAFF` (220 100% 99%)
- Foreground: `#0F172A` (222 47% 11%)
- Muted foreground: `#475569` (215 19% 35%)

**Tipografia:** Adicionar Inter via Google Fonts no `index.html`.

### 2. Componentes Reutilizaveis (~12 componentes)

| Componente | Descricao |
|---|---|
| `Header` | Sticky, logo, mega-menu com dropdowns (Solucoes, Servicos, Segmentos, Conteudo, Empresa), CTA "Falar com Especialista" |
| `Footer` | Links organizados por secao, contato, redes sociais, copyright |
| `HeroSection` | Variante com headline, subtitulo, CTA primario + secundario, background escuro |
| `SolutionCard` | Card clicavel com icone/imagem, titulo, descricao curta |
| `ServiceCard` | Similar ao SolutionCard, adaptado para servicos |
| `DifferentialsGrid` | Grid 3-col com icone + titulo + texto |
| `TestimonialsBlock` | Carrossel/grid de depoimentos |
| `FAQAccordion` | Usa Accordion existente, estilizado |
| `CTABanner` | Bloco reutilizavel de CTA final com fundo azul escuro |
| `ContactForm` | Formulario completo (Nome, Empresa, Cargo, Tel, Email, Cidade/UF, Interesse, Mensagem) com validacao zod |
| `Breadcrumb` | Navegacao breadcrumb para paginas internas |
| `SegmentsGrid` | Grid de segmentos atendidos com icones |

### 3. Estrutura de Rotas (App.tsx)

```
/                          → Home
/solucoes                  → Hub Solucoes
/solucoes/ressonancia-magnetica → Sub-hub RM
/solucoes/rm-magnifico-open    → Pagina produto
/solucoes/rm-s-scan            → Pagina produto
/solucoes/rm-o-scan            → Pagina produto
/solucoes/rm-g-scan            → Pagina produto
/solucoes/bombas-injetoras     → Pagina produto
/solucoes/hexai                → Pagina produto
/solucoes/veterinario          → Pagina produto
/servicos                      → Hub Servicos
/servicos/manutencao           → Pagina servico
/servicos/contratos            → Pagina servico
/servicos/instalacao           → Pagina servico
/servicos/reparo               → Pagina servico
/servicos/visita-tecnica       → Pagina servico
/segmentos/clinicas            → Pagina segmento
/segmentos/hospitais           → Pagina segmento
/segmentos/centros-de-imagem   → Pagina segmento
/segmentos/universidades       → Pagina segmento
/segmentos/veterinario         → Pagina segmento
/blog                          → Listagem blog
/blog/:slug                    → Post template
/materiais                     → Materiais de apoio
/estrutura                     → Estrutura
/sobre                         → Sobre
/contato                       → Contato
*                              → 404 personalizada
```

### 4. Paginas na Fase 1

**Home** (10 secoes conforme spec):
1. Hero com headline "Especialistas em Ressonancia Magnetica" + CTAs
2. Bloco "Solucoes certas para cada realidade"
3. Grid de solucoes (4 cards: RM, Bombas, HexAI, Veterinario)
4. Grid de servicos (5 cards)
5. Destaque HexAI (bloco premium com fundo accent)
6. Diferenciais competitivos (6 cards: Suporte Nacional, Laboratorio Proprio, Equipe Especializada, Pecas Originais, Contratos Flexiveis, +15 Anos)
7. Segmentos atendidos
8. Provas e credibilidade (numeros + logos)
9. Blog em destaque (3 cards)
10. CTA final + formulario de contato rapido

**Hub Solucoes** e **Hub Servicos**: Grid com cards linkando para cada pagina interna.

**Pagina de Solucao Template** (ex: RM Magnifico Open): Todas as 9 secoes do template padrao (Hero, Para quem e, Problemas, Como funciona, Diferenciais, Bloco tecnico, Provas, FAQ, CTA final).

**Contato**: Formulario completo com validacao + mapa/info.

**404 personalizada**.

### 5. SEO

- `react-helmet-async` ou meta tags manuais por pagina (title, description, OG tags)
- Hierarquia H1/H2/H3 semantica
- URLs limpas ja definidas na estrutura de rotas
- `robots.txt` ja existe; adicionar sitemap basico

### 6. UX/Animacoes

- CSS transitions suaves (fade-in on scroll via Intersection Observer)
- Hover states em cards e botoes
- Mobile-first com breakpoints Tailwind (sm/md/lg/xl)
- Header sticky com backdrop-blur

---

## Fase 2 - Expansao (proximas iteracoes)

- Todas as paginas de solucao individuais (RM S-Scan, O-Scan, G-Scan, Bombas, HexAI, Vet)
- Todas as paginas de servico individuais
- Paginas de segmento
- Blog listagem + template de post
- Materiais de Apoio
- Estrutura e Sobre
- Schema.org markup (Organization, Service, FAQPage)
- Animacoes avancadas com framer-motion

---

## Estrutura de Arquivos

```
src/
  components/
    layout/
      Header.tsx        (mega-menu + sticky + CTA)
      Footer.tsx
      Layout.tsx         (wrapper com Header/Footer)
      Breadcrumb.tsx
    sections/
      HeroSection.tsx
      SolutionCard.tsx
      ServiceCard.tsx
      DifferentialsGrid.tsx
      TestimonialsBlock.tsx
      FAQSection.tsx
      CTABanner.tsx
      ContactForm.tsx
      SegmentsGrid.tsx
      BlogHighlight.tsx
      TrustBlock.tsx
      HexAIHighlight.tsx
  data/
    solutions.ts        (dados das solucoes)
    services.ts         (dados dos servicos)
    segments.ts
    navigation.ts       (estrutura do menu)
  pages/
    Index.tsx           (Home)
    SolucoesHub.tsx
    ServicosHub.tsx
    SolutionPage.tsx    (template reutilizavel)
    ServicePage.tsx     (template reutilizavel)
    Contato.tsx
    NotFound.tsx        (404 custom)
```

---

## Nota sobre Escopo

Este projeto tem ~25 paginas. A Fase 1 entregara a fundacao completa (design system, todos os componentes, layout, Home, hubs, template de pagina de solucao, contato e 404). Com essa base, as paginas restantes sao instancias do mesmo template com dados diferentes e serao criadas rapidamente nas proximas iteracoes.

