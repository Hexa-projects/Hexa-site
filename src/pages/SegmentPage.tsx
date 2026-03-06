import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/sections/HeroSection";
import CTABanner from "@/components/sections/CTABanner";
import { Building2, Hospital, Stethoscope, GraduationCap } from "lucide-react";

const segments = {
  clinicas: { title: "Soluções para Clínicas", icon: Building2, desc: "Equipamentos e serviços para elevar produtividade e qualidade diagnóstica em clínicas de imagem." },
  hospitais: { title: "Soluções para Hospitais", icon: Hospital, desc: "Projetos robustos para operação hospitalar com alta disponibilidade e suporte especializado." },
  "centros-de-imagem": { title: "Soluções para Centros de Imagem", icon: Stethoscope, desc: "Arquitetura técnica e comercial para operações de alto volume e eficiência contínua." },
  universidades: { title: "Soluções para Universidades", icon: GraduationCap, desc: "Apoio técnico para ensino, pesquisa e formação em diagnóstico por imagem." },
} as const;

const SegmentPage = () => {
  const { slug } = useParams<{ slug: keyof typeof segments }>();
  const segment = slug ? segments[slug] : null;
  if (!segment) return <Navigate to="/" replace />;

  const Icon = segment.icon;

  return (
    <Layout>
      <Helmet>
        <title>{segment.title} — Hexamedical</title>
        <meta name="description" content={segment.desc} />
      </Helmet>

      <HeroSection
        headline={segment.title}
        subtitle={segment.desc}
        ctaPrimaryLabel="Solicitar Avaliação"
        ctaPrimaryHref="/contato"
        backgroundImage="/assets/hexa/Hexamedical-Website-18-1024x576.webp"
      />

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-10 text-center">
            <Icon className="mx-auto mb-5 h-12 w-12 text-accent" />
            <h2 className="mb-3 text-3xl font-bold">{segment.title}</h2>
            <p className="text-muted-foreground">{segment.desc}</p>
          </div>
        </div>
      </section>

      <CTABanner headline="Quer um plano para seu segmento?" subtitle="Fale com um especialista Hexamedical para definir a solução mais viável." />
    </Layout>
  );
};

export default SegmentPage;
