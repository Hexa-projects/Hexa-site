import { Link } from "react-router-dom";
import { segments } from "@/data/segments";

const SegmentsGrid = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Segmentos que atendemos
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Soluções dimensionadas para a realidade de cada tipo de instituição de saúde.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {segments.map((seg) => (
            <Link
              key={seg.slug}
              to={`/segmentos/${seg.slug}`}
              className="group flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-md"
            >
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <seg.icon className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-foreground">{seg.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SegmentsGrid;
