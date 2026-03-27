"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { EmptyState } from "@/components/ui/empty-state";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { clients, users, consultations, referenceMaterials } from "@/lib/mock-data";
import { DataTable } from "@/components/tables/data-table";
import { FilterPanel } from "@/features/consultant/clients/components/filter-panel";
import { TagGroup } from "@/features/consultant/clients/components/tag-group";
import { StatusBadge } from "@/features/consultant/clients/components/status-badge";
import { ClientSummaryCard } from "@/features/consultant/clients/components/client-summary-card";

type LoadState = "loading" | "error" | "empty" | "no-results" | "success";

type ClientRow = {
  clientId: string;
  name: string;
  mainRequest: string;
  status: "active" | "paused" | "archived" | "draft" | "completed";
  tags: string[];
  birthDate?: string;
  birthPlace?: string;
};

function resolveClientStatus(clientId: string): ClientRow["status"] {
  const clientConsultations = consultations.filter((c) => c.clientId === clientId);
  const hasScheduled = clientConsultations.some((c) => c.status === "scheduled");
  const hasDraft = clientConsultations.some((c) => c.status === "draft");
  const hasCompleted = clientConsultations.some((c) => c.status === "completed");

  if (hasScheduled) return "active";
  if (hasDraft) return "draft";
  if (hasCompleted) return "completed";
  return "archived";
}

function formatStatusLabel(status: ClientRow["status"]) {
  switch (status) {
    case "active":
      return "Активный";
    case "draft":
      return "В работе";
    case "completed":
      return "Завершено";
    case "paused":
      return "Пауза";
    case "archived":
    default:
      return "Архив";
  }
}

export function ClientsList() {
  const searchParams = useSearchParams();
  const simulateMode = searchParams.get("simulate") ?? "";

  const [state, setState] = useState<LoadState>("loading");
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");

  const tagOptions = useMemo(() => {
    const set = new Set<string>();
    clients.forEach((c) => c.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  const computedRows = useMemo(() => {
    return clients.map((c) => {
      const user = users.find((u) => u.id === c.userId);
      const statusValue = resolveClientStatus(c.id);
      return {
        clientId: c.id,
        name: user?.fullName ?? c.id,
        mainRequest: c.mainRequest,
        status: statusValue,
        tags: c.tags,
        birthDate: c.birthDate,
        birthPlace: c.birthPlace
      } as ClientRow;
    });
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = computedRows;
    if (tag !== "all") list = list.filter((r) => r.tags.includes(tag));
    if (status !== "all") list = list.filter((r) => formatStatusLabel(r.status) === formatStatusLabel(status as any) || r.status === status);
    if (q) list = list.filter((r) => `${r.name} ${r.mainRequest} ${r.tags.join(" ")}`.toLowerCase().includes(q));
    return list;
  }, [computedRows, query, tag, status]);

  useEffect(() => {
    setState("loading");
    const t = window.setTimeout(() => {
      if (simulateMode === "error") {
        setState("error");
        return;
      }
      if (simulateMode === "empty" || clients.length === 0) {
        setState("empty");
        return;
      }
      if (simulateMode === "no-results") {
        setState("no-results");
        return;
      }
      setState(filtered.length ? "success" : "no-results");
    }, 420);

    return () => window.clearTimeout(t);
  }, [simulateMode, query, tag, status, filtered.length]);

  const mobileCards = (
    <div className="md:hidden space-y-4">
      {filtered.map((row) => (
        <div key={row.clientId}>
          <Link href={`/consultant/clients/${row.clientId}`}>
            <ClientSummaryCard
              clientId={row.clientId}
              clientName={row.name}
              tags={row.tags}
              status={row.status}
              mainRequest={row.mainRequest}
              contactPhone={clients.find((c) => c.id === row.clientId)?.contactPhone}
              contactEmail={users.find((u) => u.id === clients.find((c) => c.id === row.clientId)?.userId)?.email}
              birthDate={row.birthDate}
              birthPlace={row.birthPlace}
            />
          </Link>
        </div>
      ))}
    </div>
  );

  const desktopTable = (
    <DataTable<ClientRow>
      columns={[
        {
          key: "name",
          header: "Клиент",
          render: (row) => <span className="font-semibold">{row.name}</span>
        },
        {
          key: "request",
          header: "Основной запрос",
          render: (row) => <span className="text-[rgb(var(--text-muted))]">{row.mainRequest}</span>
        },
        {
          key: "status",
          header: "Статус",
          render: (row) => <StatusBadge status={row.status} />
        },
        {
          key: "tags",
          header: "Теги",
          render: (row) => <TagGroup tags={row.tags} />
        }
      ]}
      rows={filtered}
      rowKey={(r) => r.clientId}
      rowHref={(r) => `/consultant/clients/${r.clientId}`}
    />
  );

  if (state === "loading") {
    return (
      <div className="space-y-6 py-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-28 w-full rounded-2xl" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="p-5">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="mt-3 h-3 w-full" />
                <Skeleton className="mt-2 h-3 w-5/6" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="space-y-6 py-8">
        <Card className="p-6">
          <div className="text-sm font-semibold text-[rgb(var(--primary))]">Ошибка загрузки клиентов</div>
          <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Попробуйте обновить страницу.</p>
        </Card>
      </div>
    );
  }

  if (state === "empty") {
    return (
      <div className="space-y-6 py-8">
        <EmptyState title="Клиентов пока нет" description="После первой консультации появится карточка клиента." />
      </div>
    );
  }

  if (state === "no-results") {
    return (
      <div className="space-y-6 py-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Клиенты</h1>
            <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Ищите по имени и фильтруйте по тегам.</p>
          </div>
        </div>
        <FilterPanel
          query={query}
          onQueryChange={setQuery}
          tag={tag}
          onTagChange={setTag}
          tagOptions={[{ label: "Все теги", value: "all" }, ...tagOptions.map((t) => ({ label: t, value: t }))]}
          status={status}
          onStatusChange={setStatus}
          statusOptions={[
            { label: "Все статусы", value: "all" },
            { label: "Активный", value: "active" },
            { label: "В работе", value: "draft" },
            { label: "Завершено", value: "completed" }
          ]}
          onReset={() => {
            setQuery("");
            setTag("all");
            setStatus("all");
          }}
        />
        <div>
          <EmptyState title="Ничего не найдено" description="Попробуйте другой запрос или фильтры." />
        </div>
      </div>
    );
  }

  const tagOpts = [{ label: "Все теги", value: "all" }, ...tagOptions.map((t) => ({ label: t, value: t }))];
  const statusOpts = [
    { label: "Все статусы", value: "all" },
    { label: "Активный", value: "active" },
    { label: "В работе", value: "draft" },
    { label: "Завершено", value: "completed" },
    { label: "Пауза", value: "paused" },
    { label: "Архив", value: "archived" }
  ];

  return (
    <div className="space-y-6 py-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Клиенты</h1>
          <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Поиск, фильтры и карточки клиентов с историей.</p>
        </div>
        <div className="text-sm text-[rgb(var(--text-muted))]">Найдено: {filtered.length}</div>
      </div>

      <FilterPanel
        query={query}
        onQueryChange={setQuery}
        tag={tag}
        onTagChange={setTag}
        tagOptions={tagOpts}
        status={status}
        onStatusChange={setStatus}
        statusOptions={statusOpts}
        onReset={() => {
          setQuery("");
          setTag("all");
          setStatus("all");
        }}
      />

      {mobileCards}
      <div className="hidden md:block">{desktopTable}</div>
    </div>
  );
}

