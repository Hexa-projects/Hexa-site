import { Building2, Hospital, ScanLine, GraduationCap } from "lucide-react";

export interface Segment {
  slug: string;
  title: string;
  description: string;
  icon: typeof Building2;
}

export const segments: Segment[] = [
  {
    slug: "clinicas",
    title: "Clínicas",
    description: "Soluções de imagem dimensionadas para clínicas de diagnóstico com foco em produtividade e retorno do investimento.",
    icon: Building2,
  },
  {
    slug: "hospitais",
    title: "Hospitais",
    description: "Equipamentos robustos e serviços de alta disponibilidade para operações hospitalares que não podem parar.",
    icon: Hospital,
  },
  {
    slug: "centros-de-imagem",
    title: "Centros de Imagem",
    description: "Tecnologia de ponta e suporte contínuo para centros de imagem de alto volume e excelência diagnóstica.",
    icon: ScanLine,
  },
  {
    slug: "universidades",
    title: "Universidades",
    description: "Equipamentos para ensino e pesquisa com suporte técnico especializado e condições acadêmicas.",
    icon: GraduationCap,
  },
];
