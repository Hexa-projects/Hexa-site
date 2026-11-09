# Auditoria de conteúdo e migração — Hexamedical

Data: 24/10/2026. Escopo: comparar o site público atual com a prévia local do redesign. Este documento é um inventário editorial e funcional, **não** uma declaração de que as páginas foram implementadas ou aprovadas para produção.

## Estado após a implementação da prévia

O inventário abaixo retrata o diagnóstico original, antes das mudanças desta rodada. A prévia agora contém páginas próprias para o hub de soluções, comparativo de RM, S-scan Open, O-scan SMART, G-scan Open, Bombas, Mindray, HexAI, Veterinária (Vet-MR Grande, Magnifico VET e O-scan VET), hub de serviços, quatro serviços, Estrutura, Sobre, Contato e Conteúdo. Modelos de RM usam imagens oficiais da geração correspondente; as páginas de Mindray incluem quatro folhetos públicos por modelo. O conteúdo demonstrativo de cases, artigos resumidos, materiais sem arquivo, segmentos sem fonte e formulário que simulava envio saiu da navegação ou foi substituído por um estado honesto. A Ouvidoria continua vinculada ao sistema público existente. O menu desktop foi corrigido para abrir com foco por teclado, permitir acesso aos links filhos e fechar com Escape.

**Decisão de versão:** o site atual vende G-scan Brio, mas o pedido anterior de Lucas foi usar o modelo novo oficial. A prévia foi atualizada para **G-scan Open**, com fonte e imagem da Esaote; **a equipe de produto ainda precisa confirmar a disponibilidade e a configuração comercial no Brasil** antes de lançar a substituição. Não redirecionar a URL antiga do Brio para Open sem essa aprovação.

**Ainda bloqueia lançamento:** aprovação técnica/comercial do catálogo e dos documentos, direitos de uso da mídia, exportação do blog, inventário de materiais, fotos autorizadas de estrutura/equipe, integração real do contato com consentimento e antispam, textos jurídicos aprovados, mapa de redirecionamentos/SEO e testes de ponta a ponta. A política e os termos na prévia são apenas estados explícitos de revisão, não documentos legais. Nenhum deploy foi autorizado nesta rodada.

## Critério de migração

- Preservar conteúdo, mídia, documentos, funcionalidades e URLs públicas que tenham valor. Redesenhar a apresentação, não apagar a substância.
- Separar fato confirmado, afirmação comercial a validar e texto novo proposto. Não publicar métricas, depoimentos, cases ou garantias que não tenham fonte e aprovação.
- Criar páginas específicas por produto e serviço. O template atual de `SolutionPage.tsx`/`ServicePage.tsx` não equivale a uma página concluída.
- Preservar a landing page Magnifico Open, já redesenhada, como experiência independente. Careverse é outra propriedade e fica fora deste escopo.
- Manter a Ouvidoria em funcionamento no site atual até que formulário, protocolo, acesso sigiloso, anexos e privacidade sejam migrados e testados em uma solução adequada.
- Não colocar a nova versão em produção sem autorização explícita e sem integração real dos formulários.

## Diagnóstico geral da prévia

A home é a única página com uma direção visual substancialmente desenvolvida. As demais rotas se distribuem entre hubs genéricos, dois templates repetidos, páginas institucionais curtas e conteúdo demonstrativo. A navegação nova acrescenta páginas que não equivalem a páginas públicas do site atual (`/segmentos/clinicas`, `/segmentos/hospitais`, `/cases`, `/sobre`, entre outras). Isso pode ser útil depois, mas não pode substituir páginas existentes nem parecer conteúdo comprovado.

Prioridades transversais:

