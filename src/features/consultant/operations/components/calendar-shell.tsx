import { consultations, clients, users } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";

export function CalendarShell() {
  const items = consultations
    .filter((c) => c.status === "scheduled")
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());

  if (!items.length) return <EmptyState title="Нет событий календаря" description="Запланированные консультации появятся здесь." />;

  return (
    <div className="space-y-3">
      {items.map((c) => {
        const client = clients.find((cl) => cl.id === c.clientId);
        const clientName = users.find((u) => u.id === client?.userId)?.fullName ?? c.clientId;
        return (
          <Card key={c.id} className="p-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-semibold">{c.topic}</div>
                <div className="mt-1 text-xs text-[rgb(var(--text-muted))]">
                  {new Date(c.scheduledAt).toLocaleDateString("ru-RU", { day: "2-digit", month: "long", year: "numeric" })} • {clientName}
                </div>
              </div>
              <Badge variant="accent">Запланировано</Badge>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

