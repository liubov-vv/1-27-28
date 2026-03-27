import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/features/public/components/section-heading";

type CTASectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function CTASection({ eyebrow, title, description, primaryCta, secondaryCta }: CTASectionProps) {
  return (
    <div className="rounded-3xl border border-[rgb(var(--border))] bg-gradient-to-br from-[rgb(var(--surface))] to-[rgb(var(--surface-muted))] p-8 shadow-[0_20px_48px_rgba(24,31,45,0.1)] sm:p-10">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={primaryCta.href}>
          <Button>{primaryCta.label}</Button>
        </Link>
        {secondaryCta ? (
          <Link href={secondaryCta.href}>
            <Button variant="secondary">{secondaryCta.label}</Button>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

