import { Helmet } from "react-helmet-async";
import { ArrowUpRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

export default function BlogPage() { return <Layout><Helmet><title>Conteúdos — Hexamedical</title></Helmet><section className="ed-intro"><div className="ed-shell"><span className="ed-eyebrow">Conteúdo</span><h1>Conhecimento para acompanhar a tecnologia.</h1><p>O acervo de artigos permanece no site atual enquanto a migração de textos, autoria, imagens e URLs é revisada.</p><a href="https://www.hexamedical.com.br/blog/" className="ed-button" target="_blank" rel="noreferrer">Acessar blog atual <ArrowUpRight size={19} /></a></div></section></Layout>; }
