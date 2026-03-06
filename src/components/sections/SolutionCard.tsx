import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon } from "lucide-react";

interface SolutionCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

const SolutionCard = ({ title, description, href, icon: Icon }: SolutionCardProps) => {
  return (
    <Link
      to={href}
      className="group flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-bold text-foreground">{title}</h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <span className="inline-flex items-center text-sm font-semibold text-accent transition-colors group-hover:text-accent/80">
        Saiba mais
        <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
};

export default SolutionCard;
