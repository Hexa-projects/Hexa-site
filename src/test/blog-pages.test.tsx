import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import BlogIndex from "@/pages/blog/BlogIndex";
import BlogPost from "@/pages/blog/BlogPost";
import { blogPosts } from "@/data/blog";
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

const newestFirst = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

describe("blog: índice", () => {
  it("lista todos os posts do mais novo ao mais antigo, com título, resumo e data", () => {
    const { container } = renderAt("/blog");
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
  });
});

describe("blog: post", () => {
  const post = newestFirst[1];

  it("mostra título como h1 único, data em time e todos os parágrafos dentro de article", () => {
    const { container } = renderAt(`/blog/${post.slug}`);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(post.title);
    const article = container.querySelector("article") as HTMLElement;
    expect(article).toBeInTheDocument();
    const time = article.querySelector("time");
    expect(time).toHaveAttribute("datetime", post.date);
    expect(time?.textContent).toMatch(/de \d{4}$/);
    for (const paragraph of post.content) expect(within(article).getByText(paragraph)).toBeInTheDocument();
  });

  it("lista os outros artigos e fecha com a triagem com a mensagem do artigo", () => {
    const { container } = renderAt(`/blog/${post.slug}`);
    const others = container.querySelector("#outros-artigos") as HTMLElement;
    const hrefs = within(others).getAllByRole("link").map((link) => link.getAttribute("href"));
    expect(hrefs.sort()).toEqual(blogPosts.filter((other) => other.slug !== post.slug).map((other) => `/blog/${other.slug}`).sort());
    const text = `Olá! Li o artigo ${post.title} e quero falar com a equipe.`;
    const hrefsAll = screen.getAllByRole("link").map((link) => link.getAttribute("href"));
    expect(hrefsAll).toContain(whatsappHref(text));
  });

  it("slug inexistente mostra a 404 do sistema", () => {
    renderAt("/blog/nao-existe");
    expect(screen.getByRole("heading", { level: 1, name: "Página não encontrada" })).toBeInTheDocument();
  });
});
