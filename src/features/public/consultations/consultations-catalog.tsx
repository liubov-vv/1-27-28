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
  status: "draft" | "scheduled" | "in_progress" | "completed" | "pending_confirmation" | "follow_up";
  priceFrom?: number;
  consultantName: string;
  audience?: string;
  result?: string;
  format?: "Онлайн" | "Офлайн" | "Асинхронно";
  durationMin?: number;
  tags?: string[];
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
      { label: "Переезд", value: "переезд" },
      { label: "Здоровье", value: "здоров" }
    ],
    []
  );

  const formatOptions = useMemo(
    () => [
      { label: "Все форматы", value: "all" },
      { label: "Онлайн", value: "Онлайн" },
      { label: "Офлайн", value: "Офлайн" },
      { label: "Асинхронно", value: "Асинхронно" }
    ],
    []
  );

  const sortOptions = useMemo(
    () => [
      { label: "Сортировка: ближайшие", value: "soon" },
      { label: "Сортировка: цена по возрастанию", value: "priceAsc" },
      { label: "Сортировка: самые дорогие", value: "priceDesc" }
    ],
    []
  );

  const [query, setQuery] = useState("");
  const [system, setSystem] = useState("all");
  const [topic, setTopic] = useState("all");
  const [format, setFormat] = useState("all");
  const [sort, setSort] = useState("soon");

  const [status, setStatus] = useState<Status>("loading");
  const [items, setItems] = useState<ConsultationListItem[]>([]);
  const [seed, setSeed] = useState(0);

  const resetFilters = () => {
    setQuery("");
    setSystem("all");
    setTopic("all");
    setFormat("all");
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
        consultantName: consultantUser?.fullName ?? "Эксперт VIBO",
        audience: service?.audience,
        result: service?.result,
        format: service?.format,
        durationMin: service?.durationMin,
        tags: service?.tags
      };
    });

    let filtered = mapped;

    if (system !== "all") filtered = filtered.filter((x) => x.system === system);
    if (topic !== "all") filtered = filtered.filter((x) => x.title.toLowerCase().includes(topic));
    if (format !== "all") filtered = filtered.filter((x) => x.format === format);

    const q = query.trim().toLowerCase();
    if (q) filtered = filtered.filter((x) => `${x.title} ${x.system} ${x.consultantName}`.toLowerCase().includes(q));

    filtered = [...filtered].sort((a, b) => {
      if (sort === "priceAsc") return (a.priceFrom ?? 0) - (b.priceFrom ?? 0);
      if (sort === "priceDesc") return (b.priceFrom ?? 0) - (a.priceFrom ?? 0);
      return new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime();
    });

    return filtered;
  }, [query, system, topic, format, sort]);

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
    <div className="space-y-6 py-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Каталог консультаций</h1>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-[rgb(var(--text-muted))]">
            Начните с вашей задачи: выберите систему, формат и сравните ожидаемый результат. Каждая карточка показывает, для кого консультация и
            что вы получите на выходе.
          </p>
        </div>
        <div className="text-sm text-[rgb(var(--text-muted))]">{status === "success" ? `Найдено: ${items.length}` : ""}</div>
      </div>

      <FilterBar
        query={query}
        onQueryChange={setQuery}
        queryPlaceholder="Опишите задачу: переезд, доход, отношения..."
        system={system}
        onSystemChange={setSystem}
        systemOptions={systemOptions}
        topic={topic}
        onTopicChange={setTopic}
        topicOptions={topicOptions}
        format={format}
        onFormatChange={setFormat}
        formatOptions={formatOptions}
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
          <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Попробуйте снова или измените параметры выбора.</p>
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
        <EmptySearchState title="Пока нет консультаций" description="Мы обновляем каталог и скоро добавим новые сценарии." />
      ) : null}

      {status === "no-results" ? (
        <EmptySearchState
          title="Не нашли подходящий вариант"
          description="Измените систему, формат или тему — и мы покажем релевантные консультации."
          onReset={resetFilters}
        />
      ) : null}

      {status === "success" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ConsultationCard key={item.consultationId} {...item} />
          ))}
        </div>
      ) : null}

      <div className="fixed bottom-4 left-0 right-0 z-10 px-4 sm:hidden">
        <button className="focus-ring w-full rounded-xl bg-[rgb(var(--primary))] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(31,46,72,0.35)]">
          Записаться на выбранную консультацию
        </button>
      </div>
    </div>
  );
}

