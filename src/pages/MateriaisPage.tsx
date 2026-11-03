import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

export default function MateriaisPage() { return <Layout><Helmet><title>Materiais de apoio — Hexamedical</title></Helmet><section className="ed-intro"><div className="ed-shell"><span className="ed-eyebrow">Materiais de apoio</span><h1>Informação técnica para decisões bem orientadas.</h1><p>Se você precisa de uma ficha técnica, apresentação ou documentação de um equipamento, solicite a versão adequada à sua configuração. A biblioteca pública está em revisão.</p><Link to="/contato" className="ed-button">Solicitar material <ArrowUpRight size={19} /></Link></div></section></Layout>; }
