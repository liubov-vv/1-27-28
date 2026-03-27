"use client";

import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/features/consultant/clients/components/status-badge";
import { TagGroup } from "@/features/consultant/clients/components/tag-group";
import { InfoGrid } from "@/features/consultant/clients/components/info-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Client, InteractionEvent, Consultation } from "@/lib/types/models";

type ClientSummaryCardProps = {
  clientId: string;
  clientName: string;
  tags: string[];
  status: "active" | "paused" | "archived" | "draft" | "completed";
  mainRequest: string;
  contactPhone?: string;
  contactEmail?: string;
  birthDate?: string;
  birthPlace?: string;
  upcomingConsultationsCount?: number;
};

export function ClientSummaryCard({
  clientName,
  tags,
  status,
  mainRequest,
  contactPhone,
  contactEmail,
  birthDate,
  birthPlace,
  upcomingConsultationsCount
}: ClientSummaryCardProps) {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="truncate">{clientName}</CardTitle>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <StatusBadge status={status} />
              {typeof upcomingConsultationsCount === "number" ? (
                <Badge variant="accent">{upcomingConsultationsCount} окно</Badge>
              ) : null}
            </div>
          </div>
        </div>
        <div className="text-sm text-[rgb(var(--text-muted))]">Запрос: {mainRequest}</div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <InfoGrid
            items={[
              { label: "Телефон", value: contactPhone ?? "-" },
              { label: "Email", value: contactEmail ?? "-" },
              { label: "Дата рождения", value: birthDate ?? "-" },
              { label: "Место рождения", value: birthPlace ?? "-" }
            ]}
          />
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Теги</div>
          <div className="mt-3">
            <TagGroup tags={tags} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

