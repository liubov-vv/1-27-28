import { cn } from "@/lib/utils/cn";

type EmptyStateProps = {
  title: string;
  description: string;
  className?: string;
  action?: React.ReactNode;
};

export function EmptyState({ title, description, className, action }: EmptyStateProps) {
  return (
    <div className={cn("rounded-xl border border-dashed border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-8 text-center", className)}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
