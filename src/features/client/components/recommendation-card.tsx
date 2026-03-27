import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Recommendation } from "@/lib/types/models";

export function RecommendationCard({ item }: { item: Recommendation }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold">Рекомендация</div>
          <Badge variant={item.priority === "high" ? "accent" : item.priority === "medium" ? "neutral" : "warning"}>{item.priority}</Badge>
        </div>
        <p className="mt-3 text-sm leading-7 text-[rgb(var(--text-muted))]">{item.text}</p>
      </CardContent>
    </Card>
  );
}

