# Pente fino visual e proposta de reinvenção — site Hexamedical

Data: 02/11/2026. Escopo: site público atual (WordPress, `hexamedical.com.br`) e prévia do redesign (este repositório, Vite + React). **Fora do escopo:** LPs da Careverse e página do Magnífico Open.

Este documento complementa `auditoria-migracao-site-2026-10-24.md`, que cobre catálogo, claims e migração de conteúdo. Aqui o foco é visual, experiência, performance e o que fazer para o site parecer novo de verdade.

## Como foi feito

- Produção: home, Produtos, S-scan Open, HexAI, Estrutura, Bombas Injetoras, Mindray, Área Veterinária, Contato e Blog, em 1440 px e 375 px, com medição no navegador (imagens, títulos, peso, requisições).
- Prévia: todas as rotas principais em 1440 px, home e S-scan em 375 px, build de produção e levantamento dos tokens de CSS e do acervo de mídia.
- Limites: o firewall da Vercel bloqueou parte da navegação em produção (Serviços, Manutenção e a home no celular), então essas páginas não foram capturadas. A varredura automática da prévia cobriu 9 das 25 rotas antes de o navegador travar. As demais foram vistas por captura de tela.

## 1. Site em produção: o que está quebrado agora

Estes itens valem independentemente do redesign e afetam quem visita o site hoje.

| Prioridade | Problema | Evidência |
| --- | --- | --- |
| Crítica | **Logo quebrado na home.** As três instâncias de `Logo-Hexamedical-1536x398.png` não carregam, e o primeiro elemento da marca é o ícone de imagem quebrada. | Cabeçalho e rodapé da home. O logo funciona nas páginas internas. |
| Crítica | **Verificação de segurança da Vercel bloqueia visitantes.** Páginas exibem "Estamos verificando seu navegador" e não carregam. | Ocorreu em `/servicos/`, `/manutencao-de-equipamentos/` e na home no celular. É preciso conferir se o firewall está em modo de desafio para todo o tráfego, porque isso também afeta buscadores e prévias de link. |
| Alta | **Home lenta e pesada.** | DOMContentLoaded em 6,5 s, 5,8 MB, 69 requisições, 28 scripts e 29 folhas de estilo (Elementor). |
| Alta | **Sistema visual fragmentado.** Cada página parece de um site diferente. | HexAI usa azul-petróleo, Bombas e Mindray usam borda roxa com botões verde-azulados, e o restante usa laranja e preto. Há três famílias de fonte (Montserrat, Gotham e a do sistema). |
| Alta | **Fotos de banco genéricas** competem com o acervo real. | Home: "Serviços" ilustrado com executivas de escritório e "Produtos" com foto de banco. |
| Média | **Faixa branca vazia** de cerca de uma tela antes do rodapé da home. | Captura em 1440 px. |
| Média | **Card do Accutron MR sem foto** em Bombas Injetoras. | Espaço de imagem em branco. |
| Média | **SEO e semântica.** O título é "Hexamedical - Ressonância Magnética - Hexamedical", com a marca duplicada. Parágrafos inteiros estão marcados como H2, e 4 das 9 imagens da home estão sem `alt`. | Leitura do DOM. |
| Média | **A home institucional abre com o vídeo de um único produto** (Magnífico). O visitante não entende de cara que a Hexamedical vende, instala e mantém. | Primeira dobra. |

**Correções rápidas em produção, sem esperar o redesign:** repor o arquivo do logo, revisar o modo do firewall da Vercel, corrigir o título e os H2, preencher a foto do Accutron MR e remover a faixa vazia. Mudanças no firewall e no WordPress de produção precisam de autorização antes de serem feitas.

## 2. Prévia do redesign: diagnóstico

### O que já está bom (manter)

- Um sistema só, com cabeçalho limpo, CTA laranja único e grafite nas seções escuras.
- Conteúdo honesto: dados com fonte, ressalvas de configuração e nada de cases inventados.
- Produtos inteiros e proporcionais (`contain`), sem corte de equipamento.
- Títulos por página, sem overflow horizontal no celular e menu acessível por teclado.
- Páginas WDM veterinárias com narrativa própria e mais rica que o resto.

### Por que ainda não parece "novo e atraente"

