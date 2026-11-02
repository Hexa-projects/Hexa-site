import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { wdmBySlug, wdmProducts } from "@/data/wdm";
import WdmCtPage from "@/pages/WdmCtPage";

type Props = { slug: string };

const planning = [
  {
    title: "Perfil de exames",
    text: "Entender espécies atendidas, indicações, volume e protocolos esperados antes de definir a configuração.",
  },
  {
    title: "Ambiente",
    text: "Avaliar sala, infraestrutura e fluxo de pacientes para planejar a instalação com responsabilidade.",
  },
  {
    title: "Operação",
    text: "Alinhar treinamento, suporte e rotina da equipe que utilizará o sistema.",
  },
];

export default function WdmVetPage({ slug }: Props) {
  const product = wdmBySlug[slug];
  const isMr = product.modality === "Ressonância magnética";
  const otherProducts = wdmProducts.filter((item) => item.slug !== slug);

  if (!isMr) return <WdmCtPage product={product} />;

  return (
    <Layout>
      <Helmet>
        <title>{product.name} | WDM Animal Care e Hexamedical</title>
        <meta name="description" content={`${product.name}: ${product.introduction}`} />
      </Helmet>
      <div className={`wdm-lp ${isMr ? "wdm-lp--mr" : "wdm-lp--ct"}`}>
        <section className="wdm-hero">
          <div className="wdm-shell">
            <Link className="wdm-back" to="/solucoes/veterinario">← Medicina veterinária</Link>
            <div className="wdm-partners" aria-label="WDM Animal Care e Hexamedical">
              <img src="/assets/wdm/hexamedical-logo.png" alt="Hexamedical" />
              <span aria-hidden="true" />
              <img src="/assets/wdm/wdm-logo.png" alt="WDM" />
            </div>
            <div className="wdm-hero__grid">
              <div className="wdm-hero__copy">
                <span className="wdm-kicker">WDM Animal Care / {product.modality}</span>
                <h1>{product.name}</h1>
                <p className="wdm-hero__thesis">{product.headline}</p>
                <p className="wdm-hero__intro">{product.introduction}</p>
                <div className="wdm-actions">
                  <Link to="/contato" className="wdm-button">Conversar sobre este sistema <ArrowUpRight size={19} aria-hidden="true" /></Link>
                  <a href="#projeto" className="wdm-text-link">Explorar a solução <ArrowDown size={17} aria-hidden="true" /></a>
                </div>
              </div>
              <figure className="wdm-hero__media">
                <img src={product.hero} alt={product.heroAlt} fetchPriority="high" />
                <figcaption>Imagem do equipamento fornecida pela WDM.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="wdm-facts" aria-label="Dados de apresentação do produto">
          <div className="wdm-shell wdm-facts__grid">
            {product.facts.map((fact) => (
              <div className="wdm-fact" key={fact.label}>
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
              </div>
            ))}
          </div>
          <p className="wdm-shell wdm-facts__note">Informações do material WDM. Recursos, configuração e disponibilidade devem ser confirmados para cada projeto.</p>
        </section>

        <section className="wdm-planning wdm-shell" id="projeto">
          <div className="wdm-planning__heading">
            <span className="wdm-kicker">Da escolha à operação</span>
            <h2>O equipamento certo começa com as perguntas certas.</h2>
            <p>Uma conversa técnica transforma a apresentação do produto em um projeto adequado ao serviço veterinário.</p>
          </div>
          <div className="wdm-planning__grid">
            {planning.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}
          </div>
        </section>

        <section className="wdm-showcase">
          <div className="wdm-shell wdm-showcase__grid">
            <div className="wdm-showcase__copy">
              <span className="wdm-kicker">{product.modality} veterinária</span>
              <h2>Uma tecnologia. Um plano para a sua rotina.</h2>
              <p>O material do fabricante apresenta o {product.shortName} e suas possibilidades de uso. A Hexamedical ajuda a transformar essas informações em uma avaliação concreta para a sua instituição.</p>
              <div className="wdm-tags" aria-label="Tópicos de aplicação">{product.applications.map((application) => <span key={application}>{application}</span>)}</div>
            </div>
            <figure>
              <img src={product.detail} alt={product.detailAlt} loading="lazy" />
              <figcaption>Imagem fornecida pela WDM. A configuração apresentada é ilustrativa.</figcaption>
            </figure>
          </div>
        </section>

        <section className="wdm-next wdm-shell" aria-labelledby="wdm-next-title">
          <span className="wdm-kicker">Conheça a linha</span>
          <h2 id="wdm-next-title">Outras soluções WDM para a medicina veterinária</h2>
          <div className="wdm-next__grid">
            {otherProducts.map((item) => <Link key={item.slug} to={`/solucoes/${item.slug}`}><span>{item.modality}</span><strong>{item.name}</strong><ArrowUpRight size={20} aria-hidden="true" /></Link>)}
          </div>
        </section>

        <section className="wdm-close">
          <div className="wdm-shell">
            <span className="wdm-kicker">WDM / Hexamedical</span>
            <h2>Vamos discutir o {product.shortName} no contexto do seu serviço?</h2>
            <p>Conte à equipe quais exames você pretende realizar e quais são as condições da sua estrutura.</p>
            <Link to="/contato" className="wdm-button">Falar com um especialista <ArrowUpRight size={19} aria-hidden="true" /></Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
