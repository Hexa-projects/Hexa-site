import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

export default function ConteudoHub() { return <Layout><Helmet><title>Conteúdo — Hexamedical</title></Helmet><section className="ed-intro"><div className="ed-shell"><span className="ed-eyebrow">Conteúdo</span><h1>Informação para escolher e operar melhor.</h1><p>Artigos e materiais técnicos ajudam a aprofundar o contexto de cada solução. O acervo completo está em processo de migração.</p></div></section><section className="ed-shell ed-commercial"><div className="ed-detail-grid"><article><span>01</span><h3>Blog</h3><p>Leia os artigos no site atual enquanto preservamos o conteúdo original e as URLs.</p><Link to="/blog" className="ed-text-link">Explorar <ArrowUpRight size={17} /></Link></article><article><span>02</span><h3>Materiais de apoio</h3><p>Solicite a ficha ou documento pertinente à solução de interesse.</p><Link to="/materiais" className="ed-text-link">Solicitar <ArrowUpRight size={17} /></Link></article></div></section></Layout>; }
