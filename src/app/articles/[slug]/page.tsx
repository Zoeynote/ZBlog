import { notFound } from "next/navigation";
import { profilePosts } from "@/data/profileContent";

export default async function ArticlePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = profilePosts.find((item) => item.slug === slug);
  if (!article) return notFound();

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-20">
      <p className="text-sm text-brand-cyan">{article.category}</p>
      <h1 className="mt-2 text-4xl font-semibold">{article.title}</h1>
      <p className="mt-4 text-slate-400">{article.summary}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300">
            {tag}
          </span>
        ))}
      </div>
      <article className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-slate-300">
        This is a placeholder article page for the selected portfolio content. Replace this block with your full
        article content, markdown renderer, or CMS integration.
      </article>
    </main>
  );
}
