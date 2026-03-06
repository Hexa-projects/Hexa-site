import { Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import HeroSection from "@/components/sections/HeroSection";
import CTABanner from "@/components/sections/CTABanner";
import { CheckCircle2 } from "lucide-react";
import { staticPages } from "@/data/staticPages";

const StaticPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? staticPages[slug] : null;

  if (!page) return <Navigate to="/" replace />;

  return (
    <Layout>
      <Helmet>
        <title>{page.title} — Hexamedical</title>
        <meta name="description" content={page.description} />
      </Helmet>

      <PageBreadcrumb items={[{ label: page.title }]} />

      <HeroSection headline={page.title} subtitle={page.description} ctaPrimaryLabel="Falar com Especialista" ctaPrimaryHref="/contato" backgroundImage={page.hero} />

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 md:p-12">
            <h2 className="mb-6 text-2xl font-bold md:text-3xl">Pontos principais</h2>
            <ul className="space-y-4">
              {page.bullets.map((item) => (
                <li key={item} className="flex items-start gap-3 text-foreground">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTABanner headline="Quer ajuda para o seu cenário?" subtitle="Nossa equipe técnica e comercial pode te orientar com clareza." />
    </Layout>
  );
};

export default StaticPage;
