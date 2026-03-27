import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/features/public/components/section-heading";

type FeatureGridItem = {
  title: string;
  description: string;
};

type FeatureGridProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: FeatureGridItem[];
};

export function FeatureGrid({ eyebrow, title, description, items }: FeatureGridProps) {
  return (
    <div>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.title} className="p-5">
            <div className="text-sm font-semibold">{item.title}</div>
            <div className="mt-2 text-sm text-[rgb(var(--text-muted))]">{item.description}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