1. Corrigir catálogo e nomenclatura antes de desenhar páginas: **S-scan Open**, **O-scan SMART**, **G-scan Brio** e respectivos atributos; não misturar gerações. A prévia atualmente chama S-scan de 0,25 T / 16 m² / 3 kW / 6 bobinas, enquanto a página atual de S-scan Open informa 0,4 T / 20 m² / 2 kW / 14 bobinas, e a Esaote confirma 20 m², 2 kW e 14 bobinas. A confirmação de campo magnético por versão/comercialização deve ser feita com ficha vigente.
2. Dar a cada página de produto sua própria imagem principal, aplicações, arquitetura, acessórios, evidências e downloads. Não repetir a mesma imagem como hero e ilustração em todas as dobras.
3. Auditar cada CTA e destino; a prévia usa formulário demonstrativo. O contato público informa `+55 11 97314-0914`, `comercial@hexamedical.com.br` e horário comercial. Não substituir por telefone, SLA ou promessa inventados.
4. Preservar SEO com mapa de redirecionamentos, títulos, descrições, canonicals e verificação de links. As URLs novas não correspondem às antigas.
5. Confirmar licença/proveniência e versões dos arquivos de mídia e PDFs. As páginas atuais de O-scan e G-scan mostram links de documentação rotulados como S-scan; não copiar esse erro.

## Matriz página por página

### 1. Home

- Atual: <https://www.hexamedical.com.br/>. Conteúdo: diagnóstico por imagem, linhas de produtos e serviços, manutenção, laboratório eletrônico, equipe, depoimentos e vídeo do CEO. CTAs para vendas e páginas de linha.
- Prévia: `/` — composição visual mais madura, porém a adaptação editorial completa do acervo e das provas ainda precisa ser conferida.
- Adaptar: explicitar o sistema “equipamento + implantação + suporte”; usar fotos/vídeo existentes onde comprovados; manter acesso claro aos quatro eixos comerciais (RM, outras linhas, HexAI, serviços) e à Veterinária. Não repetir promessas de “retorno garantido” sem evidência.
- Aceite: todos os eixos levam a páginas reais; fotos não representam produto diferente; CTAs funcionam; versão móvel mostra hierarquia e equipamento corretamente.

### 2. Hub de produtos

- Atual: <https://www.hexamedical.com.br/produtos/>. Cards para Magnifico Open, S-scan Open, O-scan SMART e G-scan Brio; o menu inclui Bombas Injetoras, Mindray e HexAI.
- Prévia: `/solucoes` — concentra RM e HexAI, mas não cobre Bombas Injetoras, Mindray nem Veterinária.
- Adaptar: navegação por **modalidade/aplicação** com todas as linhas existentes, imagens oficiais proporcionais e nomes exatos. O comparativo de RM deve distinguir sistema aberto whole-body, MSK aberto, extremidades e carga, sem falsos atributos.
- Aceite: nenhum produto publicado fica órfão; cada card abre uma página correspondente e usa imagem da versão certa.

### 3. Linha de ressonância magnética

- Atual: distribuída no hub de produtos e nas quatro páginas de RM.
- Prévia: `/solucoes/ressonancia-magnetica` — template de produto genérico, sem comparativo realmente útil.
- Adaptar: criar um seletor/comparativo editorial com anatomias, posicionamento, tipo de exame e requisitos de instalação; detalhes técnicos somente após validação por modelo. Mostrar o Magnifico como destino para sua LP independente.
- Aceite: a decisão entre os modelos é compreensível sem uma lista de benefícios intercambiáveis.

### 4. Magnifico Open

- Atual: <https://www.hexamedical.com.br/rm-esaote-magnifico-open/> — LP própria já redesenhada.
- Prévia: `/solucoes/rm-magnifico-open` — template redundante, com conteúdo que pode divergir da LP.
- Adaptar: manter uma única página canônica; cartões do novo site devem apontar para a LP existente. Auditar apenas navegação, identidade compartilhada, analytics, SEO e contato.
- Aceite: sem duplicidade de conteúdo/canonical e sem regressão do vídeo/experiência da LP.

### 5. S-scan Open

- Atual: <https://www.hexamedical.com.br/rm-esaote-s-scan/>. Foco MSK, arquitetura aberta, mesa giratória, aplicações, bobinas, imagens e documentação; informa 14 bobinas, 20 m² e 2 kW.
- Prévia: `/solucoes/rm-s-scan` — conteúdo e especificações misturam S-scan anterior com **S-scan Open** (6 bobinas, 16 m², 3 kW, 0,25 T). **Não aprovar para publicação.**
- Adaptar: narrativa própria de acesso/posicionamento; produto fotografado inteiro, detalhe da mesa, painel de aplicações MSK e galeria de bobinas com opção marcada. Atualizar copy e dados a partir da Esaote e da ficha comercial brasileira vigente.
- Aceite: versão do equipamento, fotos, números, bobinas e arquivos de download coincidem entre si.

