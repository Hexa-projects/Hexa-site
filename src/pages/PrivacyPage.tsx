import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

const PrivacyPage = () => (
  <Layout>
    <Helmet>
      <title>Política de Privacidade — Hexamedical</title>
      <meta name="description" content="Política de privacidade e tratamento de dados da Hexamedical." />
    </Helmet>
    <PageBreadcrumb items={[{ label: "Política de Privacidade" }]} />
    <section className="py-16 md:py-24">
      <div className="container max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold md:text-4xl">Política de Privacidade</h1>
        <p className="text-muted-foreground">A Hexamedical valoriza a privacidade e o tratamento responsável dos dados pessoais coletados em formulários, contatos e interações no site.</p>
        <h2 className="text-xl font-semibold">Dados coletados</h2>
        <p className="text-muted-foreground">Podemos coletar nome, e-mail, telefone, empresa e informações de interesse técnico/comercial para atendimento e relacionamento.</p>
        <h2 className="text-xl font-semibold">Uso dos dados</h2>
        <p className="text-muted-foreground">Os dados são utilizados para responder solicitações, elaborar propostas, enviar comunicações relevantes e melhorar nossos serviços.</p>
        <h2 className="text-xl font-semibold">Direitos do titular</h2>
        <p className="text-muted-foreground">Você pode solicitar acesso, correção ou exclusão de dados por meio de nossos canais oficiais de contato.</p>
      </div>
    </section>
  </Layout>
);

export default PrivacyPage;
