import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Notification } from "@/lib/types/models";

export function NotificationItem({ item }: { item: Notification }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold">{item.title}</div>
            <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">{item.message}</p>
          </div>
          <Badge variant={item.isRead ? "neutral" : "accent"}>{item.isRead ? "прочитано" : "новое"}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

