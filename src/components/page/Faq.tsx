import { useId, useState } from "react";
import { Plus } from "lucide-react";

/**
 * Perguntas frequentes em accordion: cada pergunta é um botão nativo (Enter e Espaço de graça)
 * dentro de um h3, com aria-expanded e aria-controls apontando para a resposta.
 */
const Faq = ({ items }: { items: { q: string; a: string }[] }) => {
  const base = useId();
  const [open, setOpen] = useState<ReadonlySet<number>>(new Set());

  const toggle = (index: number) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <div className="page-faq">
      {items.map((item, index) => {
        const expanded = open.has(index);
        const buttonId = `${base}-q${index}`;
        const panelId = `${base}-a${index}`;
        return (
          <div key={item.q} className={expanded ? "page-faq__item is-open" : "page-faq__item"} data-reveal="item">
            <h3>
              <button id={buttonId} type="button" aria-expanded={expanded} aria-controls={panelId} onClick={() => toggle(index)}>
                <span>{item.q}</span>
                <Plus aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} aria-labelledby={buttonId} className="page-faq__answer" hidden={!expanded}>
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Faq;