1. **Todas as páginas abrem iguais.** Soluções, Serviços, Estrutura, Sobre, Contato, Blog e Empresa repetem a mesma abertura: rótulo pequeno em maiúsculas, título enorme em duas linhas, um parágrafo e nenhuma imagem. Quem navega sente que está sempre na mesma página. A página Sobre repete o título da home ("Tecnologia médica em operação").
2. **Repertório de clichês do "editorial gerado".** Há rótulos em caixa-alta espaçada acima de quase todo bloco (4 a 7 por página), numeração 01/02/03, listas separadas por linhas finas, cards com borda de 1 px e tudo em branco e cinza. É limpo, mas é o visual padrão que todo site feito por IA tem hoje.
3. **Falta a prova humana e operacional.** O maior diferencial da Hexamedical, que é instalar, manter e consertar, quase não aparece em imagem. Não há equipe, laboratório, criogenia, içamento de magneto nem técnicos em campo. O vídeo do CEO, que existe em produção, não foi usado.
4. **Produtos sem palco.** Equipamentos aparecem como recortes em caixas cinza-claro sobre fundo branco, sem escala humana, sem ambiente e sem drama de luz. A ressonância, que é o produto mais impressionante, parece um eletrodoméstico.
5. **A home esconde metade do portfólio.** Bombas, Mindray e Veterinária viram uma lista de links em "Outras frentes". O card do HexAI fica quase todo preto, com a imagem recortada.
6. **No celular, o produto chega tarde.** Nas páginas de produto, a foto do equipamento só aparece depois de uma tela inteira de texto. Para equipamento médico, a imagem é o argumento.
7. **Três identidades convivem.** O site principal usa laranja e grafite, as páginas WDM usam verde-azulado (`#0a8994`, `#102830`) e o HexAI tem sua própria paleta em produção.

### Dívida técnica que trava a reinvenção

- **Cores e escala sem controle:** há 6 laranjas diferentes no CSS (`#f87517`, `#ff7a1a`, `#e96000`, `#f37021`, `#ef6b1d`, `#ff8b40`) e 41 declarações distintas de `font-size`. Os arquivos `editorial*.css` estão minificados em uma linha, o que torna a manutenção difícil.
- **SEO de SPA:** toda rota entrega o mesmo HTML inicial com o título "Hexamedical — Especialistas em Ressonância Magnética" até o JavaScript rodar. Buscadores sem JS e prévias de WhatsApp e LinkedIn veem um título só para o site inteiro.
- **Bundle único:** 410 kB de JS (124 kB gzip), sem divisão por rota.
- **Mídia:** `public/assets` tem 70 MB, com muitas cópias (`-2`, `-1024x…`). A hero da home é um PNG de 2 MB e a do Vet-MR Grande tem 2,9 MB.
- **Fonte carregada à toa:** o CSS importa ADLaM Display do Google Fonts. Vale confirmar se ela é usada em algum lugar; se não for, é uma requisição a menos.

## 3. Proposta de reinvenção

### Ideia central: "A vida inteira do equipamento"

A assinatura do logo já diz "Taking care of your equipment". O que separa a Hexamedical de um distribuidor qualquer é acompanhar o equipamento da escolha ao fim da vida útil: projeto da sala, içamento do magneto, comissionamento, manutenção e laboratório. O site deve **mostrar essa operação por dentro**, e não descrevê-la em parágrafos.

Dois recursos visuais nascem do próprio assunto e servem de assinatura:

- **O túnel da ressonância (o "bore")** como moldura circular para fotos e vídeos. É reconhecível, só existe nesse setor e não é ornamento genérico.
- **O hexágono do logo** usado uma vez por página, como máscara de imagem ou marcador de seção, nunca espalhado como enfeite.

### Sistema visual novo

| Elemento | Hoje | Proposta |
| --- | --- | --- |
| Cor | Branco e cinza com 6 laranjas | **Grafite profundo como "palco"** para equipamentos, branco clínico para leitura e **um único laranja** como sinal (CTA, estado ativo e destaque de dado). HexAI e WDM viram variações de acento dentro do mesmo sistema. |
| Tipografia | Source Sans 3 em 41 tamanhos | Uma display de caráter técnico para títulos curtos, Source Sans para texto e **6 passos de escala**. Números de especificação com algarismos tabulares e em destaque. |
| Estrutura | Rótulos, 01/02/03, linhas e cards com borda | Hierarquia por escala, tom de fundo e imagem. Sem rótulo acima de título, sem numeração decorativa e sem caixas de 1 px. |
| Imagem | Recortes em caixa cinza e fotos de banco | **Produto no palco escuro**, com luz lateral e escala humana. **Fotografia documental** da equipe e do laboratório. Imagens de RM reais como textura no HexAI. |
| Movimento | Quase nenhum | **Um movimento-assinatura** por página, com o resto contido. Sempre com `prefers-reduced-motion`. |

