import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

interface HeroSectionProps {
  headline: string;
  subtitle: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  variant?: "dark" | "light";
  backgroundImage?: string;
}

const HeroSection = ({
  headline,
  subtitle,
  ctaPrimaryLabel = "Falar com Especialista",
  ctaPrimaryHref = "/contato",
  ctaSecondaryLabel,
  ctaSecondaryHref,
  variant = "dark",
  backgroundImage,
}: HeroSectionProps) => {
  const isDark = variant === "dark";

  return (
    <section
      className={`relative overflow-hidden ${
        isDark ? "bg-dark-surface text-dark-surface-foreground" : "bg-background text-foreground"
      }`}
    >
      {backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className={`absolute inset-0 ${isDark ? "bg-dark-surface/80" : "bg-background/75"}`} />
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -right-40 -top-40 h-96 w-96 rounded-full ${isDark ? "bg-secondary/20" : "bg-accent/5"} blur-3xl`} />
        <div className={`absolute -bottom-20 -left-20 h-72 w-72 rounded-full ${isDark ? "bg-accent/20" : "bg-primary/5"} blur-3xl`} />
      </div>

      <div className="container relative z-10 py-16 md:py-24 lg:py-32">
        <div className="max-w-3xl">
          <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-balance md:text-4xl lg:text-5xl xl:text-6xl">
            {headline}
          </h1>
          <p className={`mb-8 max-w-2xl text-lg leading-relaxed ${isDark ? "text-dark-surface-foreground/80" : "text-muted-foreground"} md:text-xl`}>
            {subtitle}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to={ctaPrimaryHref}>
                <Phone className="mr-2 h-4 w-4" />
                {ctaPrimaryLabel}
              </Link>
            </Button>
            {ctaSecondaryLabel && ctaSecondaryHref && (
              <Button
                asChild
                size="lg"
                variant={isDark ? "outline" : "secondary"}
                className={isDark ? "border-dark-surface-foreground/30 text-dark-surface-foreground hover:bg-dark-surface-foreground/10" : ""}
              >
                <Link to={ctaSecondaryHref}>
                  {ctaSecondaryLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
