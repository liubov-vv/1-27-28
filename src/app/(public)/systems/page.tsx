import { PageContainer } from "@/components/layout/page-container";
import { SectionContainer } from "@/components/layout/section-container";
import { FeatureGrid } from "@/features/public/components/feature-grid";

export default function SystemsMethodsPage() {
  return (
    <PageContainer>
      <SectionContainer>
        <div className="max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight">Системы / методы</h1>
          <p className="mt-3 text-sm leading-7 text-[rgb(var(--text-muted))]">
            Вы выбираете подходящую систему под запрос. Каждая система структурирована как последовательность анализа и действий.
          </p>
        </div>
      </SectionContainer>

      <SectionContainer>
        <FeatureGrid
          eyebrow="МЕТОДЫ"
          title="Основные направления платформы"
          description="Собранные в одном каталоге: чтобы не искать по разным источникам."
          items={[
            { title: "BaZi (Ба-Цзы)", description: "Анализ периодов времени и жизненных ресурсов." },
            { title: "Qi Men Dun Jia", description: "Понимание окон возможностей и сценариев событий." },
            { title: "Feng Shui", description: "Баланс пространства, устойчивость и гармонизация." },
            { title: "I Ching", description: "Стратегические ориентиры и решение вопросов." },
            { title: "Date Selection", description: "Выбор дат под задачи, встречи, переезд." },
            { title: "Activations", description: "Последовательность активаций с понятными инструкциями." }
          ]}
        />
      </SectionContainer>

      <SectionContainer>
        <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6">
          <div className="text-sm font-semibold">Как выбрать систему</div>
          <p className="mt-2 text-sm leading-7 text-[rgb(var(--text-muted))]">
            Если вам важны отношения и динамика — начните с BaZi или I Ching. Для окон возможностей и событий подойдут Qi Men Dun
            Jia. Когда ключевой вопрос — переезд и сроки — используйте Date Selection и Activations.
          </p>
        </div>
      </SectionContainer>
    </PageContainer>
  );
}

