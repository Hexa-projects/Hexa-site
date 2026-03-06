import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import BlogHighlight from "@/components/sections/BlogHighlight";
import CTABanner from "@/components/sections/CTABanner";

const ConteudoHub = () => (
  <Layout>
    <Helmet>
      <title>Conteúdo — Hexamedical</title>
      <meta name="description" content="Blog, materiais de apoio e cases para apoiar decisões técnicas e comerciais." />
    </Helmet>
    <PageBreadcrumb items={[{ label: "Conteúdo" }]} />
    <section className="py-16 md:py-24">
      <div className="container">
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">Conteúdo técnico e comercial</h1>
        <p className="mb-10 max-w-3xl text-muted-foreground">Acesse conteúdos para orientar implantação, operação e decisão de investimento em diagnóstico por imagem.</p>
      </div>
      <BlogHighlight />
    </section>
    <CTABanner />
  </Layout>
);

export default ConteudoHub;
