import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import PageSection from "@/components/page/PageSection";
import CardGrid from "@/components/page/CardGrid";
import FactStrip from "@/components/page/FactStrip";
import PointList from "@/components/page/PointList";
import PageContact from "@/components/page/PageContact";
import { whatsappHref } from "@/data/home";
import { serviceContactPaths, serviceFacts, serviceHub, serviceStructure } from "@/data/pages/services";

/** /servicos: os quatro serviços técnicos, cada um com a sua página, e a estrutura que atende todos eles. */
const ServicosHub = () => (
  <PageShell title={serviceHub.docTitle} description={serviceHub.description}>
    <PageHero
      tone="light"
      title={serviceHub.heroTitle}
      lead={serviceHub.heroLead}
      crumbs={[{ label: "Início", href: "/" }, { label: serviceHub.title }]}
      actions={[
        { label: "Conversar pelo WhatsApp", href: whatsappHref(serviceHub.whatsappText), kind: "primary" },
        { label: "Ver o laboratório", href: "/servicos/reparo", kind: "quiet" },
      ]}
      eyebrow={serviceHub.eyebrow}
    />

    <PageSection id="servicos" title="Serviços técnicos" intro={serviceHub.servicesIntro}>
      <CardGrid items={serviceHub.cards} />
    </PageSection>

    <PageSection id="estrutura" title="Estrutura e cobertura" intro={serviceHub.structureIntro} media={serviceHub.structureMedia}>
      <FactStrip items={serviceFacts} />
      <PointList items={serviceStructure} />
    </PageSection>

    {/* As três trilhas da home; a de manutenção abre a conversa com a mensagem do hub. */}
    <PageContact paths={serviceContactPaths({ contact: { path: "manter" }, whatsappText: serviceHub.whatsappText })} />
  </PageShell>
);

export default ServicosHub;
