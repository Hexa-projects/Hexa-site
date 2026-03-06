import { Shield, Microscope, Users, Package, FileCheck, Clock, LucideIcon } from "lucide-react";

interface Differential {
  icon: LucideIcon;
  title: string;
  description: string;
}

const differentials: Differential[] = [
  {
    icon: Shield,
    title: "Suporte Nacional",
    description: "Cobertura em todo o Brasil com atendimento presencial e remoto, garantindo agilidade nos chamados.",
  },
  {
    icon: Microscope,
    title: "Laboratório Próprio",
    description: "Capacidade de reparo de bobinas e componentes com controle de qualidade interno.",
  },
  {
    icon: Users,
    title: "Equipe Especializada",
    description: "Engenheiros e técnicos certificados com experiência exclusiva em ressonância magnética.",
  },
  {
    icon: Package,
    title: "Peças Originais",
    description: "Trabalhamos com peças originais e homologadas, preservando a integridade do equipamento.",
  },
  {
    icon: FileCheck,
    title: "Contratos Flexíveis",
    description: "Planos de manutenção adaptados à sua realidade operacional e financeira.",
  },
  {
    icon: Clock,
    title: "+15 Anos de Experiência",
    description: "Mais de uma década de atuação dedicada ao mercado de diagnóstico por imagem.",
  },
];

const DifferentialsGrid = () => {
  return (
    <section className="bg-muted/50 py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Por que escolher a Hexamedical?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Somos referência em soluções de Ressonância Magnética com diferenciais que garantem segurança, performance e previsibilidade para sua operação.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {differentials.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-md"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentialsGrid;
