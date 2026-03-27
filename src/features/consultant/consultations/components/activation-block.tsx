import type { Activation } from "@/lib/types/models";
import { Badge } from "@/components/ui/badge";

export function ActivationBlock({ activation }: { activation: Activation }) {
  return (
    <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm font-semibold">{activation.title}</div>
        <Badge variant="accent">{activation.dateWindow}</Badge>
      </div>
      <p className="mt-3 text-sm leading-7 text-[rgb(var(--text-muted))]">{activation.instructions}</p>
    </div>
  );
}

