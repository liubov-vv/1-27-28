"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { consultations } from "@/lib/mock-data";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { CalendarShell } from "@/features/consultant/operations/components/calendar-shell";

type State = "loading" | "error" | "empty" | "success";

export function CalendarPage() {
  const searchParams = useSearchParams();
  const simulateMode = searchParams.get("simulate") ?? "";
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    setState("loading");
    const t = window.setTimeout(() => {
      if (simulateMode === "error") return setState("error");
      if (simulateMode === "empty" || consultations.filter((c) => c.status === "scheduled").length === 0) return setState("empty");
      setState("success");
    }, 320);
    return () => window.clearTimeout(t);
  }, [simulateMode]);

  return (
    <div className="space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Calendar</h1>
        <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">План консультаций и ближайших событий.</p>
      </div>

      {state === "loading" ? (
        <div className="space-y-3">
          <Card className="p-4">
            <Skeleton className="h-10 w-full" />
          </Card>
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-11/12" />
        </div>
      ) : null}
      {state === "error" ? <EmptyState title="Ошибка загрузки календаря" description="Попробуйте позже." /> : null}
      {state === "empty" ? <EmptyState title="Нет запланированных событий" description="Добавьте консультации в расписание." /> : null}
      {state === "success" ? <CalendarShell /> : null}
    </div>
  );
}

