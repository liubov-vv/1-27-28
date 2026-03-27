import { cn } from "@/lib/utils/cn";

type BadgeVariant = "neutral" | "accent" | "success" | "warning" | "danger";

const variantClasses: Record<BadgeVariant, string> = {
  neutral: "bg-[rgb(var(--surface-muted))] text-[rgb(var(--text-muted))]",
  accent: "bg-[rgb(var(--accent))]/15 text-[rgb(var(--primary))]",
  success: "bg-[rgb(var(--success))]/15 text-[rgb(var(--success))]",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-red-100 text-red-700"
};

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-medium", variantClasses[variant], className)}
      {...props}
    />
  );
}
