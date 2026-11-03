import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { CompanyFact } from "@/data/home";

/** Quem é a Hexamedical: a tese da empresa e os números que a sustentam, logo depois da abertura. */
const CompanyFacts = ({ items }: { items: CompanyFact[] }) => (
  <section className="about" aria-labelledby="about-title">
    <div className="about__head">
      <h2 id="about-title">Uma operação técnica, não só um catálogo</h2>
      <p>
        A Hexamedical vende, instala e mantém equipamentos de diagnóstico por imagem, com foco em ressonância magnética. Representamos
        a tecnologia italiana da Esaote: sistemas abertos, eficientes em energia e em espaço, para clínicas, hospitais, universidades e
        centros veterinários.
      </p>
      <p>
        Depois da entrega, a mesma empresa continua responsável: equipe de campo em todo o país e um laboratório próprio que recupera o
        que muitas vezes seria trocado.
      </p>
      <Link to="/empresa" className="text-link">
        Conhecer a Hexamedical <ArrowRight aria-hidden="true" />
      </Link>
    </div>

    <dl className="about__facts">
      {items.map((fact) => (
        <div key={fact.value} className="about__fact">
          <dt>{fact.value}</dt>
          <dd>{fact.label}</dd>
        </div>
      ))}
    </dl>
  </section>
);

export default CompanyFacts;
