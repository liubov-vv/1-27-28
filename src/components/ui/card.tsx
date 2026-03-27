import { cn } from "@/lib/utils/cn";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: DivProps) {
  return (
    <div
      className={cn("rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-5 shadow-[0_10px_28px_rgba(24,31,45,0.06)]", className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: DivProps) {
  return <div className={cn("mb-4 flex items-start justify-between gap-3", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-xl font-semibold tracking-tight text-[rgb(var(--text))]", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-[rgb(var(--text-muted))]", className)} {...props} />;
}

export function CardContent({ className, ...props }: DivProps) {
  return <div className={cn("space-y-3", className)} {...props} />;
}
