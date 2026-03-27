import { Badge } from "@/components/ui/badge";

export function RoleBadge({ role }: { role: "admin" | "consultant" | "client" | string }) {
  if (role === "admin") return <Badge variant="danger">admin</Badge>;
  if (role === "consultant") return <Badge variant="accent">consultant</Badge>;
  return <Badge variant="neutral">client</Badge>;
}

