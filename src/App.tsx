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
const ServicosHub = lazy(() => import("./pages/ServicosHub"));
const ProductEditorialPage = lazy(() => import("./pages/ProductEditorialPage"));
const WdmVetPage = lazy(() => import("./pages/WdmVetPage"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const Ouvidoria = lazy(() => import("./pages/OuvidoriaTemp"));
const Contato = lazy(() => import("./pages/Contato"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const EmpresaHub = lazy(() => import("./pages/EmpresaHub"));
const MateriaisPage = lazy(() => import("./pages/MateriaisPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Redirecionamentos internos: o dev server e os links dentro do app se comportam como a produção.
const clientRedirects = legacyRedirects.filter(({ source }) => /^\/(solucoes|servicos|sobre|estrutura|conteudo|segmentos|cases)(\/|$)/.test(source));

// Linhas que ainda abrem na página antiga, até as próximas tarefas da fase 2 trocá-las pelo kit.
const pendingLines = ["magnifico-open", "bombas-injetoras", "radiografia-digital", "densitometria", "hexai", "careverse", "veterinaria", "vet-mr-grande"];

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
            <Route path="/solucoes/turbotom-1s-vet" element={<WdmVetPage slug="turbotom-1s-vet" />} />
            <Route path="/solucoes/turbotom-1s-lite-vet" element={<WdmVetPage slug="turbotom-1s-lite-vet" />} />
            <Route path="/solucoes/ispace-1-5t-vet" element={<WdmVetPage slug="ispace-1-5t-vet" />} />
            <Route path="/servicos" element={<ServicosHub />} />
            <Route path="/solucoes/ressonancia-magnetica" element={<RmLinePage />} />
            {pendingLines.map((slug) => (
              <Route key={slug} path={`/solucoes/${slug}`} element={<ProductEditorialPage slug={slug} />} />
            ))}
            {/* Produtos de RM (O-scan SMART, S-scan Open, G-scan Open); slug desconhecido mostra a 404 do sistema. */}
            <Route path="/solucoes/:slug" element={<ProductPage />} />
            <Route path="/servicos/:slug" element={<ServicePage />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/ouvidoria" element={<Ouvidoria />} />
            <Route path="/empresa" element={<EmpresaHub />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/materiais" element={<MateriaisPage />} />
            <Route path="/politica-de-privacidade" element={<PrivacyPage />} />
            <Route path="/termos" element={<TermsPage />} />
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
