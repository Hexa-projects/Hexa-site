import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "A Hexamedical transformou nossa operação. O suporte técnico é rápido, competente e confiável. Não temos mais paradas inesperadas.",
    author: "Dr. Ricardo Mendes",
    role: "Diretor Médico",
    company: "Clínica Imagem SP",
  },
  {
    quote: "Desde que contratamos o contrato de manutenção, nossa previsibilidade financeira melhorou significativamente. Recomendo sem hesitar.",
    author: "Ana Paula Silva",
    role: "Gestora Administrativa",
    company: "Hospital Regional Norte",
  },
  {
    quote: "A equipe técnica é extremamente qualificada e o tempo de resposta sempre dentro do SLA. Parceiros de verdade.",
    author: "Eng. Carlos Oliveira",
    role: "Coordenador de Engenharia Clínica",
    company: "Centro de Diagnóstico Vida",
  },
];

const TestimonialsBlock = () => {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
            O que dizem nossos clientes
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A confiança de quem escolheu a Hexamedical como parceira estratégica.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.author} className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
              <Quote className="mb-4 h-8 w-8 text-accent/30" />
              <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground italic">
                "{t.quote}"
              </p>
              <div>
                <p className="font-bold text-foreground">{t.author}</p>
                <p className="text-xs text-muted-foreground">{t.role} — {t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsBlock;
