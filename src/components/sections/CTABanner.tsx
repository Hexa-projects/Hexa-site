import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";

interface CTABannerProps {
  headline?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

const CTABanner = ({
  headline = "Pronto para otimizar sua operação de diagnóstico por imagem?",
  subtitle = "Fale com um especialista Hexamedical e descubra a solução ideal para sua instituição.",
  ctaLabel = "Falar com Especialista",
  ctaHref = "/contato",
  secondaryLabel,
  secondaryHref,
}: CTABannerProps) => {
  return (
    <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground md:py-20">
      <div className="absolute inset-0">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-secondary/20 blur-3xl" />
      </div>
      <div className="container relative z-10 text-center">
        <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">{headline}</h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/80">{subtitle}</p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to={ctaHref}>
              <Phone className="mr-2 h-4 w-4" />
              {ctaLabel}
            </Link>
          </Button>
          {secondaryLabel && secondaryHref && (
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to={secondaryHref}>
                {secondaryLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
