"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { knowledgeArticles } from "@/lib/mock-data";
import { KnowledgeCard } from "@/features/content/components/knowledge-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { EmptySearchState } from "@/features/public/components/empty-search-state";
import type { KnowledgeArticle } from "@/lib/types/models";
import { Button } from "@/components/ui/button";

type LoadState = "default" | "loading" | "error" | "empty" | "no-results" | "success";

function uniq(values: string[]) {
  return Array.from(new Set(values));
}

export function KnowledgeList() {
  const searchParams = useSearchParams();
  const simulateMode = searchParams.get("simulate") ?? "";

  const categories = useMemo(() => uniq(knowledgeArticles.map((a) => a.category)), []);

  const [state, setState] = useState<LoadState>("default");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  useEffect(() => {
    setState("loading");
    const t = window.setTimeout(() => {
      if (simulateMode === "error") {
        setState("error");
        return;
      }
      if (simulateMode === "empty" || knowledgeArticles.length === 0) {
        setState("empty");
        return;
      }
      setState("success");
    }, 450);
    return () => window.clearTimeout(t);
  }, [simulateMode]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return knowledgeArticles.filter((a) => {
      const byCategory = category === "all" ? true : a.category === category;
      const byQuery = !q
        ? true
        : `${a.title} ${a.excerpt} ${a.tags?.join(" ") ?? ""}`.toLowerCase().includes(q);
      return byCategory && byQuery;
    });
  }, [query, category]);

  useEffect(() => {
    if (state === "loading" || state === "default") return;
    if (state === "error" || state === "empty") return;
    if (filtered.length === 0) setState("no-results");
    else setState("success");
  }, [filtered, state]);

  const relatedCountLabel = state === "success" ? `Найдено: ${filtered.length}` : "";

  const reset = () => {
    setQuery("");
    setCategory("all");
  };

  return (
    <div className="space-y-6 py-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">База знаний</h1>
          <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Длинные статьи для практики и точных формулировок.</p>
        </div>
        <div className="text-sm text-[rgb(var(--text-muted))]">{relatedCountLabel}</div>
      </div>

      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Поиск</div>
            <Input value={query} placeholder="Например: отношения, время, здоровье" onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Категории</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={category === "all" ? "bg-[rgb(var(--surface-muted))]" : ""}
                onClick={() => setCategory("all")}
              >
                Все
              </Button>
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className="focus-ring rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-1 text-sm font-medium text-[rgb(var(--text-muted))] hover:bg-[rgb(var(--surface-muted))]"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-3">
          <Button variant="secondary" type="button" onClick={reset}>
            Сбросить
          </Button>
          <div className="mt-2 text-xs text-[rgb(var(--text-muted))]">
            Совет: используйте теги для узкого поиска.
          </div>
        </div>
      </Card>

      {state === "loading" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-5">
              <Skeleton className="h-4 w-3/4" />
              <div className="mt-3 space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
              </div>
            </Card>
          ))}
        </div>
      ) : null}

      {state === "error" ? (
        <Card className="p-6">
          <div className="text-sm font-semibold text-[rgb(var(--primary))]">Ошибка загрузки</div>
          <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Попробуйте обновить страницу.</p>
        </Card>
      ) : null}

      {state === "empty" ? (
        <EmptySearchState title="Пока нет статей" description="Как только материалы появятся, вы увидите их здесь." />
      ) : null}

      {state === "no-results" ? <EmptySearchState title="Ничего не найдено" description="Попробуйте другой запрос или категорию." onReset={reset} /> : null}

      {state === "success" ? (
        filtered.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => (
              <KnowledgeCard key={a.slug} article={a} />
            ))}
          </div>
        ) : null
      ) : null}
    </div>
  );
}

