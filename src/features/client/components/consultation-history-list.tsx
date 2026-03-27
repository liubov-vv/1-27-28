import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Consultation } from "@/lib/types/models";

function statusBadge(status: Consultation["status"]) {
  if (status === "completed") return <Badge variant="success">completed</Badge>;
  if (status === "scheduled") return <Badge variant="accent">scheduled</Badge>;
  return <Badge>draft</Badge>;
}

export function ConsultationHistoryList({ items }: { items: Consultation[] }) {
  return (
    <div className="space-y-3">
      {items.map((c) => (
        <Link key={c.id} href={`/client/consultations/${c.id}`}>
          <Card className="p-0 transition hover:opacity-95">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{c.topic}</div>
                  <div className="mt-1 text-xs text-[rgb(var(--text-muted))]">
                    {new Date(c.scheduledAt).toLocaleDateString("ru-RU", { day: "2-digit", month: "short", year: "numeric" })}
                  </div>
                </div>
                {statusBadge(c.status)}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

