import { useParams } from "react-router-dom";
import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import PageSection from "@/components/page/PageSection";
import CardGrid from "@/components/page/CardGrid";
import PageContact from "@/components/page/PageContact";
import NotFound from "@/pages/NotFound";
import { formatPostDate, postsNewestFirst } from "@/data/blog";
import { triage } from "@/data/home";
import { postCard } from "./postCard";

/**
 * /blog/:slug: um artigo. Título é o único h1 (no hero); data, categoria e texto ficam no <article>, na coluna de leitura.
 * Fecha com os outros artigos e a triagem, com a mensagem do artigo na trilha de compra.
 * Slug desconhecido mostra a 404 do sistema no próprio endereço.
 */
const BlogPost = () => {
  const { slug = "" } = useParams();
  const post = postsNewestFirst.find((item) => item.slug === slug);
  if (!post) return <NotFound />;

  const others = postsNewestFirst.filter((item) => item.slug !== post.slug);
  const whatsappText = `Olá! Li o artigo ${post.title} e quero falar com a equipe.`;

  return (
    <PageShell title={post.title} description={post.excerpt}>
      <PageHero
        tone="light"
        title={post.title}
        lead={post.excerpt}
        crumbs={[{ label: "Início", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]}
        media={{ src: post.image, width: post.imageWidth, height: post.imageHeight, alt: "" }}
      />

      <section className="page-section page-section--light" aria-label="Artigo">
        <div className="page-section__inner">
          <article className="page-prose blog-article">
            <p className="blog-article__meta">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span aria-hidden="true"> · </span>
              <span>{post.category}</span>
            </p>
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </div>
      </section>

      <PageSection id="outros-artigos" title="Outros artigos">
        <CardGrid items={others.map(postCard)} />
      </PageSection>

      <PageContact paths={triage.map((item) => (item.id === "comprar" ? { ...item, whatsappText } : item))} />
    </PageShell>
  );
};

export default BlogPost;
