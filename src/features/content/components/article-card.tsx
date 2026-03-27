import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { BlogArticle, KnowledgeArticle } from "@/lib/types/models";

type BaseArticle = {
  id: string;
  title: string;
  excerpt: string;
  category?: string;
  slug: string;
  publishedAt?: string;
  tags?: string[];
};

type ArticleCardProps = {
  href: string;
  article: KnowledgeArticle | BlogArticle;
  variant: "knowledge" | "blog";
};

function formatDate(iso: string | undefined) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "2-digit" });
}

export function ArticleCard({ href, article, variant }: ArticleCardProps) {
  const dateLabel = formatDate(article.publishedAt);

  return (
    <Link href={href}>
      <Card className="p-0 transition hover:opacity-95">
        <CardHeader className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="line-clamp-2">{article.title}</CardTitle>
              <CardDescription className="mt-2 line-clamp-2">{article.excerpt}</CardDescription>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2">
              {article.category ? <Badge>{article.category}</Badge> : null}
              {variant === "blog" && dateLabel ? <Badge variant="accent">{dateLabel}</Badge> : null}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          {article.tags && article.tags.length ? (
            <div className="flex flex-wrap gap-2">
              {article.tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] px-2 py-1 text-xs font-medium text-[rgb(var(--text-muted))]"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : (
            <div className="text-sm text-[rgb(var(--text-muted))]">Материал по теме</div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

