import type { CompanyFact } from "@/data/home";

/** Faixa de números, no padrão dos números da empresa na home: o primeiro leva o fio laranja. */
const FactStrip = ({ items }: { items: CompanyFact[] }) => (
  <dl className="page-facts">
    {items.map((fact) => (
      <div key={fact.value} className="page-facts__item" data-reveal="item">
        <dt>{fact.value}</dt>
        <dd>{fact.label}</dd>
      </div>
    ))}
  </dl>
);

export default FactStrip;
