import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import PageSection from "@/components/page/PageSection";
import FactStrip from "@/components/page/FactStrip";
import PointList from "@/components/page/PointList";
import CardGrid from "@/components/page/CardGrid";
import PageContact from "@/components/page/PageContact";
import { triage, whatsappHref } from "@/data/home";
import { companyPage } from "@/data/pages/company";

/** /empresa: quem é a Hexamedical, os números, a estrutura do centro técnico, a cobertura e o público atendido. */
const EmpresaPage = () => (
  <PageShell title={companyPage.docTitle} description={companyPage.description}>
    <PageHero
      tone="light"
      title={companyPage.title}
      lead={companyPage.lead}
      crumbs={[{ label: "Início", href: "/" }, { label: companyPage.title }]}
      actions={[
        { label: "Conversar pelo WhatsApp", href: whatsappHref(companyPage.whatsappText), kind: "primary" },
        { label: "Ver os serviços", href: "/servicos", kind: "quiet" },
      ]}
      eyebrow={companyPage.eyebrow}
    />

    <PageSection id="quem-somos" title="Quem vende também instala e conserta" intro={companyPage.aboutIntro}>
      <FactStrip items={companyPage.facts} />
    </PageSection>

    <PageSection id="estrutura" title="Estrutura" intro={companyPage.structureIntro} media={companyPage.structureMedia}>
      <PointList items={companyPage.structure} />
    </PageSection>

    <PageSection id="cobertura" title="Onde atendemos" intro={companyPage.coverageIntro}>
      <PointList items={companyPage.units} />
    </PageSection>

    <PageSection id="publico" title="Quem atendemos" intro={companyPage.audienceIntro}>
      <PointList items={companyPage.audience} />
    </PageSection>

    <PageSection id="conheca" title="Conheça também">
      <CardGrid items={companyPage.next} />
    </PageSection>

    <PageContact paths={triage} />
  </PageShell>
);

export default EmpresaPage;