### 6. O-scan SMART

- Atual: <https://www.hexamedical.com.br/rm-esaote-o-scan/>. RM dedicada a extremidades; 0,31 T, 9 m², menos de 1 kW, bobinas de joelho/mão/pé e argumentos de fluxo e conforto.
- Prévia: `/solucoes/rm-o-scan` — template genérico, sem demonstrar claramente anatomias, assento/posicionamento e integração como unidade adicional.
- Adaptar: página centrada no uso para extremidades, com equipamento em escala correta, anatomias atendidas, fluxo de paciente e bobinas; evitar sugerir suporte de peso ou corpo inteiro.
- Aceite: imagem e copy mostram o O-scan SMART, sem confusão com outros sistemas; documentos são realmente do O-scan.

### 7. G-scan Brio

- Atual: <https://www.hexamedical.com.br/rm-esaote-g-scan/>. Diferencial de RM com carga e inclinação para MSK; 23 m², 12 bobinas, consumo abaixo de 3 kW, comparação entre posições, depoimento e documentação.
- Prévia: `/solucoes/rm-g-scan` — template genérico; a mídia do produto foi atualizada, mas a história de posição/carga não está desenvolvida.
- Adaptar: construir demonstração visual de aquisição sem carga × com carga, imagem oficial atual, explicação clínica cautelosa, acessórios e requisitos; confirmar disponibilidade/regulatório para o mercado de destino antes de qualquer CTA comercial.
- Aceite: nomenclatura **Brio**, produto da geração correta, sem prometer resultado clínico universal.

### 8. Bombas Injetoras

- Atual: <https://www.hexamedical.com.br/bombas-injetoras/>. Separação por RM, tomografia e hemodinâmica; múltiplos modelos Accutron e fichas técnicas.
- Prévia: **não existe página equivalente**.
- Adaptar: página de linha com filtros por modalidade, cards com foto real e ficha por modelo, CTA comercial. Revisar a própria página atual antes de reutilizar: há texto duplicado e observação editorial “corrigir fotos 1 e 3” visível no HTML.
- Aceite: modelos e PDFs corretos por modalidade; sem imagem trocada; filtros operantes.

### 9. Mindray

- Atual: <https://www.hexamedical.com.br/mindray/>. Radiografia digital fixa/móvel e detector flat panel; DigiEye 350/330, MobiEye 700 e detector, com fichas.
- Prévia: **não existe página equivalente**.
- Adaptar: páginas ou seções por categoria com imagem do equipamento correspondente, aplicações e ficha técnica verificadas. Não carregar o hero duplicado de bombas que aparece no HTML atual.
- Aceite: cada produto possui fotografia e ficha correspondentes; alegações como autonomia/exposições são confirmadas em documentação vigente.

### 10. HexAI

- Atual: <https://www.hexamedical.com.br/hexai/>. Apresenta SwiftMR, compatibilidade, fluxo de instalação/configuração/monitorização e imagem de comparação de varredura.
- Prévia: `/solucoes/hexai` — template genérico de RM, inadequado para software/IA. A imagem de comparação é recortada no hero.
- Adaptar: página própria de software, com comparação legível, explicação de onde entra no fluxo, integração, etapas de implantação e limites do que foi comprovado. “Até 40%” e promessas financeiras precisam de fonte, premissas e aprovação.
- Aceite: nenhuma imagem diagnóstica cortada; CTA legível; claims clínicos/comerciais documentados.

### 11. Hub de serviços

- Atual: <https://www.hexamedical.com.br/servicos/>. Quatro serviços: manutenção, instalação/desinstalação, contratos, reparo.
- Prévia: `/servicos` — cards genéricos e serviço extra “Visita Técnica” sem página pública autônoma equivalente.
- Adaptar: leitura orientada ao problema do cliente e ao tipo de serviço, com fotos reais de equipe/laboratório e links diretos. “Visita Técnica” pode ser uma oferta dentro da manutenção/instalação até haver escopo aprovado.
- Aceite: todos os quatro serviços públicos aparecem e nenhum CTA aponta a alias quebrada do site antigo.

