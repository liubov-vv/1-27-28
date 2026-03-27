"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { clientNotes } from "@/lib/mock-data";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { NotesList } from "@/features/consultant/operations/components/notes-list";

type State = "loading" | "error" | "empty" | "no-results" | "success";

export function NotesPage() {
  const searchParams = useSearchParams();
  const simulateMode = searchParams.get("simulate") ?? "";
  const [state, setState] = useState<State>("loading");
  const [query, setQuery] = useState("");

  const hasMatches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return clientNotes.some((n) => `${n.title} ${n.body}`.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    setState("loading");
    const t = window.setTimeout(() => {
      if (simulateMode === "error") return setState("error");
      if (simulateMode === "empty" || clientNotes.length === 0) return setState("empty");
      if (!hasMatches) return setState("no-results");
      setState("success");
    }, 300);
    return () => window.clearTimeout(t);
  }, [simulateMode, hasMatches]);

  return (
    <div className="space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Notes</h1>
        <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Рабочие заметки по клиентам и консультациям.</p>
      </div>

      <Card className="p-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Поиск заметок</div>
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Тема или текст заметки" />
      </Card>

      {state === "loading" ? (
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-11/12" />
          <Skeleton className="h-10 w-10/12" />
        </div>
      ) : null}
      {state === "error" ? <EmptyState title="Ошибка загрузки заметок" description="Попробуйте позже." /> : null}
      {state === "empty" ? <EmptyState title="Нет заметок" description="Создайте первую заметку." /> : null}
      {state === "no-results" ? <EmptyState title="Ничего не найдено" description="Измените запрос." /> : null}

      {state === "success" ? <NotesList /> : null}
    </div>
  );
}

