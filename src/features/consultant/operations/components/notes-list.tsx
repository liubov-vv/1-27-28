import { clientNotes, clients, users } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

export function NotesList() {
  const notes = [...clientNotes].sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime());
  if (!notes.length) return <EmptyState title="Нет заметок" description="Добавьте первую заметку в workflow клиента." />;

  return (
    <div className="space-y-3">
      {notes.map((n) => {
        const client = clients.find((c) => c.id === n.clientId);
        const clientName = users.find((u) => u.id === client?.userId)?.fullName ?? n.clientId;
        return (
          <Card key={n.id} className="p-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-sm font-semibold">{n.title}</div>
                <div className="mt-1 text-xs text-[rgb(var(--text-muted))]">Клиент: {clientName}</div>
                <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">{n.body}</p>
              </div>
              <div className="text-xs text-[rgb(var(--text-muted))]">{new Date(n.occurredAt).toLocaleDateString("ru-RU")}</div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