### 12. Manutenção de equipamentos

- Atual: <https://www.hexamedical.com.br/manutencao-de-equipamentos/>. Preventiva/corretiva para RM, TC e hemodinâmica; cobertura, equipe e estrutura.
- Prévia: `/servicos/manutencao` — lista de escopo com promessas extras (SLA de 24 h, suporte imediato, peças homologadas) sem evidência na fonte pública.
- Adaptar: página de operação com modalidades atendidas, preventiva × corretiva, etapas de chamado e infraestrutura. Validar escopo e SLA com a equipe antes de publicar.
- Aceite: diferencia claramente manutenção de contrato; não promete prazos ou garantias sem aprovação.

### 13. Desinstalação e instalação

- Atual: <https://www.hexamedical.com.br/desinstalacao-e-instalacao-de-equipamentos/>. Serviços de instalação/desinstalação e manutenções avulsas, cobertura e equipe.
- Prévia: `/servicos/instalacao` — adiciona projeto completo de sala, transporte especializado, testes de aceitação e remanejamento, ainda não confirmados na fonte.
- Adaptar: sequência visual do processo real: avaliação, desmontagem/instalação, comissionamento e entrega — apenas fases efetivamente prestadas e aprovadas. Fotos documentais, não fotos genéricas.
- Aceite: escopo técnico assinado internamente; CTA específico de orçamento.

### 14. Contratos de manutenção

- Atual: <https://www.hexamedical.com.br/contratos-de-manutencao/>. Planos personalizados com/sem peças, preventiva/corretiva e suporte ao longo do contrato. CTA final da página atual fala erroneamente de desinstalação.
- Prévia: `/servicos/contratos` — contém categorias de planos, prioridade e SLA que não constam na fonte pública.
- Adaptar: explicar componentes configuráveis do contrato, cobertura e jornada comercial sem inventar níveis fixos. Corrigir o CTA de origem.
- Aceite: diferenças entre modalidades de contrato claras; termos jurídicos e SLA validados.

### 15. Reparo de peças e periféricos

- Atual: <https://www.hexamedical.com.br/reparo-de-pecas-e-perifericos/>. Bobinas, placas, módulos, fontes e periféricos em laboratório; análise, recuperação e teste. CTA final também fala incorretamente de desinstalação.
- Prévia: `/servicos/reparo` — afirma garantia de 6–12 meses sem fonte pública.
- Adaptar: visual do laboratório real, fluxo entrada → diagnóstico → reparo → teste e classes de componente; comprovações técnicas e garantias aprovadas.
- Aceite: fotos reais/legíveis, sem promessa de garantia não aprovada, CTA de avaliação de peça.

### 16. Estrutura

- Atual: <https://www.hexamedical.com.br/estrutura/>. Três salas de testes, laboratórios de eletrônica/criogenia, salas de treinamento, showroom com gaiola de RM e classes de componentes reparados.
- Prévia: `/estrutura` — reduz a estrutura a quatro afirmações genéricas e uma imagem.
- Adaptar: ensaio visual da operação real, com fotografias de cada ambiente, legenda funcional e ligação contextual aos serviços. Conferir se instalações e números continuam atuais antes de publicar.
- Aceite: cada área relevante é representada ou explicitamente marcada pendente de foto; sem estoque ilustrativo fingindo ser Hexamedical.

### 17. Contato

- Atual: <https://www.hexamedical.com.br/contato/>. Telefone `+55 11 97314-0914`, `comercial@hexamedical.com.br`, horário comercial e formulário.
- Prévia: `/contato` — formulário demonstrativo e informações/garantias não verificadas; não está pronta para produção.
- Adaptar: separar intenção comercial, suporte e demais assuntos sem criar canais falsos; integrar backend, consentimento, validação, antispam, confirmação e tratamento de erro. Preservar dados de contato públicos confirmados.
- Aceite: envio de teste recebido no destino autorizado, sem perda de dados e com política de privacidade correta.

