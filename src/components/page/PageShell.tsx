import { useRef, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { usePageReveal } from "@/motion/usePageReveal";
import "@/styles/page.css";

/**
 * Casca de toda página interna: cabeçalho claro, rodapé, título "<página> | Hexamedical" e descrição.
 * Os movimentos do kit (usePageReveal) rodam aqui, uma vez para a página inteira:
 * as páginas só marcam `data-reveal` e não chamam o hook de novo.
 */
const PageShell = ({ title, description, children }: { title: string; description: string; children: ReactNode }) => {
  const root = useRef<HTMLDivElement>(null);
  usePageReveal(root);

  return (
    <Layout>
      <Helmet>
        <title>{`${title} | Hexamedical`}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div ref={root} className="page">
        {children}
      </div>
    </Layout>
  );
};

export default PageShell;
