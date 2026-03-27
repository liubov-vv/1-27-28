"use client";

import { useParams } from "next/navigation";
import { consultations, recommendations, activations } from "@/lib/mock-data";
import { EmptyState } from "@/components/ui/empty-state";
import { ConsultationSection } from "@/features/consultant/consultations/components/consultation-section";
import { RecommendationCard } from "@/features/client/components/recommendation-card";
import { ActivationCard } from "@/features/client/components/activation-card";

export function ClientConsultationDetailsPage() {
  const { consultationId } = useParams<{ consultationId: string }>();
  const c = consultations.find((x) => x.id === consultationId && x.clientId === "c1");
  if (!c) return <div className="py-8"><EmptyState title="Консультация не найдена" description="Проверьте ссылку." /></div>;

  const recs = recommendations.filter((r) => r.consultationId === c.id && r.clientId === "c1");
  const acts = activations.filter((a) => a.clientId === "c1");

  return (
    <div className="space-y-6 py-8">
      <h1 className="text-3xl font-semibold tracking-tight">{c.topic}</h1>
      <ConsultationSection title="Summary">
        <p className="text-sm text-[rgb(var(--text-muted))]">Дата: {new Date(c.scheduledAt).toLocaleDateString("ru-RU")} • Статус: {c.status}</p>
      </ConsultationSection>
      <ConsultationSection title="Recommendations">
        <div className="space-y-3">{recs.length ? recs.map((r) => <RecommendationCard key={r.id} item={r} />) : <EmptyState title="Нет рекомендаций" description="Будут добавлены после сессии." />}</div>
      </ConsultationSection>
      <ConsultationSection title="Activations">
        <div className="space-y-3">{acts.length ? acts.map((a) => <ActivationCard key={a.id} item={a} />) : <EmptyState title="Нет активаций" description="Будут добавлены позже." />}</div>
      </ConsultationSection>
    </div>
  );
}

