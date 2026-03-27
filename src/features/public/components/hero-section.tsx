import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type HeroSectionProps = {
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function HeroSection({ title, subtitle, primaryCta, secondaryCta }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(180,144,88,0.18),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(31,46,72,0.12),transparent_45%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))]/90 px-3 py-1 text-xs font-medium text-[rgb(var(--text-muted))] backdrop-blur">
              VIBO Strategy • стратегическая платформа консультаций
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[rgb(var(--text-muted))]">{subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={primaryCta.href}>
                <Button size="lg">{primaryCta.label}</Button>
              </a>
              {secondaryCta ? (
                <a href={secondaryCta.href}>
                  <Button variant="secondary" size="lg">
                    {secondaryCta.label}
                  </Button>
                </a>
              ) : null}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
                <div className="text-sm font-semibold">900+</div>
                <div className="mt-1 text-xs text-[rgb(var(--text-muted))]">консультаций с фиксируемым результатом</div>
              </div>
              <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
                <div className="text-sm font-semibold">5 систем</div>
                <div className="mt-1 text-xs text-[rgb(var(--text-muted))]">в одном процессе выбора и сопровождения</div>
              </div>
              <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
                <div className="text-sm font-semibold">Единая история</div>
                <div className="mt-1 text-xs text-[rgb(var(--text-muted))]">решения, заметки и сопровождение без потерь</div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]/95 p-6 shadow-[0_24px_56px_rgba(24,31,45,0.14)] backdrop-blur">
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[rgb(var(--text-muted))]">Предпросмотр платформы</div>
                <Badge variant="accent">Клиентский сценарий</Badge>
              </div>
              <div className="rounded-2xl border border-[rgb(var(--border))] p-4">
                <div className="text-xs text-[rgb(var(--text-muted))]">Запрос клиента</div>
                <div className="mt-1 text-sm font-semibold">«Нужно выбрать город для переезда и сохранить доход в переходный период»</div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] p-4">
                  <div className="text-xs text-[rgb(var(--text-muted))]">Консультация</div>
                  <div className="mt-1 text-sm font-semibold">Переезд и новая локация</div>
                  <div className="mt-1 text-xs text-[rgb(var(--text-muted))]">90 минут • Онлайн • 22 000 ₽</div>
                </div>
                <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] p-4">
                  <div className="text-xs text-[rgb(var(--text-muted))]">Ответственный консультант</div>
                  <div className="mt-1 text-sm font-semibold">Екатерина Чжан</div>
                  <div className="mt-1 text-xs text-[rgb(var(--text-muted))]">Релокация, Feng Shui, Date Selection</div>
                </div>
              </div>
              <div className="rounded-2xl border border-[rgb(var(--border))] p-4">
                <div className="text-xs text-[rgb(var(--text-muted))]">Этапы сопровождения</div>
                <div className="mt-2 grid gap-2">
                  <div className="flex items-center justify-between rounded-xl bg-[rgb(var(--surface-muted))] px-3 py-2 text-xs">
                    <span>1. Фиксация запроса</span>
                    <span className="font-semibold">Завершена</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-[rgb(var(--surface-muted))] px-3 py-2 text-xs">
                    <span>2. Сценарии и приоритеты</span>
                    <span className="font-semibold">В работе</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-[rgb(var(--surface-muted))] px-3 py-2 text-xs">
                    <span>3. Сопровождение и контроль</span>
                    <span className="font-semibold">Запланировано</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

