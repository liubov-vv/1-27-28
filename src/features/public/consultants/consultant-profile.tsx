"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { SectionContainer } from "@/components/layout/section-container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { ConsultationCard } from "@/features/public/components/consultation-card";
import { consultants, consultations, services, users, clients } from "@/lib/mock-data";
import { SectionHeading } from "@/features/public/components/section-heading";

type LoadState = "loading" | "error" | "empty" | "success";

export function ConsultantProfile() {
  const params = useParams<{ consultantId: string }>();
  const searchParams = useSearchParams();
  const simulateMode = searchParams.get("simulate") ?? "";

  const consultantId = params.consultantId;

  const consultant = useMemo(() => consultants.find((c) => c.id === consultantId), [consultantId]);
  const user = useMemo(() => (consultant ? users.find((u) => u.id === consultant.userId) : undefined), [consultant]);

  const [state, setState] = useState<LoadState>("loading");

  useEffect(() => {
    setState("loading");
    const t = window.setTimeout(() => {
      if (simulateMode === "error") {
        setState("error");
        return;
      }
      if (!consultant || !user) {
        setState("empty");
        return;
      }
      setState("success");
    }, 520);

    return () => window.clearTimeout(t);
  }, [consultant, user, simulateMode]);

  const systems = consultant?.systems ?? [];
  const profileConsultations = consultations.filter((c) => c.consultantId === consultantId);

  const mappedConsultations = profileConsultations.map((c) => {
    const service = services.find((s) => s.id === c.serviceId);
    return {
      consultationId: c.id,
      title: c.topic,
      system: service?.system ?? "Система",
      scheduledAt: c.scheduledAt,
      status: c.status,
      priceFrom: service?.priceFrom,
      consultantName: user?.fullName ?? "Эксперт VIBO",
      audience: service?.audience,
      result: service?.result,
      format: service?.format,
      durationMin: service?.durationMin,
      tags: service?.tags
    } as const;
  });

  return (
    <PageContainer className="space-y-8 py-8">
      {state === "loading" ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : null}

      {state === "error" ? (
        <SectionContainer>
          <Card className="p-6">
            <div className="text-sm font-semibold text-[rgb(var(--primary))]">Ошибка загрузки профиля</div>
            <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Попробуйте ещё раз или измените URL.</p>
          </Card>
        </SectionContainer>
      ) : null}

      {state === "empty" ? (
        <SectionContainer>
          <EmptyState title="Консультант не найден" description="Проверьте ссылку или вернитесь в каталог." />
        </SectionContainer>
      ) : null}

      {state === "success" && consultant && user ? (
        <>
          <SectionContainer fullScreen={false} centered={false} className="py-0">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Профиль консультанта</div>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight">{user.fullName}</h1>
                <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">
                  {consultant.yearsExperience}+ лет опыта • Рейтинг {consultant.rating.toFixed(1)}
                </p>
                <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">{consultant.positioning}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/consultations">
                  <Button>Записаться</Button>
                </Link>
                <Button variant="secondary">Запросить условия</Button>
              </div>
            </div>
          </SectionContainer>

          <SectionContainer fullScreen={false} centered={false} className="py-0">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm font-semibold">О консультанте</div>
                  <p className="mt-3 text-sm leading-7 text-[rgb(var(--text-muted))]">{consultant.bio}</p>
                  <div className="mt-4 text-sm font-semibold">{consultant.specialization}</div>
                  <div className="mt-2 text-sm text-[rgb(var(--text-muted))]">
                    Ключевые компетенции: {consultant.competencies.join(", ")}.
                  </div>
                  <div className="mt-5">
                    <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Системы</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {systems.map((s) => (
                        <Badge key={s} variant="neutral">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="text-sm font-semibold">Подход</div>
                  <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] p-4 text-sm text-[rgb(var(--text-muted))]">
                    Консультант фиксирует запрос, делает анализ по системе и затем выдаёт рекомендации, активации и этапы сопровождения.
                  </div>
                  <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] p-4 text-sm text-[rgb(var(--text-muted))]">
                    Доступна история взаимодействий, статусы этапов и структурированные заметки клиента.
                  </div>
                  <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] p-4 text-sm text-[rgb(var(--text-muted))]">
                    Форматы работы: {consultant.formats.join(", ")}. Языки: {consultant.languages.join(", ")}.
                  </div>
                </CardContent>
              </Card>
            </div>
          </SectionContainer>

          <SectionContainer fullScreen={false} centered={false}>
            <SectionHeading eyebrow="КОНСУЛЬТАЦИИ" title="Консультации консультанта" description="Список записей в каталоге. Листайте и переходите к деталям." />
            {mappedConsultations.length ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mappedConsultations.map((c) => (
                  <ConsultationCard key={c.consultationId} {...c} />
                ))}
              </div>
            ) : (
              <div className="mt-6">
                <EmptyState title="Пока нет консультаций" description="Как только появятся записи — они отобразятся здесь." />
              </div>
            )}
          </SectionContainer>
        </>
      ) : null}
    </PageContainer>
  );
}

