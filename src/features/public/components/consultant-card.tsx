import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ConsultantCardProps = {
  consultantId: string;
  name: string;
  systems: string[];
  yearsExperience: number;
  rating: number;
  bio: string;
  className?: string;
};

export function ConsultantCard({ consultantId, name, systems, yearsExperience, rating, bio, className }: ConsultantCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="w-full">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle>{name}</CardTitle>
              <CardDescription>
                {yearsExperience}+ лет • Рейтинг {rating.toFixed(1)}
              </CardDescription>
            </div>
            <Badge variant="accent">Премиум</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm text-[rgb(var(--text-muted))]">{bio}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {systems.slice(0, 3).map((s) => (
            <span key={s} className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] px-2.5 py-1 text-xs font-medium text-[rgb(var(--text-muted))]">
              {s}
            </span>
          ))}
        </div>
        <div className="mt-4">
          <Link href={`/consultants/${consultantId}`}>
            <span className="text-sm font-semibold text-[rgb(var(--primary))] hover:opacity-90">Профиль консультанта</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

