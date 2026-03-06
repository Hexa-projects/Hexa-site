import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

const TermsPage = () => (
  <Layout>
    <Helmet>
      <title>Termos de Uso — Hexamedical</title>
      <meta name="description" content="Termos e condições de uso do site Hexamedical." />
    </Helmet>
    <PageBreadcrumb items={[{ label: "Termos de Uso" }]} />
    <section className="py-16 md:py-24">
      <div className="container max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold md:text-4xl">Termos de Uso</h1>
        <p className="text-muted-foreground">Ao acessar este site, você concorda com os termos e condições aqui descritos.</p>
        <h2 className="text-xl font-semibold">Uso de conteúdo</h2>
        <p className="text-muted-foreground">Textos, imagens e materiais são de propriedade da Hexamedical ou de seus parceiros e não podem ser reproduzidos sem autorização.</p>
        <h2 className="text-xl font-semibold">Responsabilidades</h2>
        <p className="text-muted-foreground">As informações publicadas têm caráter informativo. Especificações técnicas e condições comerciais devem ser validadas em atendimento oficial.</p>
        <h2 className="text-xl font-semibold">Atualizações</h2>
        <p className="text-muted-foreground">Os termos podem ser atualizados periodicamente para refletir melhorias legais e operacionais.</p>
      </div>
    </section>
  </Layout>
);

export default TermsPage;
