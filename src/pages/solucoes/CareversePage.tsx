import { ArrowUpRight } from "lucide-react";
import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import PageSection from "@/components/page/PageSection";
import PointList from "@/components/page/PointList";
import CardGrid from "@/components/page/CardGrid";
import Faq from "@/components/page/Faq";
import { whatsappHref } from "@/data/home";
import { careverse, careverseMedia } from "@/data/pages/careverse";

const Paragraphs = ({ items }: { items: readonly string[] }) => (
  <>
    {items.map((text) => (
      <p key={text}>{text}</p>
    ))}
  </>
);

/**
 * /solucoes/careverse: a landing do Careverse (antes em /lp/careverse) dentro do sistema, montada só com o kit.
 * Uma conversão só, "Solicitar demonstração" no WhatsApp, no hero e no fechamento (o mesmo link).
 * Sem triagem, formulário ou download: a página não abre um segundo caminho de contato.
 */
const CareversePage = () => {
  const demo = whatsappHref(careverse.whatsappText);
  const { modules, heart, workflow, evidence, closing } = careverse;
  const [usageNote, materialNote] = careverse.regulatoryNotes;

  return (
    <PageShell title={careverse.title} description={careverse.description}>
      <PageHero
        tone="dark"
        title={careverse.name}
        lead={careverse.lead}
        crumbs={[{ label: "Início", href: "/" }, { label: "Soluções", href: "/solucoes" }, { label: careverse.name }]}
        media={careverseMedia.heart}
        actions={[{ label: careverse.cta, href: demo, kind: "primary" }]}
        eyebrow={careverse.context}
      />

      <PageSection id="modulos" title={modules.title} intro={modules.intro}>
        <CardGrid items={modules.cards} />
      </PageSection>

      <PageSection id="digital-heart" title={heart.title} intro={<Paragraphs items={heart.intro} />}>
        <p className="page-note">{usageNote}</p>
      </PageSection>

      {heart.perspectives.map((item) => (
        <PageSection key={item.id} id={item.id} title={item.title} intro={item.intro} media={item.media}>
          <PointList items={item.points} />
        </PageSection>
      ))}

      <PageSection id="como-funciona" title={workflow.title} intro={<Paragraphs items={workflow.intro} />}>
        <CardGrid items={workflow.steps} />
      </PageSection>

      <PageSection id="evidencias" title={evidence.title} intro={<Paragraphs items={evidence.intro} />}>
        <CardGrid items={evidence.studies} />
      </PageSection>

      <PageSection id="perguntas" title="Perguntas frequentes">
        <Faq items={careverse.faq} />
      </PageSection>

      <PageSection id="demonstracao" title={closing.title} intro={<Paragraphs items={closing.intro} />}>
        <p>
          <a className="button button--primary" href={demo} target="_blank" rel="noopener noreferrer">
            {careverse.cta} <ArrowUpRight aria-hidden="true" />
          </a>
        </p>
        <p className="page-note">{materialNote}</p>
      </PageSection>
    </PageShell>
  );
};

export default CareversePage;
