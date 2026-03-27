import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ConsultationTemplate } from "@/lib/mock-data/consultation-templates";
import { Badge } from "@/components/ui/badge";

export function TemplateCard({ template }: { template: ConsultationTemplate }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle>{template.title}</CardTitle>
          <Badge variant="accent">{template.system}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-[rgb(var(--text-muted))]">{template.description}</p>
        <div className="flex flex-wrap gap-2">
          {template.sections.map((s) => (
            <span key={s} className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] px-2 py-1 text-xs font-medium text-[rgb(var(--text-muted))]">
              {s}
            </span>
          ))}
        </div>
        <div className="text-xs text-[rgb(var(--text-muted))]">Обновлено: {new Date(template.updatedAt).toLocaleDateString("ru-RU")}</div>
      </CardContent>
    </Card>
  );
}