### 18. Área Veterinária

- Atual: <https://www.hexamedical.com.br/area-veterinaria-hexamedical/>. Magnifico VET, Vet-MR Grande, O-scan VET, serviços e laboratório, equipe e posts.
- Prévia: `/segmentos` e `/segmentos/:slug` — **não representam** a linha veterinária; são quatro páginas genéricas de segmentos humanos.
- Adaptar: página própria de Veterinária com arquitetura e imagens da linha, anatomias/espécies com copy revisada e links para produtos realmente publicados. Não redirecionar para “Clínicas” genérico.
- Aceite: linha VET inteira encontra-se no menu e cada produto tem destino real ou estado editorial explícito.

### 19. Vet-MR Grande

- Atual: <https://www.hexamedical.com.br/rm-esaote-vet-grande/>. Treinamento, uso para animais de diferentes portes, aplicações, bobinas, imagens clínicas e documentos; números próprios do produto.
- Prévia: **não existe página equivalente**.
- Adaptar: narrativa específica veterinária, imagem oficial, bobinas por espécie/anatomia, imagens clínicas e treinamento. Revisar documentação: a página atual exibe links de S-scan em seção de Vet-MR.
- Aceite: evidência de configuração e documentos realmente de Vet-MR Grande.

### 20. Magnifico VET e O-scan VET

- Atual: cards na área veterinária apontam para rotas cujos conteúdos públicos não estavam disponíveis de forma estável na auditoria.
- Prévia: **não existem páginas equivalentes**.
- Adaptar: não inventar páginas técnicas a partir do card. Solicitar catálogo/fichas autorizadas ou recuperar conteúdo do CMS; até lá, cards podem conduzir à equipe comercial com descrição claramente verificada.
- Aceite: conteúdo aprovado pela especialista e links resolvidos.

### 21. Blog

- Atual: <https://www.hexamedical.com.br/blog/>. Busca e categorias aparecem, mas o feed completo não é acessível no HTML público analisado.
- Prévia: `/blog` e `/blog/:slug` — três textos curtos em `src/data/blog.ts`; não são migração comprovada dos artigos integrais.
- Adaptar: exportar artigos do CMS (título, data, autor, categoria, corpo, mídia, URL e SEO), criar listagem/busca e páginas de leitura com conteúdo integral. Não publicar paráfrases de três parágrafos como se fossem artigos originais.
- Aceite: contagem de artigos, URLs, mídia e metadados reconciliados com exportação; links antigos redirecionados.

### 22. Materiais de Apoio

- Atual: <https://www.hexamedical.com.br/apoio/>. A página anuncia vídeos e guias, mas nenhum arquivo público apareceu no conteúdo renderizado da auditoria.
- Prévia: `/materiais` — quatro cards com títulos, sem downloads reais.
- Adaptar: obter inventário de materiais e permissão de distribuição; se não houver, criar estado honesto de contato/solicitação em vez de quatro downloads falsos.
- Aceite: cada item possui arquivo ou destino funcional e versão identificada.

### 23. Ouvidoria

- Atual: <https://www.hexamedical.com.br/ouvidoria/>. Fluxo sensível com registro anônimo/confidencial/identificado, anexos, protocolo/código sigiloso, acompanhamento e mensagens.
- Prévia: **não existe rota**.
- Adaptar: trabalho funcional e de privacidade separado do redesign de marketing. Manter link ao sistema existente até que haja migração autorizada, testes de segurança e equivalência do fluxo.
- Aceite: anonimato, sigilo, custódia, anexos, recuperação/consulta e consentimento testados; nunca substituir por formulário comum.

## Rotas criadas na prévia sem equivalente público confirmado

