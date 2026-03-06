const metrics = [
  { value: "+16 anos", label: "Experiência em RM e suporte técnico" },
  { value: "+500", label: "Equipamentos atendidos" },
  { value: "5 unidades", label: "Cobertura nacional no Brasil" },
  { value: "24h", label: "Resposta técnica em casos críticos" },
];

const MetricsStrip = () => {
  return (
    <section className="border-t border-border bg-dark-surface py-10">
      <div className="container grid gap-6 text-center text-dark-surface-foreground sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-dark-surface-foreground/10 bg-dark-surface/80 p-5">
            <p className="text-2xl font-extrabold tracking-tight text-primary">{m.value}</p>
            <p className="mt-2 text-xs uppercase tracking-widest text-dark-surface-foreground/70">{m.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MetricsStrip;
