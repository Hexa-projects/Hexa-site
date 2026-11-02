import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { whatsappHref, type TriagePath } from "@/data/home";
import { ScrollTrigger } from "@/lib/motion";
import { useMotionScope } from "@/motion/useMotionScope";
import { tweenStage } from "@/motion/stage/align";
import type { StageMode } from "@/motion/capability";

/**
 * O hexágono do logo vira o anel do túnel quando cada caminho entra na tela (transição CSS de `d`).
 * Os dois caminhos têm seis curvas, então o navegador interpola um no outro.
 */
const HEXAGON = "M24 5 C29.48 8.17 34.97 11.33 40.45 14.5 C40.45 20.83 40.45 27.17 40.45 33.5 C34.97 36.67 29.48 39.83 24 43 C18.52 39.83 13.03 36.67 7.55 33.5 C7.55 27.17 7.55 20.83 7.55 14.5 C13.03 11.33 18.52 8.17 24 5 Z";

/** H4: contato como triagem. Cada caminho já abre a conversa com o assunto certo. */
const ContactTriage = ({ items, mode }: { items: TriagePath[]; mode: StageMode }) => {
  const root = useRef<HTMLElement>(null);
  const [ringed, setRinged] = useState<ReadonlySet<string>>(new Set());

  // Cada linha vira anel uma vez, ao entrar na tela; sem IntersectionObserver, já nasce anel.
  useEffect(() => {
    const rows = Array.from(root.current?.querySelectorAll<HTMLElement>(".triage__row") ?? []);
    const ids = rows.map((row) => row.dataset.path ?? "");
    if (typeof IntersectionObserver === "undefined") {
      setRinged(new Set(ids));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entered = entries.filter((entry) => entry.isIntersecting).map((entry) => (entry.target as HTMLElement).dataset.path ?? "");
        if (!entered.length) return;
        entries.filter((entry) => entry.isIntersecting).forEach((entry) => observer.unobserve(entry.target));
        setRinged((current) => new Set([...current, ...entered]));
      },
      { threshold: 0.6 },
    );
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  useMotionScope(
    root,
    ({ desktop }) => {
      if (desktop && mode === "immersive") {
        // O anel volta a abrir atrás do título: o fim da história é a conversa.
        const close = () => tweenStage({ center: [0.3, 0.22], aperture: 0.32, glow: 0.5, rings: 14, progress: 2.6 });
        ScrollTrigger.create({ trigger: root.current, start: "top 60%", onEnter: close, onEnterBack: close });
      }
    },
    [mode],
  );

  return (
    <section ref={root} className="triage" aria-labelledby="triage-title">
      <div className="triage__head">
        <h2 id="triage-title">Como podemos ajudar?</h2>
        <p>Escolha o caminho e a conversa já começa com o assunto certo, direto com a equipe comercial e técnica.</p>
      </div>

      <ul className="triage__list">
        {items.map((item) => (
          <li key={item.id} className={ringed.has(item.id) ? "triage__row is-ring" : "triage__row"} data-path={item.id}>
            <svg className="triage__shape" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
              <path d={HEXAGON} />
            </svg>
            <div className="triage__copy">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
            <div className="triage__actions">
              <a className="button button--primary" href={whatsappHref(item.whatsappText)} target="_blank" rel="noopener noreferrer">
                <span className="sr-only">{item.title}: </span>Conversar pelo WhatsApp <ArrowUpRight aria-hidden="true" />
              </a>
              <Link className="text-link" to={item.href}>
                {item.linkLabel} <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <p className="triage__channels">
        Prefere e-mail ou telefone?{" "}
        <Link to="/contato">
          Ver todos os canais <ArrowRight aria-hidden="true" />
        </Link>
      </p>
    </section>
  );
};

export default ContactTriage;
