import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import HeroSection from "@/components/sections/HeroSection";
import SolutionCard from "@/components/sections/SolutionCard";
import CTABanner from "@/components/sections/CTABanner";
import { solutionCategories } from "@/data/solutions";
import { Link } from "react-router-dom";
import { ArrowRight, Magnet } from "lucide-react";

const rmProducts = [
  { slug: "rm-magnifico-open", title: "Magnifico Open", description: "Sistema aberto de alto campo para exames de corpo inteiro." },
  { slug: "rm-s-scan", title: "S-Scan", description: "Sistema compacto dedicado a exames de extremidades." },
  { slug: "rm-o-scan", title: "O-Scan", description: "RM dedicada para ortopedia em posição de carga." },
  { slug: "rm-g-scan", title: "G-Scan", description: "Sistema versátil com posicionamento variável do paciente." },
];

const SolucoesHub = () => {
  return (
    <Layout>
      <Helmet>
        <title>Soluções em Diagnóstico por Imagem — Hexamedical</title>
        <meta name="description" content="Conheça as soluções Hexamedical em Ressonância Magnética, Bombas Injetoras, HexAI e Área Veterinária." />
      </Helmet>

      <PageBreadcrumb items={[{ label: "Soluções" }]} />

      <HeroSection
        headline="Soluções que elevam a qualidade do diagnóstico"
        subtitle="Equipamentos de alta performance, tecnologia de ponta e suporte completo para sua operação de diagnóstico por imagem."
        ctaSecondaryLabel="Ver serviços"
        ctaSecondaryHref="/servicos"
        variant="light"
      />

      {/* Categories */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Nossas linhas de soluções
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solutionCategories.map((sol) => (
              <SolutionCard
                key={sol.slug}
                title={sol.title}
                description={sol.description}
                href={`/solucoes/${sol.slug}`}
                icon={sol.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* RM Products Grid */}
      <section className="border-t border-border bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Linha de Ressonância Magnética Esaote
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Sistemas abertos e dedicados com a melhor relação custo-benefício do mercado.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {rmProducts.map((product) => (
              <Link
                key={product.slug}
                to={`/solucoes/${product.slug}`}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Magnet className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">RM Esaote {product.title}</h3>
                <p className="mb-4 flex-1 text-sm text-muted-foreground">{product.description}</p>
                <span className="inline-flex items-center text-sm font-semibold text-accent group-hover:text-accent/80">
                  Ver detalhes <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </Layout>
  );
};

export default SolucoesHub;
