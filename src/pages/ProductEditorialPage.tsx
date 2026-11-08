import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowUpRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

/*
 * Páginas temporárias que ainda não migraram para o kit: Magnifico Open (Task 8), Careverse (Task 9) e Vet-MR Grande.
 * As linhas (injetoras, radiografia, densitometria, HexAI, veterinária) já abrem em src/pages/solucoes/LinePage.tsx.
 */

const contact = "/contato";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="ed-eyebrow">{children}</span>;
}

function Cta({ label = "Conversar sobre a solução" }: { label?: string }) {
  return <Link className="ed-button" to={contact}>{label}<ArrowUpRight size={19} /></Link>;
}

function VetMrPage() {
  return <Layout><Helmet><title>Vet-MR Grande — Hexamedical</title></Helmet><section className="ed-product-hero"><div className="ed-shell ed-product-hero__inner"><div className="ed-product-hero__copy"><Link to="/solucoes/veterinaria" className="ed-back">← Área veterinária</Link><Eyebrow>Ressonância veterinária</Eyebrow><h1>Vet-MR Grande</h1><p className="ed-lede">Ressonância dedicada à medicina veterinária.</p><p>Conheça o sistema Esaote e converse com a Hexamedical sobre a configuração adequada à rotina da sua clínica ou hospital veterinário.</p><div className="ed-actions"><Cta label="Consultar a equipe" /><a className="ed-text-link" href="https://www.hexamedical.com.br/rm-esaote-vet-grande/" target="_blank" rel="noreferrer">Ver apresentação atual <ArrowUpRight size={18} /></a></div></div><div className="ed-product-hero__visual"><img src="/assets/hexa/Esaote-Grande-VET-MR.png" alt="Equipamento Esaote Vet-MR Grande" /></div></div></section></Layout>;
}

function TemporaryPage({ title, text }: { title: string; text: string }) {
  return <Layout><Helmet><title>{title} — Hexamedical</title></Helmet><section className="ed-intro"><div className="ed-shell"><Eyebrow>Soluções</Eyebrow><h1>{title}</h1><p>{text}</p><Cta label="Falar com a Hexamedical" /></div></section></Layout>;
}

export default function ProductEditorialPage({ slug: forcedSlug }: { slug?: string }) {
  const { slug: paramSlug = "" } = useParams();
  const slug = forcedSlug ?? paramSlug;
  if (slug === "magnifico-open") return <TemporaryPage title="Magnifico Open" text="Ressonância magnética aberta de corpo inteiro. A página completa do equipamento está em preparação." />;
  if (slug === "careverse") return <TemporaryPage title="Careverse" text="Inteligência artificial cardiovascular e neurológica. A página completa está em preparação." />;
  if (slug === "vet-mr-grande") return <VetMrPage />;
  return <Navigate to="/solucoes" replace />;
}
