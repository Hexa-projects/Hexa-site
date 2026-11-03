# Higgsfield no site Hexamedical — direção e piloto

Data: 26/10/2026. Status: pesquisa e pré-produção; nenhuma mídia gerada ou publicada.

## Decisão editorial

Usar Higgsfield para **atmosfera, movimento de câmera e pré-visualização**. Não usar uma geração integral como representação técnica final de tomógrafos, ressonâncias, interfaces, logos ou especificações. Nessas partes, preservar fotos, vídeos e renders oficiais aprovados; caso haja composição, manter o equipamento como camada intacta e revisar o resultado quadro a quadro.

O site já tem uma hero clínica estática em `src/pages/Index.tsx`, fotos de produtos WDM em `public/assets/wdm/` e renders Esaote em `public/assets/esaote/`. A primeira aplicação deve agregar profundidade visual à home sem substituir essas fontes de verdade.

## O que funciona na prática

1. **Começar pelo quadro aprovado.** Definir composição, enquadramento, cor e área livre para o texto antes de animar. Estúdios publicam fluxos de look development e storyboards revisados antes da animação; direção, continuidade e edição permanecem humanas.
2. **Um movimento por tomada.** Para equipamento médico, preferir câmera fixa ou deslocamento discreto. Relatos de usuários descrevem órbitas e movimentos amplos alterando objetos, rótulos e detalhes; isso é evidência anedótica, mas coerente com o risco já visto nos criativos da Hexamedical.
3. **Vídeo curto e modular.** Produzir tomadas isoladas e montar o ritmo fora do gerador. A consistência entre múltiplos clipes não deve depender apenas do mesmo prompt.
4. **Separar mídia e conteúdo.** Títulos, CTAs, números, marcas e alegações clínicas ficam no HTML/CSS do site, nunca impressos nos frames gerados.
5. **Compor e validar.** Quando houver equipamento, a camada oficial deve voltar por cima do passe generativo quando necessário. Revisão humana deve comparar forma, dimensão, consoles, bobinas, faixas, logos e áreas clínicas com a fonte aprovada.
6. **Servir para web, não para um filme longo.** Exportar um loop leve, sem áudio, com imagem de poster e alternativa estática para movimento reduzido. Evitar download de vídeos fora da viewport.

## Aplicações priorizadas

| Prioridade | Página | Uso do Higgsfield | Elemento que não pode ser gerado livremente |
| --- | --- | --- | --- |
| 1 | Home (`/`) | Loop cinematográfico curto de ambiente clínico/equipe, com movimento sutil e espaço livre à esquerda para a copy | Máquina, logos, telas, texto |
| 2 | Serviços | Bastidores de instalação, manutenção e suporte a partir de captação real autorizada | Procedimento técnico e EPI incorretos |
| 3 | Páginas WDM | Contexto visual de hospital veterinário e transições sutis entre seções | Geometria e especificações dos três equipamentos |
| 4 | Conteúdos/campanhas | Storyboards, peças sociais e variações de enquadramento | Identidade de marca e claims sem revisão |

Marketing Studio e seus presets de produto/UGC podem ajudar em campanhas sociais, mas não são a escolha inicial para a hero institucional: os presets vistos no catálogo estão concentrados em produtos de consumo, e os efeitos chamativos não combinam com precisão médica. Para o piloto do site, usar Cinema Studio (controle de câmera/luz) e Canvas para comparar frames e passes.

## Piloto proposto: home

- **Fonte:** fotografia ou frame oficial autorizado de ambiente clínico, idealmente filmado pela Hexamedical/Esaote. Não usar um render inventado como referência técnica.
- **Quadro:** 16:9, equipamento em proporção real, paciente/equipe sem gestos clinicamente implausíveis; reservar a metade esquerda para copy. A versão mobile terá enquadramento revisto, não apenas um corte automático.
- **Movimento:** 5–7 segundos; câmera estável com aproximação quase imperceptível ou leve deslocamento lateral. Nada de órbita, morphing, peças móveis ou mudanças em tela/labels.
- **Prompt-base (para refinamento após escolher a fonte):** “Create a restrained cinematic motion pass from the supplied approved clinical image. Preserve every medical device, its exact geometry, proportions, screen, controls, labels, colors, and placement unchanged. Preserve the people and clinical workflow. Only animate subtle ambient light and a slow, stable camera push-in. No orbit, no new objects, no morphing, no text, no logos added, no dramatic effects. Keep the left side visually calm for website headline. Natural hospital lighting, credible professional atmosphere.”
- **Saída a aprovar:** um frame inicial, um frame intermediário e um frame final; depois o clipe completo. Rejeitar qualquer alteração do produto mesmo que o movimento pareça bonito.
- **Implementação web, só após aprovação:** `<video>` mudo, `playsInline`, `loop`, poster; controle de pausa; imagem estática quando `prefers-reduced-motion: reduce`; poster visível durante carga; carregamento condicional/lazy nas seções abaixo da dobra. Manter copy e botões no DOM.
- **Medição:** comparar carregamento, estabilidade visual e legibilidade antes/depois em desktop e mobile; a mídia não pode piorar perceptivelmente a entrada na página.

## Portões de aprovação

1. Fonte visual e direito de uso aprovados.
2. Brief e limite de créditos da geração aprovados.
3. Produto comparado com referência oficial, quadro a quadro.
4. Especialista de produto aprova cenário, gestos e eventuais alegações.
5. Testes desktop/mobile, movimento reduzido e desempenho passam.
6. Só então integrar ao site. Publicação/deploy requer autorização separada.

## Referências consultadas

- Higgsfield, Tools & Workflows: https://higgsfield.ai/enterprise-help-center/platform/tools-creative-workflow
- Alterworld Studios, pré-produção orientada por frames e revisão: https://higgsfield.ai/creator-hub/case-studies/alterworld-studios-cut-pre-production-time-by-70-with-higgsfield-mcp
- BITT Animation, produção híbrida e composição: https://higgsfield.ai/creator-hub/case-studies/how-bitt-animation-runs-hybrid-ai-production
- Discussão de usuários sobre fidelidade de produto e movimentos excessivos (relatos, não validação sistemática): https://www.reddit.com/r/HiggsfieldAI/comments/1qchtvz/help_with_product_videos/ e https://www.reddit.com/r/HiggsfieldAI/comments/1x3a982/advice_on_creating_video_ads_for_pet_furniture/
- web.dev, desempenho de vídeo: https://web.dev/learn/performance/video-performance
- MDN, autoplay e movimento reduzido: https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay e https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion
