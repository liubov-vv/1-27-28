"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type TopbarProps = {
  greetingName: string;
  activeClientsCount: number;
  unreadCount?: number;
};

export function Topbar({ greetingName, activeClientsCount, unreadCount = 0 }: TopbarProps) {
  return (
    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="text-sm font-semibold text-[rgb(var(--text))]">
            Добро пожаловать, {greetingName}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-[rgb(var(--text-muted))]">
            <span>Активных клиентов: {activeClientsCount}</span>
            {unreadCount > 0 ? <Badge variant="accent">{unreadCount} уведомл.</Badge> : null}
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary">События</Button>
          <Button>Создать консультацию</Button>
        </div>
      </div>
    </div>
  );
}

