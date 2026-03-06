import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import SegmentsGrid from "@/components/sections/SegmentsGrid";
import CTABanner from "@/components/sections/CTABanner";

const SegmentosHub = () => (
  <Layout>
    <Helmet>
      <title>Segmentos Atendidos — Hexamedical</title>
      <meta name="description" content="Soluções e serviços para clínicas, hospitais, centros de imagem, universidades e veterinário." />
    </Helmet>
    <PageBreadcrumb items={[{ label: "Segmentos" }]} />
    <section className="py-16 md:py-24">
      <div className="container">
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">Segmentos atendidos</h1>
        <p className="mb-10 max-w-3xl text-muted-foreground">Estruturamos projetos e serviços de acordo com a realidade de cada tipo de operação.</p>
      </div>
      <SegmentsGrid />
    </section>
    <CTABanner />
  </Layout>
);

export default SegmentosHub;
