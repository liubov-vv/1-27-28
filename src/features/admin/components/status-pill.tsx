import { Badge } from "@/components/ui/badge";

export function StatusPill({ status }: { status: string }) {
  const s = status.toLowerCase();
  if (s === "active" || s === "published" || s === "sent") return <Badge variant="success">{status}</Badge>;
  if (s === "draft" || s === "scheduled") return <Badge variant="accent">{status}</Badge>;
  if (s === "inactive" || s === "archived") return <Badge>{status}</Badge>;
  return <Badge variant="warning">{status}</Badge>;
}

