import { Helmet } from "react-helmet-async";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { serviceStories } from "@/data/editorial";

const featuredSolutions = [
  {
    title: "Ressonância magnética",
    description: "Sistemas Esaote para diferentes perfis clínicos, estruturas e rotinas de exame.",
    image: "/assets/esaote/g-scan-open.webp",
    href: "/solucoes/ressonancia-magnetica",
  },
  {
    title: "Inteligência para o diagnóstico",
    description: "Soluções digitais que ampliam a leitura, a produtividade e a integração do serviço.",
    image: "/assets/hexa/varredura-hexai-1024x576.webp",
    href: "/solucoes/hexai",
  },
];

const featuredLines = [
  { label: "Bombas injetoras", href: "/solucoes/bombas-injetoras" },
  { label: "Radiografia Mindray", href: "/solucoes/mindray" },
  { label: "Área veterinária", href: "/solucoes/veterinario" },
  { label: "Serviços técnicos", href: "/servicos" },
];

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>Hexamedical — Tecnologia médica em operação</title>
        <meta
          name="description"
          content="Equipamentos, implementação e suporte especializado para serviços de diagnóstico por imagem. Da escolha da tecnologia à operação."
        />
      </Helmet>

      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="home-hero__content">
          <p className="home-hero__eyebrow">Rede em operação</p>
          <h1 id="home-hero-title" className="home-hero__title">
            Tecnologia médica.<br />
            Em operação.
          </h1>
          <p className="home-hero__copy">
            Equipamentos, implementação e suporte especializado para serviços de diagnóstico que não podem parar.
          </p>
          <div className="home-hero__actions">
            <Link to="/solucoes" className="home-hero__primary-action">
              Encontrar a solução certa <ArrowRight aria-hidden="true" />
            </Link>
            <Link to="/empresa" className="home-hero__secondary-action">
              Conhecer a Hexamedical <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="home-hero__media">
          <img
            src="/assets/plates/hero-clinical-photo.png"
            alt="Equipe clínica operando o sistema de ressonância magnética Magnifico Open"
            className="home-hero__image"
          />
        </div>
      </section>

      <nav className="home-evidence" aria-label="Áreas de atuação">
        <Link to="/solucoes">Diagnóstico por imagem</Link>
        <Link to="/solucoes/mindray">Radiografia digital</Link>
        <Link to="/servicos">Suporte especializado</Link>
      </nav>

      <section className="home-journey" aria-labelledby="home-journey-title">
        <div className="home-journey__heading">
          <span aria-hidden="true" />
          <h2 id="home-journey-title">Da escolha à operação.</h2>
        </div>
        <div className="home-journey__steps">
          <article>
            <h3>Escolha</h3>
            <p>Orientação técnica para definir a solução adequada à realidade do serviço.</p>
          </article>
          <article>
            <h3>Implemente</h3>
            <p>Planejamento, instalação e preparação da operação com uma equipe especializada.</p>
          </article>
          <article>
            <h3>Opere</h3>
            <p>Suporte técnico e evolução contínua para manter a tecnologia disponível.</p>
          </article>
        </div>
      </section>

      <section className="home-solutions" aria-labelledby="home-solutions-title">
        <div className="home-section-heading">
          <h2 id="home-solutions-title">Soluções pensadas para a realidade da operação.</h2>
          <p>Equipamentos e tecnologia digital conectados a uma leitura técnica do espaço, da rotina clínica e dos objetivos do serviço.</p>
        </div>
        <div className="home-solutions__grid">
          {featuredSolutions.map((solution) => (
            <Link key={solution.title} to={solution.href} className="home-solution-feature">
              <div className="home-solution-feature__media">
                <img src={solution.image} alt="" loading="lazy" decoding="async" />
              </div>
              <div className="home-solution-feature__body">
                <div>
                  <h3>{solution.title}</h3>
                  <p>{solution.description}</p>
                </div>
                <ArrowUpRight aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
        <Link to="/solucoes" className="home-text-link">Explorar todas as soluções <ArrowRight aria-hidden="true" /></Link>
      </section>

      <section className="home-operations" aria-labelledby="home-operations-title">
        <div className="home-operations__media">
          <img src="/assets/hexa/Reparo-de-Pecas-e-Eletronicas-foto.webp" alt="Reparo técnico de componente eletrônico em laboratório" loading="lazy" decoding="async" />
        </div>
        <div className="home-operations__content">
          <h2 id="home-operations-title">A tecnologia entra em operação. Nosso trabalho continua.</h2>
          <p className="home-operations__lead">Instalação, manutenção, contratos e laboratório técnico para acompanhar o equipamento ao longo de sua vida útil.</p>
          <div className="home-service-list">
            {Object.entries(serviceStories).map(([slug, service]) => (
              <Link key={slug} to={`/servicos/${slug}`}>
                <span>{service.title}</span>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-segments" aria-labelledby="home-segments-title">
        <div>
          <h2 id="home-segments-title">Outras frentes da operação.</h2>
          <p>Além da RM e da inteligência de imagem, explore as linhas e os serviços que completam o portfólio.</p>
        </div>
        <div className="home-segments__links">
          {featuredLines.map((segment) => (
            <Link key={segment.href} to={segment.href}>
              {segment.label}<ArrowRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="home-contact" aria-labelledby="home-contact-title">
        <div className="home-contact__intro">
          <h2 id="home-contact-title">Vamos entender a sua operação?</h2>
          <p>Compartilhe o contexto da sua instituição com a equipe comercial pelos canais oficiais.</p>
          <Link to="/contato" className="home-contact__direct">Ver canais de contato <ArrowUpRight aria-hidden="true" /></Link>
        </div>
        <div className="home-contact__form">
          <a className="ed-button" href="mailto:comercial@hexamedical.com.br">Enviar mensagem <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
