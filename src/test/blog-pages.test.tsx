import fs from "node:fs";
import path from "node:path";
import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import BlogIndex from "@/pages/blog/BlogIndex";
import BlogPost from "@/pages/blog/BlogPost";
import { blogPosts, publishedPosts, type BlogPost as BlogPostData } from "@/data/blog";
import { publicRoutes } from "@/data/routes";
import { whatsappHref } from "@/data/home";

const renderAt = (url: string) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[url]}>
        <Routes>
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>,
  );

/** Artigo publicado só no teste: prova que a listagem e a página do post funcionam quando houver texto aprovado. */
const fixture = (slug: string, date: string): BlogPostData => ({
  slug,
  title: `Artigo de teste ${slug}`,
  excerpt: `Resumo do artigo ${slug}.`,
  date,
  category: "Teste",
  image: "/assets/hexa/magnifico-open.jpg",
  imageWidth: 600,
  imageHeight: 500,
  content: [`Primeiro parágrafo de ${slug}.`, `Segundo parágrafo de ${slug}.`],
});
const published = [fixture("mais-antigo", "2024-10-15"), fixture("mais-novo", "2025-05-10"), fixture("do-meio", "2024-12-01")];

const renderWith = (url: string, posts: BlogPostData[]) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[url]}>
        <Routes>
          <Route path="/blog" element={<BlogIndex posts={posts} />} />
          <Route path="/blog/:slug" element={<BlogPost posts={posts} />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>,
  );

describe("blog: rascunhos", () => {
  it("os três textos antigos são rascunhos (nunca saíram no site atual e têm afirmações sem fonte)", () => {
    expect(blogPosts).toHaveLength(3);
    for (const post of blogPosts) expect(post.draft, post.slug).toBe(true);
    expect(publishedPosts).toEqual([]);
  });

  it("o índice mostra o estado vazio honesto, com caminho para soluções, serviços e a equipe", () => {
    const { container } = renderAt("/blog");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const list = container.querySelector("#artigos") as HTMLElement;
    expect(list).toHaveTextContent("Os artigos estão em revisão. Enquanto isso, fale com a equipe.");
    const hrefs = within(list).getAllByRole("link").map((link) => link.getAttribute("href"));
    expect(hrefs).toEqual(["/solucoes", "/servicos"]);
    for (const post of blogPosts) expect(container).not.toHaveTextContent(post.title);
    expect(container.querySelector("#contato")).not.toBeNull();
  });

  it("o endereço de um rascunho mostra a 404 do sistema", () => {
    for (const post of blogPosts) {
      const { unmount } = renderAt(`/blog/${post.slug}`);
      expect(screen.getByRole("heading", { level: 1, name: "Página não encontrada" })).toBeInTheDocument();
      unmount();
    }
  });

  it("rascunhos ficam fora das rotas públicas e do sitemap; /blog continua", () => {
    const xml = fs.readFileSync(path.join(process.cwd(), "public/sitemap.xml"), "utf8");
    expect(publicRoutes).toContain("/blog");
    expect(xml).toContain("https://www.hexamedical.com.br/blog</loc>");
    for (const post of blogPosts) {
      expect(publicRoutes).not.toContain(`/blog/${post.slug}`);
      expect(xml).not.toContain(`/blog/${post.slug}`);
    }
  });
});

describe("blog: índice com artigos publicados", () => {
  const newestFirst = ["mais-novo", "do-meio", "mais-antigo"].map((slug) => published.find((post) => post.slug === slug)!);

  it("lista os posts do mais novo ao mais antigo, com título, resumo e data", () => {
    const { container } = renderWith("/blog", published);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const list = container.querySelector("#artigos") as HTMLElement;
    const titles = within(list)
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);
    expect(titles).toEqual(newestFirst.map((post) => post.title));
    for (const post of newestFirst) {
      const link = within(list).getByRole("heading", { level: 3, name: post.title }).closest("a");
      expect(link).toHaveAttribute("href", `/blog/${post.slug}`);
      expect(link).toHaveTextContent(post.excerpt);
    }
    expect(list).not.toHaveTextContent("em revisão");
  });

  it("um rascunho entre os publicados não aparece", () => {
    const { container } = renderWith("/blog", [...published, { ...fixture("rascunho", "2026-01-01"), draft: true }]);
    expect(container).not.toHaveTextContent("Artigo de teste rascunho");
  });
});

describe("blog: post publicado", () => {
  const post = published[0];

  it("mostra título como h1 único, data em time e todos os parágrafos dentro de article", () => {
    const { container } = renderWith(`/blog/${post.slug}`, published);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(post.title);
    const article = container.querySelector("article") as HTMLElement;
    expect(article).toBeInTheDocument();
    const time = article.querySelector("time");
    expect(time).toHaveAttribute("datetime", post.date);
    expect(time?.textContent).toBe("15 de outubro de 2024");
    for (const paragraph of post.content) expect(within(article).getByText(paragraph)).toBeInTheDocument();
  });

  it("lista os outros artigos e fecha com a triagem com a mensagem do artigo", () => {
    const { container } = renderWith(`/blog/${post.slug}`, published);
    const others = container.querySelector("#outros-artigos") as HTMLElement;
    const hrefs = within(others).getAllByRole("link").map((link) => link.getAttribute("href"));
    expect(hrefs.sort()).toEqual(["/blog/do-meio", "/blog/mais-novo"]);
    const text = `Olá! Li o artigo ${post.title} e quero falar com a equipe.`;
    const hrefsAll = screen.getAllByRole("link").map((link) => link.getAttribute("href"));
    expect(hrefsAll).toContain(whatsappHref(text));
  });

  it("com um só artigo publicado, a seção de outros artigos não aparece vazia", () => {
    const { container } = renderWith(`/blog/${post.slug}`, [post]);
    expect(container.querySelector("#outros-artigos")).toBeNull();
  });

  it("slug inexistente mostra a 404 do sistema", () => {
    renderWith("/blog/nao-existe", published);
    expect(screen.getByRole("heading", { level: 1, name: "Página não encontrada" })).toBeInTheDocument();
  });
});

describe("blog: estilo", () => {
  it("a linha de data usa --ink-2 (ink-3 só vale para texto grande)", () => {
    const css = fs.readFileSync(path.join(process.cwd(), "src/styles/page.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
    const block = css.slice(css.indexOf(".blog-article p"));
    expect(block).toContain(".blog-article__meta");
    expect(block).not.toMatch(/--ink-3/);
    expect(block).toMatch(/\.blog-article__meta\s*\{[^}]*color:\s*var\(--ink-2\)/);
  });
});
