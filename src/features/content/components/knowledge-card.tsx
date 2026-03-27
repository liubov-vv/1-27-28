import Link from "next/link";
import { KnowledgeArticle } from "@/lib/types/models";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TagList } from "./tag-list";

type KnowledgeCardProps = {
  article: KnowledgeArticle;
};

export function KnowledgeCard({ article }: KnowledgeCardProps) {
  return (
    <Link href={`/knowledge/${article.slug}`}>
      <Card className="p-0 transition hover:opacity-95">
        <CardHeader className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="line-clamp-2">{article.title}</CardTitle>
              <CardDescription className="mt-2 line-clamp-2">{article.excerpt}</CardDescription>
            </div>
            <Badge>{article.category}</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <TagList tags={article.tags ?? []} />
        </CardContent>
      </Card>
    </Link>
  );
}

