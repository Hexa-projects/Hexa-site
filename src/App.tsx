import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
const Index = lazy(() => import("./pages/Index"));
const SolucoesHub = lazy(() => import("./pages/SolucoesHub"));
const ServicosHub = lazy(() => import("./pages/ServicosHub"));
const ProductEditorialPage = lazy(() => import("./pages/ProductEditorialPage"));
const WdmVetPage = lazy(() => import("./pages/WdmVetPage"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const Contato = lazy(() => import("./pages/Contato"));
const SegmentPage = lazy(() => import("./pages/SegmentPage"));
const StaticContentPage = lazy(() => import("./pages/StaticContentPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const SegmentosHub = lazy(() => import("./pages/SegmentosHub"));
const ConteudoHub = lazy(() => import("./pages/ConteudoHub"));
const EmpresaHub = lazy(() => import("./pages/EmpresaHub"));
const SobrePage = lazy(() => import("./pages/SobrePage"));
const EstruturaPage = lazy(() => import("./pages/EstruturaPage"));
const MateriaisPage = lazy(() => import("./pages/MateriaisPage"));
const CasesPage = lazy(() => import("./pages/CasesPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          {/* Cada rota é um pacote próprio: o GSAP e o palco só descem na home. */}
          <Suspense fallback={<div className="route-loading" aria-hidden="true" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/solucoes" element={<SolucoesHub />} />
            <Route path="/solucoes/turbotom-1s-vet" element={<WdmVetPage slug="turbotom-1s-vet" />} />
            <Route path="/solucoes/turbotom-1s-lite-vet" element={<WdmVetPage slug="turbotom-1s-lite-vet" />} />
            <Route path="/solucoes/ispace-1-5t-vet" element={<WdmVetPage slug="ispace-1-5t-vet" />} />
            <Route path="/servicos" element={<ServicosHub />} />
            <Route path="/solucoes/:slug" element={<ProductEditorialPage />} />
            <Route path="/servicos/:slug" element={<ServicePage />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/segmentos" element={<SegmentosHub />} />
            <Route path="/segmentos/:slug" element={<SegmentPage />} />
            <Route path="/conteudo" element={<ConteudoHub />} />
            <Route path="/empresa" element={<EmpresaHub />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/materiais" element={<MateriaisPage />} />
            <Route path="/cases" element={<CasesPage />} />
            <Route path="/estrutura" element={<EstruturaPage />} />
            <Route path="/sobre" element={<SobrePage />} />
            <Route path="/politica-de-privacidade" element={<PrivacyPage />} />
            <Route path="/termos" element={<TermsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
