import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Mail, Phone } from "lucide-react";
import { whatsappHref, type TriagePath } from "@/data/home";
import { duration, ease, gsap, ScrollTrigger } from "@/lib/motion";
import { useMotionScope } from "@/motion/useMotionScope";
import { tweenStage } from "@/motion/stage/align";
import type { StageMode } from "@/motion/capability";

/** O hexágono do logo e o anel do túnel: a mesma forma em dois estados. */
const HEXAGON = "M24 5 L40.45 14.5 L40.45 33.5 L24 43 L7.55 33.5 L7.55 14.5 Z";
const RING = "M24 5 C34.49 5 43 13.51 43 24 C43 34.49 34.49 43 24 43 C13.51 43 5 34.49 5 24 C5 13.51 13.51 5 24 5 Z";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** H4: contato como triagem. Cada caminho já abre a conversa com o assunto certo. */
const ContactTriage = ({ items, mode }: { items: TriagePath[]; mode: StageMode }) => {
  const root = useRef<HTMLElement>(null);

  const morph = (row: HTMLElement, toRing: boolean) => {
    if (reducedMotion()) return;
    const shape = row.querySelector("path");
    if (shape) gsap.to(shape, { morphSVG: toRing ? RING : HEXAGON, duration: duration.quick, ease: ease.out, overwrite: true });
  };

  useMotionScope(
    root,
    ({ desktop }) => {
      if (desktop && mode === "immersive") {
        // O anel volta ao centro e se fecha: o fim da história é a conversa.
        const close = () => tweenStage({ center: [0, -0.62], aperture: 0, glow: 0.4, rings: 14, progress: 2.6 });
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
          <li
            key={item.id}
            className="triage__row"
            onPointerEnter={(event) => morph(event.currentTarget, true)}
            onPointerLeave={(event) => morph(event.currentTarget, false)}
            onFocus={(event) => morph(event.currentTarget, true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) morph(event.currentTarget, false);
            }}
          >
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

      <div className="triage__channels">
        <a href="mailto:comercial@hexamedical.com.br"><Mail aria-hidden="true" /> comercial@hexamedical.com.br</a>
        <a href="tel:+5511973140914"><Phone aria-hidden="true" /> +55 11 97314-0914</a>
        <Link to="/contato">Todos os canais <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
};

export default ContactTriage;
