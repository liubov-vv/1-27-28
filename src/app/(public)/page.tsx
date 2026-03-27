import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { SectionContainer } from "@/components/layout/section-container";
import { CTASection } from "@/features/public/components/cta-section";
import { ConsultantCard } from "@/features/public/components/consultant-card";
import { ConsultationCard } from "@/features/public/components/consultation-card";
import { FAQAccordion } from "@/features/public/components/faq-accordion";
import { FeatureGrid } from "@/features/public/components/feature-grid";
import { HeroSection } from "@/features/public/components/hero-section";
import { SectionHeading } from "@/features/public/components/section-heading";
import { consultations, consultants, services, users, faqItems } from "@/lib/mock-data";

export default function PublicHomePage() {
  const featuredConsultations = consultations.slice(0, 2).map((c) => {
    const service = services.find((s) => s.id === c.serviceId);
    const consultant = consultants.find((con) => con.id === c.consultantId);
    const systems = service?.system ?? "Система";
    const consultantName = users.find((u) => u.id === consultant?.userId)?.fullName ?? "Эксперт VIBO";
    return {
      consultationId: c.id,
      title: c.topic,
      system: systems,
      scheduledAt: c.scheduledAt,
      status: c.status,
      priceFrom: service?.priceFrom,
      consultantName
    } as const;
  });

  const featuredConsultants = consultants.slice(0, 2).map((con) => {
    const name = users.find((u) => u.id === con.userId)?.fullName ?? "Эксперт VIBO";
    return {
      consultantId: con.id,
      name,
      systems: con.systems,
      yearsExperience: con.yearsExperience,
      rating: con.rating,
      bio: con.bio
    } as const;
  });

  return (
    <>
      <HeroSection
        title="VIBO Strategy: современный формат стратегических консультаций"
        subtitle="Выбирайте консультацию под конкретный запрос, получайте структурный план действий и сохраняйте весь контекст взаимодействия в единой системе."
        primaryCta={{ label: "Выбрать консультацию", href: "/consultations" }}
        secondaryCta={{ label: "Стать консультантом", href: "/consultants" }}
      />

      <PageContainer>
        <SectionContainer>
          <FeatureGrid
            eyebrow="VALUE"
            title="От вопроса к решению за один рабочий цикл"
            description="VIBO Strategy соединяет экспертный анализ, понятные действия и устойчивый follow-up в едином интерфейсе."
            items={[
              { title: "Каталог по задачам", description: "Подбор консультации по цели, системе и формату взаимодействия." },
              { title: "Контекст без потерь", description: "История, заметки и решения всегда остаются под рукой." },
              { title: "План с приоритетами", description: "Рекомендации и активации оформлены как последовательность шагов." }
            ]}
          />
        </SectionContainer>

        <SectionContainer>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6 shadow-[0_16px_40px_rgba(19,29,52,0.08)]">
              <SectionHeading eyebrow="КАТАЛОГ" title="Популярные консультации" description="Только актуальные сценарии с прозрачным форматом работы." />
              <div className="mt-6 grid gap-4">
                {featuredConsultations.map((c) => (
                  <ConsultationCard key={c.consultationId} {...c} />
                ))}
              </div>
              <div className="mt-6">
                <Link href="/consultations">
                  <span className="text-sm font-semibold text-[rgb(var(--primary))] hover:opacity-90">Открыть полный каталог</span>
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6 shadow-[0_16px_40px_rgba(19,29,52,0.08)]">
              <SectionHeading eyebrow="СПЕЦИАЛИСТЫ" title="Выбор консультанта" description="Эксперты с подтвержденным опытом и системным подходом." />
              <div className="mt-6 grid gap-4">
                {featuredConsultants.map((con) => (
                  <ConsultantCard key={con.consultantId} {...con} />
                ))}
              </div>
              <div className="mt-6">
                <Link href="/consultants">
                  <span className="text-sm font-semibold text-[rgb(var(--primary))] hover:opacity-90">Смотреть всех</span>
                </Link>
              </div>
            </div>
          </div>
        </SectionContainer>

        <SectionContainer>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <FeatureGrid
              eyebrow="ПРОЦЕСС"
              title="Каждая консультация проходит по четкому маршруту"
              description="Мы уменьшаем неопределенность и превращаем экспертную работу в управляемый процесс."
              items={[
                { title: "Диагностика запроса", description: "Фиксируем исходную ситуацию, цель и критерий результата." },
                { title: "Сценарии и выбор", description: "Определяем рабочую стратегию и ближайшие точки роста." },
                { title: "Внедрение и follow-up", description: "Поддерживаем выполнение шагов и корректируем курс по ходу." }
              ]}
            />
            <div>
              <SectionHeading eyebrow="FAQ" title="Частые вопросы" description="Короткие ответы перед стартом консультации." />
              <div className="mt-6">
                <FAQAccordion items={faqItems.slice(0, 3).map((f) => ({ question: f.question, answer: f.answer }))} />
              </div>
            </div>
          </div>
        </SectionContainer>

        <SectionContainer>
          <CTASection
            eyebrow="CTA"
            title="Начните с консультации под ваш запрос"
            description="Премиальная подача, структурные результаты и долгосрочная поддержка."
            primaryCta={{ label: "Открыть каталог", href: "/consultations" }}
            secondaryCta={{ label: "Смотреть консультантов", href: "/consultants" }}
          />
        </SectionContainer>
      </PageContainer>
    </>
  );
}
