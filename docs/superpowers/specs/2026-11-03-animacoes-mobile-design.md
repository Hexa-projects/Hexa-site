# Animações da home no celular: versão adaptada (B)

Pedido do Lucas em 2026-11-03: "preciso que tenha as mesmas animações para mobile também, no mobile está o site estático". Ele escolheu a opção B: as mesmas animações, adaptadas ao celular.

## Intenção

O celular deixa de ficar sempre no modo leve. Ele passa a ter a mesma experiência imersiva do desktop, adaptada ao formato vertical e mantendo o banner 16:9 que o Lucas pediu para a abertura.

## Abordagens

- **A. Igual ao desktop.** O anel abre até o vídeo ocupar a tela cheia. Descartada porque, no celular em pé, um vídeo 16:9 em tela cheia corta as laterais e desfaz o banner.
- **B. Adaptada (escolhida).** Mesmo palco em WebGL e as mesmas cenas, com as proporções do celular.
- **C. Sem WebGL, só CSS/SVG.** Mais leve, mas não entrega "as mesmas animações".

## O que muda (abaixo de 1024 px, no modo imersivo)

1. **Decisão de modo.** A largura da tela deixa de rebaixar para o modo leve. Os outros critérios continuam iguais:
   - movimento reduzido, Save-Data ou falta de WebGL;
   - menos de 4 núcleos;
   - duas janelas seguidas abaixo de 45 fps, ou perda do contexto WebGL.
2. **Abertura.** O anel em WebGL fica atrás da abertura, centrado no vídeo. A abertura fica presa na tela por um trecho curto de rolagem, a partir do momento em que o banner está inteiro na tela. Nesse trecho:
   - o vídeo começa recortado num círculo e se abre até o banner 16:9 com cantos de 14 px;
   - o anel do palco acompanha o círculo e se abre junto.
3. **Linha do tempo.** O anel com a foto da etapa, os seis hexágonos, o progresso e a varredura fica fixo no topo, numa faixa com o fundo claro. As etapas rolam por baixo dela, e a foto troca na etapa que cruza o meio da tela. Os emblemas por etapa ficam só no modo leve.
4. **Sem mudança:** o filtro do portfólio, o hexágono que vira anel na triagem e o título com máscara já animam no celular. O Lenis continua só no desktop; no toque, a rolagem é a nativa.

## Restrições

- O modo leve (estático) continua para aparelhos fracos, movimento reduzido e queda de quadros.
- Sem salto de layout, sem rolagem lateral, alvos de toque de 44 px.

## Decisões minhas

- A abertura fica presa por 80% da altura da tela.
- Na linha do tempo, o anel fixo tem 11 rem.
- A transição do círculo para o banner usa `clip-path: inset(... round ...)`, porque `circle()` e `inset()` não se interpolam entre si.
