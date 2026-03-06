import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import SolucoesHub from "./pages/SolucoesHub";
import ServicosHub from "./pages/ServicosHub";
import SolutionPage from "./pages/SolutionPage";
import ServicePage from "./pages/ServicePage";
import Contato from "./pages/Contato";
import SegmentPage from "./pages/SegmentPage";
import StaticContentPage from "./pages/StaticContentPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import SegmentosHub from "./pages/SegmentosHub";
import ConteudoHub from "./pages/ConteudoHub";
import EmpresaHub from "./pages/EmpresaHub";
import SobrePage from "./pages/SobrePage";
import EstruturaPage from "./pages/EstruturaPage";
import MateriaisPage from "./pages/MateriaisPage";
import CasesPage from "./pages/CasesPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/solucoes" element={<SolucoesHub />} />
            <Route path="/servicos" element={<ServicosHub />} />
            <Route path="/solucoes/:slug" element={<SolutionPage />} />
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
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
