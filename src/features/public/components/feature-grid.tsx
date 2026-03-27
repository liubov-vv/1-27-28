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
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.title} className="h-full rounded-3xl p-7">
            <div className="text-lg font-semibold tracking-tight">{item.title}</div>
            <div className="mt-3 text-sm leading-7 text-[rgb(var(--text-muted))]">{item.description}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

