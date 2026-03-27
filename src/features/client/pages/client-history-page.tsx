"use client";

import { interactionEvents } from "@/lib/mock-data";
import { Timeline } from "@/features/consultant/clients/components/timeline";
import { EmptyState } from "@/components/ui/empty-state";

export function ClientHistoryPage() {
  const items = interactionEvents.filter((e) => e.clientId === "c1");
  return (
    <div className="space-y-6 py-8">
      <h1 className="text-3xl font-semibold tracking-tight">Interaction History</h1>
      {items.length ? <Timeline items={items} /> : <EmptyState title="История пуста" description="События появятся после консультаций." />}
    </div>
  );
}

