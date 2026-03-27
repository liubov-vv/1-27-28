import { cn } from "@/lib/utils/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" ? "text-center" : "", className)}>
      {eyebrow ? (
        <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">{eyebrow}</div>
      ) : null}
      <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-sm text-[rgb(var(--text-muted))] sm:text-base">{description}</p> : null}
    </div>
  );
}

