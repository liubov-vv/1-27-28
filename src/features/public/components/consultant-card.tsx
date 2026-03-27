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
  specialization: string;
  positioning: string;
  competencies: string[];
  consultationsCount: number;
  formats: Array<"Онлайн" | "Офлайн" | "Асинхронно">;
  languages: string[];
  avatarBg?: string;
  className?: string;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ConsultantCard({
  consultantId,
  name,
  systems,
  yearsExperience,
  rating,
  bio,
  specialization,
  positioning,
  competencies,
  consultationsCount,
  formats,
  languages,
  avatarBg,
  className
}: ConsultantCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="w-full space-y-4">
          <div className="flex items-start gap-3">
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${avatarBg ?? "from-[#D9C2A3] to-[#B98F63]"} text-base font-semibold text-white`}
            >
              {initials(name)}
            </div>
            <div>
              <CardTitle>{name}</CardTitle>
              <CardDescription>{specialization}</CardDescription>
              <div className="mt-1 text-xs text-[rgb(var(--text-muted))]">{positioning}</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="accent">Рейтинг {rating.toFixed(1)}</Badge>
            <Badge>{yearsExperience}+ лет опыта</Badge>
            <Badge>{consultationsCount}+ консультаций</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="line-clamp-3 text-sm leading-7 text-[rgb(var(--text-muted))]">{bio}</p>
        <div className="mt-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Ключевые компетенции</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {competencies.map((competency) => (
              <span key={competency} className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] px-2.5 py-1 text-xs">
                {competency}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {systems.slice(0, 3).map((s) => (
            <span key={s} className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] px-2.5 py-1 text-xs font-medium text-[rgb(var(--text-muted))]">
              {s}
            </span>
          ))}
        </div>
        <div className="mt-4 grid gap-2 text-xs text-[rgb(var(--text-muted))] sm:grid-cols-2">
          <div>Формат: {formats.join(", ")}</div>
          <div>Языки: {languages.join(", ")}</div>
        </div>
        <div className="mt-4">
          <Link href={`/consultants/${consultantId}`}>
            <span className="text-sm font-semibold text-[rgb(var(--primary))] hover:opacity-90">Открыть профиль эксперта</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

