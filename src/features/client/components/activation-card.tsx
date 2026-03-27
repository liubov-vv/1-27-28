import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Activation } from "@/lib/types/models";

export function ActivationCard({ item }: { item: Activation }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold">{item.title}</div>
          <Badge variant="accent">{item.dateWindow}</Badge>
        </div>
        <p className="mt-3 text-sm leading-7 text-[rgb(var(--text-muted))]">{item.instructions}</p>
      </CardContent>
    </Card>
  );
}

