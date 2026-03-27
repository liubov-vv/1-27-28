"use client";

import { activations } from "@/lib/mock-data";
import { ActivationCard } from "@/features/client/components/activation-card";
import { EmptyState } from "@/components/ui/empty-state";

export function ClientActivationsPage() {
  const items = activations.filter((a) => a.clientId === "c1");
  return (
    <div className="space-y-6 py-8">
      <h1 className="text-3xl font-semibold tracking-tight">Activations</h1>
      {items.length ? <div className="space-y-3">{items.map((i) => <ActivationCard key={i.id} item={i} />)}</div> : <EmptyState title="Нет активаций" description="Окна действий появятся после рекомендаций." />}
    </div>
  );
}

