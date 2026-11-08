import ContactTriage from "@/components/home/ContactTriage";
import type { TriagePath } from "@/data/home";

/**
 * Fechamento de toda interna: a mesma triagem por WhatsApp da home, com a mensagem pronta da página.
 * Sem título, usa o da home ("Fale com a equipe certa").
 */
const PageContact = ({
  title,
  intro,
  paths,
  channelsLink,
}: {
  title?: string;
  intro?: string;
  paths: TriagePath[];
  /** Falso só em /contato, para a triagem não apontar para a própria página. */
  channelsLink?: boolean;
}) => <ContactTriage items={paths} title={title} intro={intro} channelsLink={channelsLink} />;

export default PageContact;
