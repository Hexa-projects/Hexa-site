import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import PageSection from "@/components/page/PageSection";
import CardGrid from "@/components/page/CardGrid";
import PointList from "@/components/page/PointList";
import Faq from "@/components/page/Faq";
import PageContact from "@/components/page/PageContact";
import NotFound from "@/pages/NotFound";
import { whatsappHref } from "@/data/home";
import { contactPaths, lines } from "@/data/pages/solutions";

/**
 * Página de linha (injetoras, radiografia, densitometria, HexAI, veterinária), montada só com o kit e com `lines[slug]`.
 * Cada seção traz cards, pontos ou só o texto. Slug desconhecido mostra a 404 do sistema no próprio endereço.
 */
const LinePage = ({ slug }: { slug: string }) => {
  const line = Object.prototype.hasOwnProperty.call(lines, slug) ? lines[slug] : undefined;
  if (!line) return <NotFound />;

  return (
    <PageShell title={line.docTitle} description={line.description}>
      <PageHero
        tone="dark"
        title={line.title}
        lead={line.lead}
        crumbs={[{ label: "Início", href: "/" }, { label: "Soluções", href: "/solucoes" }, { label: line.crumb }]}
        media={line.hero}
        actions={[
          { label: "Conversar pelo WhatsApp", href: whatsappHref(line.whatsappText), kind: "primary" },
          { label: line.secondary.label, href: line.secondary.href, kind: "quiet" },
        ]}
        eyebrow={line.eyebrow}
      />

      {line.sections.map((section) => (
        <PageSection key={section.id} id={section.id} title={section.title} intro={section.intro} media={section.media}>
          {section.cards ? <CardGrid items={section.cards} /> : section.points ? <PointList items={section.points} /> : null}
        </PageSection>
      ))}

      {line.faq && (
        <PageSection id="perguntas" title="Perguntas frequentes">
          <Faq items={line.faq} />
        </PageSection>
      )}

      <PageContact paths={contactPaths({ title: line.contactTitle, whatsappText: line.whatsappText })} />
    </PageShell>
  );
};

export default LinePage;
