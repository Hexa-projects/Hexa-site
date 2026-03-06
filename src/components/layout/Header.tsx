import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navigation } from "@/data/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import logoBanner from "@/assets/logo-banner.webp";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/95 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
          <img src={logoBanner} alt="Hexamedical — Taking Care Your Equipment" className="h-9 w-auto md:h-10" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <div
              key={item.label}
              className="group relative"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-accent",
                  location.pathname.startsWith(item.href) && item.href !== "#"
                    ? "text-accent"
                    : "text-foreground/80"
                )}
              >
                {item.label}
                {item.children && <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />}
              </Link>

              {item.children && openDropdown === item.label && (
                <div className="absolute left-0 top-full z-50 min-w-[240px] rounded-lg border border-border bg-card p-2 shadow-lg animate-in fade-in-0 zoom-in-95">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      to={child.href}
                      className="block rounded-md px-3 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-accent"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Button asChild className="hidden bg-primary text-primary-foreground hover:bg-primary/90 sm:inline-flex">
            <Link to="/contato">
              <Phone className="mr-1.5 h-4 w-4" />
              Falar com Especialista
            </Link>
          </Button>
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-card lg:hidden">
          <div className="container space-y-1 py-4">
            {navigation.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className={cn("h-4 w-4 transition-transform", openDropdown === item.label && "rotate-180")} />
                  )}
                </button>
                {item.children && openDropdown === item.label && (
                  <div className="ml-3 space-y-1 border-l-2 border-accent/30 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-accent"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3">
              <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/contato" onClick={() => setMobileOpen(false)}>
                  <Phone className="mr-1.5 h-4 w-4" />
                  Falar com Especialista
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
