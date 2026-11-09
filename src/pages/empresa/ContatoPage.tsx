import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import PageSection from "@/components/page/PageSection";
import ChannelList from "@/components/page/ChannelList";
import CardGrid from "@/components/page/CardGrid";
import PageContact from "@/components/page/PageContact";
import { triage } from "@/data/home";
import { contactPage } from "@/data/pages/company";

/**
 * /contato: a triagem completa por WhatsApp, depois telefone, e-mail e horário como texto, e a Ouvidoria.
 * Sem formulário. A triagem aqui não mostra "Ver todos os canais" (seria um link para a própria página).
 */
const ContatoPage = () => (
  <PageShell title={contactPage.docTitle} description={contactPage.description}>
    <PageHero tone="light" title={contactPage.title} lead={contactPage.lead} crumbs={[{ label: "Início", href: "/" }, { label: contactPage.title }]} />

    <PageContact title={contactPage.triageTitle} paths={triage} channelsLink={false} />

    <PageSection id="canais" title={contactPage.channelsTitle} intro={contactPage.channelsIntro}>
      <ChannelList items={contactPage.channels} />
    </PageSection>

    <PageSection id="ouvidoria" title={contactPage.ouvidoriaTitle}>
      <CardGrid items={[contactPage.ouvidoriaCard]} />
    </PageSection>
  </PageShell>
);

export default ContatoPage;
