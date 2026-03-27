"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { consultations, recommendations, activations, notifications } from "@/lib/mock-data";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { ClientOverviewCard } from "@/features/client/components/client-overview-card";
import { ConsultationHistoryList } from "@/features/client/components/consultation-history-list";

export function ClientDashboardHome() {
  const sp = useSearchParams();
  const simulate = sp.get("simulate") ?? "";
  const [state, setState] = useState<"loading" | "error" | "empty" | "success">("loading");

  const myConsultations = consultations.filter((c) => c.clientId === "c1");
  const upcoming = myConsultations.filter((c) => c.status === "scheduled");
  const completed = myConsultations.filter((c) => c.status === "completed");

  useEffect(() => {
    setState("loading");
    const t = window.setTimeout(() => {
      if (simulate === "error") return setState("error");
      if (simulate === "empty" || myConsultations.length === 0) return setState("empty");
      setState("success");
    }, 320);
    return () => window.clearTimeout(t);
  }, [simulate, myConsultations.length]);

  if (state === "loading") {
    return (
      <div className="space-y-4 py-8">
        <Skeleton className="h-10 w-2/3" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }
  if (state === "error") return <div className="py-8"><EmptyState title="Ошибка загрузки" description="Попробуйте позже." /></div>;
  if (state === "empty") return <div className="py-8"><EmptyState title="Пока нет данных" description="После первой консультации появится история." /></div>;

  return (
    <div className="space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Client Dashboard</h1>
        <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Ясность, история консультаций и следующие шаги.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ClientOverviewCard title="Консультации" value={String(myConsultations.length)} hint="Всего в истории" />
        <ClientOverviewCard title="Ближайшие" value={String(upcoming.length)} hint="Запланированные" />
        <ClientOverviewCard title="Рекомендации" value={String(recommendations.filter((r) => r.clientId === "c1").length)} hint="Активные" />
        <ClientOverviewCard title="Уведомления" value={String(notifications.filter((n) => n.userId === "u1" && !n.isRead).length)} hint="Непрочитанные" />
      </div>
      <div>
        <div className="text-sm font-semibold mb-3">История консультаций</div>
        <ConsultationHistoryList items={myConsultations} />
      </div>
      <div>
        <div className="text-sm font-semibold mb-3">Активации</div>
        <div className="text-sm text-[rgb(var(--text-muted))]">{activations.filter((a) => a.clientId === "c1").length} активных записи</div>
      </div>
    </div>
  );
}

