"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Tabs } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { clients, users, consultations, recommendations, activations, interactionEvents, referenceMaterials, knowledgeArticles } from "@/lib/mock-data";
import type { Activation, InteractionEvent, ReferenceMaterial, KnowledgeArticle } from "@/lib/types/models";
import { ClientSummaryCard } from "@/features/consultant/clients/components/client-summary-card";
import { Timeline } from "@/features/consultant/clients/components/timeline";
import { NotesPanel } from "@/features/consultant/clients/components/notes-panel";
import { TagGroup } from "@/features/consultant/clients/components/tag-group";
import { StatusBadge } from "@/features/consultant/clients/components/status-badge";
import { InfoGrid } from "@/features/consultant/clients/components/info-grid";
import { TableBase } from "@/components/ui/table";
import { CardContent } from "@/components/ui/card";
import { ReferenceCard } from "@/features/content/components/reference-card";

type PageState = "loading" | "error" | "empty" | "success";

function getClientStatus(clientId: string): { status: "active" | "paused" | "archived" | "draft"; label: string } {
  const clientConsultations = consultations.filter((c) => c.clientId === clientId);
  const hasScheduled = clientConsultations.some((c) => c.status === "scheduled");
  const hasDraft = clientConsultations.some((c) => c.status === "draft");
  const hasCompleted = clientConsultations.some((c) => c.status === "completed");

  if (hasScheduled) return { status: "active", label: "Активный" };
  if (hasDraft) return { status: "draft", label: "В работе" };
  if (hasCompleted) return { status: "paused", label: "Пауза" };
  return { status: "archived", label: "Архив" };
}

function formatShortDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "short" });
}

function resolveMaterialList(clientTags: string[]) {
  const refMatches = referenceMaterials
    .filter((r) => (r.tags ?? []).some((t) => clientTags.includes(t)))
    .slice(0, 4);

  const knowledgeMatches = knowledgeArticles
    .filter((a) => (a.tags ?? []).some((t) => clientTags.includes(t)))
    .slice(0, 4);

  return { refMatches, knowledgeMatches };
}

