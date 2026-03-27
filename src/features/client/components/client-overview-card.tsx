import { Card, CardContent } from "@/components/ui/card";

type ClientOverviewCardProps = {
  title: string;
  value: string;
  hint?: string;
};

export function ClientOverviewCard({ title, value, hint }: ClientOverviewCardProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="text-sm font-semibold text-[rgb(var(--text-muted))]">{title}</div>
        <div className="mt-3 text-2xl font-semibold tracking-tight">{value}</div>
        {hint ? <div className="mt-2 text-xs text-[rgb(var(--text-muted))]">{hint}</div> : null}
      </CardContent>
    </Card>
  );
}

