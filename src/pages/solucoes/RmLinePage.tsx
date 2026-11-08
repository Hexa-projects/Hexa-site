import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import PageSection from "@/components/page/PageSection";
import CardGrid from "@/components/page/CardGrid";
import CompareTable from "@/components/page/CompareTable";
import PointList from "@/components/page/PointList";
import Faq from "@/components/page/Faq";
import PageContact from "@/components/page/PageContact";
import { whatsappHref } from "@/data/home";
import { contactPaths, rmLine, rmServicesMedia } from "@/data/pages/solutions";

/** /solucoes/ressonancia-magnetica: a pergunta de escolha, o comparativo dos quatro modelos e o que vem com a RM. */
const RmLinePage = () => (
  <PageShell title={rmLine.title} description={rmLine.description}>
    <PageHero
      tone="dark"
      title={rmLine.heroTitle}
      lead={rmLine.heroLead}
      crumbs={[{ label: "Início", href: "/" }, { label: "Soluções", href: "/solucoes" }, { label: "Ressonância magnética" }]}
      media={rmLine.hero}
      actions={[
        { label: "Conversar pelo WhatsApp", href: whatsappHref(rmLine.whatsappText), kind: "primary" },
        { label: "Ver o comparativo", href: "/solucoes/ressonancia-magnetica#comparativo", kind: "quiet" },
      ]}
      eyebrow="Esaote · Ressonância magnética aberta"
    />

    <PageSection
      id="escolha"
      title="Qual é o foco dos exames?"
      intro={
        <>
          <p>{rmLine.question}</p>
          <p>A resposta indica o primeiro equipamento a avaliar. O volume de exames e a sala disponível completam a escolha, junto com a nossa equipe.</p>
        </>
      }
    >
      <CardGrid items={rmLine.choice} />
    </PageSection>

    <PageSection
      id="comparativo"
      title="Os quatro modelos lado a lado"
      intro="Área e consumo informados pela Esaote e pela base comercial da Hexamedical. Obra, blindagem, carga de piso e layout final são confirmados no projeto da sala, antes da compra."
    >
      <CompareTable {...rmLine.compare} />
    </PageSection>

    <PageSection
      id="da-escolha-a-manutencao"
      title="Da escolha à manutenção"
      intro="A Hexamedical planeja a sala, instala a ressonância, treina a equipe e faz a manutenção depois da compra."
      media={rmServicesMedia}
    >
      <PointList items={rmLine.services} />
    </PageSection>

    <PageSection id="perguntas" title="Perguntas frequentes">
      <Faq items={rmLine.faq} />
    </PageSection>

    <PageContact
      paths={contactPaths({
        title: "Quero escolher uma ressonância",
        whatsappText: rmLine.whatsappText,
        href: "/solucoes/ressonancia-magnetica#comparativo",
        linkLabel: "Ver o comparativo",
      })}
    />
  </PageShell>
);

export default RmLinePage;
