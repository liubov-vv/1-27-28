import type { Recommendation } from "@/lib/types/models";
import { Badge } from "@/components/ui/badge";

export function RecommendationBlock({ recommendation }: { recommendation: Recommendation }) {
  return (
    <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold">Рекомендация</div>
        <Badge variant={recommendation.priority === "high" ? "accent" : recommendation.priority === "medium" ? "neutral" : "warning"}>
          {recommendation.priority}
        </Badge>
      </div>
      <p className="mt-3 text-sm leading-7 text-[rgb(var(--text-muted))]">{recommendation.text}</p>
    </div>
  );
}

