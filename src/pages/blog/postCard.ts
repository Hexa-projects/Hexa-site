import type { PageCard } from "@/components/page/CardGrid";
import { formatPostDate, type BlogPost } from "@/data/blog";

/** Card de um artigo: foto de cena de capa, data e categoria na linha curta, resumo no corpo. */
export const postCard = (post: BlogPost): PageCard => ({
  title: post.title,
  meta: `${formatPostDate(post.date)} · ${post.category}`,
  body: post.excerpt,
  href: `/blog/${post.slug}`,
  fill: true,
  image: { src: post.image, width: post.imageWidth, height: post.imageHeight, alt: "" },
});
