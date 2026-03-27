import { PageContainer } from "@/components/layout/page-container";
import { SectionContainer } from "@/components/layout/section-container";
import { FeatureGrid } from "@/features/public/components/feature-grid";

export default function AboutPlatformPage() {
  return (
    <PageContainer>
      <SectionContainer>
        <div className="max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight">О платформе [PLATFORM_NAME]</h1>
          <p className="mt-3 text-sm leading-7 text-[rgb(var(--text-muted))]">
            Это премиальная SaaS-платформа для китайской метафизики: каталог консультаций, удобная работа консультантов с историей и
            долгосрочным сопровождением клиентов.
          </p>
        </div>
      </SectionContainer>

      <SectionContainer>
        <FeatureGrid
          eyebrow="ПРОФЕССИОНАЛЬНО"
          title="Без «мистической витрины»"
          description="Мы сохраняем экспертность и структуру: интерфейс похож на современный консалтинг-проект."
          items={[
            { title: "Статусы и этапы", description: "Черновик, запланировано, завершено — всё видно." },
            { title: "История и контекст", description: "Консультант ведет диалог и не теряет смысл." },
            { title: "Рекомендации и активации", description: "Результаты оформляются как действия и заметки." }
          ]}
        />
      </SectionContainer>

      <SectionContainer>
        <FeatureGrid
          eyebrow="КЛИЕНТАМ"
          title="Комфортный путь"
          description="Вы выбираете систему и тему, а затем получаете структурированную консультацию и follow-up."
          items={[
            { title: "Понятный выбор", description: "Каталог и фильтры без лишней сложности." },
            { title: "Текстовая ясность", description: "Интерфейс читается как редакционный документ." },
            { title: "Долгосрочная поддержка", description: "История взаимодействий помогает удерживать результат." }
          ]}
        />
      </SectionContainer>
    </PageContainer>
  );
}

