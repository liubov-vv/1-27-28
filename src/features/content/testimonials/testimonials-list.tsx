"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { reviews, users, clients, consultants } from "@/lib/mock-data";
import type { Review } from "@/lib/types/models";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { EmptySearchState } from "@/features/public/components/empty-search-state";
import { TestimonialCard } from "@/features/content/components/testimonial-card";
import { Badge } from "@/components/ui/badge";

type LoadState = "default" | "loading" | "error" | "empty" | "no-results" | "success";

function resolveReviewer(review: Review) {
  const client = clients.find((c) => c.id === review.clientId);
  const reviewerName = users.find((u) => u.id === client?.userId)?.fullName ?? "[CLIENT_NAME]";
  const consultant = consultants.find((c) => c.id === review.consultantId);
  const consultantName = users.find((u) => u.id === consultant?.userId)?.fullName ?? "[CONSULTANT_NAME]";
  return { reviewerName, consultantName };
}

export function TestimonialsList() {
  const searchParams = useSearchParams();
  const simulateMode = searchParams.get("simulate") ?? "";

  const [state, setState] = useState<LoadState>("default");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setState("loading");
    const t = window.setTimeout(() => {
      if (simulateMode === "error") {
        setState("error");
        return;
      }
      if (simulateMode === "empty" || reviews.length === 0) {
        setState("empty");
        return;
      }
      setState("success");
    }, 420);
    return () => window.clearTimeout(t);
  }, [simulateMode]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return reviews;
    return reviews.filter((r) => {
      const { reviewerName, consultantName } = resolveReviewer(r);
      return `${r.text} ${reviewerName} ${consultantName}`.toLowerCase().includes(q);
    });
  }, [query]);

  useEffect(() => {
    if (state === "loading" || state === "default") return;
    if (state === "error" || state === "empty") return;
    setState(filtered.length ? "success" : "no-results");
  }, [filtered, state]);

  const reset = () => setQuery("");

  return (
    <div className="space-y-6 py-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Отзывы</h1>
          <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Свидетельства о процессе, подходе и результате.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="accent">{reviews.length} отзывов</Badge>
        </div>
      </div>

      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Поиск</div>
            <Input value={query} placeholder="Например: поддержка, структура, ясность" onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" type="button" onClick={reset}>
              Сбросить
            </Button>
          </div>
        </div>
      </Card>

      {state === "loading" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-5">
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="mt-3 h-4 w-3/4" />
              <Skeleton className="mt-2 h-4 w-2/3" />
            </Card>
          ))}
        </div>
      ) : null}

      {state === "error" ? (
        <Card className="p-6">
          <div className="text-sm font-semibold text-[rgb(var(--primary))]">Ошибка загрузки</div>
          <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Попробуйте позже.</p>
        </Card>
      ) : null}

      {state === "empty" ? <EmptySearchState title="Пока нет отзывов" description="Как только появятся отзывы, вы увидите их здесь." /> : null}
      {state === "no-results" ? <EmptySearchState title="Ничего не найдено" description="Попробуйте другой запрос." onReset={reset} /> : null}

      {state === "success" ? (
        filtered.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => (
              <TestimonialCard key={r.id} testimonialId={r.id} />
            ))}
          </div>
        ) : null
      ) : null}
    </div>
  );
}

