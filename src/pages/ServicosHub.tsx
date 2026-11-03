import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { serviceStories } from "@/data/editorial";

const order = ["manutencao", "contratos", "instalacao", "reparo"] as const;

export default function ServicosHub() {
  return <Layout><Helmet><title>Serviços técnicos — Hexamedical</title><meta name="description" content="Manutenção de equipamentos, contratos, instalação e reparo de peças e periféricos com a Hexamedical." /></Helmet><section className="ed-intro"><div className="ed-shell"><span className="ed-eyebrow">Serviços técnicos</span><h1>O equipamento é só o começo.</h1><p>A operação depende de manutenção, planejamento e resposta técnica. Conheça os serviços da Hexamedical para cada etapa.</p></div></section><section className="ed-shell ed-lineup" aria-label="Serviços Hexamedical">{order.map((slug, index) => { const item = serviceStories[slug]; return <article className="ed-lineup-item" key={slug}><span className="ed-lineup-item__number">0{index + 1}</span><div className="ed-lineup-item__media"><img src={item.image} alt={item.title} loading="lazy" /></div><div className="ed-lineup-item__copy"><span className="ed-eyebrow">Serviço / 0{index + 1}</span><h2>{item.title}</h2><p>{item.intro}</p><Link className="ed-text-link" to={`/servicos/${slug}`}>Conhecer serviço <ArrowUpRight size={19} /></Link></div></article>; })}</section></Layout>;
}
