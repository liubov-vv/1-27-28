import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ConsultationCardProps = {
  consultationId: string;
  title: string;
  system: string;
  scheduledAt: string;
  status: "draft" | "scheduled" | "completed";
  priceFrom?: number;
  consultantName: string;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "long", year: "numeric" });
}

function statusBadge(status: ConsultationCardProps["status"]) {
  switch (status) {
    case "completed":
      return <Badge variant="success">Завершено</Badge>;
    case "scheduled":
      return <Badge variant="accent">Запланировано</Badge>;
    case "draft":
    default:
      return <Badge>Черновик</Badge>;
  }
}

export function ConsultationCard({
  consultationId,
  title,
  system,
  scheduledAt,
  status,
  priceFrom,
  consultantName
}: ConsultationCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              {system} • Консультант {consultantName}
            </CardDescription>
          </div>
          {statusBadge(status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm text-[rgb(var(--text-muted))]">{formatDate(scheduledAt)}</div>
          {typeof priceFrom === "number" ? <div className="text-sm font-semibold">{priceFrom.toLocaleString("ru-RU")} ₽+</div> : null}
        </div>
        <div>
          <Link href={`/consultations/${consultationId}`}>
            <span className="text-sm font-semibold text-[rgb(var(--primary))] hover:opacity-90">Подробнее</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

