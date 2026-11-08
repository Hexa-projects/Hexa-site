import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { navigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const header = useRef<HTMLElement>(null);
  const location = useLocation();
  // Na home o cabeçalho flutua sobre a página e só fica escuro enquanto a abertura grafite está por baixo dele.
  const overlay = location.pathname === "/";
  const [overDark, setOverDark] = useState(overlay);
  const onStage = overlay && overDark;
  // A home já tem a seção de contato: o CTA desliza até ela em vez de trocar de página.
  const contactHref = overlay ? "/#contato" : "/contato";

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  // Some ao rolar para baixo e volta ao subir; nunca some com o menu aberto ou com foco dentro.
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const darkUnderneath = () => {
      const dark = document.querySelector<HTMLElement>('[data-header-theme="dark"]');
      return dark ? dark.getBoundingClientRect().bottom > (header.current?.offsetHeight ?? 0) : false;
    };
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const focusInside = header.current?.contains(document.activeElement) ?? false;
      setScrolled(y > 24);
      setOverDark(darkUnderneath());
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 160 && !mobileOpen && !focusInside);
      last = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Ao recarregar no meio da página, o fundo já vem certo, sem esperar a primeira rolagem.
    setScrolled(window.scrollY > 24);
    setOverDark(darkUnderneath());
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [mobileOpen]);

  return (
    <header
      ref={header}
      className={cn("site-header", overlay && "site-header--overlay", onStage && "site-header--stage", scrolled && "is-scrolled", hidden && "is-hidden")}
      onFocusCapture={() => setHidden(false)}
    >
      <div className="site-header__inner">
        <Link to="/" className="site-header__brand" aria-label="Hexamedical, página inicial">
          <img
            src={onStage ? "/assets/brand/hexamedical-logo-light.webp" : "/assets/brand/hexamedical-logo.webp"}
            alt="Hexamedical"
            width={176}
            height={45}
            className="site-header__logo"
          />
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

        <Link to={contactHref} className="site-header__cta">
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
          <Link to={contactHref} className="mobile-navigation__cta">
            Falar com especialista <ArrowUpRight aria-hidden="true" />
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