- `/segmentos/clinicas`, `/segmentos/hospitais`, `/segmentos/centros-de-imagem`, `/segmentos/universidades`: landing pages genéricas; podem ser propostas futuras, mas precisam de conteúdo e prova por segmento.
- `/empresa` e `/sobre`: o site atual não oferece material suficiente para missão/visão/valores inventados. Exigem briefing institucional aprovado.
- `/cases`: três cases demonstrativos sem cliente ou resultado verificável; remover da navegação pública até existirem autorizações e provas.
- `/servicos/visita-tecnica`: oferta citada dentro de serviços existentes, sem página pública autônoma; confirmar escopo.
- `/conteudo`: hub editorial novo; só publicar quando blog e materiais tiverem conteúdo real.
- `/politica-de-privacidade` e `/termos`: não copiar textos-modelo; revisar versões jurídicas atuais antes do lançamento.

## Acervo disponível na prévia e lacunas de mídia

O diretório `public/assets/hexa` já contém imagens baixadas do WordPress e um `manifest.json` com URL de origem por arquivo. Exemplos úteis para a curadoria: `csm_esaote-s-scan-hero_46ed91e4e2.webp`, `oscan.webp`, `esaote-g-scan-open-official.webp`, `csm_esaote-vet-MR-grande-hero_d211219025-1024x802.webp`, `magnifico-vet.webp`, `estrutura-1.png`, `Imagem-manutencao.webp`, `Contrato-de-manutencoes-foto.webp`, `Reparo-de-Pecas-e-Eletronicas-foto.webp` e `varredura-hexai-1024x576.webp`. Há muitas cópias e miniaturas com sufixos `-2`, `-1024x...`; selecionar a maior fonte válida após inspeção visual, não pelo nome apenas. O acervo local **não contém PDF ou vídeo** em `public`/`assets` nesta revisão. Logo, fichas, brochuras, declarações e vídeo do CEO ainda dependem de localização, permissão, integridade e links de origem.

Antes de usar uma imagem de produto, conferir: modelo e geração, vista correta, resolução intrínseca, proporção sem corte, legenda, `alt` e origem. A foto do G-scan já foi objeto de troca na prévia; não assumir que qualquer arquivo que contenha “g-scan” retrate o Brio atual.

## Pendências de fonte e aprovação

- Exportação do blog do CMS, incluindo URLs anteriores e imagens originais.
- Fichas técnicas e documentos vigentes de todas as linhas (sobretudo S-scan Open, Bombas, Mindray e Veterinária), com confirmação de comercialização/configuração no Brasil.
- Escopo técnico, SLA e garantia de cada serviço, aprovados pela operação; a prévia contém promessas que não aparecem nas fontes públicas.
- Fotos reais da estrutura/equipe, depoimentos com autorização e cases com cliente/resultado verificável.
- Integração oficial para Contato e plano separado para a Ouvidoria, com revisão jurídica e de segurança.

## Ordem de execução proposta

1. **Saneamento factual e navegação:** planilha de produto aprovada (modelo/geração/spec/arquivo/foto), mapa de URLs, remoção de claims inventados e rotas demonstrativas da navegação.
2. **Páginas comerciais prioritárias:** hub de produtos, linha de RM, S-scan Open, O-scan SMART, G-scan Brio, Bombas, Mindray, HexAI. Magnifico permanece independente.
3. **Serviços:** hub e quatro páginas próprias, seguidas de Estrutura.
4. **Conversão e segmento:** Contato integrado; Veterinária, Vet-MR e demais produtos VET após recuperação da fonte.
5. **Conteúdo institucional:** Blog após exportação CMS, Materiais após inventário, páginas institucionais após briefing, Ouvidoria em trilha de segurança separada.
6. **Validação de lançamento:** responsividade, acessibilidade, mídia, conteúdo médico/comercial, formulários, SEO/redirecionamentos, consentimento e testes ponta a ponta. Deploy apenas com autorização explícita.

## Fontes primárias para o catálogo

- <https://www.esaote.com/en-US/magnetic-resonance/magnetic-resonance-system/s-scan-open/>
- <https://www.esaote.com/en-US/magnetic-resonance/magnetic-resonance-system/o-scan-smart/>
- <https://www.esaote.com/en-NL/magnetic-resonance/magnetic-resonance-system/g-scan-brio/>

As fontes acima não substituem a confirmação de disponibilidade, configuração e registro aplicável ao Brasil junto à equipe de produto da Hexamedical.
