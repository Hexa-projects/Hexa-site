export interface StaticPage {
  slug: string;
  title: string;
  description: string;
  hero: string;
  bullets: string[];
}

export const staticPages: Record<string, StaticPage> = {
  sobre: {
    slug: "sobre",
    title: "Sobre a Hexamedical",
    description: "Especialistas em soluções de ressonância magnética, manutenção e suporte técnico para instituições de saúde em todo o Brasil.",
    hero: "/assets/hexa/hexa.png",
    bullets: ["Expertise técnica e comercial", "Cobertura nacional", "Time certificado internacionalmente", "Foco em resultado clínico e operacional"],
  },
  estrutura: {
    slug: "estrutura",
    title: "Estrutura Hexamedical",
    description: "Nossa estrutura robusta integra laboratório próprio, logística ágil e suporte técnico dedicado para manter a operação dos clientes em alta disponibilidade.",
    hero: "/assets/hexa/Hexamedical-Website-17-1024x576.webp",
    bullets: ["Laboratório especializado", "Unidades estratégicas no Brasil", "Processos de teste e qualidade", "Suporte remoto e presencial"],
  },
  blog: {
    slug: "blog",
    title: "Blog Técnico",
    description: "Conteúdos sobre ressonância magnética, inovação diagnóstica, manutenção e gestão de operação em centros de imagem.",
    hero: "/assets/hexa/Hexamedical-Templates-Capa-de-Blog.webp",
    bullets: ["Conteúdo de mercado", "Aplicações clínicas", "Tendências tecnológicas", "Boas práticas operacionais"],
  },
  materiais: {
    slug: "materiais",
    title: "Materiais de Apoio",
    description: "Guias, apresentações e materiais técnicos para apoiar a tomada de decisão da sua instituição.",
    hero: "/assets/hexa/Hexamedical-Website-6-1024x576.webp",
    bullets: ["Guias técnicos", "Materiais comerciais", "Conteúdos para decisão", "Apoio ao time clínico"],
  },
  cases: {
    slug: "cases",
    title: "Cases de Sucesso",
    description: "Resultados reais em clínicas, hospitais e centros de imagem com foco em performance diagnóstica e eficiência operacional.",
    hero: "/assets/hexa/Hexamedical-Website-9-1024x576.webp",
    bullets: ["Resultados por segmento", "Aplicações práticas", "ROI operacional", "Lições de implementação"],
  },
  "politica-de-privacidade": {
    slug: "politica-de-privacidade",
    title: "Política de Privacidade",
    description: "Compromisso com a proteção de dados e privacidade de clientes, parceiros e visitantes do site Hexamedical.",
    hero: "/assets/hexa/Hexamedical-Website-3-1024x576.webp",
    bullets: ["Proteção de dados", "Transparência no uso de informações", "Conformidade com LGPD", "Canal para solicitações"],
  },
  termos: {
    slug: "termos",
    title: "Termos de Uso",
    description: "Regras e condições de uso da plataforma digital e conteúdos da Hexamedical.",
    hero: "/assets/hexa/Hexamedical-Website-1-1024x576.webp",
    bullets: ["Condições gerais", "Responsabilidades", "Uso adequado", "Direitos e limitações"],
  },
};
