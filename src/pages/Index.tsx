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
import ProductsCatalogSection from "@/components/sections/ProductsCatalogSection";
import MetricsStrip from "@/components/sections/MetricsStrip";
import CTABanner from "@/components/sections/CTABanner";
import ContactForm from "@/components/sections/ContactForm";
import { solutionCategories } from "@/data/solutions";
import { services } from "@/data/services";
import { hexaMedia } from "@/data/media";

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>Hexamedical — Especialistas em Ressonância Magnética</title>
        <meta
          name="description"
          content="Soluções completas em Ressonância Magnética Esaote, serviços técnicos especializados e suporte com 16 anos de experiência. Cobertura nacional para clínicas, hospitais e centros de imagem."
        />
      </Helmet>

      <HeroSection
        headline="A plataforma consultiva para sua operação de Ressonância Magnética"
        subtitle="Projetos completos em RM Esaote, serviços técnicos especializados, HexAI e suporte nacional. Clareza técnica, previsibilidade operacional e ROI real para clínicas e hospitais."
        ctaPrimaryLabel="Falar com Especialista"
        ctaPrimaryHref="/contato"
        ctaSecondaryLabel="Explorar soluções"
        ctaSecondaryHref="/solucoes"
        backgroundImage={hexaMedia.homeHero}
      />

      <MetricsStrip />

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">NOSSOS PRODUTOS POR CATEGORIA</p>
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Soluções certas para cada realidade
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Do equipamento certo ao suporte técnico completo — estruturamos a solução ideal para sua operação.
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
                image={hexaMedia.solutions[sol.slug as keyof typeof hexaMedia.solutions]}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">SERVIÇOS CRÍTICOS</p>
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Tecnologia e expertise reunidas em um só lugar
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Manutenção, contratos e instalação com equipe certificada e laboratório próprio para máxima disponibilidade.
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
                image={hexaMedia.services[svc.slug as keyof typeof hexaMedia.services]}
              />
            ))}
          </div>
        </div>
      </section>

      <HexAIHighlight />
      <ProductsCatalogSection />
      <DifferentialsGrid />

      <section className="border-t border-border bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">SEGMENTOS</p>
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Segmentos que atendemos
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Soluções dimensionadas para a realidade de cada tipo de instituição de saúde.
            </p>
          </div>
          <SegmentsGrid />
        </div>
      </section>

      <TrustBlock />
      <TestimonialsBlock />
      <BlogHighlight />

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
                <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-accent" />Resposta em até 24 horas úteis</div>
                <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-accent" />Avaliação técnica gratuita</div>
                <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-accent" />16 anos de experiência em equipamentos médicos</div>
                <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-accent" />Cobertura em todo o território nacional</div>
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
