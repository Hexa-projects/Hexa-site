import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import { blogPosts } from "@/data/blog";
import { Calendar } from "lucide-react";

const BlogPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Blog — Hexamedical</title>
        <meta name="description" content="Artigos técnicos e tendências em diagnóstico por imagem, RM e eficiência operacional." />
      </Helmet>
      <PageBreadcrumb items={[{ label: "Blog" }]} />
      <section className="py-16 md:py-24">
        <div className="container">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">Blog Hexamedical</h1>
          <p className="mb-10 max-w-3xl text-muted-foreground">Conteúdo técnico e estratégico para apoiar decisões sobre equipamentos, serviços e operação.</p>
          <div className="grid gap-6 md:grid-cols-3">
            {blogPosts.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg">
                <div className="flex h-48 w-full items-center justify-center p-0 bg-muted/20">
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="flex flex-1 flex-col p-6 bg-card">
                  <span className="mb-2 inline-block rounded-full bg-accent/10 px-3 py-0.5 text-xs font-semibold text-accent">{post.category}</span>
                  <h2 className="mb-2 text-lg font-bold">{post.title}</h2>
                  <p className="mb-3 text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(post.date).toLocaleDateString("pt-BR")}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;
