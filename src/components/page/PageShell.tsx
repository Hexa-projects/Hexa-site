import { useRef, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { usePageReveal } from "@/motion/usePageReveal";
import { canonicalUrl } from "@/data/routes";
import "@/styles/page.css";

/**
 * Casca de toda página interna: cabeçalho claro, rodapé, título "<página> | Hexamedical", descrição e link canônico.
 * Os movimentos do kit (usePageReveal) rodam aqui, uma vez para a página inteira:
 * as páginas só marcam `data-reveal` e não chamam o hook de novo.
 */
const PageShell = ({
  title,
  description,
  canonical = true,
  children,
}: {
  title: string;
  description: string;
  /** `false` na 404: a URL pedida não é uma página do site, então não há canônico. */
  canonical?: boolean;
  children: ReactNode;
}) => {
  const root = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  usePageReveal(root);

  return (
    <Layout>
      <Helmet>
        <title>{`${title} | Hexamedical`}</title>
        <meta name="description" content={description} />
        {canonical && <link rel="canonical" href={canonicalUrl(pathname)} />}
      </Helmet>
      <div ref={root} className="page">
        {children}
      </div>
    </Layout>
  );
};

export default PageShell;
