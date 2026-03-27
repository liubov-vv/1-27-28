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
  const featuredConsultations = consultations.slice(0, 3).map((c) => {
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
      consultantName,
      audience: service?.audience,
      result: service?.result,
      format: service?.format,
      durationMin: service?.durationMin,
      tags: service?.tags
    } as const;
  });

  const featuredConsultants = consultants.slice(0, 3).map((con) => {
    const name = users.find((u) => u.id === con.userId)?.fullName ?? "Эксперт VIBO";
    return {
      consultantId: con.id,
      name,
      systems: con.systems,
      yearsExperience: con.yearsExperience,
      rating: con.rating,
      bio: con.bio,
      specialization: con.specialization,
      positioning: con.positioning,
      competencies: con.competencies,
      consultationsCount: con.consultationsCount,
      formats: con.formats,
      languages: con.languages,
      avatarBg: con.avatarBg
    } as const;
  });

  return (
    <>
      <HeroSection
        title="Стратегические консультации для сложных решений в жизни и бизнесе"
        subtitle="Вы приходите с конкретной задачей, проходите структурный разбор с экспертом и получаете сценарии действий, приоритеты, даты и сопровождение в одном рабочем кабинете."
        primaryCta={{ label: "Подобрать консультацию под задачу", href: "/consultations" }}
        secondaryCta={{ label: "Выбрать консультанта", href: "/consultants" }}
      />

      <PageContainer>
        <SectionContainer fullScreen={false} centered={false}>
          <FeatureGrid
            eyebrow="Кому подходит платформа"
            title="Когда важна не общая рекомендация, а управляемый процесс решения"
            description="VIBO Strategy создана для тех, кому нужно принять сложное решение и пройти его с экспертной поддержкой от первого шага до результата."
            items={[
              { title: "Руководителям и собственникам", description: "Когда нужно выбрать стратегию без потери темпа и ресурсов." },
              { title: "Семьям в период изменений", description: "Когда решение влияет на отношения, переезд, карьеру и финансовую устойчивость." },
              { title: "Тем, кто ценит структуру", description: "Когда важны сроки, приоритеты, контрольные точки и прозрачная история работы." }
            ]}
          />
        </SectionContainer>

        <SectionContainer fullScreen={false} centered={false}>
          <SectionHeading
            eyebrow="Как мы решаем задачи"
            title="От запроса к результату — по прозрачным этапам"
            description="Каждый этап фиксируется в системе: вы понимаете, что уже сделано, что в работе и какой следующий шаг ведет к результату."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Выбор консультации",
                description: "Сопоставляем задачу, тип решения и формат работы с экспертом."
              },
              {
                title: "Фиксация запроса",
                description: "Определяем исходную точку, критерии результата и ограничения."
              },
              {
                title: "Решение и приоритеты",
                description: "Формируем сценарии, даты, приоритеты и рекомендации для внедрения."
              },
              {
                title: "История сопровождения",
                description: "Все решения, этапы сопровождения и заметки сохраняются для дальнейшей работы."
              }
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6 shadow-[0_12px_28px_rgba(24,31,45,0.06)]">
                <div className="text-base font-semibold">{item.title}</div>
                <p className="mt-3 text-sm leading-7 text-[rgb(var(--text-muted))]">{item.description}</p>
              </div>
            ))}
          </div>
        </SectionContainer>

        <SectionContainer fullScreen={false} centered={false}>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-7">
              <SectionHeading
                eyebrow="Что получает клиент"
                title="Результат консультации — это рабочий пакет решений"
                description="На выходе вы получаете не общее мнение, а документы и статусы, с которыми можно работать сразу."
              />
              <div className="mt-6 space-y-3">
                {[
                  "Карта решений с приоритетами на 3 месяца",
                  "Календарь ключевых дат и контрольных точек",
                  "Персональные рекомендации и сценарии действий",
                  "История сопровождения и контрольных шагов"
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] px-4 py-3 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading eyebrow="Частые вопросы" title="Что важно знать до старта" description="Краткие ответы на базовые вопросы о формате, подготовке и результате." />
              <div className="mt-6">
                <FAQAccordion items={faqItems.slice(0, 4).map((f) => ({ question: f.question, answer: f.answer }))} />
              </div>
            </div>
          </div>
        </SectionContainer>

        <SectionContainer fullScreen={false} centered={false}>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6 shadow-[0_16px_40px_rgba(24,31,45,0.08)]">
              <SectionHeading eyebrow="Популярные консультации" title="Выберите формат под задачу" description="Карточки уже содержат результат, длительность и формат." />
              <div className="mt-6 grid gap-4">
                {featuredConsultations.map((c) => (
                  <ConsultationCard key={c.consultationId} {...c} />
                ))}
              </div>
              <div className="mt-6">
                <Link href="/consultations">
                  <span className="text-sm font-semibold text-[rgb(var(--primary))] hover:opacity-90">Перейти к полному каталогу консультаций</span>
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6 shadow-[0_16px_40px_rgba(24,31,45,0.08)]">
              <SectionHeading eyebrow="Консультанты" title="Подберите эксперта под ваш контекст" description="Сравните специализацию, опыт, форматы работы и языки." />
              <div className="mt-6 grid gap-4">
                {featuredConsultants.map((con) => (
                  <ConsultantCard key={con.consultantId} {...con} />
                ))}
              </div>
              <div className="mt-6">
                <Link href="/consultants">
                  <span className="text-sm font-semibold text-[rgb(var(--primary))] hover:opacity-90">Перейти в каталог консультантов</span>
                </Link>
              </div>
            </div>
          </div>
        </SectionContainer>

        <SectionContainer fullScreen={false} centered={false}>
          <CTASection
            eyebrow="Следующий шаг"
            title="Запланируйте консультацию, которая решает именно ваш запрос"
            description="Опишите задачу, выберите эксперта и получите четкий план действий в течение одной консультационной сессии."
            primaryCta={{ label: "Подобрать консультацию", href: "/consultations" }}
            secondaryCta={{ label: "Выбрать эксперта", href: "/consultants" }}
          />
        </SectionContainer>
      </PageContainer>
    </>
  );
}
