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
    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6 shadow-[0_2px_24px_rgba(19,29,52,0.05)] sm:p-8">
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

