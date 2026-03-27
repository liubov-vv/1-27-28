"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { EmptySearchState } from "@/features/public/components/empty-search-state";
import { FilterBar } from "@/features/public/components/filter-bar";
import { ConsultationCard } from "@/features/public/components/consultation-card";
import { consultations, consultants, services, users } from "@/lib/mock-data";

type Status = "loading" | "error" | "no-results" | "empty" | "success";

type ConsultationListItem = {
  consultationId: string;
  title: string;
  system: string;
  scheduledAt: string;
  status: "draft" | "scheduled" | "completed";
  priceFrom?: number;
  consultantName: string;
};

export function ConsultationsCatalog() {
  const searchParams = useSearchParams();
  const simulateMode = searchParams.get("simulate") ?? "";

  const systemOptions = useMemo(
    () => [
      { label: "Все системы", value: "all" },
      { label: "BaZi", value: "BaZi" },
      { label: "Qi Men Dun Jia", value: "Qi Men Dun Jia" },
      { label: "Feng Shui", value: "Feng Shui" },
      { label: "I Ching", value: "I Ching" },
      { label: "Date Selection", value: "Date Selection" },
      { label: "Activations", value: "Activations" }
    ],
    []
  );

  const topicOptions = useMemo(
    () => [
      { label: "Все темы", value: "all" },
      { label: "Отношения", value: "отнош" },
      { label: "Финансы", value: "финанс" },
      { label: "Цель и переезд", value: "purpose" },
      { label: "Здоровье", value: "здоров" }
    ],
    []
  );

  const sortOptions = useMemo(
    () => [
      { label: "Сортировка: ближайшие", value: "soon" },
      { label: "Сортировка: цена по возрастанию", value: "priceAsc" },
      { label: "Сортировка: в завершении", value: "completedFirst" }
    ],
    []
  );

  const [query, setQuery] = useState("");
  const [system, setSystem] = useState("all");
  const [topic, setTopic] = useState("all");
  const [sort, setSort] = useState("soon");

  const [status, setStatus] = useState<Status>("loading");
  const [items, setItems] = useState<ConsultationListItem[]>([]);
  const [seed, setSeed] = useState(0);

  const resetFilters = () => {
    setQuery("");
    setSystem("all");
    setTopic("all");
    setSort("soon");
  };

  const computed = useMemo(() => {
    const mapped: ConsultationListItem[] = consultations.map((c) => {
      const service = services.find((s) => s.id === c.serviceId);
      const consultant = consultants.find((con) => con.id === c.consultantId);
      const systemLabel = service?.system ?? "Система";
      const consultantUser = consultant ? users.find((u) => u.id === consultant.userId) : undefined;
      return {
        consultationId: c.id,
        title: c.topic,
        system: systemLabel,
        scheduledAt: c.scheduledAt,
        status: c.status,
        priceFrom: service?.priceFrom,
        consultantName: consultantUser?.fullName ?? "[CONSULTANT_NAME]"
      };
    });

    let filtered = mapped;

    if (system !== "all") filtered = filtered.filter((x) => x.system === system);
    if (topic !== "all") filtered = filtered.filter((x) => x.title.toLowerCase().includes(topic));

    const q = query.trim().toLowerCase();
    if (q) filtered = filtered.filter((x) => `${x.title} ${x.system} ${x.consultantName}`.toLowerCase().includes(q));

    filtered = [...filtered].sort((a, b) => {
      if (sort === "priceAsc") return (a.priceFrom ?? 0) - (b.priceFrom ?? 0);
      if (sort === "completedFirst") return (a.status === "completed" ? 0 : 1) - (b.status === "completed" ? 0 : 1);
      return new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime();
    });

    return filtered;
  }, [query, system, topic, sort]);

  useEffect(() => {
    setStatus("loading");
    const t = window.setTimeout(() => {
      if (simulateMode === "error") {
        setStatus("error");
        setItems([]);
        return;
      }

      if (consultations.length === 0) {
        setStatus("empty");
        setItems([]);
        return;
      }

      if (computed.length === 0) {
        setStatus("no-results");
        setItems([]);
        return;
      }

      setItems(computed);
      setStatus("success");
    }, 550 + (seed % 2) * 120);

    return () => window.clearTimeout(t);
  }, [computed, seed, simulateMode]);

  return (
    <div className="space-y-6 py-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Каталог консультаций</h1>
          <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Фильтры помогут быстро найти подходящую систему и тему.</p>
        </div>
        <div className="text-sm text-[rgb(var(--text-muted))]">{status === "success" ? `Найдено: ${items.length}` : ""}</div>
      </div>

      <FilterBar
        query={query}
        onQueryChange={setQuery}
        system={system}
        onSystemChange={setSystem}
        systemOptions={systemOptions}
        topic={topic}
        onTopicChange={setTopic}
        topicOptions={topicOptions}
        sort={sort}
        onSortChange={setSort}
        sortOptions={sortOptions}
        onReset={resetFilters}
      />

      {status === "loading" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-5">
              <Skeleton className="h-4 w-2/3" />
              <div className="mt-3 space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
              </div>
            </Card>
          ))}
        </div>
      ) : null}

      {status === "error" ? (
        <Card className="p-6">
          <div className="text-sm font-semibold text-[rgb(var(--primary))]">Ошибка загрузки</div>
          <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Попробуйте ещё раз или измените фильтры.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              className="focus-ring rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-4 py-2 text-sm font-semibold"
              type="button"
              onClick={() => setSeed((s) => s + 1)}
            >
              Повторить
            </button>
          </div>
        </Card>
      ) : null}

      {status === "empty" ? (
        <EmptySearchState title="Пока нет консультаций" description="Скоро добавим новые консультации в каталог." />
      ) : null}

      {status === "no-results" ? <EmptySearchState title="Ничего не найдено" description="Попробуйте другой запрос или выберите другую систему." onReset={resetFilters} /> : null}

      {status === "success" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ConsultationCard key={item.consultationId} {...item} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

