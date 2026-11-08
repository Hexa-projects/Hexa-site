import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import PageSection from "@/components/page/PageSection";
import CardGrid from "@/components/page/CardGrid";
import PageContact from "@/components/page/PageContact";
import { postsNewestFirst } from "@/data/blog";
import { triage } from "@/data/home";
import { postCard } from "./postCard";

/** /blog: os artigos do mais novo ao mais antigo, cada um com a sua página. */
const BlogIndex = () => (
  <PageShell title="Blog" description="Artigos da Hexamedical sobre ressonância magnética e diagnóstico por imagem.">
    <PageHero
      tone="light"
      title="Blog"
      lead="Artigos sobre ressonância magnética e diagnóstico por imagem."
      crumbs={[{ label: "Início", href: "/" }, { label: "Blog" }]}
    />

    <PageSection id="artigos" title="Artigos">
      <CardGrid items={postsNewestFirst.map(postCard)} />
    </PageSection>

    <PageContact paths={triage} />
  </PageShell>
);

export default BlogIndex;
