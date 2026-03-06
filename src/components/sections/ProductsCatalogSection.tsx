import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { productCatalog } from "@/data/catalog";

const ProductsCatalogSection = () => {
  return (
    <section className="border-t border-border bg-background py-16 md:py-24">
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Portfólio completo de produtos</h2>
          <p className="mx-auto max-w-3xl text-muted-foreground">
            Todos os principais produtos da Hexamedical organizados por categoria, com imagens e contexto técnico-comercial.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productCatalog.map((item) => {
            const content = (
              <>
                <div className="h-44 w-full overflow-hidden bg-white p-2">
                  <img src={item.image} alt={item.name} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
                </div>
                <div className="p-5">
                  <Badge variant="secondary" className="mb-3">{item.category}</Badge>
                  <h3 className="mb-2 text-base font-bold text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </>
            );

            if (item.href) {
              return (
                <Link key={item.slug} to={item.href} className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg">
                  {content}
                </Link>
              );
            }

            return (
              <article key={item.slug} className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg">
                {content}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductsCatalogSection;
