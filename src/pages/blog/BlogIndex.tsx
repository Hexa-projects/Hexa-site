import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import PageSection from "@/components/page/PageSection";
import CardGrid from "@/components/page/CardGrid";
import PageContact from "@/components/page/PageContact";
import { publishedNewestFirst, publishedPosts, type BlogPost } from "@/data/blog";
import { triage } from "@/data/home";
import { hub } from "@/data/pages/solutions";
import { serviceHub } from "@/data/pages/services";
import { postCard } from "./postCard";

/**
 * /blog: os artigos publicados, do mais novo ao mais antigo, cada um com a sua página.
 * Sem artigo publicado (hoje os textos estão em revisão), mostra o aviso e os caminhos para soluções e serviços.
 * `posts` existe para os testes; o site usa os publicados de src/data/blog.ts.
 */
const BlogIndex = ({ posts = publishedPosts }: { posts?: BlogPost[] }) => {
  const visible = publishedNewestFirst(posts);

  return (
    <PageShell title="Blog" description="Artigos da Hexamedical sobre ressonância magnética e diagnóstico por imagem.">
      <PageHero
        tone="light"
        title="Blog"
        lead="Artigos sobre ressonância magnética e diagnóstico por imagem."
        crumbs={[{ label: "Início", href: "/" }, { label: "Blog" }]}
      />

      {visible.length > 0 ? (
        <PageSection id="artigos" title="Artigos">
          <CardGrid items={visible.map(postCard)} />
        </PageSection>
      ) : (
        <PageSection id="artigos" title="Artigos" intro="Os artigos estão em revisão. Enquanto isso, fale com a equipe.">
          <CardGrid
            items={[
              { title: hub.title, body: hub.heroTitle, href: "/solucoes" },
              { title: serviceHub.title, body: serviceHub.heroTitle, href: "/servicos" },
            ]}
          />
        </PageSection>
      )}

      <PageContact paths={triage} />
    </PageShell>
  );
};

export default BlogIndex;
