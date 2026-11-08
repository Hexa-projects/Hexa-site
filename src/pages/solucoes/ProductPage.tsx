import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import PageSection from "@/components/page/PageSection";
import FactStrip from "@/components/page/FactStrip";
import PointList from "@/components/page/PointList";
import SpecTable from "@/components/page/SpecTable";
import CardGrid from "@/components/page/CardGrid";
import Faq from "@/components/page/Faq";
import PageContact from "@/components/page/PageContact";
import NotFound from "@/pages/NotFound";
import { whatsappHref } from "@/data/home";
import { contactPaths, productPages } from "@/data/pages/solutions";

/**
 * Página de produto (RM Esaote e modelos veterinários WDM), montada só com o kit e com `productPages[slug]`.
 * A linha do produto (`family`) dá a migalha, a ação de comparar, os relacionados e o contato.
 * Slug desconhecido mostra a 404 do sistema no próprio endereço (sem redirecionar).
 */
const ProductPage = () => {
  const { slug = "" } = useParams();
  const product = Object.prototype.hasOwnProperty.call(productPages, slug) ? productPages[slug] : undefined;
  if (!product) return <NotFound />;
  const { family } = product;

  return (
    <PageShell title={`${product.name}, ${product.kind}`} description={product.description}>
      <PageHero
        tone="dark"
        title={product.name}
        lead={product.lead}
        crumbs={[
          { label: "Início", href: "/" },
          { label: "Soluções", href: "/solucoes" },
          { label: family.label, href: family.href },
          { label: product.name },
        ]}
        media={product.hero}
        actions={[
          { label: "Conversar pelo WhatsApp", href: whatsappHref(product.whatsappText), kind: "primary" },
          { label: family.compare.label, href: family.compare.href, kind: "quiet" },
        ]}
        eyebrow={product.line}
      />

      {product.facts.length > 0 && (
        <PageSection id="em-numeros" title={`${product.name} em números`}>
          <FactStrip items={product.facts} />
        </PageSection>
      )}

      <PageSection id="onde-faz-sentido" title={product.fit.title} intro={product.fit.intro} media={product.fit.media}>
        <PointList items={product.points} />
      </PageSection>

      <PageSection id="ficha-tecnica" title="Dados técnicos">
        <SpecTable caption={`Ficha técnica do ${product.name}`} source={product.specSource} rows={product.specs} />
      </PageSection>

      <PageSection id="perguntas" title="Perguntas frequentes">
        <Faq items={product.faq} />
      </PageSection>

      <PageSection
        id={family.relatedId}
        title={family.relatedTitle}
        intro={
          <>
            <p>{family.relatedIntro}</p>
            <Link className="text-link" to={family.compare.href}>
              {family.relatedLink} <ArrowRight aria-hidden="true" />
            </Link>
          </>
        }
      >
        <CardGrid items={product.related.map((slug) => family.cards[slug])} />
      </PageSection>

      <PageContact
        paths={contactPaths({
          title: `Quero conversar sobre o ${product.name}`,
          whatsappText: product.whatsappText,
          href: family.compare.href,
          linkLabel: family.contactLink,
        })}
      />
    </PageShell>
  );
};

export default ProductPage;
