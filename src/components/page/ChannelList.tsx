import { ArrowRight, ArrowUpRight } from "lucide-react";
import PageLink from "./PageLink";

export type Channel = {
  label: string;
  /** O dado em si (telefone, e-mail, horário), como texto que dá para selecionar e copiar. */
  value: string;
  /** Atalho ao lado do texto: ligar, escrever, abrir a página. */
  action?: { label: string; href: string };
};

/** Canais de atendimento: rótulo, o dado como texto e, se houver, um atalho. Painéis brancos com fio, como os cards de texto. */
const ChannelList = ({ items }: { items: Channel[] }) => (
  <dl className="page-channels">
    {items.map((item) => {
      const external = item.action ? !item.action.href.startsWith("/") : false;
      return (
        <div key={item.label} className="page-channels__item" data-reveal="item">
          <dt>{item.label}</dt>
          <dd>
            <span className="page-channels__value">{item.value}</span>
            {item.action && (
              <PageLink href={item.action.href} className="text-link">
                {item.action.label}
                {external ? <ArrowUpRight aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
              </PageLink>
            )}
          </dd>
        </div>
      );
    })}
  </dl>
);

export default ChannelList;
