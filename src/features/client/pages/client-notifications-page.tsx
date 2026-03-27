"use client";

import { notifications } from "@/lib/mock-data";
import { NotificationItem } from "@/features/client/components/notification-item";
import { EmptyState } from "@/components/ui/empty-state";

export function ClientNotificationsPage() {
  const items = notifications.filter((n) => n.userId === "u1");
  return (
    <div className="space-y-6 py-8">
      <h1 className="text-3xl font-semibold tracking-tight">Notifications</h1>
      {items.length ? <div className="space-y-3">{items.map((n) => <NotificationItem key={n.id} item={n} />)}</div> : <EmptyState title="Нет уведомлений" description="Здесь появятся системные уведомления." />}
    </div>
  );
}

