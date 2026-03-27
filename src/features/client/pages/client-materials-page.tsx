"use client";

import { referenceMaterials, knowledgeArticles } from "@/lib/mock-data";
import { MaterialCard } from "@/features/client/components/material-card";
import { EmptyState } from "@/components/ui/empty-state";

export function ClientMaterialsPage() {
  const refs = referenceMaterials.slice(0, 3).map((r) => ({ title: r.title, category: r.category, description: r.excerpt }));
  const know = knowledgeArticles.slice(0, 3).map((k) => ({ title: k.title, category: k.category, description: k.excerpt }));
  const items = [...refs, ...know];
  return (
    <div className="space-y-6 py-8">
      <h1 className="text-3xl font-semibold tracking-tight">Materials</h1>
      {items.length ? <div className="grid gap-4 md:grid-cols-2">{items.map((m) => <MaterialCard key={`${m.category}-${m.title}`} {...m} />)}</div> : <EmptyState title="Материалы не найдены" description="Скоро добавим персональные материалы." />}
    </div>
  );
}

