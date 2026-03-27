"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { consultationTemplates } from "@/lib/mock-data";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { TemplateCard } from "@/features/consultant/operations/components/template-card";

type State = "loading" | "error" | "empty" | "no-results" | "success";

export function TemplatesPage() {
  const searchParams = useSearchParams();
  const simulateMode = searchParams.get("simulate") ?? "";
  const [state, setState] = useState<State>("loading");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return consultationTemplates;
    return consultationTemplates.filter((t) => `${t.title} ${t.system} ${t.description}`.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    setState("loading");
    const t = window.setTimeout(() => {
      if (simulateMode === "error") return setState("error");
      if (simulateMode === "empty" || consultationTemplates.length === 0) return setState("empty");
      if (filtered.length === 0) return setState("no-results");
      setState("success");
    }, 340);
    return () => window.clearTimeout(t);
  }, [simulateMode, filtered.length]);

  return (
    <div className="space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Consultation Templates</h1>
        <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Шаблоны структуры консультаций для скорости и стабильности качества.</p>
      </div>

      <Card className="p-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Поиск шаблонов</div>
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Название, система, описание" />
      </Card>

      {state === "loading" ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="mt-3 h-3 w-full" />
            </Card>
          ))}
        </div>
      ) : null}
      {state === "error" ? <EmptyState title="Ошибка загрузки шаблонов" description="Попробуйте позже." /> : null}
      {state === "empty" ? <EmptyState title="Пока нет шаблонов" description="Создайте первый шаблон структуры." /> : null}
      {state === "no-results" ? <EmptyState title="Ничего не найдено" description="Попробуйте другой запрос." /> : null}

      {state === "success" ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((tpl) => (
            <TemplateCard key={tpl.id} template={tpl} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

