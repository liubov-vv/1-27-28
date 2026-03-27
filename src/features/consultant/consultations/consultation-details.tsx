"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { consultations, clients, users, services, recommendations, activations, clientNotes } from "@/lib/mock-data";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { ConsultationHeader } from "@/features/consultant/consultations/components/consultation-header";
import { ConsultationSection } from "@/features/consultant/consultations/components/consultation-section";
import { RecommendationBlock } from "@/features/consultant/consultations/components/recommendation-block";
import { ActivationBlock } from "@/features/consultant/consultations/components/activation-block";
import { AttachmentList, type AttachmentItem } from "@/features/consultant/consultations/components/attachment-list";
import { ActionBar } from "@/features/consultant/consultations/components/action-bar";

type PageState = "loading" | "error" | "empty" | "success";

const mockAttachments: Record<string, AttachmentItem[]> = {
  cs1: [
    { id: "f1", name: "Bazi-analysis.pdf", size: "1.2 MB" },
    { id: "f2", name: "activation-plan.docx", size: "380 KB" }
  ],
  cs2: [{ id: "f3", name: "follow-up-summary.pdf", size: "950 KB" }]
};

const mockAnalysis: Record<string, string> = {
  cs1:
    "Ключевой акцент на согласовании долгосрочного вектора и временных окон. Приоритет: последовательные шаги с низкой нагрузкой, но высокой стабильностью.",
  cs2:
    "В повторной сессии подтверждено улучшение динамики. Следующий этап — закрепить ритм коммуникации и контрольные точки."
};

export function ConsultantConsultationDetails() {
  const { consultationId } = useParams<{ consultationId: string }>();
  const searchParams = useSearchParams();
  const simulateMode = searchParams.get("simulate") ?? "";
  const [state, setState] = useState<PageState>("loading");

  const consultation = useMemo(() => consultations.find((c) => c.id === consultationId), [consultationId]);
  const client = useMemo(() => clients.find((c) => c.id === consultation?.clientId), [consultation?.clientId]);
  const clientName = useMemo(() => users.find((u) => u.id === client?.userId)?.fullName ?? "[CLIENT_NAME]", [client?.userId]);
  const system = useMemo(() => services.find((s) => s.id === consultation?.serviceId)?.system ?? "BaZi", [consultation?.serviceId]);
  const recs = useMemo(() => recommendations.filter((r) => r.consultationId === consultationId), [consultationId]);
  const acts = useMemo(() => activations.filter((a) => a.clientId === consultation?.clientId), [consultation?.clientId]);
  const notes = useMemo(() => clientNotes.filter((n) => n.clientId === consultation?.clientId), [consultation?.clientId]);
  const attachments = mockAttachments[consultationId] ?? [];

  useEffect(() => {
    setState("loading");
    const t = window.setTimeout(() => {
      if (simulateMode === "error") return setState("error");
      if (!consultation) return setState("empty");
      setState("success");
    }, 420);
    return () => window.clearTimeout(t);
  }, [simulateMode, consultation]);

  if (state === "loading") {
    return (
      <div className="space-y-4 py-8">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }
  if (state === "error") return <div className="py-8"><EmptyState title="Ошибка загрузки" description="Попробуйте позже." /></div>;
  if (state === "empty" || !consultation) return <div className="py-8"><EmptyState title="Консультация не найдена" description="Проверьте ссылку." /></div>;

  return (
    <div className="space-y-6 py-8">
      <ConsultationHeader
        title={consultation.topic}
        subtitle={`Клиент: ${clientName} • Система: ${system} • Дата: ${new Date(consultation.scheduledAt).toLocaleDateString("ru-RU")}`}
        status={consultation.status}
      />

      <ConsultationSection title="Request / Topic">
        <p className="text-sm leading-7 text-[rgb(var(--text-muted))]">
          {consultation.topic}. Клиентский запрос сформулирован в структурном виде и разбит на этапы.
        </p>
      </ConsultationSection>

      <ConsultationSection title="Analysis">
        <p className="text-sm leading-7 text-[rgb(var(--text-muted))]">{mockAnalysis[consultationId] ?? "Аналитический блок будет заполнен после сессии."}</p>
      </ConsultationSection>

      <ConsultationSection title="Recommendations">
        <div className="space-y-3">
          {recs.length ? recs.map((r) => <RecommendationBlock key={r.id} recommendation={r} />) : <EmptyState title="Нет рекомендаций" description="Добавьте рекомендации после консультации." />}
        </div>
      </ConsultationSection>

      <ConsultationSection title="Activations">
        <div className="space-y-3">
          {acts.length ? acts.map((a) => <ActivationBlock key={a.id} activation={a} />) : <EmptyState title="Нет активаций" description="Добавьте активность по клиенту." />}
        </div>
      </ConsultationSection>

      <ConsultationSection title="Attachments">
        <AttachmentList items={attachments} />
      </ConsultationSection>

      <ConsultationSection title="Follow-up">
        <p className="text-sm leading-7 text-[rgb(var(--text-muted))]">
          Следующая контрольная точка через 10-14 дней. Важно оценить устойчивость изменений и при необходимости скорректировать шаги.
        </p>
      </ConsultationSection>

      <ConsultationSection title="Internal Notes">
        <div className="space-y-3">
          {notes.length ? notes.map((n) => (
            <div key={n.id} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
              <div className="text-sm font-semibold">{n.title}</div>
              <div className="mt-2 text-sm text-[rgb(var(--text-muted))]">{n.body}</div>
            </div>
          )) : <EmptyState title="Нет заметок" description="Внутренние заметки появятся после работы." />}
        </div>
      </ConsultationSection>

      <ActionBar consultationId={consultationId} />
    </div>
  );
}

