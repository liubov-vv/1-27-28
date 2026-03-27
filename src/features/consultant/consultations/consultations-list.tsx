"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { consultations, users, clients, services } from "@/lib/mock-data";
import { FilterPanel } from "@/features/consultant/clients/components/filter-panel";
import { DataTable } from "@/components/tables/data-table";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/features/consultant/clients/components/status-badge";
import { Button } from "@/components/ui/button";

type ListState = "loading" | "error" | "empty" | "no-results" | "success";
type Row = {
  id: string;
  topic: string;
  clientName: string;
  system: string;
  date: string;
  status: "active" | "paused" | "archived" | "draft" | "completed";
};

function toStatus(status: "draft" | "scheduled" | "completed"): Row["status"] {
  if (status === "scheduled") return "active";
  if (status === "completed") return "completed";
  return "draft";
}

export function ConsultantConsultationsList() {
  const searchParams = useSearchParams();
  const simulateMode = searchParams.get("simulate") ?? "";
  const [state, setState] = useState<ListState>("loading");
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("all");
  const [status, setStatus] = useState("all");

  const rows = useMemo<Row[]>(
    () =>
      consultations.map((c) => {
        const client = clients.find((cl) => cl.id === c.clientId);
        const clientName = users.find((u) => u.id === client?.userId)?.fullName ?? c.clientId;
        const system = services.find((s) => s.id === c.serviceId)?.system ?? "BaZi";
        return {
          id: c.id,
          topic: c.topic,
          clientName,
          system,
          date: new Date(c.scheduledAt).toLocaleDateString("ru-RU", { day: "2-digit", month: "short", year: "numeric" }),
          status: toStatus(c.status)
        };
      }),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = rows;
    if (tag !== "all") list = list.filter((r) => r.system === tag);
    if (status !== "all") list = list.filter((r) => r.status === status);
    if (q) list = list.filter((r) => `${r.topic} ${r.clientName} ${r.system}`.toLowerCase().includes(q));
    return list;
  }, [rows, query, tag, status]);

  const systemOptions = useMemo(
    () => [{ label: "Все системы", value: "all" }, ...Array.from(new Set(rows.map((r) => r.system))).map((s) => ({ label: s, value: s }))],
    [rows]
  );
  const statusOptions = [
    { label: "Все статусы", value: "all" },
    { label: "Запланировано", value: "active" },
    { label: "Черновик", value: "draft" },
    { label: "Завершено", value: "completed" }
  ];

  useEffect(() => {
    setState("loading");
    const t = window.setTimeout(() => {
      if (simulateMode === "error") return setState("error");
      if (simulateMode === "empty" || rows.length === 0) return setState("empty");
      if (filtered.length === 0) return setState("no-results");
      setState("success");
    }, 380);
    return () => window.clearTimeout(t);
  }, [simulateMode, rows.length, filtered.length]);

  return (
    <div className="space-y-6 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Консультации</h1>
          <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Список, статусы и быстрый переход к деталям.</p>
        </div>
        <Link href="/consultant/consultations/new">
          <Button>Создать консультацию</Button>
        </Link>
      </div>

      <FilterPanel
        query={query}
        onQueryChange={setQuery}
        tag={tag}
        onTagChange={setTag}
        tagOptions={systemOptions}
        status={status}
        onStatusChange={setStatus}
        statusOptions={statusOptions}
        onReset={() => {
          setQuery("");
          setTag("all");
          setStatus("all");
        }}
      />

      {state === "loading" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-5">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="mt-3 h-3 w-full" />
              <Skeleton className="mt-2 h-3 w-5/6" />
            </Card>
          ))}
        </div>
      ) : null}
      {state === "error" ? <EmptyState title="Ошибка загрузки" description="Попробуйте обновить страницу." /> : null}
      {state === "empty" ? <EmptyState title="Консультаций пока нет" description="Создайте первую консультацию." /> : null}
      {state === "no-results" ? <EmptyState title="Ничего не найдено" description="Смените фильтры или запрос." /> : null}

      {state === "success" ? (
        <DataTable<Row>
          columns={[
            { key: "topic", header: "Тема", render: (r) => <span className="font-semibold">{r.topic}</span> },
            { key: "client", header: "Клиент", render: (r) => r.clientName },
            { key: "system", header: "Система", render: (r) => r.system },
            { key: "date", header: "Дата", render: (r) => r.date },
            { key: "status", header: "Статус", render: (r) => <StatusBadge status={r.status} /> }
          ]}
          rows={filtered}
          rowKey={(r) => r.id}
          rowHref={(r) => `/consultant/consultations/${r.id}`}
          mobileCard={(r) => (
            <Link href={`/consultant/consultations/${r.id}`}>
              <Card className="p-4">
                <div className="space-y-2">
                  <div className="text-sm font-semibold">{r.topic}</div>
                  <div className="text-xs text-[rgb(var(--text-muted))]">{r.clientName} • {r.system}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-[rgb(var(--text-muted))]">{r.date}</div>
                    <StatusBadge status={r.status} />
                  </div>
                </div>
              </Card>
            </Link>
          )}
        />
      ) : null}
    </div>
  );
}

