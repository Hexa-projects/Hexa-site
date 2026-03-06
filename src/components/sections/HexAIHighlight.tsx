import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, ArrowRight, Sparkles, BarChart3, Zap } from "lucide-react";

const features = [
  { icon: Sparkles, title: "Análise Inteligente", description: "IA que auxilia na interpretação de exames com precisão e agilidade." },
  { icon: BarChart3, title: "Produtividade", description: "Reduza o tempo de laudo e aumente o volume de atendimentos." },
  { icon: Zap, title: "Integração", description: "Compatível com os principais sistemas PACS e RIS do mercado." },
];

const HexAIHighlight = () => {
  return (
    <section className="relative overflow-hidden bg-dark-surface py-16 text-dark-surface-foreground md:py-24">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2 bg-gradient-to-b from-accent/5 to-transparent" />
      </div>
      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Brain className="h-4 w-4" />
              Novidade
            </div>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              HexAI: Inteligência Artificial para Diagnóstico por Imagem
            </h2>
            <p className="mb-8 text-lg text-dark-surface-foreground/80">
              Potencialize a precisão diagnóstica e a produtividade da sua equipe com inteligência artificial aplicada à análise de exames de ressonância magnética.
            </p>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/solucoes/hexai">
                Conhecer o HexAI
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4">
            {features.map((feat) => (
              <div key={feat.title} className="flex items-start gap-4 rounded-xl border border-dark-surface-foreground/10 bg-dark-surface-foreground/5 p-5 backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <feat.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="mb-1 font-bold">{feat.title}</h3>
                  <p className="text-sm text-dark-surface-foreground/70">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HexAIHighlight;
