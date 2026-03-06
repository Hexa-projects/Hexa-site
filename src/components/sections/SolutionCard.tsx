import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon } from "lucide-react";

interface SolutionCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  image?: string;
}

const SolutionCard = ({ title, description, href, icon: Icon, image }: SolutionCardProps) => {
  return (
    <Link
      to={href}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg"
    >
      {image && (
        <div className="flex h-48 w-full items-center justify-center p-4 bg-white">
          <img
            src={image}
            alt={title}
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6 bg-card">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-bold text-foreground">{title}</h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <span className="inline-flex items-center text-sm font-semibold text-accent transition-colors group-hover:text-accent/80">
        Saiba mais
        <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
      </div>
    </Link>
  );
};

export default SolutionCard;
