"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { consultations, clients, users, services } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { EditorSection } from "@/features/consultant/consultations/components/editor-section";
import { SuccessMessage } from "@/features/auth/components/success-message";

type Mode = "create" | "edit";
type State = "loading" | "error" | "empty" | "form" | "success";

export function ConsultationEditor({ mode }: { mode: Mode }) {
  const params = useParams<{ consultationId?: string }>();
  const searchParams = useSearchParams();
  const simulateMode = searchParams.get("simulate") ?? "";
  const consultationId = params.consultationId;

  const consultation = useMemo(
    () => (mode === "edit" ? consultations.find((c) => c.id === consultationId) : undefined),
    [mode, consultationId]
  );

  const [state, setState] = useState<State>("loading");
  const [topic, setTopic] = useState(consultation?.topic ?? "");
  const [clientId, setClientId] = useState(consultation?.clientId ?? (clients[0]?.id ?? ""));
  const [serviceId, setServiceId] = useState(consultation?.serviceId ?? (services[0]?.id ?? ""));
  const [status, setStatus] = useState<"draft" | "scheduled" | "completed">(consultation?.status ?? "draft");
  const [analysis, setAnalysis] = useState("");
  const [recs, setRecs] = useState("");
  const [acts, setActs] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setState("loading");
    const t = window.setTimeout(() => {
      if (simulateMode === "error") return setState("error");
      if (mode === "edit" && !consultation) return setState("empty");
      setState("form");
    }, 380);
    return () => window.clearTimeout(t);
  }, [simulateMode, mode, consultation]);

  if (state === "loading") {
    return (
      <div className="space-y-4 py-8">
        <Skeleton className="h-12 w-2/3" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }
  if (state === "error") return <div className="py-8"><EmptyState title="Ошибка загрузки формы" description="Попробуйте позже." /></div>;
  if (state === "empty") return <div className="py-8"><EmptyState title="Консультация не найдена" description="Проверьте ссылку." /></div>;
  if (state === "success") {
    return (
      <div className="py-8">
        <SuccessMessage
          title={mode === "create" ? "Консультация создана" : "Изменения сохранены"}
          description="Демо-режим: данные сохранены локально на уровне интерфейса."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{mode === "create" ? "Создать консультацию" : "Редактировать консультацию"}</h1>
          <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Тексто-ориентированная структура: анализ, рекомендации, активации и follow-up.</p>
        </div>
        <Link href="/consultant/consultations">
          <Button variant="secondary">Назад к списку</Button>
        </Link>
      </div>

      <Card className="p-5 space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Тема</div>
            <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="[CONSULTATION_TITLE]" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Клиент</div>
            <Select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              options={clients.map((c) => ({ value: c.id, label: users.find((u) => u.id === c.userId)?.fullName ?? c.id }))}
            />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Сервис</div>
            <Select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              options={services.map((s) => ({ value: s.id, label: `${s.title} (${s.system})` }))}
            />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Статус</div>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value as typeof status)}
              options={[
                { value: "draft", label: "draft" },
                { value: "scheduled", label: "scheduled" },
                { value: "completed", label: "completed" }
              ]}
            />
          </div>
        </div>

        <EditorSection label="Analysis" value={analysis} onChange={setAnalysis} placeholder="Ключевые выводы анализа..." />
        <EditorSection label="Recommendations" value={recs} onChange={setRecs} placeholder="[RECOMMENDATION_TEXT]" />
        <EditorSection label="Activations" value={acts} onChange={setActs} placeholder="[ACTIVATION_TEXT]" />
        <EditorSection label="Internal Notes" value={notes} onChange={setNotes} placeholder="Внутренние заметки консультанта..." />

        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => {
              if (!topic.trim()) return;
              setState("success");
            }}
          >
            {mode === "create" ? "Создать" : "Сохранить"}
          </Button>
          <Button variant="secondary">Сохранить как черновик</Button>
        </div>
      </Card>
    </div>
  );
}

