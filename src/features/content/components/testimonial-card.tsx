import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { reviews, users, clients, consultants } from "@/lib/mock-data";

type TestimonialCardProps = {
  testimonialId: string;
};

export function TestimonialCard({ testimonialId }: TestimonialCardProps) {
  const t = reviews.find((r) => r.id === testimonialId);
  if (!t) return null;

  const client = clients.find((c) => c.id === t.clientId);
  const reviewerName = users.find((u) => u.id === client?.userId)?.fullName ?? "[CLIENT_NAME]";
  const consultant = consultants.find((c) => c.id === t.consultantId);
  const consultantName = users.find((u) => u.id === consultant?.userId)?.fullName ?? "[CONSULTANT_NAME]";

  return (
    <Card>
      <CardContent className="p-5">
        <div className="text-sm text-[rgb(var(--text-muted))]">“{t.text}”</div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold">{reviewerName}</div>
            <div className="mt-1 text-xs text-[rgb(var(--text-muted))]">Консультант: {consultantName}</div>
          </div>
          <Badge variant="success">★ {t.rating.toFixed(1)}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

