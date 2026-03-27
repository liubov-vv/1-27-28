import { Badge } from "@/components/ui/badge";
import type { InteractionEvent } from "@/lib/types/models";

function typeLabel(type: InteractionEvent["type"]) {
  switch (type) {
    case "meeting":
      return "Встреча";
    case "call":
      return "Звонок";
    case "email":
      return "Email";
    case "message":
    default:
      return "Сообщение";
  }
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "short", year: "numeric" });
}

export function Timeline({ items }: { items: InteractionEvent[] }) {
  if (!items.length) return null;

  return (
    <div className="space-y-4">
      {items.map((e) => (
        <div key={e.id} className="relative pl-6">
          <div className="absolute left-0 top-2 h-10 w-0.5 bg-[rgb(var(--border))]" />
          <div className="absolute left-[-3px] top-2 h-3 w-3 rounded-full bg-[rgb(var(--accent))]" />
          <div className="space-y-2 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Badge>{typeLabel(e.type)}</Badge>
              <div className="text-xs text-[rgb(var(--text-muted))]">{formatDate(e.occurredAt)}</div>
            </div>
            <div className="text-sm text-[rgb(var(--text))]">{e.summary}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

