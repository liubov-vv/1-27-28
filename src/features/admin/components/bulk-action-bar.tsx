import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type BulkActionBarProps = {
  selectedCount: number;
};

export function BulkActionBar({ selectedCount }: BulkActionBarProps) {
  if (!selectedCount) return null;
  return (
    <Card className="p-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-[rgb(var(--text-muted))]">Выбрано: {selectedCount}</div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="secondary">Archive</Button>
          <Button size="sm">Apply</Button>
        </div>
      </div>
    </Card>
  );
}

