import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { commercialLines, rmStories } from "@/data/editorial";
import { wdmProducts } from "@/data/wdm";

const magnificoUrl = "https://www.hexamedical.com.br/rm-esaote-magnifico-open/";
const contact = "/contato";
const lineModels = {
  "bombas-injetoras": [
    { name: "Accutron MR Compact", image: "/assets/esaote/bombas-accutron-mr-compact.png", note: "Ressonância magnética" },
    { name: "Accutron MR3", image: "/assets/esaote/bombas-accutron-mr3.png", note: "Ressonância magnética" },
    { name: "Accutron MR", image: "/assets/esaote/bombas-accutron-mr.png", note: "Ressonância magnética" },
  ],
  mindray: [
    { name: "DigiEye 350", image: "/assets/esaote/mindray-digieye-350.png", note: "Sistema fixo", pdf: "https://www.hexamedical.com.br/wp-content/uploads/2026/03/Folheto_Mindray_DigiEye-350.pdf" },
    { name: "DigiEye 330", image: "/assets/esaote/mindray-digieye-330.png", note: "Sistema fixo", pdf: "https://www.hexamedical.com.br/wp-content/uploads/2026/03/Folheto_Mindray_DigiEye-330.pdf" },
    { name: "MobiEye 700", image: "/assets/esaote/mindray-mobieye-700.png", note: "Sistema móvel", pdf: "https://www.hexamedical.com.br/wp-content/uploads/2026/03/Folheto_Mindray_MobilEye.pdf" },
    { name: "Detector Flat Panel", image: "/assets/esaote/mindray-detector.png", note: "Detector", pdf: "https://www.hexamedical.com.br/wp-content/uploads/2026/03/Folheto_Mindray_Detector-Flat.pdf" },
  ],
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="ed-eyebrow">{children}</span>;
}

function Cta({ label = "Conversar sobre a solução" }: { label?: string }) {
  return <Link className="ed-button" to={contact}>{label}<ArrowUpRight size={19} /></Link>;
}

function RmLineup() {
  const items = [
    { name: "Magnifico Open", category: "RM aberta whole-body", image: "/assets/hexa/magnifico-open.jpg", href: magnificoUrl, external: true },
    ...Object.values(rmStories).map((item) => ({ name: item.name, category: item.category, image: item.hero, href: `/solucoes/${item.slug}`, external: false })),
  ];
  return <Layout><Helmet><title>Ressonância magnética Esaote — Hexamedical</title><meta name="description" content="Conheça a linha de ressonância magnética Esaote apresentada pela Hexamedical: Magnifico Open, S-scan Open, O-scan SMART e G-scan Open." /></Helmet>
    <section className="ed-intro"><div className="ed-shell"><Eyebrow>Soluções / Ressonância magnética</Eyebrow><h1>Uma linha. Diferentes rotinas de diagnóstico.</h1><p>Da RM aberta de corpo inteiro aos sistemas dedicados e à imagem com carga, encontre a configuração alinhada ao perfil clínico e à estrutura do seu serviço.</p></div></section>
    <section className="ed-shell ed-lineup" aria-label="Linha de ressonância magnética">{items.map((item, index) => <article className="ed-lineup-item" key={item.name}><div className="ed-lineup-item__number">0{index + 1}</div><div className="ed-lineup-item__media"><img src={item.image} alt={`Equipamento Esaote ${item.name}`} loading={index ? "lazy" : "eager"} /></div><div className="ed-lineup-item__copy"><Eyebrow>{item.category}</Eyebrow><h2>{item.name}</h2><p>{index === 0 ? "Sistema aberto para exames de corpo inteiro, com uma experiência mais próxima para paciente e equipe." : index === 1 ? "RM aberta dedicada à rotina musculoesquelética." : index === 2 ? "RM compacta dedicada a extremidades." : "Sistema aberto e inclinável para avaliação musculoesquelética com carga."}</p>{item.external ? <a href={item.href} className="ed-text-link">Conhecer apresentação <ArrowUpRight size={19} /></a> : <Link to={item.href} className="ed-text-link">Explorar equipamento <ArrowRight size={19} /></Link>}</div></article>)}</section>
    <section className="ed-cta"><div className="ed-shell"><Eyebrow>Escolha técnica</Eyebrow><h2>Qual sistema cabe na sua operação?</h2><p>Converse com a Hexamedical sobre especialidades atendidas, espaço disponível e rotina de exames.</p><Cta /></div></section>
  </Layout>;
}

