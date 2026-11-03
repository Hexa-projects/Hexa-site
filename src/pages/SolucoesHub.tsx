import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const lines = [
  { name: "Ressonância magnética", label: "ESAOTE / IMAGEM", image: "/assets/esaote/g-scan-open.webp", href: "/solucoes/ressonancia-magnetica", desc: "Sistemas abertos, dedicados e com carga para diferentes rotinas clínicas." },
  { name: "Bombas injetoras", label: "ADMINISTRAÇÃO DE CONTRASTE", image: "/assets/esaote/bombas-accutron-mr-compact.png", href: "/solucoes/bombas-injetoras", desc: "Modelos para ressonância magnética, tomografia e hemodinâmica." },
  { name: "Radiografia Mindray", label: "RADIOGRAFIA DIGITAL", image: "/assets/esaote/mindray-digieye-350.png", href: "/solucoes/mindray", desc: "Sistemas fixos, móveis e detectores para o fluxo de radiologia." },
  { name: "HexAI", label: "INTELIGÊNCIA DE IMAGEM", image: "/assets/hexa/varredura-hexai-1024x576.webp", href: "/solucoes/hexai", desc: "Tecnologia para apoiar a leitura e o processamento de exames." },
  { name: "Área veterinária", label: "MEDICINA VETERINÁRIA", image: "/assets/hexa/Esaote-Grande-VET-MR.png", href: "/solucoes/veterinario", desc: "Ressonância magnética para clínicas e hospitais veterinários." },
];

export default function SolucoesHub() {
  return <Layout><Helmet><title>Soluções — Hexamedical</title><meta name="description" content="Conheça as linhas de ressonância magnética Esaote, bombas injetoras, radiografia Mindray, HexAI e medicina veterinária." /></Helmet><section className="ed-intro"><div className="ed-shell"><span className="ed-eyebrow">Portfólio Hexamedical</span><h1>Tecnologia para a operação real.</h1><p>Equipamentos, software e suporte técnico para serviços de diagnóstico por imagem. Explore cada linha e converse com a equipe sobre a configuração adequada ao seu contexto.</p></div></section><section className="ed-shell ed-lineup" aria-label="Linhas de soluções">{lines.map((line, index) => <article className="ed-lineup-item" key={line.href}><span className="ed-lineup-item__number">0{index + 1}</span><div className="ed-lineup-item__media"><img src={line.image} alt={line.name} loading={index ? "lazy" : "eager"} /></div><div className="ed-lineup-item__copy"><span className="ed-eyebrow">{line.label}</span><h2>{line.name}</h2><p>{line.desc}</p><Link className="ed-text-link" to={line.href}>Explorar linha <ArrowUpRight size={19} /></Link></div></article>)}</section></Layout>;
}
