import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import HeroSection from "@/components/sections/HeroSection";
import FAQSection from "@/components/sections/FAQSection";
import CTABanner from "@/components/sections/CTABanner";
import TrustBlock from "@/components/sections/TrustBlock";
import { services } from "@/data/services";
import { CheckCircle2 } from "lucide-react";

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);

  if (!service) return <Navigate to="/servicos" replace />;

  return (
    <Layout>
      <Helmet>
        <title>{service.title} — Hexamedical</title>
        <meta name="description" content={service.description} />
      </Helmet>

      <PageBreadcrumb
        items={[
          { label: "Serviços", href: "/servicos" },
          { label: service.title },
        ]}
      />

      <HeroSection
        headline={service.heroHeadline}
        subtitle={service.heroSubtitle}
        ctaPrimaryLabel="Solicitar Orçamento"
        ctaSecondaryLabel="Falar com Especialista"
        ctaSecondaryHref="/contato"
      />

      {/* Escopo do serviço */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground md:text-4xl">
            O que inclui
          </h2>
          <div className="mx-auto max-w-2xl space-y-4">
            {service.scope.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-border bg-card p-5">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustBlock />

      <FAQSection items={service.faq} />

      <CTABanner
        headline={`Precisa de ${service.title.toLowerCase()}?`}
        subtitle="Solicite um orçamento personalizado para sua instituição."
        ctaLabel="Solicitar Orçamento"
      />
    </Layout>
  );
};

export default ServicePage;
