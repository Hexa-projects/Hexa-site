import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import HeroSection from "@/components/sections/HeroSection";
import ServiceCard from "@/components/sections/ServiceCard";
import CTABanner from "@/components/sections/CTABanner";
import { services } from "@/data/services";

const ServicosHub = () => {
  return (
    <Layout>
      <Helmet>
        <title>Serviços Técnicos Especializados — Hexamedical</title>
        <meta name="description" content="Manutenção, contratos, instalação, reparo e visita técnica para equipamentos de Ressonância Magnética." />
      </Helmet>

      <PageBreadcrumb items={[{ label: "Serviços" }]} />

      <HeroSection
        headline="Serviços técnicos que garantem sua operação"
        subtitle="Manutenção preventiva e corretiva, contratos flexíveis, instalação profissional e suporte especializado com cobertura nacional."
        ctaSecondaryLabel="Ver soluções"
        ctaSecondaryHref="/solucoes"
        variant="light"
      />

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Nossos serviços
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Soluções completas de suporte para manter seus equipamentos em máxima performance.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      <CTABanner />
    </Layout>
  );
};

export default ServicosHub;
