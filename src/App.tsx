import { Toaster } from "@/components/ui/toaster";
import RouteErrorBoundary from "@/components/RouteErrorBoundary";
import RouteScroll from "@/components/RouteScroll";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { legacyRedirects } from "@/data/routes";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
const Index = lazy(() => import("./pages/Index"));
const SolucoesHub = lazy(() => import("./pages/solucoes/SolucoesHub"));
const RmLinePage = lazy(() => import("./pages/solucoes/RmLinePage"));
const ProductPage = lazy(() => import("./pages/solucoes/ProductPage"));
const LinePage = lazy(() => import("./pages/solucoes/LinePage"));
const ServicosHub = lazy(() => import("./pages/servicos/ServicosHub"));
const ProductEditorialPage = lazy(() => import("./pages/ProductEditorialPage"));
const ServicePage = lazy(() => import("./pages/servicos/ServicePage"));
const EmpresaPage = lazy(() => import("./pages/empresa/EmpresaPage"));
const ContatoPage = lazy(() => import("./pages/empresa/ContatoPage"));
const OuvidoriaPage = lazy(() => import("./pages/empresa/OuvidoriaPage"));
const MateriaisPage = lazy(() => import("./pages/empresa/MateriaisPage"));
const LegalPage = lazy(() => import("./pages/empresa/LegalPage"));
const BlogIndex = lazy(() => import("./pages/blog/BlogIndex"));
const BlogPost = lazy(() => import("./pages/blog/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Redirecionamentos internos: o dev server e os links dentro do app se comportam como a produção.
const clientRedirects = legacyRedirects.filter(({ source }) => /^\/(solucoes|servicos|sobre|estrutura|conteudo|segmentos|cases)(\/|$)/.test(source));

// Linhas montadas com o kit (LinePage + lines em src/data/pages/solutions.ts).
const lineSlugs = ["bombas-injetoras", "radiografia-digital", "densitometria", "hexai", "veterinaria"];
// Páginas que ainda abrem na página antiga, até as próximas tarefas da fase 2 trocá-las pelo kit
// (Magnifico Open na Task 8, Careverse na Task 9; Vet-MR Grande sem página nova decidida).
const pendingLines = ["magnifico-open", "careverse", "vet-mr-grande"];

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {/* v7_startTransition: a página atual fica na tela enquanto o pacote da próxima carrega. */}
        <BrowserRouter future={{ v7_startTransition: true }}>
          <RouteScroll />
          {/* Cada rota é um pacote próprio: o GSAP e o palco só descem na home. */}
          <RouteErrorBoundary>
          <Suspense fallback={<div className="route-loading" aria-hidden="true" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/solucoes" element={<SolucoesHub />} />
            {clientRedirects.map(({ source, destination }) => (
              <Route key={source} path={source} element={<Navigate to={destination} replace />} />
            ))}
            <Route path="/servicos" element={<ServicosHub />} />
            <Route path="/solucoes/ressonancia-magnetica" element={<RmLinePage />} />
            {lineSlugs.map((slug) => (
              <Route key={slug} path={`/solucoes/${slug}`} element={<LinePage slug={slug} />} />
            ))}
            {pendingLines.map((slug) => (
              <Route key={slug} path={`/solucoes/${slug}`} element={<ProductEditorialPage slug={slug} />} />
            ))}
            {/* Produtos (O-scan SMART, S-scan Open, G-scan Open e os modelos veterinários WDM); slug desconhecido mostra a 404 do sistema. */}
            <Route path="/solucoes/:slug" element={<ProductPage />} />
            {/* Serviços (manutenção, contratos, instalação, reparo); slug desconhecido mostra a 404 do sistema. */}
            <Route path="/servicos/:slug" element={<ServicePage />} />
            {/* Institucional (empresa, contato, ouvidoria, materiais e páginas legais), montado com o kit. */}
            <Route path="/empresa" element={<EmpresaPage />} />
            <Route path="/contato" element={<ContatoPage />} />
            <Route path="/ouvidoria" element={<OuvidoriaPage />} />
            <Route path="/materiais" element={<MateriaisPage />} />
            <Route path="/politica-de-privacidade" element={<LegalPage kind="privacidade" />} />
            <Route path="/termos" element={<LegalPage kind="termos" />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
          </RouteErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
