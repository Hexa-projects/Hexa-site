import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import CTABanner from "@/components/sections/CTABanner";

const SobrePage = () => (
  <Layout>
    <Helmet>
      <title>Sobre a Hexamedical</title>
      <meta name="description" content="Especialistas em soluções de Ressonância Magnética, suporte técnico e performance operacional." />
    </Helmet>
    <PageBreadcrumb items={[{ label: "Sobre a Hexamedical" }]} />
    <section className="py-16 md:py-24">
      <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="mb-5 text-3xl font-bold md:text-4xl">Sobre a Hexamedical</h1>
          <p className="mb-4 text-muted-foreground">A Hexamedical atua com soluções em Ressonância Magnética, serviços técnicos especializados e suporte consultivo para clínicas, hospitais e centros de imagem.</p>
          <p className="text-muted-foreground">Nosso foco é garantir previsibilidade operacional, qualidade diagnóstica e evolução sustentável da operação dos nossos parceiros.</p>
        </div>
        <div className="overflow-hidden rounded-xl border border-border">
          <img src="/assets/hexa/hexa.png" alt="Time Hexamedical" className="h-72 w-full object-cover" loading="lazy" />
        </div>
      </div>
    </section>
    <section className="border-t border-border bg-muted/30 py-16">
      <div className="container grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-5"><h2 className="mb-2 font-bold">Missão</h2><p className="text-sm text-muted-foreground">Entregar soluções técnicas confiáveis que elevam o padrão do diagnóstico por imagem.</p></div>
        <div className="rounded-lg border bg-card p-5"><h2 className="mb-2 font-bold">Visão</h2><p className="text-sm text-muted-foreground">Ser referência nacional em performance operacional para imagem diagnóstica.</p></div>
        <div className="rounded-lg border bg-card p-5"><h2 className="mb-2 font-bold">Valores</h2><p className="text-sm text-muted-foreground">Ética, precisão técnica, parceria de longo prazo e foco em resultado.</p></div>
      </div>
    </section>
    <CTABanner />
  </Layout>
);

export default SobrePage;
