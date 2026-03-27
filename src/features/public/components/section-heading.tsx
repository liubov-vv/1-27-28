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
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--text-muted))]">{eyebrow}</div>
      ) : null}
      <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 max-w-3xl text-base leading-7 text-[rgb(var(--text-muted))]">{description}</p> : null}
    </div>
  );
}

