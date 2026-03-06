import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import CTABanner from "@/components/sections/CTABanner";

const materials = [
  { title: "Guia de Implantação de RM", desc: "Checklist técnico para projeto, instalação e início de operação." },
  { title: "Matriz de Escolha de Equipamentos", desc: "Framework para selecionar solução por aplicação clínica e orçamento." },
  { title: "Boas práticas de manutenção", desc: "Rotinas preventivas para reduzir downtime e preservar performance." },
  { title: "Playbook de avaliação técnica", desc: "Como estruturar uma avaliação pré-compra com foco em ROI e risco." },
];

const MateriaisPage = () => (
  <Layout>
    <Helmet>
      <title>Materiais de Apoio — Hexamedical</title>
      <meta name="description" content="Materiais técnicos para apoiar decisões sobre equipamentos, serviços e operação." />
    </Helmet>
    <PageBreadcrumb items={[{ label: "Materiais de Apoio" }]} />
    <section className="py-16 md:py-24">
      <div className="container">
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">Materiais de Apoio</h1>
        <p className="mb-10 max-w-3xl text-muted-foreground">Conteúdos estruturados para apoiar tomada de decisão, implantação e gestão técnica.</p>
        <div className="grid gap-6 md:grid-cols-2">
          {materials.map((m) => (
            <article key={m.title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="mb-2 text-xl font-bold">{m.title}</h2>
              <p className="text-sm text-muted-foreground">{m.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
    <CTABanner />
  </Layout>
);

export default MateriaisPage;