### Home reestruturada

1. **Hero em vídeo real** (loop curto do laboratório, de uma instalação ou de um técnico em campo) dentro da moldura circular do túnel, com título curto: "Do projeto da sala à última manutenção." O Magnífico deixa de ser a porta de entrada do site institucional.
2. **"A vida do equipamento" em rolagem:** uma cena fixa que acompanha um equipamento por seis etapas (escolha, projeto, içamento, comissionamento, manutenção e laboratório), cada uma com foto real. É o momento memorável da home.
3. **Showroom do portfólio:** RM, Bombas, Mindray, HexAI e Veterinária no palco escuro, com filtro por modalidade. Todas as linhas ficam visíveis, e nenhuma fica escondida em lista de links.
4. **Prova:** vídeo do CEO, números aprovados (equipamentos atendidos, anos de operação, técnicos), mapa de cobertura se houver aprovação e logos de clientes autorizados.
5. **Contato como triagem:** "Quero comprar", "Preciso de manutenção" e "Tenho uma peça para reparo", cada um com campos próprios, em vez de um `mailto`.

### Páginas-chave

- **Linha de RM:** comparador interativo em que você escolhe a anatomia ou o tipo de exame e o site indica o sistema. Inclui uma tabela de especificações lado a lado e a **planta da sala em escala** (m² e kW desenhados), que transforma dado técnico em decisão.
- **Página de produto:** o equipamento ocupa a primeira tela no celular também, com giro 360° ou galeria de vistas oficiais. Bobinas aparecem como galeria tátil e especificações como placar.
- **G-scan:** controle deslizante "sem carga × com carga" com imagens clínicas aprovadas.
- **HexAI:** comparação arrastável de antes e depois (tempo e qualidade de varredura), com a imagem inteira e legível, e o fluxo de integração em três passos visuais.
- **Serviços:** linha do tempo do chamado (abertura, diagnóstico, intervenção, teste e entrega) com foto real em cada etapa. A preventiva e a corretiva ficam explicadas lado a lado.
- **Estrutura:** ensaio fotográfico em tela cheia, um ambiente por cena (salas de teste, eletrônica, criogenia, treinamento e showroom com gaiola de RM), com legenda funcional.
- **Bombas e Mindray:** catálogo com filtros por modalidade, foto padronizada no mesmo palco e ficha em PDF por modelo.
- **Veterinária:** mesma base visual, com fotografia de animais e equipe e as páginas WDM integradas ao sistema, sem paleta paralela.
- **Sobre:** linha do tempo da empresa, rostos da equipe e vídeo do CEO, sem missão, visão e valores genéricos.
- **Blog:** layout de revista com destaque, categorias e o conteúdo integral migrado do CMS.

### O que depende de produção de conteúdo

A reinvenção só se sustenta com imagem real. A maior alavanca é **uma diária de foto e vídeo** na sede e em uma instalação: laboratório, criogenia, equipe, técnico em campo, içamento ou comissionamento e showroom. Tudo deve sair com autorização de imagem. Sem isso, o redesign volta a depender de recorte de catálogo e foto de banco. A geração com Higgsfield, conforme o playbook de 26/10, pode servir para atmosfera e movimento, nunca para representar o equipamento.

### Fundação técnica

- **Pré-renderização das rotas**, com SSG no Vite ou migração para Astro ou Next, para que cada página tenha título, descrição e Open Graph próprios no HTML.
- **Divisão do bundle por rota.**
- **Pipeline de imagem** com AVIF e WebP responsivos e `srcset`, sem cópias duplicadas no acervo de 70 MB. Vídeos com poster e carregamento sob demanda.
- **Tokens únicos de cor, tipo e espaço** em `index.css`, com o CSS editorial desminificado.
- **Meta de Lighthouse** em 90 ou mais para Performance, Acessibilidade e SEO no celular.

## 4. Ordem sugerida

1. **Agora, em produção (com autorização):** logo, firewall da Vercel, título e H2, foto do Accutron e faixa vazia.
2. **Fundação:** tokens, tipografia, palco escuro, molduras de assinatura, pré-renderização e pipeline de imagem.
3. **Captação:** diária de foto e vídeo com autorizações.
4. **Templates:** home, linha de RM com comparador, página de produto, Serviços e Estrutura.
5. **Demais linhas:** Bombas, Mindray, HexAI e Veterinária com WDM integrado.
6. **Institucional e conteúdo:** Sobre, Blog migrado e contato integrado. As pendências de catálogo e jurídicas da auditoria de 24/10 continuam bloqueando o lançamento.
