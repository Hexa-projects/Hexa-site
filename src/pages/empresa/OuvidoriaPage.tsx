import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import PageSection from "@/components/page/PageSection";
import CardGrid from "@/components/page/CardGrid";
import OuvidoriaForm from "@/components/page/OuvidoriaForm";
import { ouvidoriaPage } from "@/data/pages/company";

/**
 * /ouvidoria: o canal de conformidade do site atual, com o mesmo formulário e a mesma função pública.
 * Sem triagem comercial no fim: aqui a conversa é com a Ouvidoria.
 */
const OuvidoriaPage = () => (
  <PageShell title={ouvidoriaPage.docTitle} description={ouvidoriaPage.description}>
    <PageHero
      tone="light"
      title={ouvidoriaPage.title}
      lead={ouvidoriaPage.lead}
      crumbs={[{ label: "Início", href: "/" }, { label: ouvidoriaPage.title }]}
      eyebrow={ouvidoriaPage.eyebrow}
    />

    <PageSection id="como-funciona" title={ouvidoriaPage.howTitle}>
      <CardGrid items={ouvidoriaPage.how} />
    </PageSection>

    <PageSection
      id="registro"
      title={ouvidoriaPage.formTitle}
      intro={
        <>
          <p>{ouvidoriaPage.formIntro}</p>
          <p>{ouvidoriaPage.emailNote}</p>
        </>
      }
    >
      <OuvidoriaForm />
    </PageSection>
  </PageShell>
);

export default OuvidoriaPage;
