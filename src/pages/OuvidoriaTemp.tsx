import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";

/** Página provisória: a Task de institucional substitui por /ouvidoria definitiva. */
export default function OuvidoriaTemp() {
  return (
    <Layout>
      <Helmet><title>Ouvidoria — Hexamedical</title></Helmet>
      <section className="ed-intro">
        <div className="ed-shell">
          <span className="ed-eyebrow">Ouvidoria</span>
          <h1>Ouvidoria</h1>
          <p>Para registrar uma manifestação, escreva para comercial@hexamedical.com.br.</p>
        </div>
      </section>
    </Layout>
  );
}
