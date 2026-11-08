export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "avancos-ressonancia-coluna",
    title: "Avanços na Ressonância Magnética da Coluna Vertebral: Inovação e Diagnósticos Mais Precisos",
    excerpt:
      "Descubra como as novas tecnologias de RM estão revolucionando o diagnóstico de patologias da coluna vertebral com maior precisão e conforto.",
    date: "2025-05-10",
    category: "Tecnologia",
    image: "/assets/hexa/Ressonancia-Magnetica-com-Suporte-de-Peso-1024x576.png",
    imageWidth: 1024,
    imageHeight: 576,
    content: [
      "A evolução da ressonância magnética da coluna tem permitido exames mais assertivos para casos complexos.",
      "Tecnologias como aquisição com carga e protocolos dedicados elevam a sensibilidade diagnóstica.",
      "Com o equipamento e protocolo corretos, a equipe clínica ganha segurança para definição terapêutica."
    ]
  },
  {
    slug: "mitos-e-verdades-ressonancia-magnetica",
    title: "Mitos e verdades que você precisa saber sobre a ressonância magnética",
    excerpt:
      "O exame de RM oferece imagens de alta resolução que auxiliam no diagnóstico e tratamento de lesões. Saiba o que é verdade e o que é mito.",
    date: "2024-10-15",
    category: "Educação",
    image: "/assets/hexa/img-saiba-qual-a-importancia-dos-equipamentos-de-diagnostico-por-imagem-no-setor-de-saude.jpg",
    imageWidth: 996,
    imageHeight: 664,
    content: [
      "A RM é um exame não invasivo e fundamental para diversas especialidades médicas.",
      "Quando bem indicada, reduz retrabalho diagnóstico e acelera decisões clínicas.",
      "Mitos comuns sobre desconforto e segurança podem ser esclarecidos com orientação adequada."
    ]
  },
  {
    slug: "ressonancia-magnetica-baixo-campo",
    title: "Tudo o que você precisa saber sobre a ressonância magnética de baixo campo",
    excerpt:
      "Conheça o sistema de RM de baixo campo e como essa ferramenta atua com campos magnéticos de menor intensidade para diagnósticos eficazes.",
    date: "2024-10-08",
    category: "Guia",
    image: "/assets/hexa/magnifico-open.jpg",
    imageWidth: 600,
    imageHeight: 500,
    content: [
      "A RM de baixo campo é uma alternativa estratégica para clínicas com foco em eficiência operacional.",
      "Ela pode entregar excelente custo-benefício em aplicações musculoesqueléticas e rotinas específicas.",
      "Com o parceiro técnico certo, implantação e operação se tornam mais previsíveis."
    ]
  }
];

/** Do mais novo ao mais antigo (datas AAAA-MM-DD ordenam como texto). */
export const postsNewestFirst: BlogPost[] = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

/** "10 de maio de 2025", sempre em UTC para a data não andar com o fuso do leitor. */
export const formatPostDate = (date: string) =>
  new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
