"use client";

import { recommendations } from "@/lib/mock-data";
import { RecommendationCard } from "@/features/client/components/recommendation-card";
import { EmptyState } from "@/components/ui/empty-state";

export function ClientRecommendationsPage() {
  const items = recommendations.filter((r) => r.clientId === "c1");
  return (
    <div className="space-y-6 py-8">
      <h1 className="text-3xl font-semibold tracking-tight">Recommendations</h1>
      {items.length ? <div className="space-y-3">{items.map((i) => <RecommendationCard key={i.id} item={i} />)}</div> : <EmptyState title="Нет рекомендаций" description="Здесь появятся советы консультанта." />}
    </div>
  );
}