export function ClientCard() {
  const params = useParams<{ clientId: string }>();
  const searchParams = useSearchParams();
  const simulateMode = searchParams.get("simulate") ?? "";

  const clientId = params.clientId;

  const client = useMemo(() => clients.find((c) => c.id === clientId), [clientId]);
  const user = useMemo(() => (client ? users.find((u) => u.id === client.userId) : undefined), [client]);

  const [state, setState] = useState<PageState>("loading");

  useEffect(() => {
    setState("loading");
    const t = window.setTimeout(() => {
      if (simulateMode === "error") {
        setState("error");
        return;
      }
      if (!client || !user) {
        setState("empty");
        return;
      }
      setState("success");
    }, 520);

    return () => window.clearTimeout(t);
  }, [client, user, simulateMode]);

  const computedStatus = useMemo(() => getClientStatus(clientId), [clientId]);
  const clientConsultations = useMemo(() => consultations.filter((c) => c.clientId === clientId).sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime()), [clientId]);
  const clientRecs = useMemo(() => recommendations.filter((r) => r.clientId === clientId), [clientId]);
  const clientActs = useMemo(() => activations.filter((a) => a.clientId === clientId), [clientId]);
  const clientTimeline = useMemo(
    () => interactionEvents.filter((e) => e.clientId === clientId && e.consultantId === "con1").sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime()),
    [clientId]
  );

  const { refMatches, knowledgeMatches } = useMemo(() => resolveMaterialList(client?.tags ?? []), [client]);

  const summary = (
    <ClientSummaryCard
      clientName={user?.fullName ?? clientId}
      clientId={clientId}
      tags={client?.tags ?? []}
      status={computedStatus.status}
      mainRequest={client?.mainRequest ?? "-"}
      contactPhone={client?.contactPhone}
      contactEmail={client?.contactEmail ?? user?.email}
      birthDate={client?.birthDate}
      birthPlace={client?.birthPlace}
      upcomingConsultationsCount={clientConsultations.filter((c) => c.status === "scheduled").length}
    />
  );

  const historyTab = (
    <div className="space-y-4">
      {clientTimeline.length ? (
        <Timeline items={clientTimeline} />
      ) : (
        <EmptyState title="Пока нет истории" description="Когда появятся события (сообщения/созвоны), здесь появится таймлайн." />
      )}
    </div>
  );

  const consultationsTab = (
    <div className="space-y-4">
      {clientConsultations.length ? (
        <div className="space-y-3">
          {clientConsultations.map((c) => (
            <div key={c.id} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-sm font-semibold">{c.topic}</div>
                  <div className="text-xs text-[rgb(var(--text-muted))]">Дата: {formatShortDate(c.scheduledAt)}</div>
                </div>
                <StatusBadge
                  status={
                    c.status === "scheduled" ? "active" : c.status === "completed" ? "completed" : c.status === "draft" ? "draft" : "paused"
                  }
                />
              </div>
              <div className="mt-3 text-sm text-[rgb(var(--text-muted))]">Статус системы будет раскрыт в карточке консультации.</div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="Нет консультаций" description="После первой сессии консультации появятся в этом разделе." />
      )}
    </div>
  );

  const recommendationsTab = (
    <div className="space-y-4">
      {clientRecs.length ? (
        <div className="space-y-3">
          {clientRecs.map((r) => (
            <div key={r.id} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm font-semibold">Рекомендация</div>
                <Badge variant={r.priority === "high" ? "accent" : r.priority === "medium" ? "neutral" : "warning"}>
                  Приоритет: {r.priority}
                </Badge>
              </div>
              <div className="mt-3 text-sm leading-7 text-[rgb(var(--text-muted))]">{r.text}</div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="Пока нет рекомендаций" description="Добавим текст рекомендаций после консультации." />
      )}
    </div>
  );

  const activationsTab = (
    <div className="space-y-4">
      {clientActs.length ? (
        <div className="space-y-3">
          {clientActs.map((a: Activation) => (
            <div key={a.id} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm font-semibold">{a.title}</div>
                <Badge variant="accent">{a.dateWindow}</Badge>
              </div>
              <div className="mt-3 text-sm leading-7 text-[rgb(var(--text-muted))]">{a.instructions}</div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="Пока нет активаций" description="Когда появятся окна действий, мы отобразим инструкции здесь." />
      )}
    </div>
  );

  const materialsTab = (
    <div className="space-y-6">
      {refMatches.length || knowledgeMatches.length ? (
        <>
          {refMatches.length ? (
            <div>
              <div className="text-sm font-semibold">Справочники</div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {refMatches.map((r: ReferenceMaterial) => (
                  <ReferenceCard key={r.id} reference={r} />
                ))}
              </div>
            </div>
          ) : null}
          {knowledgeMatches.length ? (
            <div>
              <div className="text-sm font-semibold">Материалы базы знаний</div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {knowledgeMatches.map((a: KnowledgeArticle) => (
                  <div key={a.id} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
                    <div className="text-sm font-semibold">{a.title}</div>
                    <div className="mt-2 text-sm text-[rgb(var(--text-muted))]">{a.excerpt}</div>
                    <div className="mt-3 text-xs text-[rgb(var(--text-muted))]">{a.category}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <EmptyState title="Материалы пока не найдены" description="Мы подбираем материалы по вашим тегам. Попробуйте позже." />
      )}
    </div>
  );

  const notesTab = <NotesPanel clientId={clientId} consultantId="con1" />;

  const [tab1, tab2, tab3, tab4, tab5, tab6] = [
    { label: "history", value: "history", content: historyTab },
    { label: "consultations", value: "consultations", content: consultationsTab },
    { label: "recommendations", value: "recommendations", content: recommendationsTab },
    { label: "activations", value: "activations", content: activationsTab },
    { label: "materials", value: "materials", content: materialsTab },
    { label: "notes", value: "notes", content: notesTab }
  ] as const;

  return (
    <div className="space-y-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/consultant/clients">
          <span className="text-sm font-semibold text-[rgb(var(--primary))] hover:opacity-90">← К списку клиентов</span>
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary">Новая запись</Button>
          <Button>Создать консультацию</Button>
        </div>
      </div>

      {state === "loading" ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-60 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : null}

      {state === "error" ? (
        <Card className="p-6">
          <div className="text-sm font-semibold text-[rgb(var(--primary))]">Ошибка загрузки клиента</div>
          <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Попробуйте обновить страницу.</p>
        </Card>
      ) : null}

      {state === "empty" ? (
        <EmptyState title="Клиент не найден" description="Проверьте ссылку или вернитесь к списку." />
      ) : null}

      {state === "success" && client && user ? (
        <>
          <div className="space-y-6">
            {summary}
            <Tabs items={[tab1, tab2, tab3, tab4, tab5, tab6].map((t) => ({ label: t.label, value: t.value, content: t.content }))} />
          </div>
        </>
      ) : null}
    </div>
  );
}

