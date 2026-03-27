"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { campaigns } from "@/lib/mock-data";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CampaignTable } from "@/features/consultant/operations/components/campaign-table";
import { CampaignEditor } from "@/features/consultant/operations/components/campaign-editor";

type State = "loading" | "error" | "empty" | "no-results" | "success";

export function CampaignsPage() {
  const searchParams = useSearchParams();
  const simulateMode = searchParams.get("simulate") ?? "";
  const [state, setState] = useState<State>("loading");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return campaigns;
    return campaigns.filter((c) => `${c.title} ${c.audience} ${c.status}`.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    setState("loading");
    const t = window.setTimeout(() => {
      if (simulateMode === "error") return setState("error");
      if (simulateMode === "empty" || campaigns.length === 0) return setState("empty");
      if (filtered.length === 0) return setState("no-results");
      setState("success");
    }, 360);
    return () => window.clearTimeout(t);
  }, [simulateMode, filtered.length]);

  return (
    <div className="space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Campaigns</h1>
        <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Email-потоки и сервисные коммуникации для клиентов.</p>
      </div>

      <Card className="p-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Поиск кампаний</div>
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Название, аудитория, статус" />
      </Card>

      {state === "loading" ? (
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-5/6" />
        </div>
      ) : null}
      {state === "error" ? <EmptyState title="Ошибка загрузки кампаний" description="Попробуйте позже." /> : null}
      {state === "empty" ? <EmptyState title="Кампаний пока нет" description="Создайте первую кампанию в редакторе." /> : null}
      {state === "no-results" ? <EmptyState title="Ничего не найдено" description="Попробуйте другой запрос." /> : null}

      {state === "success" ? <CampaignTable rows={filtered} /> : null}
      <CampaignEditor />
    </div>
  );
}

