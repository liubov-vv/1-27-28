"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { consultants, users } from "@/lib/mock-data";
import { EmptySearchState } from "@/features/public/components/empty-search-state";
import { FilterBar } from "@/features/public/components/filter-bar";
import { ConsultantCard } from "@/features/public/components/consultant-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function ConsultantsDirectory() {
  const searchParams = useSearchParams();
  const simulateMode = searchParams.get("simulate") ?? "";

  const systemOptions = useMemo(() => {
    const systems = new Set<string>();
    consultants.forEach((c) => c.systems.forEach((s) => systems.add(s)));
    return [
      { label: "Все системы", value: "all" },
      ...Array.from(systems).map((s) => ({ label: s, value: s }))
    ];
  }, []);

  const sortOptions = useMemo(
    () => [
      { label: "Сортировка: рейтинг", value: "rating" },
      { label: "Сортировка: опыт", value: "exp" }
    ],
    []
  );

  const [query, setQuery] = useState("");
  const [system, setSystem] = useState("all");
  const [sort, setSort] = useState("rating");

  const [status, setStatus] = useState<"loading" | "error" | "no-results" | "empty" | "success">("loading");
  const [items, setItems] = useState<{
    consultantId: string;
    name: string;
    systems: string[];
    yearsExperience: number;
    rating: number;
    bio: string;
  }[]>([]);

  const resetFilters = () => {
    setQuery("");
    setSystem("all");
    setSort("rating");
  };

  const computed = useMemo(() => {
    const q = query.trim().toLowerCase();

    const mapped = consultants.map((con) => {
      const name = users.find((u) => u.id === con.userId)?.fullName ?? "[CONSULTANT_NAME]";
      return {
        consultantId: con.id,
        name,
        systems: con.systems,
        yearsExperience: con.yearsExperience,
        rating: con.rating,
        bio: con.bio
      };
    });

    let filtered = mapped;
    if (system !== "all") filtered = filtered.filter((c) => c.systems.includes(system));
    if (q) filtered = filtered.filter((c) => `${c.name} ${c.systems.join(" ")}`.toLowerCase().includes(q));

    filtered = [...filtered].sort((a, b) => {
      if (sort === "exp") return b.yearsExperience - a.yearsExperience;
      return b.rating - a.rating;
    });

    return filtered;
  }, [query, system, sort]);

  useEffect(() => {
    setStatus("loading");
    const t = window.setTimeout(() => {
      if (simulateMode === "error") {
        setStatus("error");
        setItems([]);
        return;
      }

      if (consultants.length === 0) {
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
    }, 520);

    return () => window.clearTimeout(t);
  }, [computed, simulateMode]);

  return (
    <div className="space-y-6 py-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Каталог консультантов</h1>
          <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Фильтры по системам и поиск по профилям.</p>
        </div>
        <div className="text-sm text-[rgb(var(--text-muted))]">{status === "success" ? `Найдено: ${items.length}` : ""}</div>
      </div>

      <FilterBar
        query={query}
        onQueryChange={setQuery}
        system={system}
        onSystemChange={setSystem}
        systemOptions={systemOptions}
        sort={sort}
        onSortChange={setSort}
        sortOptions={sortOptions}
        onReset={resetFilters}
      />

      {status === "loading" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-5">
              <Skeleton className="h-4 w-1/2" />
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
          <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Попробуйте ещё раз.</p>
        </Card>
      ) : null}

      {status === "empty" ? <EmptySearchState title="Пока нет консультантов" description="Скоро добавим новых специалистов." /> : null}

      {status === "no-results" ? (
        <EmptySearchState title="Ничего не найдено" description="Попробуйте другой запрос или систему." onReset={resetFilters} />
      ) : null}

      {status === "success" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <ConsultantCard key={c.consultantId} {...c} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

