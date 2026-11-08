import { blogPosts } from "@/data/blog";

export interface LegacyRedirect {
  source: string;
  destination: string;
}

/**
 * URLs antigas do site em produção e slugs internos antigos do repositório.
 * Fontes sem barra final: o vercel.json repete cada uma com e sem barra.
 * Fonte única: o teste confere o vercel.json contra esta lista.
 * Os pares que só mudariam a barra final (/servicos/, /contato/, /ouvidoria/, /blog/) ficam de fora:
 * a Vercel ignora a barra final ao casar, então um redirect para o mesmo caminho viraria laço.
 */
export const legacyRedirects: LegacyRedirect[] = [
  { source: "/produtos", destination: "/solucoes" },
  { source: "/rm-esaote-magnifico-open", destination: "/solucoes/magnifico-open" },
  { source: "/rm-esaote-s-scan", destination: "/solucoes/s-scan-open" },
  { source: "/rm-esaote-o-scan", destination: "/solucoes/o-scan-smart" },
  { source: "/rm-esaote-g-scan", destination: "/solucoes/g-scan" },
  { source: "/bombas-injetoras", destination: "/solucoes/bombas-injetoras" },
  { source: "/mindray", destination: "/solucoes/radiografia-digital" },
  { source: "/hexai", destination: "/solucoes/hexai" },
  { source: "/area-veterinaria", destination: "/solucoes/veterinaria" },
  { source: "/area-veterinaria-hexamedical", destination: "/solucoes/veterinaria" },
  { source: "/lp/careverse", destination: "/solucoes/careverse" },
  { source: "/manutencao-de-equipamentos", destination: "/servicos/manutencao" },
  { source: "/contratos-de-manutencao", destination: "/servicos/contratos" },
  { source: "/desinstalacao-e-instalacao-de-equipamentos", destination: "/servicos/instalacao" },
  { source: "/reparo-de-pecas-e-perifericos", destination: "/servicos/reparo" },
  { source: "/apoio", destination: "/materiais" },
  { source: "/sobre", destination: "/empresa" },
  { source: "/estrutura", destination: "/empresa" },
  { source: "/conteudo", destination: "/blog" },
  { source: "/segmentos", destination: "/solucoes" },
  { source: "/segmentos/:slug", destination: "/solucoes" },
  { source: "/cases", destination: "/solucoes" },
  // Slugs internos antigos
  { source: "/solucoes/rm-s-scan", destination: "/solucoes/s-scan-open" },
  { source: "/solucoes/rm-o-scan", destination: "/solucoes/o-scan-smart" },
  { source: "/solucoes/rm-g-scan", destination: "/solucoes/g-scan" },
  { source: "/solucoes/rm-magnifico-open", destination: "/solucoes/magnifico-open" },
  { source: "/solucoes/mindray", destination: "/solucoes/radiografia-digital" },
  { source: "/solucoes/veterinario", destination: "/solucoes/veterinaria" },
];

/** Rotas públicas (sem barra final). As tarefas seguintes montam o sitemap a partir daqui. */
export const publicRoutes: string[] = [
  "/",
  "/solucoes",
  "/solucoes/ressonancia-magnetica",
  "/solucoes/magnifico-open",
  "/solucoes/s-scan-open",
  "/solucoes/o-scan-smart",
  "/solucoes/g-scan",
  "/solucoes/bombas-injetoras",
  "/solucoes/radiografia-digital",
  "/solucoes/densitometria",
  "/solucoes/hexai",
  "/solucoes/careverse",
  "/solucoes/veterinaria",
  "/solucoes/vet-mr-grande",
  "/solucoes/ispace-1-5t-vet",
  "/solucoes/turbotom-1s-vet",
  "/solucoes/turbotom-1s-lite-vet",
  "/servicos",
  "/servicos/manutencao",
  "/servicos/contratos",
  "/servicos/instalacao",
  "/servicos/reparo",
  "/empresa",
  "/contato",
  "/ouvidoria",
  "/materiais",
  "/blog",
  ...blogPosts.map((post) => `/blog/${post.slug}`),
  "/politica-de-privacidade",
  "/termos",
];
