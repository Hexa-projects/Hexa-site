import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import CTABanner from "@/components/sections/CTABanner";

const cases = [
  {
    title: "Centro de Imagem aumentou previsibilidade operacional",
    result: "Redução de paradas não programadas com contrato técnico e plano preventivo.",
  },
  {
    title: "Clínica ortopédica acelerou diagnóstico MSK",
    result: "Estruturação de fluxo com RM dedicada e ganho de produtividade médica.",
  },
  {
    title: "Hospital evoluiu performance de manutenção",
    result: "Padronização de atendimento e melhoria de tempo de resposta com cobertura nacional.",
  },
];

const CasesPage = () => (
  <Layout>
    <Helmet>
      <title>Cases — Hexamedical</title>
      <meta name="description" content="Casos de aplicação das soluções Hexamedical em operações de saúde." />
    </Helmet>
    <PageBreadcrumb items={[{ label: "Cases" }]} />
    <section className="py-16 md:py-24">
      <div className="container">
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">Cases</h1>
        <p className="mb-10 max-w-3xl text-muted-foreground">Exemplos de resultados em campo com soluções e serviços da Hexamedical.</p>
        <div className="space-y-6">
          {cases.map((c) => (
            <article key={c.title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="mb-2 text-xl font-bold">{c.title}</h2>
              <p className="text-sm text-muted-foreground">{c.result}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
    <CTABanner />
  </Layout>
);

export default CasesPage;
