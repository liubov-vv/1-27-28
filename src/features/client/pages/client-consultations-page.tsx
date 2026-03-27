"use client";

import { consultations } from "@/lib/mock-data";
import { ConsultationHistoryList } from "@/features/client/components/consultation-history-list";
import { EmptyState } from "@/components/ui/empty-state";

export function ClientConsultationsPage() {
  const items = consultations.filter((c) => c.clientId === "c1");
  return (
    <div className="space-y-6 py-8">
      <h1 className="text-3xl font-semibold tracking-tight">My Consultations</h1>
      {items.length ? <ConsultationHistoryList items={items} /> : <EmptyState title="Нет консультаций" description="Список появится после первой записи." />}
    </div>
  );
}

