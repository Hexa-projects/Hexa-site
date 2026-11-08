import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import PageSection from "@/components/page/PageSection";
import { LEGAL_NOTICE, legalPages, type LegalKind } from "@/data/pages/company";

/**
 * Política de Privacidade e Termos de Uso: uma só h1, o aviso de versão provisória no topo
 * e o texto corrido na coluna de leitura (.page-prose).
 */
const LegalPage = ({ kind }: { kind: LegalKind }) => {
  const content = legalPages[kind];
  return (
    <PageShell title={content.docTitle} description={content.description}>
      <PageHero tone="light" title={content.title} lead={content.lead} crumbs={[{ label: "Início", href: "/" }, { label: content.title }]} eyebrow={LEGAL_NOTICE} />

      {content.sections.map((section) => (
        <PageSection key={section.title} title={section.title}>
          <div className="page-prose">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.list && (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </PageSection>
      ))}
    </PageShell>
  );
};

export default LegalPage;
