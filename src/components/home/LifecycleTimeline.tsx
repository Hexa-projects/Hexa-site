import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { LifecycleStage } from "@/data/home";
import { duration, ease, gsap, ScrollTrigger } from "@/lib/motion";
import { useMotionScope } from "@/motion/useMotionScope";
import type { StageMode } from "@/motion/capability";

/** Vértices de um hexágono sobre o anel: uma etapa em cada vértice, a partir do topo. */
const RING_R = 46;
const vertex = (index: number) => {
  const angle = (-90 + index * 60) * (Math.PI / 180);
  return { x: 50 + RING_R * Math.cos(angle), y: 50 + RING_R * Math.sin(angle) };
};

/** Pontos de um hexágono pequeno (marcador de etapa) centrado em (x, y). */
const hexagonPoints = (x: number, y: number, size: number) =>
  Array.from({ length: 6 }, (_, k) => {
    const a = (k * 60 - 90) * (Math.PI / 180);
    return `${(x + size * Math.cos(a)).toFixed(2)},${(y + size * Math.sin(a)).toFixed(2)}`;
  }).join(" ");

/** No celular: a foto da etapa dentro do anel, com os seis hexágonos e esta etapa marcada. */
const StageBadge = ({ item, index, total }: { item: LifecycleStage; index: number; total: number }) => (
  <div className="lifecycle__badge">
    <svg className="lifecycle__badge-ring" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <circle className="lifecycle__ring-track" cx="50" cy="50" r={RING_R} />
      <circle
        className="lifecycle__badge-progress"
        cx="50"
        cy="50"
        r={RING_R}
        pathLength={total}
        strokeDasharray={`${index + 1} ${total}`}
        transform="rotate(-90 50 50)"
      />
      {Array.from({ length: total }, (_, k) => {
        const { x, y } = vertex(k);
        return <polygon key={k} className={`lifecycle__badge-node${k <= index ? " is-reached" : ""}`} points={hexagonPoints(x, y, 3)} />;
      })}
    </svg>
    <img
      className="lifecycle__badge-photo"
      data-stage={item.id}
      src={item.image.src}
      width={item.image.width}
      height={item.image.height}
      alt={item.image.alt}
      loading="lazy"
      decoding="async"
    />
  </div>
);

/**
 * H2: a vida inteira do equipamento. O texto rola normalmente (nada é escondido);
 * ao lado, um anel fixo com a foto de cada etapa revelada pela varredura.
 */
const LifecycleTimeline = ({ items, mode }: { items: LifecycleStage[]; mode: StageMode }) => {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const progressRing = useRef<SVGCircleElement>(null);

  useMotionScope(
    root,
    ({ desktop, mobile, reduced }) => {
      const scope = root.current!;
      // No celular imersivo o anel fixo aparece no topo da seção (CSS) e segue a mesma cena do desktop.
      const ringScene = desktop || (mobile && mode === "immersive");
      const photos = gsap.utils.toArray<HTMLElement>(".lifecycle__photo", scope);
      const markers = gsap.utils.toArray<SVGElement>(".lifecycle__marker", scope);
      const articles = gsap.utils.toArray<HTMLElement>(".lifecycle__stage", scope);
      const scanLine = scope.querySelector<HTMLElement>(".lifecycle__scan");
      let layer = 10;
      let current = -1;

      const activate = (index: number) => {
        if (index === current) return;
        current = index;
        articles.forEach((article, i) => article.classList.toggle("is-active", i === index));
        markers.forEach((marker, i) => marker.classList.toggle("is-reached", i <= index));
        const photo = photos[index];
        if (!photo) return;
        layer += 1;
        photo.style.zIndex = String(layer);
        if (reduced) {
          gsap.fromTo(photo, { opacity: 0 }, { opacity: 1, duration: 0.2 });
          return;
        }
        // A varredura: a linha cruza a moldura e a foto aparece atrás dela.
        gsap.fromTo(photo, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: duration.focal, ease: ease.inOut, overwrite: true });
        if (scanLine) {
          gsap.fromTo(
            scanLine,
            { left: "0%", opacity: 1 },
            { left: "100%", duration: duration.focal, ease: ease.inOut, overwrite: true, onComplete: () => gsap.set(scanLine, { opacity: 0 }) },
          );
        }
      };

      if (ringScene || reduced) {
        articles.forEach((article, index) => {
          ScrollTrigger.create({
            trigger: article,
            // A etapa ativa é a que cruza o meio da tela: foto e texto mudam juntos.
            start: "top center",
            end: "bottom center",
            onToggle: (self) => self.isActive && activate(index),
          });
        });
        activate(0);
      }

      if (ringScene && progressRing.current && list.current) {
        gsap.fromTo(
          progressRing.current,
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: list.current,
              start: "top 60%",
              end: "bottom 60%",
              scrub: true,
            },
          },
        );
      }
    },
    [mode],
  );

  return (
    <section ref={root} className="lifecycle" aria-labelledby="lifecycle-title">
      <div className="lifecycle__intro">
        <h2 id="lifecycle-title">Uma equipe só, da compra ao reparo</h2>
        <p>
          Comprar, instalar e manter uma ressonância costuma passar por vários fornecedores, e cada troca de mãos pode parar a agenda de
          exames. Na Hexamedical, a mesma equipe cuida das seis etapas e sabe o que foi decidido em cada uma.
        </p>
      </div>

      <div className="lifecycle__body">
        <div className="lifecycle__visual" aria-hidden="true">
          <div className="lifecycle__sticky">
            <svg className="lifecycle__ring" viewBox="0 0 100 100" focusable="false">
              <circle className="lifecycle__ring-track" cx="50" cy="50" r={RING_R} />
              <circle ref={progressRing} className="lifecycle__ring-progress" cx="50" cy="50" r={RING_R} transform="rotate(-90 50 50)" />
              {items.map((item, index) => {
                const { x, y } = vertex(index);
                const points = hexagonPoints(x, y, 2.2);
                return <polygon key={item.id} className="lifecycle__marker" points={points} />;
              })}
            </svg>
            <div className="lifecycle__portal">
              {items.map((item) => (
                <img
                  key={item.id}
                  className="lifecycle__photo"
                  data-stage={item.id}
                  src={item.image.src}
                  width={item.image.width}
                  height={item.image.height}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              ))}
              <span className="lifecycle__scan" />
            </div>
          </div>
        </div>

        <ol ref={list} className="lifecycle__list">
          {items.map((item, index) => (
            <li key={item.id}>
              <article className="lifecycle__stage" aria-labelledby={`etapa-${item.id}`}>
                <StageBadge item={item} index={index} total={items.length} />
                <h3 id={`etapa-${item.id}`}>{item.title}</h3>
                <p>{item.body}</p>
                <ul className="lifecycle__points">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <Link to={item.href} className="text-link">
                  {item.linkLabel} <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default LifecycleTimeline;
