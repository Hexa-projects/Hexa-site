import { Helmet } from "react-helmet-async";
import { Navigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import { blogPosts } from "@/data/blog";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <Layout>
      <Helmet>
        <title>{post.title} — Hexamedical</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <PageBreadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />
      <article className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">{post.title}</h1>
          <p className="mb-8 text-muted-foreground">{post.excerpt}</p>
          <div className="mb-8 overflow-hidden rounded-xl border border-border">
            <img src={post.image} alt={post.title} className="h-80 w-full object-cover" />
          </div>
          <div className="space-y-5 text-foreground/90">
            {post.content.map((p, idx) => (
              <p key={idx} className="leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPostPage;
