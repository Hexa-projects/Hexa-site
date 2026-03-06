import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBreadcrumbProps {
  items: BreadcrumbItem[];
}

const PageBreadcrumb = ({ items }: PageBreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-border bg-muted/50">
      <div className="container flex items-center gap-1.5 py-3 text-sm">
        <Link to="/" className="text-muted-foreground transition-colors hover:text-accent">
          <Home className="h-4 w-4" />
        </Link>
        {items.map((item, index) => (
          <span key={index} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
            {item.href ? (
              <Link to={item.href} className="text-muted-foreground transition-colors hover:text-accent">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-foreground">{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
};

export default PageBreadcrumb;
