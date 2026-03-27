import { Badge } from "@/components/ui/badge";

type StatusBadgeProps = {
  status: "active" | "paused" | "archived" | "draft" | "completed";
};

export function StatusBadge({ status }: StatusBadgeProps) {
  if (status === "active") return <Badge variant="accent">Активный</Badge>;
  if (status === "paused") return <Badge variant="warning">Пауза</Badge>;
  if (status === "archived") return <Badge variant="neutral">Архив</Badge>;
  if (status === "completed") return <Badge variant="success">Завершено</Badge>;
  return <Badge>Черновик</Badge>;
}

