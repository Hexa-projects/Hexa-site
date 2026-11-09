import { useParams } from "react-router-dom";
import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import PageSection from "@/components/page/PageSection";
import PointList from "@/components/page/PointList";
import CardGrid from "@/components/page/CardGrid";
import FactStrip from "@/components/page/FactStrip";
import Faq from "@/components/page/Faq";
import PageContact from "@/components/page/PageContact";
import NotFound from "@/pages/NotFound";
import { whatsappHref } from "@/data/home";
import { serviceCard, serviceContactPaths, serviceFacts, serviceOrder, services, type ServiceSlug } from "@/data/pages/services";

/**
 * Página de serviço (manutenção, contratos, instalação, reparo e laboratório), montada só com o kit e com `services[slug]`.
 * Hero claro com foto de cena; fecha com a triagem da home, com a mensagem da página na trilha do serviço.
 * Slug desconhecido mostra a 404 do sistema no próprio endereço (sem redirecionar).
 */
const ServicePage = () => {
  const { slug = "" } = useParams();
  const service = Object.prototype.hasOwnProperty.call(services, slug) ? services[slug as ServiceSlug] : undefined;
  if (!service) return <NotFound />;

  return (
    <PageShell title={service.docTitle} description={service.description}>
      <PageHero
        tone="light"
        title={service.title}
        lead={service.lead}
        crumbs={[{ label: "Início", href: "/" }, { label: "Serviços", href: "/servicos" }, { label: service.title }]}
        media={service.hero}
        actions={[
          { label: "Conversar pelo WhatsApp", href: whatsappHref(service.whatsappText), kind: "primary" },
          { label: service.secondary.label, href: service.secondary.href, kind: "quiet" },
        ]}
        eyebrow={service.eyebrow}
      />

      <PageSection id="escopo" title={service.scopeTitle} intro={service.scopeIntro}>
        <PointList items={service.scope} />
      </PageSection>

      {service.extra && (
        <PageSection id={service.extra.id} title={service.extra.title} intro={service.extra.intro}>
          <CardGrid items={service.extra.cards} />
        </PageSection>
      )}

      <PageSection id="como-funciona" title={service.processTitle}>
        <CardGrid items={service.process} />
      </PageSection>

      <PageSection id="estrutura" title="Estrutura e cobertura">
        <FactStrip items={serviceFacts} />
      </PageSection>

      <PageSection id="perguntas" title="Perguntas frequentes">
        <Faq items={service.faq} />
      </PageSection>

      <PageSection id="outros-servicos" title="Outros serviços">
        <CardGrid items={serviceOrder.filter((other) => other !== service.slug).map((other) => serviceCard(other))} />
      </PageSection>

      <PageContact paths={serviceContactPaths(service)} />
    </PageShell>
  );
};

export default ServicePage;
