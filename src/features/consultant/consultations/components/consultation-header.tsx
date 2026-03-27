import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ConsultationHeaderProps = {
  title: string;
  subtitle: string;
  status: "draft" | "scheduled" | "completed";
};

function statusBadge(status: ConsultationHeaderProps["status"]) {
  if (status === "completed") return <Badge variant="success">Завершено</Badge>;
  if (status === "scheduled") return <Badge variant="accent">Запланировано</Badge>;
  return <Badge>Черновик</Badge>;
}

export function ConsultationHeader({ title, subtitle, status }: ConsultationHeaderProps) {
  return (
    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
          <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">{subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {statusBadge(status)}
          <Button variant="secondary" size="sm">
            Экспорт
          </Button>
        </div>
      </div>
    </div>
  );
}

