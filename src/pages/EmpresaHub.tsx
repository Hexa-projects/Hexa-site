import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import CTABanner from "@/components/sections/CTABanner";

const items = [
  { title: "Sobre a Hexamedical", href: "/sobre", desc: "Nossa trajetória, posicionamento e compromisso com performance operacional." },
  { title: "Estrutura", href: "/estrutura", desc: "Laboratório, cobertura nacional e capacidade técnica para manter sua operação." },
  { title: "Contato", href: "/contato", desc: "Fale com um especialista para avaliação técnica e comercial." }
];

const EmpresaHub = () => (
  <Layout>
    <Helmet>
      <title>Empresa — Hexamedical</title>
      <meta name="description" content="Conheça a Hexamedical, sua estrutura e canais de contato." />
    </Helmet>
    <PageBreadcrumb items={[{ label: "Empresa" }]} />
    <section className="py-16 md:py-24">
      <div className="container">
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">Empresa</h1>
        <p className="mb-10 max-w-3xl text-muted-foreground">Base técnica, visão consultiva e foco em resultados para instituições de saúde em todo o Brasil.</p>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((i) => (
            <Link key={i.href} to={i.href} className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <h2 className="mb-2 text-xl font-bold">{i.title}</h2>
              <p className="text-sm text-muted-foreground">{i.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
    <CTABanner />
  </Layout>
);

export default EmpresaHub;
