import { KnowledgeArticle, BlogArticle } from "@/lib/types/models";
import { ArticleCard } from "./article-card";

type RelatedContentProps = {
  current: KnowledgeArticle | BlogArticle;
  related: Array<KnowledgeArticle | BlogArticle>;
  variant: "knowledge" | "blog";
};

export function RelatedContent({ current, related, variant }: RelatedContentProps) {
  const items = related.filter((r) => r.slug !== current.slug).slice(0, 3);
  if (!items.length) return null;

  return (
    <div>
      <div className="text-sm font-semibold text-[rgb(var(--text))]">Похожие материалы</div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {items.map((a) => (
          <ArticleCard
            key={a.slug}
            href={`/${variant}/${a.slug}`}
            variant={variant}
            article={a}
          />
        ))}
      </div>
      <div className="mt-4 text-xs text-[rgb(var(--text-muted))]">Подборка сформирована по совпадениям категорий и тегов.</div>
    </div>
  );
}