function RmProduct({ slug }: { slug: string }) {
  const item = rmStories[slug];
  return <Layout><Helmet><title>{item.name} — Ressonância magnética Esaote | Hexamedical</title><meta name="description" content={item.introduction} /></Helmet>
    <section className="ed-product-hero"><div className="ed-shell ed-product-hero__inner"><div className="ed-product-hero__copy"><Link to="/solucoes/ressonancia-magnetica" className="ed-back">← Ressonância magnética</Link><Eyebrow>{item.category}</Eyebrow><h1>{item.name}</h1><p className="ed-lede">{item.headline}</p><p>{item.introduction}</p><div className="ed-actions"><Cta label="Conversar sobre este equipamento" /><a href={item.sourceUrl} target="_blank" rel="noreferrer" className="ed-text-link">Ficha da fabricante <ArrowUpRight size={18} /></a></div></div><div className="ed-product-hero__visual"><img src={item.hero} alt={item.heroAlt} /></div></div></section>
    <section className="ed-facts"><div className="ed-shell ed-facts__grid">{item.facts.map((fact) => <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}</div><p className="ed-footnote ed-shell">Dados informados pela Esaote; configuração e projeto devem ser confirmados para cada instalação.</p></section>
    <section className="ed-shell ed-story"><div><Eyebrow>Na prática</Eyebrow><h2>{item.thesis}</h2></div><p>{item.explanation}</p></section>
    {item.image !== item.hero && <figure className="ed-shell ed-product-scene"><img src={item.image} alt={item.imageAlt} loading="lazy" /><figcaption>Imagem de apresentação da Esaote. A configuração de uso depende do exame e do equipamento.</figcaption></figure>}
    <section className="ed-feature-section"><div className="ed-shell"><Eyebrow>Onde faz sentido</Eyebrow><div className="ed-feature-section__grid"><h2>Aplicações e decisões de projeto</h2><div className="ed-tags">{item.applications.map((application) => <span key={application}>{application}</span>)}</div></div><div className="ed-detail-grid">{item.details.map((detail, index) => <article key={detail.title}><span>0{index + 1}</span><h3>{detail.title}</h3><p>{detail.body}</p></article>)}</div></div></section>
    <section className="ed-cta"><div className="ed-shell"><Eyebrow>{item.name} / Hexamedical</Eyebrow><h2>Planeje a solução com quem vai acompanhar a operação.</h2><p>Compartilhe o contexto clínico e a infraestrutura existente. A equipe Hexamedical orienta os próximos passos.</p><Cta /></div></section>
  </Layout>;
}

function CommercialLine({ slug }: { slug: string }) {
  const item = commercialLines.find((line) => line.slug === slug)!;
  const models = lineModels[slug as keyof typeof lineModels];
  return <Layout><Helmet><title>{item.name} — Hexamedical</title><meta name="description" content={item.introduction} /></Helmet><section className="ed-product-hero"><div className="ed-shell ed-product-hero__inner"><div className="ed-product-hero__copy"><Link to="/solucoes" className="ed-back">← Soluções</Link><Eyebrow>Linha de soluções</Eyebrow><h1>{item.name}</h1><p className="ed-lede">{item.headline}</p><p>{item.introduction}</p><div className="ed-actions"><Cta label="Consultar configuração" /><a className="ed-text-link" href={item.source} target="_blank" rel="noreferrer">Ver catálogo atual <ArrowUpRight size={18} /></a></div></div><div className="ed-product-hero__visual"><img src={item.image} alt={item.alt} /></div></div></section>
    <section className="ed-shell ed-commercial"><Eyebrow>Modelos em destaque</Eyebrow><h2>O equipamento certo para cada ambiente.</h2><div className="ed-model-grid">{models.map((model) => <article key={model.name}><div className="ed-model-grid__visual"><img src={model.image} alt={model.name} loading="lazy" /></div><div className="ed-model-grid__copy"><span className="ed-eyebrow">{model.note}</span><h3>{model.name}</h3>{"pdf" in model ? <a href={model.pdf} target="_blank" rel="noreferrer" className="ed-text-link">Ver folheto <ArrowUpRight size={17} /></a> : <Link to="/contato" className="ed-text-link">Consultar ficha <ArrowUpRight size={17} /></Link>}</div></article>)}</div></section>
    <section className="ed-shell ed-commercial ed-commercial--secondary"><Eyebrow>Portfólio completo</Eyebrow><h2>Encontre a linha certa para o seu serviço.</h2><div className="ed-detail-grid">{item.groups.map((group, index) => <article key={group.title}><span>0{index + 1}</span><h3>{group.title}</h3><ul>{group.models.map((model) => <li key={model}>{model}</li>)}</ul></article>)}</div><p className="ed-footnote">A disponibilidade e a configuração dos modelos devem ser confirmadas com a equipe comercial.</p></section>
    <section className="ed-cta"><div className="ed-shell"><h2>Da especificação à implantação.</h2><p>Conte como funciona sua rotina e quais modalidades precisa atender.</p><Cta /></div></section></Layout>;
}

function HexaiPage() {
  return <Layout><Helmet><title>HexAI — Inteligência artificial para diagnóstico por imagem | Hexamedical</title><meta name="description" content="Conheça a solução HexAI e converse com a Hexamedical sobre aplicação de inteligência artificial ao fluxo de diagnóstico por imagem." /></Helmet><section className="ed-dark-hero"><div className="ed-shell ed-dark-hero__inner"><div><Link to="/solucoes" className="ed-back">← Soluções</Link><Eyebrow>Inteligência para o diagnóstico</Eyebrow><h1>HexAI</h1><p className="ed-lede">Mais inteligência no fluxo de imagem.</p><p>Uma solução para apoiar a equipe na leitura e no processamento de exames, integrada ao contexto operacional de cada serviço.</p><Cta label="Conversar sobre HexAI" /></div><div className="ed-dark-hero__media"><img src="/assets/hexa/varredura-hexai-1024x576.webp" alt="Comparação de imagens médicas apresentada na solução HexAI" /></div></div></section><section className="ed-shell ed-commercial"><Eyebrow>Fluxo de trabalho</Eyebrow><h2>O valor está na integração com a rotina.</h2><div className="ed-detail-grid"><article><span>01</span><h3>Entender a demanda</h3><p>Mapear modalidades, volume e integração necessária.</p></article><article><span>02</span><h3>Avaliar a solução</h3><p>Definir quais recursos fazem sentido para a equipe e para o diagnóstico.</p></article><article><span>03</span><h3>Planejar a implantação</h3><p>Alinhar infraestrutura, fluxo e suporte técnico.</p></article></div><a className="ed-text-link" href="https://www.hexamedical.com.br/hexai/" target="_blank" rel="noreferrer">Conhecer a apresentação atual <ArrowUpRight size={18} /></a></section></Layout>;
}

function VetPage() {
  const systems = [
    { name: "Vet-MR Grande", category: "Sistema dedicado", image: "/assets/hexa/Esaote-Grande-VET-MR.png", alt: "Sistema de ressonância veterinária Esaote Vet-MR Grande", description: "Ressonância dedicada à medicina veterinária, com planejamento conforme o perfil de exames da clínica.", href: "/solucoes/vet-mr-grande" },
    { name: "Magnifico VET", category: "RM aberta", image: "/assets/hexa/magnifico-vet.webp", alt: "Profissional junto ao equipamento Magnifico VET", description: "Arquitetura aberta apresentada na linha veterinária. Configurações e disponibilidade precisam ser confirmadas com a equipe.", href: "/contato" },
    { name: "O-scan VET", category: "RM dedicada", image: "/assets/hexa/oscan.webp", alt: "Equipamento Esaote O-scan Equine", description: "Solução dedicada a exames veterinários de extremidades. Consulte a configuração aplicável à sua rotina.", href: "/contato" },
  ];
  return <Layout><Helmet><title>Área veterinária — Hexamedical</title><meta name="description" content="Soluções WDM de tomografia e ressonância magnética, e soluções Esaote para medicina veterinária, apresentadas pela Hexamedical." /></Helmet><section className="ed-intro"><div className="ed-shell"><Eyebrow>Soluções / Veterinária</Eyebrow><h1>Imagem avançada também para a medicina veterinária.</h1><p>Tomografia e ressonância magnética para diferentes rotinas clínicas. Conheça as linhas WDM e Esaote e planeje a implantação conforme o perfil de exames do seu serviço.</p><Cta label="Falar sobre a linha veterinária" /></div></section><section className="ed-shell ed-lineup" aria-label="Sistemas WDM para medicina veterinária"><div className="ed-section-intro"><Eyebrow>WDM Animal Care + Hexamedical</Eyebrow><h2>Tomografia e RM por projeto.</h2></div>{wdmProducts.map((product, index) => <article className="ed-lineup-item" key={product.slug}><div className="ed-lineup-item__number">0{index + 1}</div><div className="ed-lineup-item__media"><img src={product.hero} alt={product.heroAlt} loading={index ? "lazy" : "eager"} /></div><div className="ed-lineup-item__copy"><Eyebrow>{product.modality}</Eyebrow><h2>{product.name}</h2><p>{product.introduction}</p><Link to={`/solucoes/${product.slug}`} className="ed-text-link">Conhecer sistema <ArrowRight size={19} /></Link></div></article>)}</section><section className="ed-shell ed-lineup" aria-label="Sistemas Esaote para medicina veterinária"><div className="ed-section-intro"><Eyebrow>Esaote + Hexamedical</Eyebrow><h2>Ressonância dedicada à rotina veterinária.</h2></div>{systems.map((system, index) => <article className="ed-lineup-item" key={system.name}><div className="ed-lineup-item__number">0{index + 1}</div><div className="ed-lineup-item__media"><img src={system.image} alt={system.alt} loading="lazy" /></div><div className="ed-lineup-item__copy"><Eyebrow>{system.category}</Eyebrow><h2>{system.name}</h2><p>{system.description}</p><Link to={system.href} className="ed-text-link">{index === 0 ? "Conhecer sistema" : "Consultar disponibilidade"} <ArrowRight size={19} /></Link></div></article>)}</section></Layout>;
}

function VetMrPage() {
  return <Layout><Helmet><title>Vet-MR Grande — Hexamedical</title></Helmet><section className="ed-product-hero"><div className="ed-shell ed-product-hero__inner"><div className="ed-product-hero__copy"><Link to="/solucoes/veterinario" className="ed-back">← Área veterinária</Link><Eyebrow>Ressonância veterinária</Eyebrow><h1>Vet-MR Grande</h1><p className="ed-lede">Ressonância dedicada à medicina veterinária.</p><p>Conheça o sistema Esaote e converse com a Hexamedical sobre a configuração adequada à rotina da sua clínica ou hospital veterinário.</p><div className="ed-actions"><Cta label="Consultar a equipe" /><a className="ed-text-link" href="https://www.hexamedical.com.br/rm-esaote-vet-grande/" target="_blank" rel="noreferrer">Ver apresentação atual <ArrowUpRight size={18} /></a></div></div><div className="ed-product-hero__visual"><img src="/assets/hexa/Esaote-Grande-VET-MR.png" alt="Equipamento Esaote Vet-MR Grande" /></div></div></section></Layout>;
}

function MagnificoRedirect() {
  useEffect(() => { window.location.replace(magnificoUrl); }, []);
  return <Layout><section className="ed-intro"><div className="ed-shell"><h1>Magnifico Open</h1><p>Abrindo a experiência dedicada do equipamento.</p><a className="ed-text-link" href={magnificoUrl}>Abrir apresentação <ArrowUpRight size={18} /></a></div></section></Layout>;
}

export default function ProductEditorialPage() {
  const { slug = "" } = useParams();
  if (slug === "ressonancia-magnetica") return <RmLineup />;
  if (rmStories[slug]) return <RmProduct slug={slug} />;
  if (slug === "rm-magnifico-open") return <MagnificoRedirect />;
  if (commercialLines.some((line) => line.slug === slug)) return <CommercialLine slug={slug} />;
  if (slug === "hexai") return <HexaiPage />;
  if (slug === "veterinario") return <VetPage />;
  if (slug === "vet-mr-grande") return <VetMrPage />;
  return <Navigate to="/solucoes" replace />;
}
