# Projeto do site Hexamedical

Este pacote inclui o código-fonte do site (React, TypeScript e Vite), arquivos de configuração, conteúdo e imagens em `public/`, as landing pages de TC veterinária em `public-wdm-ct/`, além dos builds `dist/` (site principal) e `output/wdm-ct-origin/` (LPs de TC).

## Executar localmente

1. Instale Node.js e npm.
2. Na pasta do projeto, execute `npm ci`.
3. Execute `npm run dev` para desenvolvimento ou `npm run build` para gerar o site principal.
4. Para gerar separadamente as LPs de TC, execute `node node_modules/vite/bin/vite.js build --config vite.wdm-ct.config.ts`.

O pacote não inclui `node_modules/`, caches, arquivos temporários, credenciais ou o histórico Git. A publicação atual usa projetos e regras de roteamento na Vercel; essas configurações remotas não são transferidas automaticamente pelo ZIP.
