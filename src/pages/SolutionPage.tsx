import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import HeroSection from "@/components/sections/HeroSection";
import FAQSection from "@/components/sections/FAQSection";
import CTABanner from "@/components/sections/CTABanner";
import DifferentialsGrid from "@/components/sections/DifferentialsGrid";
import TrustBlock from "@/components/sections/TrustBlock";
import { solutions } from "@/data/solutions";
import { CheckCircle2, Target, AlertTriangle, ArrowRight } from "lucide-react";

const SolutionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const solution = slug ? solutions[slug] : null;

  if (!solution) return <Navigate to="/solucoes" replace />;

  return (
    <Layout>
      <Helmet>
        <title>{solution.title} — Hexamedical</title>
        <meta name="description" content={solution.description} />
      </Helmet>

      <PageBreadcrumb
        items={[
          { label: "Soluções", href: "/solucoes" },
          { label: solution.shortTitle || solution.title },
        ]}
      />

      {/* 1. Hero */}
      <HeroSection
        headline={solution.heroHeadline}
        subtitle={solution.heroSubtitle}
        ctaPrimaryLabel="Solicitar Avaliação Técnica"
        ctaSecondaryLabel="Falar com Especialista"
        ctaSecondaryHref="/contato"
      />

      {/* 2. Para quem é */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">Para quem é</h2>
              <p className="mb-6 text-muted-foreground">
                Ideal para instituições que buscam qualidade diagnóstica, conforto ao paciente e eficiência operacional.
              </p>
              <ul className="space-y-3">
                {solution.audience.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <Target className="h-5 w-5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 p-12">
              <solution.icon className="mx-auto h-32 w-32 text-primary/20" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Problemas que resolve */}
      <section className="border-t border-border bg-muted/30 py-16 md:py-24">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground md:text-4xl">
            Problemas que resolve
          </h2>
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {solution.problems.map((p) => (
              <div key={p} className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm text-foreground">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Como funciona */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground md:text-4xl">
            Como funciona
          </h2>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {solution.steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-lg">
                  {i + 1}
                </div>
                <h3 className="mb-2 font-bold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                {i < solution.steps.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-6 hidden h-5 w-5 text-accent/40 lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Diferenciais */}
      <DifferentialsGrid />

      {/* 6. Bloco técnico */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground md:text-4xl">
            Especificações Técnicas
          </h2>
          <div className="mx-auto max-w-2xl overflow-hidden rounded-xl border border-border">
            {solution.specs.map((spec, i) => (
              <div key={i} className={`flex items-center justify-between p-4 ${i % 2 === 0 ? "bg-card" : "bg-muted/30"}`}>
                <span className="font-medium text-foreground">{spec.label}</span>
                <span className="text-muted-foreground">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Provas */}
      <TrustBlock />

      {/* 8. FAQ */}
      <FAQSection items={solution.faq} />

      {/* 9. CTA Final */}
      <CTABanner
        headline={`Interessado no ${solution.shortTitle || solution.title}?`}
        subtitle="Solicite uma avaliação técnica personalizada para sua instituição."
        ctaLabel="Solicitar Avaliação Técnica"
      />
    </Layout>
  );
};

export default SolutionPage;
