import { ReferenceMaterial } from "@/lib/types/models";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TagList } from "./tag-list";

type ReferenceCardProps = {
  reference: ReferenceMaterial;
};

export function ReferenceCard({ reference }: ReferenceCardProps) {
  return (
    <Card className="p-0 transition hover:opacity-95">
      <CardHeader className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="line-clamp-2">{reference.title}</CardTitle>
            <CardDescription className="mt-2 line-clamp-2">{reference.excerpt}</CardDescription>
          </div>
          <Badge>{reference.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <TagList tags={reference.tags ?? []} />
        <div className="mt-4 text-sm leading-7 text-[rgb(var(--text-muted))]">{reference.description}</div>
      </CardContent>
    </Card>
  );
}

