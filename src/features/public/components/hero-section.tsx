import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function HeroSection({ title, subtitle, primaryCta, secondaryCta }: HeroSectionProps) {
  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-8 pt-14 md:grid-cols-2 md:items-center">
          <div>
            <div className="inline-flex items-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] px-3 py-1 text-xs font-medium text-[rgb(var(--text-muted))]">
              [PLATFORM_NAME] • Chinese Metaphysics Consulting
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
            <p className="mt-4 text-sm leading-7 text-[rgb(var(--text-muted))]">{subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={primaryCta.href}>
                <Button>{primaryCta.label}</Button>
              </a>
              {secondaryCta ? (
                <a href={secondaryCta.href}>
                  <Button variant="secondary">{secondaryCta.label}</Button>
                </a>
              ) : null}
            </div>
          </div>
          <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6 shadow-[0_2px_24px_rgba(19,29,52,0.06)]">
            <div className="space-y-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Ключевой фокус</div>
                <div className="mt-1 text-lg font-semibold">Связь системы → действие → результат</div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] p-4">
                  <div className="text-xs font-medium text-[rgb(var(--text-muted))]">Отношения</div>
                  <div className="mt-2 text-sm font-semibold">Понимание динамики</div>
                </div>
                <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] p-4">
                  <div className="text-xs font-medium text-[rgb(var(--text-muted))]">Финансы</div>
                  <div className="mt-2 text-sm font-semibold">Стратегия роста</div>
                </div>
                <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] p-4">
                  <div className="text-xs font-medium text-[rgb(var(--text-muted))]">Здоровье</div>
                  <div className="mt-2 text-sm font-semibold">Баланс и профилактика</div>
                </div>
                <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] p-4">
                  <div className="text-xs font-medium text-[rgb(var(--text-muted))]">Переезд</div>
                  <div className="mt-2 text-sm font-semibold">Окна возможностей</div>
                </div>
              </div>
              <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Сервис уровня SaaS</div>
                <div className="mt-2 text-sm text-[rgb(var(--text-muted))]">
                  Понятный каталог, история консультаций, заметки и долгосрочная поддержка.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

