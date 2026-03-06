import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import CTABanner from "@/components/sections/CTABanner";
import { hexaMedia } from "@/data/media";
import { services } from "@/data/services";
import { solutionCategories } from "@/data/solutions";
import ServiceCard from "@/components/sections/ServiceCard";
import SolutionCard from "@/components/sections/SolutionCard";

interface StaticContentPageProps {
  title: string;
  description: string;
}

const StaticContentPage = ({ title, description }: StaticContentPageProps) => {
  const isCases = title.toLowerCase().includes("case");
  const isBlog = title.toLowerCase().includes("blog");
  const isMateriais = title.toLowerCase().includes("material");

  return (
    <Layout>
      <Helmet>
        <title>{title} — Hexamedical</title>
        <meta name="description" content={description} />
      </Helmet>
      <PageBreadcrumb items={[{ label: title }]} />

      <section className="border-b border-border py-10 md:py-14">
        <div className="container">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h1 className="mb-5 text-3xl font-bold md:text-4xl">{title}</h1>
              <p className="text-lg text-muted-foreground">{description}</p>
            </div>
            <div className="overflow-hidden rounded-xl border border-border">
              <img
                src={isBlog ? hexaMedia.blogCover : hexaMedia.contatoHero}
                alt={title}
                className="h-64 w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {(isCases || isMateriais) && (
        <section className="py-16 md:py-20">
          <div className="container">
            <h2 className="mb-8 text-2xl font-bold md:text-3xl">Soluções relacionadas</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {solutionCategories.map((sol) => (
                <SolutionCard
                  key={sol.slug}
                  title={sol.title}
                  description={sol.description}
                  href={`/solucoes/${sol.slug}`}
                  icon={sol.icon}
                  image={hexaMedia.solutions[sol.slug as keyof typeof hexaMedia.solutions]}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {(isBlog || isMateriais) && (
        <section className="border-t border-border bg-muted/30 py-16 md:py-20">
          <div className="container">
            <h2 className="mb-8 text-2xl font-bold md:text-3xl">Serviços que sustentam sua operação</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((svc) => (
                <ServiceCard
                  key={svc.slug}
                  title={svc.title}
                  description={svc.description}
                  href={`/servicos/${svc.slug}`}
                  icon={svc.icon}
                  image={hexaMedia.services[svc.slug as keyof typeof hexaMedia.services]}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </Layout>
  );
};

export default StaticContentPage;
