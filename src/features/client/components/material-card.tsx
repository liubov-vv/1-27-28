import { Card, CardContent } from "@/components/ui/card";

type MaterialCardProps = {
  title: string;
  category: string;
  description: string;
};

export function MaterialCard({ title, category, description }: MaterialCardProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">{category}</div>
        <div className="mt-2 text-sm font-semibold">{title}</div>
        <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">{description}</p>
      </CardContent>
    </Card>
  );
}

