import { Badge } from "@/components/ui/badge";
import type { InteractionEvent } from "@/lib/types/models";

type ActivityListProps = {
  items: InteractionEvent[];
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "short" });
}

function typeBadge(type: InteractionEvent["type"]) {
  switch (type) {
    case "meeting":
      return <Badge variant="accent">Встреча</Badge>;
    case "call":
      return <Badge>Звонок</Badge>;
    case "email":
      return <Badge variant="neutral">Email</Badge>;
    case "message":
    default:
      return <Badge variant="neutral">Сообщение</Badge>;
  }
}

export function ActivityList({ items }: ActivityListProps) {
  return (
    <div className="divide-y divide-[rgb(var(--border))] rounded-xl bg-[rgb(var(--surface))]">
      {items.map((e) => (
        <div key={e.id} className="flex flex-col gap-2 px-4 py-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {typeBadge(e.type)}
              <div className="text-xs font-semibold text-[rgb(var(--text-muted))]">{formatDate(e.occurredAt)}</div>
            </div>
            <div className="text-sm text-[rgb(var(--text))]">{e.summary}</div>
          </div>
          <div className="text-xs text-[rgb(var(--text-muted))]">{e.type.toUpperCase()}</div>
        </div>
      ))}
    </div>
  );
}

