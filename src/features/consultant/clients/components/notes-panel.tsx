"use client";

import { useEffect, useMemo, useState } from "react";
import type { ClientNote } from "@/lib/types/models";
import { clientNotes } from "@/lib/mock-data";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

type NotesPanelProps = {
  clientId: string;
  consultantId?: string;
};

type LoadState = "loading" | "error" | "empty" | "success";

export function NotesPanel({ clientId, consultantId = "con1" }: NotesPanelProps) {
  const [state, setState] = useState<LoadState>("loading");

  useEffect(() => {
    const t = window.setTimeout(() => {
      const items = clientNotes.filter((n) => n.clientId === clientId && n.consultantId === consultantId);
      if (!items.length) setState("empty");
      else setState("success");
    }, 350);

    return () => window.clearTimeout(t);
  }, [clientId, consultantId]);

  const items = useMemo(
    () =>
      clientNotes
        .filter((n) => n.clientId === clientId && n.consultantId === consultantId)
        .sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime()),
    [clientId, consultantId]
  );

  if (state === "loading") {
    return (
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
      </div>
    );
  }

  if (state === "empty") {
    return <EmptyState title="Заметок пока нет" description="Добавляйте краткие мысли и обновления по клиенту." />;
  }

  return (
    <div className="space-y-3">
      {items.map((n: ClientNote) => (
        <Card key={n.id} className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-sm font-semibold">{n.title}</div>
              <div className="mt-2 text-sm text-[rgb(var(--text-muted))]">{n.body}</div>
            </div>
            <div className="text-xs text-[rgb(var(--text-muted))]">
              {new Date(n.occurredAt).toLocaleDateString("ru-RU", { day: "2-digit", month: "short", year: "numeric" })}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

