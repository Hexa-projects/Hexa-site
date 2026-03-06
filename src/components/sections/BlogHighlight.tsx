import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";

const posts = [
  {
    slug: "manutencao-preventiva-rm",
    title: "Por que a manutenção preventiva é essencial para sua RM",
    excerpt: "Entenda como um programa de manutenção preventiva reduz custos e aumenta a vida útil do seu equipamento de ressonância magnética.",
    date: "2025-01-15",
    category: "Manutenção",
  },
  {
    slug: "ia-diagnostico-imagem",
    title: "Como a IA está transformando o diagnóstico por imagem",
    excerpt: "Descubra as aplicações práticas da inteligência artificial na análise de exames e como o HexAI pode beneficiar sua instituição.",
    date: "2025-01-08",
    category: "Tecnologia",
  },
  {
    slug: "escolher-rm-clinica",
    title: "Como escolher o equipamento de RM ideal para sua clínica",
    excerpt: "Guia completo com critérios técnicos e financeiros para tomar a melhor decisão na aquisição do seu equipamento.",
    date: "2024-12-20",
    category: "Guia",
  },
];

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
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10" />
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
