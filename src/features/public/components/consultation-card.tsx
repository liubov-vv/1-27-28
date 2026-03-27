import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ConsultationCardProps = {
  consultationId: string;
  title: string;
  system: string;
  scheduledAt: string;
  status: "draft" | "scheduled" | "in_progress" | "completed" | "pending_confirmation" | "follow_up";
  priceFrom?: number;
  consultantName: string;
  audience?: string;
  result?: string;
  format?: "Онлайн" | "Офлайн" | "Асинхронно";
  durationMin?: number;
  tags?: string[];
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "long", year: "numeric" });
}

function statusBadge(status: ConsultationCardProps["status"]) {
  switch (status) {
    case "completed":
      return <Badge variant="success">Завершена</Badge>;
    case "in_progress":
      return <Badge variant="accent">В работе</Badge>;
    case "pending_confirmation":
      return <Badge variant="warning">Требует подтверждения</Badge>;
    case "follow_up":
      return <Badge variant="neutral">Есть follow-up</Badge>;
    case "scheduled":
      return <Badge variant="accent">Запланирована</Badge>;
    case "draft":
      return <Badge variant="warning">Требует подтверждения</Badge>;
    default:
      return <Badge>Запланирована</Badge>;
  }
}

export function ConsultationCard({
  consultationId,
  title,
  system,
  scheduledAt,
  status,
  priceFrom,
  consultantName,
  audience,
  result,
  format,
  durationMin,
  tags
}: ConsultationCardProps) {
  return (
    <Card className="rounded-3xl border-[rgb(var(--border))] p-0">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{system} • Консультант {consultantName}</CardDescription>
          </div>
          {statusBadge(status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-5 pb-5 pt-0">
        {audience ? <div className="text-sm text-[rgb(var(--text-muted))]">{audience}</div> : null}
        {result ? <div className="rounded-xl bg-[rgb(var(--surface-muted))] px-3 py-2 text-sm">{result}</div> : null}
        <div className="grid gap-2 rounded-xl border border-[rgb(var(--border))] p-3 text-sm sm:grid-cols-2">
          <div>
            <div className="text-xs text-[rgb(var(--text-muted))]">Ближайшая дата</div>
            <div className="mt-1 font-semibold">{formatDate(scheduledAt)}</div>
          </div>
          <div>
            <div className="text-xs text-[rgb(var(--text-muted))]">Стоимость</div>
            <div className="mt-1 font-semibold">{typeof priceFrom === "number" ? `${priceFrom.toLocaleString("ru-RU")} ₽` : "По запросу"}</div>
          </div>
          <div>
            <div className="text-xs text-[rgb(var(--text-muted))]">Формат</div>
            <div className="mt-1 font-semibold">{format ?? "Онлайн"}</div>
          </div>
          <div>
            <div className="text-xs text-[rgb(var(--text-muted))]">Длительность</div>
            <div className="mt-1 font-semibold">{durationMin ? `${durationMin} мин` : "Уточняется"}</div>
          </div>
        </div>
        {tags?.length ? (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] px-2.5 py-1 text-xs text-[rgb(var(--text-muted))]">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        <div>
          <Link href={`/consultations/${consultationId}`}>
            <span className="text-sm font-semibold text-[rgb(var(--primary))] hover:opacity-90">Выбрать эту консультацию</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

