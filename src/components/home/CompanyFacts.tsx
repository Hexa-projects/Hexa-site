import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { CompanyFact } from "@/data/home";

/** Quem é a Hexamedical: a tese da empresa e os números que a sustentam, logo depois da abertura. */
const CompanyFacts = ({ items }: { items: CompanyFact[] }) => (
  <section className="about" aria-labelledby="about-title">
    <div className="about__head">
      <h2 id="about-title">Quem vende também instala e conserta</h2>
      <p>
        A Hexamedical representa a Esaote em ressonância magnética e vende também tomografia veterinária, radiografia digital, bombas
        injetoras e software. Atendemos clínicas, hospitais, universidades e centros veterinários.
      </p>
      <p>
        Depois da instalação, o contato continua o mesmo. Nossa equipe de campo faz a manutenção em todo o país, e o laboratório próprio
        tenta recuperar a peça com defeito antes de propor uma troca.
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
