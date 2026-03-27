"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { faqItems } from "@/lib/mock-data";
import { FAQAccordion } from "@/features/public/components/faq-accordion";
import { EmptySearchState } from "@/features/public/components/empty-search-state";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

type LoadState = "loading" | "error" | "success";

export function FAQPage() {
  const searchParams = useSearchParams();
  const simulateMode = searchParams.get("simulate") ?? "";

  const categories = useMemo(() => {
    const set = new Set<string>();
    faqItems.forEach((f) => set.add(f.category));
    return Array.from(set);
  }, []);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [state, setState] = useState<LoadState>("loading");

  useEffect(() => {
    setState("loading");
    const t = window.setTimeout(() => {
      if (simulateMode === "error") {
        setState("error");
        return;
      }
      setState("success");
    }, 420);

    return () => window.clearTimeout(t);
  }, [simulateMode]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqItems.filter((item) => {
      const byCategory = category === "all" ? true : item.category === category;
      const byQuery = !q ? true : `${item.question} ${item.answer}`.toLowerCase().includes(q);
      return byCategory && byQuery;
    });
  }, [query, category]);

  return (
    <div className="space-y-6 py-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Частые вопросы</h1>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-[rgb(var(--text-muted))]">
          Собрали ответы о выборе консультации, подготовке, оплате, формате работы, результате и сопровождении.
        </p>
      </div>

      <Card className="rounded-3xl p-4 sm:p-5">
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Поиск</div>
            <Input value={query} placeholder="Например: как выбрать систему" onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Категория</div>
            <select
              className="focus-ring mt-2 h-11 w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">Все</option>
              {categories.map((c) => (
                <option value={c} key={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {state === "loading" ? (
        <div className="space-y-3">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      ) : null}

      {state === "error" ? (
        <Card className="p-6">
          <div className="text-sm font-semibold text-[rgb(var(--primary))]">Ошибка загрузки</div>
          <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Попробуйте снова.</p>
          <div className="mt-4">
            <Button
              variant="secondary"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
            >
              Сбросить
            </Button>
          </div>
        </Card>
      ) : null}

      {state === "success" ? (
        filtered.length ? (
          <FAQAccordion
            items={filtered.map((item) => ({
              question: item.question,
              answer: item.answer
            }))}
          />
        ) : (
          <EmptySearchState title="Ничего не найдено" description="Измените формулировку запроса или выберите другую категорию." />
        )
      ) : null}
    </div>
  );
}

