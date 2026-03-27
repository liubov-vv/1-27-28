import { Card, CardContent } from "@/components/ui/card";

type StatCardProps = {
  label: string;
  value: string;
  hint?: string;
};

export function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-5">
        <div className="text-sm font-semibold text-[rgb(var(--text-muted))]">{label}</div>
        <div className="mt-3 text-2xl font-semibold tracking-tight">{value}</div>
        {hint ? <div className="mt-2 text-sm text-[rgb(var(--text-muted))]">{hint}</div> : null}
      </CardContent>
    </Card>
  );
}

