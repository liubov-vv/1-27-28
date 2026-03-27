import { cn } from "@/lib/utils/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "focus-ring h-10 w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 text-sm text-[rgb(var(--text))] placeholder:text-[rgb(var(--text-muted))]",
        className
      )}
      {...props}
    />
  );
}
