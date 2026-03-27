import { PageContainer } from "@/components/layout/page-container";
import { SectionContainer } from "@/components/layout/section-container";
import { FeatureGrid } from "@/features/public/components/feature-grid";
import { SectionHeading } from "@/features/public/components/section-heading";

export default function AboutPlatformPage() {
  return (
    <PageContainer>
      <SectionContainer fullScreen={false} centered={false}>
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">О платформе VIBO Strategy</h1>
          <p className="mt-4 text-base leading-8 text-[rgb(var(--text-muted))]">
            VIBO Strategy создана как рабочая среда для стратегических консультаций: здесь экспертный анализ превращается в ясные решения с
            приоритетами, сроками и сопровождением. Мы убрали «мистическую витрину» и собрали сервис, где важен измеримый результат для клиента.
          </p>
        </div>
      </SectionContainer>

      <SectionContainer fullScreen={false} centered={false}>
        <SectionHeading
          eyebrow="Почему платформа появилась"
          title="Мы соединили экспертную глубину и управляемый цифровой формат"
          description="Клиенту не нужно разбираться в терминах систем — важно понять, что делать дальше и как дойти до результата без потери контекста."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "До консультации",
              text: "Клиент формулирует задачу, выбирает формат и получает прозрачные условия работы."
            },
            {
              title: "Во время консультации",
              text: "Эксперт разбирает ситуацию, предлагает сценарии решений и фиксирует приоритеты."
            },
            {
              title: "После консультации",
              text: "Результат остается в личной истории: шаги, даты, сопровождение и корректировки."
            }
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6 shadow-[0_10px_24px_rgba(24,31,45,0.06)]">
              <div className="text-base font-semibold">{item.title}</div>
              <p className="mt-3 text-sm leading-7 text-[rgb(var(--text-muted))]">{item.text}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer fullScreen={false} centered={false}>
        <FeatureGrid
          eyebrow="Модель сервиса"
          title="Чем VIBO Strategy отличается от обычной консультации"
          description="Мы строим не разовую встречу, а полный цикл решения — от формулировки запроса до сопровождения внедрения."
          items={[
            { title: "Структурированный результат", description: "На выходе клиент получает сценарии, приоритеты, даты и критерии контроля." },
            { title: "История без потерь", description: "Каждое решение фиксируется в карточке консультации и доступно позже." },
            { title: "Сопровождение после сессии", description: "Сопровождение помогает корректировать курс по мере изменения контекста." }
          ]}
        />
      </SectionContainer>

      <SectionContainer fullScreen={false} centered={false}>
        <FeatureGrid
          eyebrow="Для кого"
          title="Платформа для тех, кто принимает сложные решения"
          description="Мы работаем с личными и бизнес-задачами, где нужны стратегическая ясность и дисциплина исполнения."
          items={[
            { title: "Карьера и бизнес", description: "Смена роли, рост дохода, запуск новых направлений, управленческие развилки." },
            { title: "Отношения и семья", description: "Выбор сценария в период неопределенности и сложных переговоров." },
            { title: "Переезд и новая среда", description: "Решения по релокации с учетом сроков, рисков и личных приоритетов." }
          ]}
        />
      </SectionContainer>
    </PageContainer>
  );
}

