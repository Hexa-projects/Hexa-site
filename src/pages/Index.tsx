import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/sections/HeroSection";
import SolutionCard from "@/components/sections/SolutionCard";
import ServiceCard from "@/components/sections/ServiceCard";
import DifferentialsGrid from "@/components/sections/DifferentialsGrid";
import SegmentsGrid from "@/components/sections/SegmentsGrid";
import TrustBlock from "@/components/sections/TrustBlock";
import HexAIHighlight from "@/components/sections/HexAIHighlight";
import BlogHighlight from "@/components/sections/BlogHighlight";
import TestimonialsBlock from "@/components/sections/TestimonialsBlock";
import CTABanner from "@/components/sections/CTABanner";
import ContactForm from "@/components/sections/ContactForm";
import { solutionCategories } from "@/data/solutions";
import { services } from "@/data/services";

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>Hexamedical — Especialistas em Ressonância Magnética</title>
        <meta name="description" content="Soluções completas em Ressonância Magnética, serviços técnicos especializados e suporte de alta performance para clínicas, hospitais e centros de imagem." />
      </Helmet>

      {/* 1. Hero */}
      <HeroSection
        headline="Especialistas em Ressonância Magnética"
        subtitle="Soluções completas em equipamentos, serviços técnicos e suporte de alta performance para clínicas, hospitais e centros de imagem em todo o Brasil."
        ctaPrimaryLabel="Falar com Especialista"
        ctaPrimaryHref="/contato"
        ctaSecondaryLabel="Conheça nossas soluções"
        ctaSecondaryHref="/solucoes"
      />

      {/* 2-3. Soluções */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Soluções certas para cada realidade
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              De equipamentos de alta performance a inteligência artificial diagnóstica, temos a solução ideal para sua instituição.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solutionCategories.map((sol) => (
              <SolutionCard
                key={sol.slug}
                title={sol.title}
                description={sol.description}
                href={`/solucoes/${sol.slug}`}
                icon={sol.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Serviços */}
      <section className="border-t border-border bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Serviços técnicos especializados
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Manutenção, contratos, instalação e suporte com equipe certificada e cobertura nacional.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc) => (
              <ServiceCard
                key={svc.slug}
                title={svc.title}
                description={svc.description}
                href={`/servicos/${svc.slug}`}
                icon={svc.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. HexAI */}
      <HexAIHighlight />

      {/* 6. Diferenciais */}
      <DifferentialsGrid />

      {/* 7. Segmentos */}
      <SegmentsGrid />

      {/* 8. Provas */}
      <TrustBlock />

      {/* Depoimentos */}
      <TestimonialsBlock />

      {/* 9. Blog */}
      <BlogHighlight />

      {/* 10. CTA Final + Contato rápido */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Vamos conversar sobre sua operação?
              </h2>
              <p className="mb-6 text-lg text-muted-foreground">
                Preencha o formulário e receba uma avaliação personalizada de um especialista Hexamedical. Sem compromisso.
              </p>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  Resposta em até 24 horas úteis
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  Avaliação técnica gratuita
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  Proposta personalizada para sua realidade
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
              <ContactForm variant="compact" />
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </Layout>
  );
};

export default Index;
