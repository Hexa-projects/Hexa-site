# Reinvenção, fase 2: o site inteiro no sistema novo

Data: 2026-11-08 · Branch: `reinvencao/fase-0-1` (PR Hexa-projects/Hexa-site#1)

## Por que

A home já está no sistema novo (DESIGN.md: grafite e mineral, Archivo largo, laranja como sinal, palco do túnel só na home) e foi aprovada pelo gestor no visual. As outras 20 rotas continuam no visual da fase anterior (`ed-*`, `HeroSection`, cartões Tailwind), com textos genéricos ("O equipamento é só o começo") e páginas-aviso ("em revisão"). Quem sai da home cai num site diferente. O pedido do Lucas (2026-11-08) é terminar o redesign do site institucional inteiro.

## Decisões do Lucas (2026-11-08)

- **Escopo:** todo o site institucional, **incluindo a página do Magnifico Open e a do Careverse**, que antes eram projetos à parte.
- **Blog:** migrar os artigos para dentro do site novo, preservando as URLs.
- **Contato:** sem formulário. WhatsApp com mensagem pronta, e-mail e telefone. O site não coleta dados pessoais.
- **Animação nas internas:** moderada (entradas, revelação de imagem, transições ao rolar). O palco WebGL do túnel fica só na home. A página do Magnifico Open pode ter uma cena presa ao scroll, por ser a página-vitrine.

## Metas

1. Todas as rotas no sistema da DESIGN.md, com o mesmo cabeçalho, rodapé, tipografia, cor, ritmo e motion.
2. Copy no padrão da copy v2 da home: frases que explicam o serviço, benefício para quem compra, sem frases de efeito, sem fato inventado.
3. Nenhuma URL do site atual quebra: redirecionamento 301 de cada URL antiga para a rota nova.
4. Mobile no mesmo nível do desktop (auditoria 390 px e 412 px).
5. Acessibilidade AA, `prefers-reduced-motion` respeitado, sem regressão de desempenho (cada rota é um pacote próprio; GSAP só onde há motion).

## Não metas

- Formulário, backend, banco ou qualquer coleta de dados.
- Publicar em produção. O trabalho vai para a prévia; produção depende de autorização do Lucas.
- Texto jurídico definitivo de privacidade e termos (precisa de revisão jurídica). A página fica com estrutura e um rascunho marcado como pendente.
- Novas fotos ou vídeos. Só mídia já usada no site atual, no repositório ou nos materiais oficiais da Esaote.

## Antimetas (falha mesmo se funcionar)

- Página que afirma algo que a base de fatos não confirma (hélio do O-scan humano, representação, prazo, SLA, estoque, preço).
- Interna que pareça template genérico ao lado da home.
- Animação que esconda conteúdo antes de rodar ou atrapalhe a leitura.

## Fontes de fato (hierarquia)

1. Materiais oficiais da Esaote e dos fabricantes (brochuras no D:, `src/data/editorial.ts`).
2. Base comercial do segundo cérebro (`concepts/negocio`: Comparativo de RM Esaote, Magnifico Open, O-Scan, S-Scan, Serviços Técnicos, Injetoras, IA VUNO HexAI, Criogenia, Público atendido).
3. Texto do site atual (hexamedical.com.br).

O que não estiver nessas fontes vai para a lista de pendências, não para a página.

## Mapa de rotas

| Rota nova | Conteúdo | URL antiga redirecionada |
|---|---|---|
| `/` | home (pronta) | `/` |
| `/solucoes` | hub de soluções por linha | `/produtos/` |
| `/solucoes/ressonancia-magnetica` | linha de RM: comparativo e escolha | |
| `/solucoes/magnifico-open` | página-vitrine do Magnifico Open | `/rm-esaote-magnifico-open/` |
| `/solucoes/s-scan-open` | S-scan Open | `/rm-esaote-s-scan/` |
| `/solucoes/o-scan-smart` | O-scan SMART | `/rm-esaote-o-scan/` |
| `/solucoes/g-scan` | G-scan | `/rm-esaote-g-scan/` |
| `/solucoes/bombas-injetoras` | injetoras Accutron (CT, MR, HP) | `/bombas-injetoras/` |
| `/solucoes/radiografia-digital` | radiografia digital | `/mindray/` |
| `/solucoes/hexai` | HexAI (VUNO) | `/hexai/` |
| `/solucoes/veterinaria` | linha veterinária | `/area-veterinaria/`, `/area-veterinaria-hexamedical/` |
| `/solucoes/careverse` | Careverse (IA cardiovascular e neuro) | `/lp/careverse` |
| `/servicos` | hub de serviços | `/servicos/` |
| `/servicos/manutencao` | manutenção preventiva e corretiva | `/manutencao-de-equipamentos/` |
| `/servicos/contratos` | contratos de manutenção | `/contratos-de-manutencao/` |
| `/servicos/instalacao` | desinstalação e instalação | `/desinstalacao-e-instalacao-de-equipamentos/` |
| `/servicos/reparo` | laboratório, reparo, peças e criogenia | `/reparo-de-pecas-e-perifericos/` |
| `/empresa` | quem somos, números, estrutura | `/sobre`, `/estrutura/` |
| `/contato` | triagem por WhatsApp e canais | `/contato/` |
| `/ouvidoria` | canal de ouvidoria (sem formulário) | `/ouvidoria/` |
| `/materiais` | materiais de apoio | `/apoio/` |
| `/blog` e `/blog/:slug` | artigos migrados | `/blog/` |
| `/politica-de-privacidade`, `/termos` | estrutura e rascunho pendente de revisão jurídica | |

Os slugs antigos (`/solucoes/rm-s-scan` etc.) usados dentro do repositório também redirecionam. As rotas `/segmentos`, `/cases` e `/conteudo` saem e redirecionam para a página mais próxima.

## Sistema das páginas internas

Um kit único em `src/components/page/`, com CSS em `src/styles/page.css`, construído sobre os tokens da home:

- **PageHero** em duas variações: escura (grafite, para produtos, com o equipamento sobre a base) e clara (mineral, para serviços e institucional). Título Archivo largo, linha de apoio, ações e migalha de navegação.
- **Seções:** texto com mídia, lista de pontos com o hexágono da home, ficha técnica (tabela de especificações com fonte declarada), grade de cards no padrão da vitrine, faixa de números, perguntas frequentes (accordion acessível), vídeo com pôster.
- **Fechamento:** em toda interna, a mesma triagem por WhatsApp da home (componente reaproveitado), com a mensagem pronta ajustada à página.
- **Motion moderado:** um único hook (`usePageReveal`, sobre o `useMotionScope` que já existe) com três movimentos: título sobe por trás da máscara; mídia abre com recorte (`clip-path`); blocos entram em sequência curta. Tudo com estado visível no repouso e desligado em movimento reduzido. Sem Lenis nas internas.
- **Magnifico Open:** a única interna com cena presa ao scroll. O vídeo oficial abre do anel para o quadro inteiro (reaproveitando `bannerClip`) e três fatos (0,4 T, sem hélio, até 20 m²) entram em sequência.
- **Careverse:** a landing estática atual (`careverse-site`) é portada para React dentro do sistema, mantendo as afirmações do folder oficial e do estudo citado, e o CTA único "Solicitar demonstração" via WhatsApp.

## Abordagens consideradas

1. **Kit primeiro, páginas depois (escolhida).** Constrói os componentes e o CSS das internas uma vez e monta cada página com dados. As páginas ficam consistentes, as mudanças de estilo acontecem num lugar só e os testes cobrem o kit. Custo: a primeira página demora mais.
2. **Página por página, estilo próprio em cada uma.** Mais rápida no começo, mas repete o problema da fase anterior (cada página com um visual) e encarece qualquer ajuste.
3. **Template único genérico para todas.** Mais barato, mas o Magnifico, o Careverse e o blog não cabem num molde só e o resultado parece template, que é uma antimeta.

## Execução

Plano em `docs/superpowers/plans/2026-11-08-reinvencao-fase-2.md`, com TDD por tarefa. Ordem: kit e redirecionamentos, soluções, serviços, institucional e contato, blog, Magnifico, Careverse, auditoria (mobile, acessibilidade, desempenho) e revisão independente. Subagentes só para leitura e revisão; o código é escrito nesta sessão.

## Decisões de fato (Lucas, 2026-11-08)

1. **Radiografia:** as duas linhas. DRGEM (XVISION-525, TOPAZ, RAYMO) com placas Rayence como linha principal; Mindray citada. A rota passa a ser `/solucoes/radiografia-digital`.
2. **Veterinária:** como no site atual: Esaote veterinária e WDM (i_Space, TurboTom), com contato pela Hexamedical.
3. **Densitometria e criogenia entram:** densitometria como linha em Soluções (só a descrição geral confirmada, sem modelo nem ficha); criogenia, tubos de CT e peças dentro de `/servicos/reparo`, sem prometer disponibilidade, prazo ou compatibilidade.

## Pendências que seguem abertas

1. **Hélio:** só Magnifico Open e S-scan têm "sem hélio" confirmado. O O-scan humano está pendente e o G-scan não aparece na base. A vitrine da home diz "não usa hélio líquido" para toda a linha; até a confirmação, a frase passa a citar só os modelos confirmados.
2. **Números da empresa:** +16 anos, +500 equipamentos e 5 unidades continuam sem fonte. "3 salas" corrige para "3 salas de teste para tomografia, raio-X e mamografia", como diz a página Estrutura do site atual.
3. **Privacidade e termos:** texto definitivo depende de revisão jurídica.
