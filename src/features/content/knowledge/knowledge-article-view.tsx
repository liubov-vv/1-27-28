"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { knowledgeArticles } from "@/lib/mock-data";
import type { KnowledgeArticle } from "@/lib/types/models";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { ContentMeta } from "@/features/content/components/content-meta";
import { TagList } from "@/features/content/components/tag-list";
import { TableOfContents } from "@/features/content/components/table-of-contents";
import { RichTextContent } from "@/features/content/components/rich-text-content";
import { RelatedContent } from "@/features/content/components/related-content";

type LoadState = "default" | "loading" | "error" | "empty" | "success";

export function KnowledgeArticleView() {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const simulateMode = searchParams.get("simulate") ?? "";

  const slug = params.slug;
  const [state, setState] = useState<LoadState>("default");

  const article = useMemo(() => knowledgeArticles.find((a) => a.slug === slug), [slug]);

  useEffect(() => {
    setState("loading");
    const t = window.setTimeout(() => {
      if (simulateMode === "error") {
        setState("error");
        return;
      }
      if (simulateMode === "empty" || !article) {
        setState("empty");
        return;
      }
      setState("success");
    }, 520);
    return () => window.clearTimeout(t);
  }, [simulateMode, article]);

  const sections = (article?.sections ?? []) as KnowledgeArticle["sections"];
  const tocItems = (sections ?? []).map((s) => ({ id: s.id, title: s.title, level: s.level }));

  const related = useMemo(() => {
    if (!article) return [];
    const tagSet = new Set(article.tags ?? []);
    return knowledgeArticles
      .filter((a) => a.slug !== article.slug)
      .map((a) => {
        const overlapTags = a.tags?.filter((t) => tagSet.has(t)).length ?? 0;
        const overlapCategory = a.category === article.category ? 1 : 0;
        const score = overlapTags * 2 + overlapCategory;
        return { a, score };
      })
      .sort((x, y) => y.score - x.score)
      .map((x) => x.a);
  }, [article]);

  return (
    <div className="space-y-8 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/knowledge">
          <span className="text-sm font-semibold text-[rgb(var(--primary))] hover:opacity-90">Назад в базу знаний</span>
        </Link>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary">Скачать PDF</Button>
          <Button>Запросить уточнение</Button>
        </div>
      </div>

      {state === "loading" || state === "default" ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-20 w-full" />
            <Card>
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-2/3" />
          </div>
        </div>
      ) : null}

      {state === "error" ? (
        <EmptyState title="Не удалось загрузить статью" description="Попробуйте открыть её позже." />
      ) : null}

      {state === "empty" ? (
        <EmptyState title="Статья не найдена" description="Проверьте ссылку или вернитесь в список." />
      ) : null}

      {state === "success" && article ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{article.category}</Badge>
                <ContentMeta category={article.category} readingTimeLabel="8–10 мин" />
              </div>
              <h1 className="text-3xl font-semibold tracking-tight">{article.title}</h1>
              <p className="text-sm leading-7 text-[rgb(var(--text-muted))]">{article.excerpt}</p>
              <TagList tags={article.tags ?? []} />
            </div>

            <Card>
              <CardContent className="p-6">
                {sections?.length ? <RichTextContent sections={sections} /> : <p className="text-sm text-[rgb(var(--text-muted))]">Контент пока в подготовке.</p>}
              </CardContent>
            </Card>

            <RelatedContent current={article} related={related} variant="knowledge" />
          </div>

          <div className="hidden lg:block">
            {tocItems.length ? <TableOfContents items={tocItems} /> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

