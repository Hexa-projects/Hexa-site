import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

const ServiceCard = ({ title, description, href, icon: Icon }: ServiceCardProps) => {
  return (
    <Link
      to={href}
      className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <h3 className="mb-1 font-bold text-foreground">{title}</h3>
        <p className="mb-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <span className="inline-flex items-center text-xs font-semibold text-accent">
          Ver detalhes
          <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
};

export default ServiceCard;
