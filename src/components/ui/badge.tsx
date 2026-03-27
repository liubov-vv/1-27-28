import { cn } from "@/lib/utils/cn";

type BadgeVariant = "neutral" | "accent" | "success" | "warning" | "danger";

const variantClasses: Record<BadgeVariant, string> = {
  neutral: "border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] text-[rgb(var(--text-muted))]",
  accent: "border border-[rgb(var(--accent))]/20 bg-[rgb(var(--accent))]/15 text-[rgb(var(--primary))]",
  success: "border border-[rgb(var(--success))]/20 bg-[rgb(var(--success))]/15 text-[rgb(var(--success))]",
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
