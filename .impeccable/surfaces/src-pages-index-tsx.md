---
version: 2
slug: "src-pages-index-tsx"
primary_target: "src/pages/Index.tsx"
related_targets: ["src/components/home/HomeHero.tsx","src/components/home/LifecycleTimeline.tsx","src/components/home/Showroom.tsx","src/components/home/ProofVideos.tsx","src/components/home/ContactTriage.tsx","src/motion/stage/StageCanvas.tsx","src/components/layout/Header.tsx","src/components/layout/Footer.tsx"]
approved_comp: null
---

# Home Hexamedical

Modo: Persuade. Escopo: home e cabeçalho/rodapé globais, excluindo Magnifico Open e Careverse Digital Heart.

Audiência: decisores de hospitais, clínicas e centros de imagem que avaliam equipamento, implantação e suporte. Trabalho: entender que a Hexamedical vende, instala, mantém e repara, e abrir uma conversa qualificada. Provas: vídeo real do equipamento, fotos de cada etapa, portfólio completo, entrevista do CEO e depoimentos, todos do site oficial.

Direção substituída: "Rede em Operação / A2 Operação Serena" (base clara), trocada pela escolha do Lucas em 2026-11-02 — híbrido A+B do `docs/plano-motion-gsap-remotion-2026-11-02.md`, só com material do site oficial.

## Direction contract

THESIS: A vida inteira do equipamento vista de dentro do túnel. A home é um percurso contínuo pelo anel da ressonância, da escolha ao laboratório. Recusa o hero genérico seguido de grade de cards e o folheto que só se mexe.

OWN-WORLD: palco grafite #0c0e10 contínuo, com um anel procedural em WebGL (anéis em perspectiva, linhas de campo finas, borda laranja #f87517 e luz que segue o cursor). Equipamentos inteiros sobre bases brancas. Archivo expandida (112%) nos títulos e Source Sans 3 no texto. O hexágono do logo marca as etapas e vira anel na triagem. A varredura, uma linha clara de 1 px, revela as fotos.

STORY: o visitante entra no túnel até o equipamento real ocupar a tela. Depois percorre as seis etapas da vida do equipamento, vê o portfólio inteiro com filtro, ouve o CEO e os depoimentos, escolhe comprar, manter ou reparar e abre o WhatsApp oficial com o assunto certo.

FIRST VIEWPORT: o cabeçalho fica transparente sobre o palco.
- À esquerda, numa coluna de até 44vw:
  - o título "Do projeto da sala à última manutenção.", em Archivo 650, até 5,25 rem;
  - o texto de apoio;
  - os CTAs "Encontrar a solução certa" (laranja) e "Falar com especialista" (contorno).
- À direita, com centro a 70% da largura, a abertura circular mostra o vídeo real do Magnifico Open, contornada pela borda laranja e pelos anéis do túnel.
- No canto inferior direito, o controle para pausar o vídeo.
- Interação de assinatura: o scroll fixa a cena, avança a câmera pelo túnel e abre a abertura até o vídeo ocupar a tela. Em seguida, o anel passa a contornar a foto de cada etapa.

FORM: direção fixada pelo usuário (híbrido A+B do plano de motion), sem sorteio de conceito. Forma tirada do bore da RM e do hexágono do logo. Seed: n/a (pinned).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Pendências

- Direito de uso fora do site atual do vídeo de fabricante (Esaote) e origem das fotos de manutenção e laboratório: própria ou banco de imagens.
- Notebook de referência para o teste de 60 fps: não definido.
