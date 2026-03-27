import { cn } from "@/lib/utils/cn";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: Array<{ label: string; value: string }>;
};

export function Select({ className, options, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "focus-ring h-11 w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3.5 text-sm text-[rgb(var(--text))]",
        className
      )}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
