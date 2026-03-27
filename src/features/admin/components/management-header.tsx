import { Button } from "@/components/ui/button";

type ManagementHeaderProps = {
  title: string;
  description: string;
  primaryActionLabel?: string;
};

export function ManagementHeader({ title, description, primaryActionLabel = "Создать" }: ManagementHeaderProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">{description}</p>
      </div>
      <Button>{primaryActionLabel}</Button>
    </div>
  );
}

