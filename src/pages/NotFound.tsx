import { Helmet } from "react-helmet-async";
import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";

/** 404 do sistema: qualquer endereço sem rota (inclusive slug inexistente) cai aqui, no hero claro do kit. */
const NotFound = () => (
  <PageShell title="Página não encontrada" description="O endereço procurado não existe no site da Hexamedical.">
    <Helmet>
      <meta name="robots" content="noindex" />
    </Helmet>
    <PageHero
      tone="light"
      title="Página não encontrada"
      lead="O endereço pode ter mudado com o novo site. Comece pela página inicial, veja as soluções ou fale com a equipe."
      crumbs={[{ label: "Início", href: "/" }, { label: "Página não encontrada" }]}
      actions={[
        { label: "Ir para a página inicial", href: "/", kind: "primary" },
        { label: "Ver soluções", href: "/solucoes", kind: "quiet" },
        { label: "Falar com a equipe", href: "/contato", kind: "quiet" },
      ]}
    />
  </PageShell>
);

export default NotFound;
