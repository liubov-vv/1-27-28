import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function SuccessMessage({ title, description }: { title: string; description: string }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge variant="success">Готово</Badge>
          <div className="mt-3 text-lg font-semibold tracking-tight">{title}</div>
          <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">{description}</p>
        </div>
      </div>
    </Card>
  );
}

