import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const areas = [
  { title: "Salas de testes", body: "O site atual apresenta três salas de testes para avaliação e acompanhamento técnico de equipamentos e componentes." },
  { title: "Laboratórios", body: "Áreas dedicadas à eletrônica e à criogenia, além do trabalho com peças e periféricos." },
  { title: "Treinamento", body: "Espaços voltados à capacitação e ao desenvolvimento da equipe técnica." },
  { title: "Showroom", body: "Ambiente com infraestrutura para demonstração de ressonância magnética, incluindo gaiola de blindagem." },
];

export default function EstruturaPage() { return <Layout><Helmet><title>Estrutura técnica — Hexamedical</title><meta name="description" content="Conheça as áreas de testes, laboratórios, treinamento e showroom apresentados pela Hexamedical." /></Helmet><section className="ed-intro"><div className="ed-shell"><span className="ed-eyebrow">A Hexamedical / Estrutura</span><h1>Infraestrutura a serviço da operação.</h1><p>Uma base técnica para testar, reparar, treinar e apoiar serviços de diagnóstico por imagem.</p></div></section><section className="ed-shell ed-commercial"><span className="ed-eyebrow">Áreas apresentadas</span><h2>Da bancada ao equipamento em campo.</h2><div className="ed-detail-grid">{areas.map((area, index) => <article key={area.title}><span>0{index + 1}</span><h3>{area.title}</h3><p>{area.body}</p></article>)}</div><p className="ed-footnote">A descrição reflete a estrutura divulgada no site público atual. Fotos de cada ambiente e atualização da capacidade estão pendentes de validação interna.</p><Link to="/servicos" className="ed-text-link">Conhecer serviços técnicos <ArrowUpRight size={18} /></Link></section></Layout>; }
