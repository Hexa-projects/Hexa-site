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
import { contactPaths, products, rmCards } from "@/data/pages/solutions";

const RM_LINE = "/solucoes/ressonancia-magnetica";

/**
 * Página de produto da linha de RM, montada só com o kit e com `products[slug]`.
 * Slug desconhecido mostra a 404 do sistema no próprio endereço (sem redirecionar).
 */
const ProductPage = () => {
  const { slug = "" } = useParams();
  const product = Object.prototype.hasOwnProperty.call(products, slug) ? products[slug] : undefined;
  if (!product) return <NotFound />;

  return (
    <PageShell title={`${product.name}, ressonância magnética Esaote`} description={product.description}>
      <PageHero
        tone="dark"
        title={product.name}
        lead={product.lead}
        crumbs={[
          { label: "Início", href: "/" },
          { label: "Soluções", href: "/solucoes" },
          { label: "Ressonância magnética", href: RM_LINE },
          { label: product.name },
        ]}
        media={product.hero}
        actions={[
          { label: "Conversar pelo WhatsApp", href: whatsappHref(product.whatsappText), kind: "primary" },
          { label: "Comparar com a linha", href: `${RM_LINE}#comparativo`, kind: "quiet" },
        ]}
        eyebrow={product.line}
      />

      <PageSection id="em-numeros" title={`${product.name} em números`}>
        <FactStrip items={product.facts} />
      </PageSection>

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
        id="outras-ressonancias"
        title="Outras ressonâncias da linha"
        intro={
          <>
            <p>Indicação, campo, área de instalação e consumo dos quatro modelos estão lado a lado no comparativo.</p>
            <Link className="text-link" to={`${RM_LINE}#comparativo`}>
              Ver o comparativo da linha <ArrowRight aria-hidden="true" />
            </Link>
          </>
        }
      >
        <CardGrid items={product.related.map((slug) => rmCards[slug])} />
      </PageSection>

      <PageContact
        paths={contactPaths({
          title: `Quero conversar sobre o ${product.name}`,
          whatsappText: product.whatsappText,
          href: `${RM_LINE}#comparativo`,
          linkLabel: "Comparar a linha de RM",
        })}
      />
    </PageShell>
  );
};

export default ProductPage;
