import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import PageSection from "@/components/page/PageSection";
import CardGrid from "@/components/page/CardGrid";
import PageContact from "@/components/page/PageContact";
import { triage, whatsappHref } from "@/data/home";
import { materialsPage } from "@/data/pages/company";

/** /materiais: o que existe de material de apoio e como pedir. Nenhum arquivo para baixar: a equipe envia sob pedido. */
const MateriaisPage = () => (
  <PageShell title={materialsPage.docTitle} description={materialsPage.description}>
    <PageHero
      tone="light"
      title={materialsPage.title}
      lead={materialsPage.lead}
      crumbs={[{ label: "Início", href: "/" }, { label: materialsPage.title }]}
      actions={[{ label: "Pedir pelo WhatsApp", href: whatsappHref(materialsPage.whatsappText), kind: "primary" }]}
    />

    <PageSection id="tipos" title={materialsPage.kindsTitle} intro={materialsPage.kindsIntro}>
      <CardGrid items={materialsPage.kinds} />
    </PageSection>

    <PageSection id="por-equipamento" title={materialsPage.byLineTitle} intro={materialsPage.byLineIntro}>
      <CardGrid items={materialsPage.byLine} />
    </PageSection>

    <PageContact paths={triage} />
  </PageShell>
);

export default MateriaisPage;
