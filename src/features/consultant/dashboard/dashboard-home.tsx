 "use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { consultations, clients, interactionEvents, services, users } from "@/lib/mock-data";
import { EmptyState } from "@/components/ui/empty-state";
import { StatCard } from "@/components/dashboard/stat-card";
import { ActivityList } from "@/components/dashboard/activity-list";
import { QuickActionCard } from "@/components/dashboard/quick-action-card";
import { DashboardWidget } from "@/components/dashboard/dashboard-widget";
import { Skeleton } from "@/components/ui/skeleton";

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "short" });
}

export function DashboardHome() {
  const searchParams = useSearchParams();
  const simulateMode = searchParams.get("simulate") ?? "";

  const now = useMemo(() => new Date("2026-03-27T00:00:00+03:00"), []);
  const [state, setState] = useState<"loading" | "error" | "empty" | "success">("loading");

  useEffect(() => {
    setState("loading");
    const t = window.setTimeout(() => {
      if (simulateMode === "error" || simulateMode === "server-error") {
        setState("error");
        return;
      }
      if (clients.length === 0 && consultations.length === 0) {
        setState("empty");
        return;
      }
      setState("success");
    }, 420);
    return () => window.clearTimeout(t);
  }, [simulateMode]);

  const upcoming = useMemo(() => {
    return consultations
      .filter((c) => c.status === "scheduled")
      .filter((c) => new Date(c.scheduledAt).getTime() >= now.getTime())
      .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
      .slice(0, 4);
  }, [now]);

  const completedCount = useMemo(() => consultations.filter((c) => c.status === "completed").length, []);
  const scheduledCount = useMemo(() => consultations.filter((c) => c.status === "scheduled").length, []);
  const draftCount = useMemo(() => consultations.filter((c) => c.status === "draft").length, []);
  const activeClientsCount = clients.length;

  const recentActivity = useMemo(() => {
    return [...interactionEvents]
      .sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime())
      .slice(0, 6);
  }, []);

  const minEventByClient = useMemo(() => {
    return clients
      .map((cl) => {
        const firstEventAt = interactionEvents
          .filter((e) => e.clientId === cl.id)
          .sort((a, b) => new Date(a.occurredAt).getTime() - new Date(b.occurredAt).getTime())[0]?.occurredAt;
        return { cl, firstEventAt };
      })
      .filter((x): x is { cl: (typeof clients)[number]; firstEventAt: string } => Boolean(x.firstEventAt))
      .filter((x) => {
        const t = new Date(x.firstEventAt).getTime();
        return t >= now.getTime() - 1000 * 60 * 60 * 24 * 20;
      })
      .map((x) => x.cl)
      .slice(0, 4);
  }, [now]);

  const consultantUser = users.find((u) => u.id === "u2");
  const greetingName = consultantUser?.fullName ?? "Эксперт VIBO";

  const upcomingList = useMemo(
    () => (
      <div className="divide-y divide-[rgb(var(--border))] rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
        {upcoming.length ? (
          upcoming.map((c) => (
            <div key={c.id} className="flex flex-col gap-2 px-4 py-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-1">
                <div className="text-sm font-semibold">{c.topic}</div>
                <div className="text-xs text-[rgb(var(--text-muted))]">
                  Дата: {formatDate(c.scheduledAt)} • Статус:{" "}
                  {c.status === "scheduled" ? "Запланировано" : c.status}
                </div>
              </div>
              <Badge variant="accent">{services.find((s) => s.id === c.serviceId)?.system ?? "BaZi"}</Badge>
            </div>
          ))
        ) : (
          <div className="p-4 text-sm text-[rgb(var(--text-muted))]">Нет ближайших консультаций.</div>
        )}
      </div>
    ),
    [upcoming]
  );

  const quickActions = useMemo(
    () => [
      { label: "Новая консультация", href: "/consultant/consultations?create=1" },
      { label: "Добавить событие", href: "/consultant/dashboard?activity=1" },
      { label: "Скачать шаблон", href: "/consultant/knowledge?template=1" }
    ],
    []
  );

  if (state === "loading") {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <Skeleton className="h-6 w-56" />
            <div className="mt-3">
              <Skeleton className="h-4 w-72" />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
              <Skeleton className="h-5 w-48" />
              <div className="mt-4 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <EmptyState
        title="Не удалось загрузить дашборд"
        description="Попробуйте обновить страницу."
      />
    );
  }

  if (state === "empty") {
    return <EmptyState title="Пока нет данных" description="После первых консультаций вы увидите статистику и активность." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Консультант</div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Добро пожаловать, {greetingName}. Здесь — ваш рабочий контур.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary">Обновить</Button>
          <Button>Экспорт</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Активные клиенты" value={String(activeClientsCount)} hint="Сопровождение в истории" />
        <StatCard label="Запланировано" value={String(scheduledCount)} hint="Ближайшие окна" />
        <StatCard label="Завершено" value={String(completedCount)} hint="Отмеченные консультации" />
        <StatCard label="Черновики" value={String(draftCount)} hint="Готовые, но не отправленные" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <DashboardWidget title="Недавняя активность">
          <ActivityList items={recentActivity} />
        </DashboardWidget>

        <DashboardWidget title="Быстрые действия">
          <QuickActionCard actions={quickActions} />
        </DashboardWidget>

        <DashboardWidget title="Ближайшие консультации" rightSlot={<Badge variant="accent">{upcoming.length} шт.</Badge>}>
          {upcomingList}
        </DashboardWidget>
      </div>

      <DashboardWidget title="Новые клиенты" rightSlot={<Badge>{minEventByClient.length} новых</Badge>}>
        <div className="space-y-3">
          {minEventByClient.length ? (
            minEventByClient.map((cl) => {
              const user = users.find((u) => u.id === cl.userId);
              return (
                <div
                  key={cl.id}
                  className="flex flex-col gap-2 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-4 py-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-semibold">{user?.fullName ?? cl.id}</div>
                    <div className="text-xs text-[rgb(var(--text-muted))]">{cl.mainRequest}</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cl.tags.slice(0, 2).map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-sm text-[rgb(var(--text-muted))]">Сейчас нет новых клиентов.</div>
          )}
        </div>
      </DashboardWidget>
    </div>
  );
}

