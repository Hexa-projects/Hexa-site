import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { blogPosts } from "@/data/blog";

const BlogHighlight = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
              Conteúdo em destaque
            </h2>
            <p className="max-w-xl text-muted-foreground">
              Insights, guias técnicos e novidades do mercado de diagnóstico por imagem.
            </p>
          </div>
          <Link to="/blog" className="hidden items-center gap-1 text-sm font-semibold text-accent hover:text-accent/80 md:flex">
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
            >
              <div className="flex h-48 w-full items-center justify-center p-0 bg-muted/20">
                 <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="mb-2 inline-block w-fit rounded-full bg-accent/10 px-3 py-0.5 text-xs font-semibold text-accent">
                  {post.category}
                </span>
                <h3 className="mb-2 font-bold text-foreground group-hover:text-accent transition-colors">{post.title}</h3>
                <p className="mb-4 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.date).toLocaleDateString("pt-BR")}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
            Ver todos os artigos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogHighlight;
