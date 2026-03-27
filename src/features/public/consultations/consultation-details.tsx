"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { recommendations, activations, consultations, services, consultants, users, clients, interactionEvents } from "@/lib/mock-data";
import { PageContainer } from "@/components/layout/page-container";
import { SectionContainer } from "@/components/layout/section-container";
import { Button } from "@/components/ui/button";

type LoadState = "loading" | "error" | "empty" | "success";

export function ConsultationDetails() {
  const params = useParams<{ consultationId: string }>();
  const searchParams = useSearchParams();
  const simulateMode = searchParams.get("simulate") ?? "";

  const consultationId = params.consultationId;

  const consultation = useMemo(() => consultations.find((c) => c.id === consultationId), [consultationId]);

  const [state, setState] = useState<LoadState>("loading");

  useEffect(() => {
    setState("loading");
    const t = window.setTimeout(() => {
      if (simulateMode === "error") {
        setState("error");
        return;
      }
      if (!consultation) {
        setState("empty");
        return;
      }
      setState("success");
    }, 520);

    return () => window.clearTimeout(t);
  }, [consultation, simulateMode]);

  const service = consultation ? services.find((s) => s.id === consultation.serviceId) : undefined;
  const consultant = consultation ? consultants.find((con) => con.id === consultation.consultantId) : undefined;
  const consultantUser = consultant ? users.find((u) => u.id === consultant.userId) : undefined;
  const client = consultation ? clients.find((cl) => cl.id === consultation.clientId) : undefined;
  const clientUser = client ? users.find((u) => u.id === client.userId) : undefined;

  const recs = consultation ? recommendations.filter((r) => r.consultationId === consultation.id) : [];
  const acts = consultation ? activations.filter((a) => a.clientId === consultation.clientId) : [];
  const timeline = consultation ? interactionEvents.filter((e) => e.consultantId === consultation.consultantId && e.clientId === consultation.clientId) : [];

  return (
    <PageContainer>
      <SectionContainer>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Консультация</div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">{consultation?.topic ?? "[CONSULTATION_TITLE]"}</h1>
            <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">
              {service?.system ?? "Система"} • Консультант {consultantUser?.fullName ?? "[CONSULTANT_NAME]"} • Клиент{" "}
              {clientUser?.fullName ?? "[CLIENT_NAME]"}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/consultations">
              <span className="text-sm font-semibold text-[rgb(var(--primary))] hover:opacity-90">Назад к каталогу</span>
            </Link>
            <Button variant="secondary">Запросить follow-up</Button>
          </div>
        </div>
      </SectionContainer>

      {state === "loading" ? (
        <SectionContainer className="space-y-4">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </SectionContainer>
      ) : null}

      {state === "error" ? (
        <SectionContainer>
          <Card className="p-6">
            <div className="text-sm font-semibold text-[rgb(var(--primary))]">Не удалось загрузить консультацию</div>
            <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Попробуйте снова позже.</p>
          </Card>
        </SectionContainer>
      ) : null}

      {state === "empty" ? (
        <SectionContainer>
          <EmptyState title="Консультация не найдена" description="Проверьте ссылку или вернитесь в каталог." />
        </SectionContainer>
      ) : null}

      {state === "success" ? (
        <>
          <SectionContainer>
            <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr]">
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold">Метаданные</div>
                      <Badge variant="accent">{consultation?.status === "completed" ? "Завершено" : "В работе"}</Badge>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Система</div>
                        <div className="mt-2 text-sm font-semibold">{service?.system ?? "Система"}</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Дата</div>
                        <div className="mt-2 text-sm font-semibold">
                          {consultation?.scheduledAt ? new Date(consultation.scheduledAt).toLocaleDateString("ru-RU") : "-"}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-[rgb(var(--text-muted))]">
                      {consultation?.topic ?? "[CONSULTATION_TITLE]"} — запрос сформулирован так, чтобы вы получили четкий план действий.
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="text-sm font-semibold">Анализ</div>
                    <p className="text-sm leading-7 text-[rgb(var(--text-muted))]">
                      Здесь будет текстовый анализ по BaZi / Qi Men / Feng Shui / I Ching и сопутствующим системам. На этой стадии мы
                      показываем структуру экранов и типографику, чтобы позже подключить реальные данные.
                    </p>
                    <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] p-4 text-sm text-[rgb(var(--text-muted))]">
                      [ANALYSIS_PLACEHOLDER]
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="text-sm font-semibold">Рекомендации</div>
                    {recs.length ? (
                      <div className="space-y-3">
                        {recs.map((r) => (
                          <div key={r.id} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
                            <div className="flex items-center justify-between gap-3">
                              <div className="text-sm font-semibold">Приоритет: {r.priority}</div>
                              <Badge>{r.priority}</Badge>
                            </div>
                            <div className="mt-2 text-sm text-[rgb(var(--text-muted))]">{r.text}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <EmptyState title="Пока нет рекомендаций" description="После консультации добавим рекомендации в эту секцию." />
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="text-sm font-semibold">Активации и дальнейшие действия</div>
                    {acts.length ? (
                      <div className="space-y-3">
                        {acts.map((a) => (
                          <div key={a.id} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="text-sm font-semibold">{a.title}</div>
                                <div className="mt-1 text-sm text-[rgb(var(--text-muted))]">{a.dateWindow}</div>
                              </div>
                              <Badge variant="accent">Активация</Badge>
                            </div>
                            <div className="mt-3 text-sm leading-7 text-[rgb(var(--text-muted))]">{a.instructions}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <EmptyState title="Пока нет активаций" description="Добавим инструкции, как только они появятся." />
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="text-sm font-semibold">Дальнейшие шаги</div>
                    <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] p-4">
                      <div className="text-sm font-semibold">1) Follow-up</div>
                      <div className="mt-2 text-sm text-[rgb(var(--text-muted))]">Отметьте событие или задайте уточняющий вопрос.</div>
                    </div>
                    <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] p-4">
                      <div className="text-sm font-semibold">2) Закрепление</div>
                      <div className="mt-2 text-sm text-[rgb(var(--text-muted))]">Результаты будут отображены в истории взаимодействий.</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="text-sm font-semibold">Внутренняя история</div>
                    {timeline.length ? (
                      <div className="space-y-3">
                        {timeline.slice(0, 5).map((e) => (
                          <div key={e.id} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
                            <div className="flex items-center justify-between gap-3">
                              <div className="text-sm font-semibold capitalize">{e.type}</div>
                              <div className="text-xs text-[rgb(var(--text-muted))]">
                                {new Date(e.occurredAt).toLocaleDateString("ru-RU")}
                              </div>
                            </div>
                            <div className="mt-2 text-sm text-[rgb(var(--text-muted))]">{e.summary}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <EmptyState title="Пока нет событий" description="События появятся после первых коммуникаций." />
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </SectionContainer>

          <SectionContainer>
            <Card>
              <CardContent className="p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm font-semibold">Вам нужна дополнительная глубина?</div>
                  <div className="mt-2 text-sm text-[rgb(var(--text-muted))]">Запросите расширение или уточнение по вашему запросу.</div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button>Запросить уточнение</Button>
                  <Button variant="secondary">Скачать краткий отчет</Button>
                </div>
              </CardContent>
            </Card>
          </SectionContainer>
        </>
      ) : null}
    </PageContainer>
  );
}

