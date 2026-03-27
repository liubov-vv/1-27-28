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
      { label: "Сначала с лучшим рейтингом", value: "rating" },
      { label: "Сначала с большим опытом", value: "exp" },
      { label: "Сначала с большим числом консультаций", value: "count" }
    ],
    []
  );

  const experienceOptions = useMemo(
    () => [
      { label: "Любой опыт", value: "all" },
      { label: "До 7 лет", value: "junior" },
      { label: "8-10 лет", value: "middle" },
      { label: "11+ лет", value: "senior" }
    ],
    []
  );

  const languageOptions = useMemo(() => {
    const set = new Set<string>();
    consultants.forEach((c) => c.languages.forEach((lang) => set.add(lang)));
    return [{ label: "Любой язык", value: "all" }, ...Array.from(set).map((lang) => ({ label: lang, value: lang }))];
  }, []);

  const formatOptions = useMemo(() => {
    const set = new Set<string>();
    consultants.forEach((c) => c.formats.forEach((f) => set.add(f)));
    return [{ label: "Любой формат", value: "all" }, ...Array.from(set).map((format) => ({ label: format, value: format }))];
  }, []);

  const [query, setQuery] = useState("");
  const [system, setSystem] = useState("all");
  const [experience, setExperience] = useState("all");
  const [language, setLanguage] = useState("all");
  const [format, setFormat] = useState("all");
  const [sort, setSort] = useState("rating");

  const [status, setStatus] = useState<"loading" | "error" | "no-results" | "empty" | "success">("loading");
  const [items, setItems] = useState<{
    consultantId: string;
    name: string;
    systems: string[];
    yearsExperience: number;
    rating: number;
    bio: string;
        specialization: string;
        positioning: string;
        competencies: string[];
        consultationsCount: number;
        formats: Array<"Онлайн" | "Офлайн" | "Асинхронно">;
        languages: string[];
        avatarBg?: string;
  }[]>([]);

  const resetFilters = () => {
    setQuery("");
    setSystem("all");
    setExperience("all");
    setLanguage("all");
    setFormat("all");
    setSort("rating");
  };

  const computed = useMemo(() => {
    const q = query.trim().toLowerCase();

    const mapped = consultants.map((con) => {
      const name = users.find((u) => u.id === con.userId)?.fullName ?? "Эксперт VIBO";
      return {
        consultantId: con.id,
        name,
        systems: con.systems,
        yearsExperience: con.yearsExperience,
        rating: con.rating,
        bio: con.bio,
        specialization: con.specialization,
        positioning: con.positioning,
        competencies: con.competencies,
        consultationsCount: con.consultationsCount,
        formats: con.formats,
        languages: con.languages,
        avatarBg: con.avatarBg
      };
    });

    let filtered = mapped;
    if (system !== "all") filtered = filtered.filter((c) => c.systems.includes(system));
    if (language !== "all") filtered = filtered.filter((c) => c.languages.includes(language));
    if (format !== "all") filtered = filtered.filter((c) => c.formats.includes(format as "Онлайн" | "Офлайн" | "Асинхронно"));
    if (experience !== "all") {
      filtered = filtered.filter((c) => {
        if (experience === "junior") return c.yearsExperience <= 7;
        if (experience === "middle") return c.yearsExperience >= 8 && c.yearsExperience <= 10;
        return c.yearsExperience >= 11;
      });
    }
    if (q) filtered = filtered.filter((c) => `${c.name} ${c.systems.join(" ")}`.toLowerCase().includes(q));

    filtered = [...filtered].sort((a, b) => {
      if (sort === "exp") return b.yearsExperience - a.yearsExperience;
      if (sort === "count") return b.consultationsCount - a.consultationsCount;
      return b.rating - a.rating;
    });

    return filtered;
  }, [query, system, experience, language, format, sort]);

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
    <div className="space-y-6 py-10">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Каталог консультантов</h1>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-[rgb(var(--text-muted))]">
            Сравните консультантов по специализации, опыту, языкам и форматам работы. Выбирайте того, чей профиль совпадает с вашей задачей.
          </p>
        </div>
        <div className="text-sm text-[rgb(var(--text-muted))]">{status === "success" ? `Найдено: ${items.length}` : ""}</div>
      </div>

      <FilterBar
        query={query}
        onQueryChange={setQuery}
        queryPlaceholder="Поиск по имени, задаче или системе..."
        system={system}
        onSystemChange={setSystem}
        systemOptions={systemOptions}
        experience={experience}
        onExperienceChange={setExperience}
        experienceOptions={experienceOptions}
        language={language}
        onLanguageChange={setLanguage}
        languageOptions={languageOptions}
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
          <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Попробуйте снова.</p>
        </Card>
      ) : null}

      {status === "empty" ? <EmptySearchState title="Пока нет консультантов" description="Команда расширяется, скоро добавим новые профили." /> : null}

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

      <div className="fixed bottom-4 left-0 right-0 z-10 px-4 sm:hidden">
        <button className="focus-ring w-full rounded-xl bg-[rgb(var(--primary))] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(31,46,72,0.35)]">
          Выбрать консультанта и записаться
        </button>
      </div>
    </div>
  );
}

