import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[rgb(var(--primary))] text-white shadow-[0_10px_24px_rgba(31,46,72,0.24)] hover:bg-[rgb(var(--primary))]/95",
  secondary: "bg-[rgb(var(--surface))] text-[rgb(var(--text))] border border-[rgb(var(--border))] hover:bg-[rgb(var(--surface-muted))]",
  ghost: "bg-transparent text-[rgb(var(--text))] hover:bg-[rgb(var(--surface-muted))]",
  danger: "bg-[rgb(var(--danger))] text-white hover:opacity-95"
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base"
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex items-center justify-center gap-2 rounded-xl font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Загрузка..." : children}
    </button>
  );
}
