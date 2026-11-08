import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Mail, MessageCircle } from "lucide-react";
import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import type { WdmProduct } from "@/data/wdm";
import "@/wdm-ct.css";

type CtContent = {
  eyebrow: string;
  headline: string;
  introduction: string;
  context: string;
  contextTitle: string;
  image: string;
  imageAlt: string;
  distinction: string;
  technologyTitle: string;
  technologyIntro: string;
  platformNote: string;
};

const ctContent: Record<string, CtContent> = {
  "turbotom-1s-vet": {
    eyebrow: "Tomografia computadorizada veterinária",
    headline: "Aquisição rápida. Imagens para investigar com mais detalhe.",
    introduction: "Tomografia veterinária com rotação de 360° em 0,5 s, aquisição de camada fina de 0,5 mm e tubo de 4 MHU. Recursos de reconstrução e pós-processamento completam o fluxo de exame.",
    contextTitle: "Da preparação do paciente à leitura das imagens.",
    context: "Protocolos voltados a animais, interface multilíngue e fluxos paralelos conectam posicionamento, aquisição, reconstrução e análise. A equipe organiza cada etapa conforme a indicação clínica e o paciente.",
    image: "/assets/wdm/turbotom-1s-vet-dog-clean-v2.png",
    imageAlt: "Imagem ilustrativa de tomógrafo veterinário com cão posicionado na mesa de exames",
    distinction: "Protocolos específicos para animais e interface multilíngue.",
    technologyTitle: "Uma cadeia de imagem construída para a TC veterinária.",
    technologyIntro: "Do tubo ao pós-processamento, cada componente participa da qualidade de imagem e da continuidade do exame.",
    platformNote: "Parâmetros técnicos do 1S-VET. Dose, qualidade de imagem e desempenho dependem do protocolo, paciente e configuração contratada.",
  },
  "turbotom-1s-lite-vet": {
    eyebrow: "Tomografia computadorizada veterinária",
    headline: "Tecnologia de imagem para uma rotina veterinária mais fluida.",
    introduction: "Para serviços que estão estruturando a TC veterinária, o TurboTom 1S LITE VET conecta aquisição, reconstrução e visualização em um fluxo clínico organizado. A configuração é avaliada conforme os exames e a rotina da instituição.",
    contextTitle: "Um fluxo que acompanha a equipe em cada etapa.",
    context: "Cadastro, escolha de protocolo, posicionamento, aquisição e reconstrução precisam funcionar como um processo. O fluxo multitarefa organiza essas etapas para a rotina veterinária.",
    image: "/assets/wdm/turbotom-1s-lite-vet-detail-2.webp",
    imageAlt: "Imagem oficial WDM do TurboTom 1S LITE VET com animais sobre a mesa de exames",
    distinction: "A composição dos recursos do LITE VET é definida na avaliação técnica do projeto.",
    technologyTitle: "Tecnologia que conecta aquisição e análise.",
    technologyIntro: "A arquitetura da plataforma TurboTom 1S combina estabilidade do tubo, controle de ruído e processamento de imagens.",
    platformNote: "Os recursos descritos pertencem à plataforma TurboTom 1S. A configuração específica do LITE VET deve ser confirmada na proposta técnica.",
  },
};

const capabilities = [
  {
    number: "01",
    title: "Tubo de metal líquido",
    text: "Capacidade térmica de 4 MHU e rolamento de metal líquido favorecem a dissipação de calor e a estabilidade durante a aquisição.",
  },
  {
    number: "02",
    title: "Detector + Image-Clarity",
    text: "O detector Ultra Low Noise trabalha com o algoritmo iterativo de redução de ruído Image-Clarity na cadeia de formação da imagem.",
  },
  {
    number: "03",
    title: "Reconstrução volumétrica",
    text: "Ferramentas de pós-processamento e visualização 3D (VR) ajudam a examinar relações anatômicas, inclusive em estudos após contraste.",
  },
];

const liteCapabilities = [
  { number: "01", title: "Estabilidade térmica", text: "O rolamento de metal líquido contribui para a dissipação de calor, menor vibração e rotação estável do tubo." },
  { number: "02", title: "Controle de ruído", text: "Detector Ultra Low Noise e redução iterativa Image-Clarity integram a proposta de imagem da plataforma TurboTom 1S." },
  { number: "03", title: "Reconstrução e VR", text: "Processamento paralelo e reconstrução volumétrica apoiam a passagem da aquisição à visualização das estruturas anatômicas." },
];

