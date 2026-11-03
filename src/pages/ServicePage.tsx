import { Navigate, Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowUpRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { serviceStories } from "@/data/editorial";

export default function ServicePage() {
  const { slug = "" } = useParams();
  if (!(slug in serviceStories)) return <Navigate to="/servicos" replace />;
  const item = serviceStories[slug as keyof typeof serviceStories];
  return <Layout><Helmet><title>{item.title} — Hexamedical</title><meta name="description" content={item.intro} /></Helmet><section className="ed-product-hero"><div className="ed-shell ed-product-hero__inner"><div className="ed-product-hero__copy"><Link className="ed-back" to="/servicos">← Serviços</Link><span className="ed-eyebrow">Suporte técnico Hexamedical</span><h1>{item.title}</h1><p className="ed-lede">{item.headline}</p><p>{item.intro}</p><div className="ed-actions"><Link className="ed-button" to="/contato">Conversar sobre o serviço <ArrowUpRight size={19} /></Link><a className="ed-text-link" href={item.source} target="_blank" rel="noreferrer">Apresentação atual <ArrowUpRight size={18} /></a></div></div><div className="ed-product-hero__visual"><img src={item.image} alt={item.title} /></div></div></section><section className="ed-shell ed-commercial"><span className="ed-eyebrow">Escopo</span><h2>Começamos pela necessidade do equipamento.</h2><div className="ed-detail-grid">{item.work.map((step, index) => <article key={step}><span>0{index + 1}</span><h3>{step}</h3><p>O escopo, as condições e o cronograma são definidos conforme a avaliação técnica e a proposta para a sua operação.</p></article>)}</div></section><section className="ed-cta"><div className="ed-shell"><span className="ed-eyebrow">Próximo passo</span><h2>Conte o que sua operação precisa.</h2><p>Informe o equipamento e o contexto do atendimento para que a equipe avalie a solicitação.</p><Link className="ed-button" to="/contato">Falar com a equipe <ArrowUpRight size={19} /></Link></div></section></Layout>;
}
