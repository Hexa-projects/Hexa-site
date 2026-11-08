import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import PageSection from "@/components/page/PageSection";
import CardGrid from "@/components/page/CardGrid";
import PointList from "@/components/page/PointList";
import PageContact from "@/components/page/PageContact";
import { whatsappHref } from "@/data/home";
import { contactPaths, hub, rmServicesMedia } from "@/data/pages/solutions";

/** /solucoes: as linhas da Hexamedical, cada uma com a sua página, e o que a equipe faz em torno do equipamento. */
const SolucoesHub = () => (
  <PageShell title={hub.title} description={hub.description}>
    <PageHero
      tone="dark"
      title={hub.heroTitle}
      lead={hub.heroLead}
      crumbs={[{ label: "Início", href: "/" }, { label: "Soluções" }]}
      actions={[
        { label: "Conversar pelo WhatsApp", href: whatsappHref(hub.whatsappText), kind: "primary" },
        { label: "Comparar as ressonâncias", href: "/solucoes/ressonancia-magnetica", kind: "quiet" },
      ]}
      eyebrow="Diagnóstico por imagem · humano e veterinário"
    />

    <PageSection id="equipamentos" title="Equipamentos" intro="Escolha a linha para ver os modelos, a indicação de cada um e os dados informados pelo fabricante.">
      <CardGrid items={hub.equipment} />
    </PageSection>

    <PageSection id="densitometria-e-software" title="Densitometria e inteligência artificial">
      <CardGrid items={hub.more} />
    </PageSection>

    <PageSection
      id="da-escolha-a-manutencao"
      title="Da escolha à manutenção"
      intro="A Hexamedical indica o sistema, planeja a sala, instala, treina a equipe e cuida da manutenção depois."
      media={rmServicesMedia}
    >
      <PointList items={hub.services} />
    </PageSection>

    <PageContact paths={contactPaths({
        title: "Quero um equipamento",
        whatsappText: hub.whatsappText,
        href: "/solucoes/ressonancia-magnetica",
        linkLabel: "Comparar as ressonâncias",
      })} />
  </PageShell>
);

export default SolucoesHub;
