import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import CTABanner from "@/components/sections/CTABanner";

const estrutura = [
  "Laboratório próprio para reparo de bobinas, placas e periféricos",
  "Cobertura nacional com unidades em pontos estratégicos",
  "Equipe técnica certificada e experiente",
  "Fluxo de manutenção preventiva e corretiva com SLA",
];

const EstruturaPage = () => (
  <Layout>
    <Helmet>
      <title>Estrutura — Hexamedical</title>
      <meta name="description" content="Conheça a estrutura técnica da Hexamedical para atendimento nacional." />
    </Helmet>
    <PageBreadcrumb items={[{ label: "Estrutura" }]} />
    <section className="py-16 md:py-24">
      <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="mb-5 text-3xl font-bold md:text-4xl">Nossa Estrutura</h1>
          <p className="mb-6 text-muted-foreground">Estrutura robusta para atender implantação, manutenção e suporte de equipamentos de diagnóstico por imagem em todo o Brasil.</p>
          <ul className="space-y-3">
            {estrutura.map((i) => (
              <li key={i} className="rounded-lg border bg-card p-4 text-sm">{i}</li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden rounded-xl border border-border">
          <img src="/assets/hexa/Hexamedical-Website-6-1024x576.webp" alt="Estrutura Hexamedical" className="h-80 w-full object-cover" loading="lazy" />
        </div>
      </div>
    </section>
    <CTABanner />
  </Layout>
);

export default EstruturaPage;
