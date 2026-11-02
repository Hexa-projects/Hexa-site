import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { navigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__brand" aria-label="Hexamedical — página inicial">
          <img src="/assets/hexa/Logo-Hexamedical.png" alt="Hexamedical" className="site-header__logo" />
        </Link>

        <nav className="site-header__nav" aria-label="Navegação principal">
          {navigation.map((item) => (
            <div
              key={item.label}
              className="site-nav-item"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={(event) => {
                if (!event.currentTarget.contains(document.activeElement)) setOpenDropdown(null);
              }}
              onFocusCapture={() => setOpenDropdown(item.label)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setOpenDropdown(null);
                }
              }}
              onKeyDownCapture={(event) => {
                if (event.key === "Escape") {
                  event.currentTarget.querySelector<HTMLAnchorElement>(".site-nav-link")?.focus();
                  setOpenDropdown(null);
                }
              }}
            >
              <Link
                to={item.href}
                aria-haspopup={item.children ? "true" : undefined}
                aria-expanded={item.children ? openDropdown === item.label : undefined}
                className={cn(
                  "site-nav-link",
                  location.pathname.startsWith(item.href) && "site-nav-link--active",
                )}
              >
                {item.label === "Empresa" ? "A Hexamedical" : item.label}
                {item.children && <ChevronDown aria-hidden="true" />}
              </Link>

              {item.children && openDropdown === item.label && (
                <div className="site-nav-panel">
                  {item.children.map((child) => (
                    <Link key={child.href} to={child.href} className="site-nav-panel__link">
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <Link to="/contato" className="site-header__cta">
          <span>Falar com especialista</span>
          <ArrowUpRight aria-hidden="true" />
        </Link>

        <button
          type="button"
          className="site-header__menu-button"
          onClick={() => setMobileOpen((value) => !value)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {mobileOpen && (
        <nav id="mobile-navigation" className="mobile-navigation" aria-label="Navegação móvel">
          {navigation.map((item) => (
            <div key={item.label} className="mobile-navigation__group">
              <div className="mobile-navigation__heading">
                <Link to={item.href}>{item.label === "Empresa" ? "A Hexamedical" : item.label}</Link>
                {item.children && (
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    aria-label={`${openDropdown === item.label ? "Recolher" : "Expandir"} ${item.label}`}
                  >
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(openDropdown === item.label && "rotate-180")}
                    />
                  </button>
                )}
              </div>
              {item.children && openDropdown === item.label && (
                <div className="mobile-navigation__children">
                  {item.children.map((child) => (
                    <Link key={child.href} to={child.href}>{child.label}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link to="/contato" className="mobile-navigation__cta">
            Falar com especialista <ArrowUpRight aria-hidden="true" />
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
