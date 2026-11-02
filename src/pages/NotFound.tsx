import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  return (
    <Layout>
      <Helmet>
        <title>Página não encontrada — Hexamedical</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <section className="not-found" aria-labelledby="not-found-title">
        <h1 id="not-found-title">Página não encontrada.</h1>
        <p>O endereço pode ter mudado com o novo site. Comece pela página inicial ou veja as soluções.</p>
        <div className="not-found__actions">
          <Link to="/" className="button button--primary">Ir para a página inicial</Link>
          <Link to="/solucoes" className="button button--quiet">Ver soluções</Link>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