const workflow = [
  { step: "Protocolar", description: "Cadastrar o paciente e selecionar o protocolo veterinário apropriado para o estudo." },
  { step: "Posicionar", description: "Ajustar parâmetros e preparar a aquisição enquanto a equipe posiciona o animal." },
  { step: "Adquirir", description: "Executar o exame com parâmetros definidos para o paciente e a indicação clínica." },
  { step: "Reconstruir", description: "Processar, visualizar e arquivar as imagens no fluxo da instituição." },
];

const projectQuestions = [
  "Quais espécies e perfis de paciente serão atendidos?",
  "Que exames e protocolos farão parte da rotina?",
  "Qual é o volume esperado e como é o fluxo de agendamento?",
  "Como estão sala, infraestrutura, equipe e integração de imagens?",
];

function ProductFaq({ isLite }: { isLite: boolean }) {
  const questions = [
    {
      question: "Os recursos apresentados estão incluídos na configuração proposta?",
      answer: isLite ? "A composição do LITE VET é confirmada na proposta técnica de cada projeto. Um especialista pode verificar quais recursos de aquisição, processamento e fluxo estarão incluídos." : "Itens incluídos, disponibilidade e configuração final do 1S-VET são detalhados na proposta técnica.",
    },
    {
      question: "Como a Hexamedical apoia o planejamento da instalação?",
      answer: "A avaliação com um especialista reúne perfil de exames, ambiente, infraestrutura, equipe e integração de imagens antes da definição da configuração.",
    },
    {
      question: "Posso discutir protocolos e aplicações antes da proposta?",
      answer: "Sim. Informe as espécies atendidas, os estudos previstos, o volume de exames e os requisitos do serviço para orientar a conversa técnica.",
    },
    {
      question: "Como funciona a tecnologia de baixa dose?",
      answer: "A combinação de detector de baixo ruído e processamento Image-Clarity integra a proposta de imagem com baixa dose. O material técnico não informa dose fixa nem comparação clínica quantificada; o protocolo deve ser definido para cada exame.",
    },
    {
      question: "Para que serve a reconstrução volumétrica (VR)?",
      answer: "Ela permite explorar relações espaciais entre estruturas em estudos reconstruídos. O fabricante ilustra o recurso com exames abdominais contrastados; a aplicação clínica depende da avaliação veterinária.",
    },
    ...(isLite ? [{
      question: "Como escolher entre o 1S-VET e o 1S LITE VET?",
      answer: "O material disponível identifica os dois modelos, mas não traz uma comparação técnica completa. Um especialista confirma as diferenças de configuração para o seu perfil de exames antes de recomendar um sistema.",
    }] : []),
  ];

  return (
    <div className="wdm-ct-faq__list">
      {questions.map(({ question, answer }) => (
        <details key={question}>
          <summary>{question}<ChevronDown size={20} aria-hidden="true" /></summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  );
}

export default function WdmCtPage({ product, standalone = false }: { product: WdmProduct; standalone?: boolean }) {
  const content = ctContent[product.slug];
  const isLite = product.slug === "turbotom-1s-lite-vet";
  const otherSlug = isLite ? "turbotom-1s-vet" : "turbotom-1s-lite-vet";
  const otherName = isLite ? "TurboTom 1S-VET" : "TurboTom 1S LITE VET";
  const whatsapp = `https://wa.me/5511973140914?text=${encodeURIComponent(`Olá! Gostaria de falar com um especialista sobre uma avaliação técnica do ${product.name} para minha instituição veterinária.`)}`;
  const email = `mailto:comercial@hexamedical.com.br?subject=${encodeURIComponent(`Avaliação técnica - ${product.name}`)}`;
  const assetUrl = (path: string) => standalone ? `/wdm-ct-assets${path}` : path;
  const PageWrapper = standalone ? Fragment : Layout;

  return (
    <PageWrapper>
      <Helmet>
        <title>{product.name} | Tomografia veterinária WDM e Hexamedical</title>
        <meta name="description" content={`${product.name}: tecnologia de tomografia veterinária, recursos de aquisição e imagem. Fale com um especialista da Hexamedical para uma avaliação técnica.`} />
        <link rel="canonical" href={product.productionUrl} />
        {isLite && <meta name="robots" content="noindex, nofollow" />}
      </Helmet>
      <div className={`wdm-ct ${isLite ? "wdm-ct--lite" : ""}`}>
        <section className="wdm-ct-hero" id="inicio" aria-labelledby="wdm-ct-title">
          <div className="wdm-ct-shell">
            <div className="wdm-ct-topline">
              <a href={standalone ? "https://www.hexamedical.com.br/area-veterinaria-hexamedical/" : "/solucoes/veterinaria"} className="wdm-ct-back">← Voltar às soluções veterinárias</a>
              <div className="wdm-ct-brands" aria-label="Hexamedical e WDM Animal Care">
                <img src={assetUrl("/assets/wdm/hexamedical-logo.png")} alt="Hexamedical" />
                <span aria-hidden="true" />
                <img src={assetUrl("/assets/wdm/wdm-logo.png")} alt="WDM Animal Care" />
              </div>
            </div>
            <div className="wdm-ct-hero__grid">
              <div className="wdm-ct-hero__copy">
                <span className="wdm-ct-eyebrow">{content.eyebrow}</span>
                <h1 id="wdm-ct-title"><span>TurboTom</span><span>{isLite ? "1S LITE VET" : "1S-VET"}</span></h1>
                <p className="wdm-ct-hero__headline">{content.headline}</p>
                <p className="wdm-ct-hero__intro">{content.introduction}</p>
                <div className="wdm-ct-actions">
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="wdm-ct-button"><MessageCircle size={19} aria-hidden="true" /> Falar com um especialista <ArrowUpRight size={18} aria-hidden="true" /></a>
                  <a href="#tecnologia" className="wdm-ct-inline-link">Conhecer o sistema <ArrowDown size={17} aria-hidden="true" /></a>
                </div>
                <p className="wdm-ct-hero__source">{isLite ? "Recursos da plataforma TurboTom 1S; composição do LITE VET confirmada na proposta técnica." : "Especificações técnicas sujeitas à configuração final da proposta."}</p>
              </div>
              <figure className="wdm-ct-hero__figure">
                <img src={assetUrl(product.hero)} alt={product.heroAlt} loading="eager" decoding="async" />
                <figcaption>Imagem ilustrativa do equipamento.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <nav className="wdm-ct-jump" aria-label="Nesta página">
          <div className="wdm-ct-shell">
            <a href="#tecnologia">Tecnologia</a>
            <a href="#fluxo">Fluxo de exame</a>
            <a href="#projeto">Seu projeto</a>
            <a href="#duvidas">Dúvidas</a>
          </div>
        </nav>

        {isLite ? (
          <section className="wdm-ct-evidence" aria-label="Tecnologias da plataforma TurboTom 1S">
            <div className="wdm-ct-shell wdm-ct-evidence__grid">
              <div><strong>Ultra Low Noise</strong><span>Detector de baixo ruído</span></div>
              <div><strong>Image-Clarity</strong><span>Algoritmo iterativo de redução de ruído</span></div>
              <div><strong>VR</strong><span>Visualização volumétrica no pós-processamento</span></div>
            </div>
          </section>
        ) : (
          <section className="wdm-ct-evidence" aria-label="Dados técnicos do equipamento">
            <div className="wdm-ct-shell wdm-ct-evidence__grid">
              <div><strong>4 MHU</strong><span>Capacidade térmica do tubo indicada no material</span></div>
              <div><strong>0,5 s</strong><span>Rotação de 360°</span></div>
              <div><strong>0,5 mm</strong><span>Aquisição de camada fina descrita no folder</span></div>
            </div>
          </section>
        )}

        <section className="wdm-ct-technology wdm-ct-shell" id="tecnologia" aria-labelledby="wdm-ct-technology-title">
          <div className="wdm-ct-section-heading">
            <span className="wdm-ct-eyebrow">O que compõe o sistema</span>
            <h2 id="wdm-ct-technology-title">{content.technologyTitle}</h2>
            <p>{content.technologyIntro}</p>
          </div>
          <div className="wdm-ct-capabilities">
            {(isLite ? liteCapabilities : capabilities).map((item) => (
              <article key={item.number}>
                <span>{item.number} / 03</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <p className="wdm-ct-qualifier">{content.platformNote}</p>
        </section>

        <section className="wdm-ct-imaging" aria-labelledby="wdm-ct-imaging-title">
          <div className="wdm-ct-shell wdm-ct-imaging__grid">
            <div>
              <span className="wdm-ct-eyebrow">Da aquisição à interpretação</span>
              <h2 id="wdm-ct-imaging-title">Menos ruído na cadeia de imagem. Mais contexto para analisar.</h2>
              <p>Detector Ultra Low Noise, algoritmo Image-Clarity e reconstrução volumétrica formam uma sequência de recursos para produzir e explorar as imagens do exame.</p>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="wdm-ct-inline-link">Discutir com o especialista <ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
            <ol className="wdm-ct-imaging__steps">
              <li><span>01 / AQUISIÇÃO</span><strong>Camada fina</strong><p>O protocolo define os parâmetros de aquisição para o paciente e a região anatômica.</p></li>
              <li><span>02 / PROCESSAMENTO</span><strong>Redução iterativa de ruído</strong><p>O Image-Clarity atua na cadeia de reconstrução das imagens.</p></li>
              <li><span>03 / VISUALIZAÇÃO</span><strong>Volume e planos</strong><p>Reconstrução e VR apoiam a avaliação espacial de estruturas nos estudos indicados.</p></li>
            </ol>
          </div>
        </section>

        <section className="wdm-ct-context" aria-labelledby="wdm-ct-context-title">
          <div className="wdm-ct-shell wdm-ct-context__grid">
            <div className="wdm-ct-context__copy">
              <span className="wdm-ct-eyebrow">No contexto do atendimento</span>
              <h2 id="wdm-ct-context-title">{content.contextTitle}</h2>
              <p>{content.context}</p>
              <div className="wdm-ct-context__note"><Check size={19} aria-hidden="true" /><span>{content.distinction}</span></div>
            </div>
            <figure className="wdm-ct-context__figure">
              <img src={assetUrl(content.image)} alt={content.imageAlt} loading="lazy" />
              <figcaption>Imagem ilustrativa. Posicionamento e protocolo dependem da avaliação veterinária.</figcaption>
            </figure>
          </div>
        </section>

        <section className="wdm-ct-workflow wdm-ct-shell" id="fluxo" aria-labelledby="wdm-ct-workflow-title">
          <div className="wdm-ct-section-heading">
            <span className="wdm-ct-eyebrow">Fluxo de trabalho</span>
            <h2 id="wdm-ct-workflow-title">Um fluxo contínuo, do paciente às imagens.</h2>
            <p>O sistema de trabalho permite organizar cadastro, posicionamento, aquisição, reconstrução e arquivamento em etapas que podem avançar em paralelo, conforme a rotina da equipe.</p>
          </div>
          <ol className="wdm-ct-workflow__list">
            {workflow.map(({ step, description }, index) => (
              <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step}</h3><p>{description}</p></div><ArrowRight size={20} aria-hidden="true" /></li>
            ))}
          </ol>
        </section>

        <section className="wdm-ct-project" id="projeto" aria-labelledby="wdm-ct-project-title">
          <div className="wdm-ct-shell wdm-ct-project__grid">
            <div>
              <span className="wdm-ct-eyebrow">Da tecnologia à operação</span>
              <h2 id="wdm-ct-project-title">A configuração certa começa pela sua rotina.</h2>
              <p>Um especialista da Hexamedical reúne o perfil clínico e operacional do serviço para definir a configuração, a implantação e os próximos passos.</p>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="wdm-ct-button"><MessageCircle size={19} aria-hidden="true" /> Planejar com um especialista <ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
            <div className="wdm-ct-project__questions">
              <span>O que vamos mapear juntos</span>
              {projectQuestions.map((question, index) => <p key={question}><b>{String(index + 1).padStart(2, "0")}</b>{question}</p>)}
            </div>
          </div>
        </section>

        <section className="wdm-ct-faq wdm-ct-shell" id="duvidas" aria-labelledby="wdm-ct-faq-title">
          <div className="wdm-ct-section-heading">
            <span className="wdm-ct-eyebrow">Antes de decidir</span>
            <h2 id="wdm-ct-faq-title">Perguntas que vale responder.</h2>
          </div>
          <ProductFaq isLite={isLite} />
        </section>

        <section className="wdm-ct-final" aria-labelledby="wdm-ct-final-title">
          <div className="wdm-ct-shell wdm-ct-final__grid">
            <div>
              <span className="wdm-ct-eyebrow">WDM Animal Care | Hexamedical</span>
              <h2 id="wdm-ct-final-title">Vamos avaliar o {product.shortName} para a sua instituição?</h2>
              <p>Conte quais espécies você atende, que exames pretende realizar e como é sua infraestrutura. Um especialista ajuda a transformar essas informações em uma avaliação técnica.</p>
              <div className="wdm-ct-actions"><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="wdm-ct-button"><MessageCircle size={19} aria-hidden="true" /> Conversar com um especialista <ArrowUpRight size={18} aria-hidden="true" /></a><a href={email} className="wdm-ct-inline-link"><Mail size={17} aria-hidden="true" /> Enviar e-mail</a></div>
            </div>
            <a href={`/solucoes/${otherSlug}/`} className="wdm-ct-sibling"><span>Conheça também</span><strong>{otherName}</strong><ArrowUpRight size={22} aria-hidden="true" /></a>
          </div>
        </section>
      </div>
      {standalone && <footer className="wdm-ct-footer"><div className="wdm-ct-shell"><span>© 2026 Hexamedical · WDM Animal Care</span><a href="https://www.hexamedical.com.br/">Voltar ao site Hexamedical <ArrowUpRight size={16} aria-hidden="true" /></a></div></footer>}
    </PageWrapper>
  );
}
