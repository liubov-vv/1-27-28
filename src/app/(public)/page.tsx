import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { SectionContainer } from "@/components/layout/section-container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CTASection } from "@/features/public/components/cta-section";
import { ConsultantCard } from "@/features/public/components/consultant-card";
import { ConsultationCard } from "@/features/public/components/consultation-card";
import { FAQAccordion } from "@/features/public/components/faq-accordion";
import { FeatureGrid } from "@/features/public/components/feature-grid";
import { HeroSection } from "@/features/public/components/hero-section";
import { SectionHeading } from "@/features/public/components/section-heading";
import { blogArticles, consultations, consultants, knowledgeArticles, reviews, services, users, clients, faqItems } from "@/lib/mock-data";

export default function PublicHomePage() {
  const featuredConsultations = consultations.slice(0, 3).map((c) => {
    const service = services.find((s) => s.id === c.serviceId);
    const consultant = consultants.find((con) => con.id === c.consultantId);
    const systems = service?.system ?? "Система";
    const consultantName = users.find((u) => u.id === consultant?.userId)?.fullName ?? "[CONSULTANT_NAME]";
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

  const featuredConsultants = consultants.slice(0, 3).map((con) => {
    const name = users.find((u) => u.id === con.userId)?.fullName ?? "[CONSULTANT_NAME]";
    return {
      consultantId: con.id,
      name,
      systems: con.systems,
      yearsExperience: con.yearsExperience,
      rating: con.rating,
      bio: con.bio
    } as const;
  });

  const featuredKnowledge = [...knowledgeArticles].slice(0, 2);
  const featuredBlog = [...blogArticles].slice(0, 2);

  const testimonialItems = reviews.slice(0, 3).map((r) => {
    const client = clients.find((c) => c.id === r.clientId);
    const reviewerName = users.find((u) => u.id === client?.userId)?.fullName ?? "[CLIENT_NAME]";
    const consultant = consultants.find((con) => con.id === r.consultantId);
    const consultantName = users.find((u) => u.id === consultant?.userId)?.fullName ?? "[CONSULTANT_NAME]";
    return { ...r, reviewerName, consultantName };
  });

  return (
    <>
      <HeroSection
        title="Премиальная система консультаций по китайской метафизике"
        subtitle="Подбирайте решения под ваш запрос, а консультанты хранят историю и ведут долгосрочное взаимодействие — в удобном SaaS-формате."
        primaryCta={{ label: "Выбрать консультацию", href: "/consultations" }}
        secondaryCta={{ label: "Стать консультантом", href: "/consultants" }}
      />

      <PageContainer>
        <SectionContainer>
          <FeatureGrid
            eyebrow="VALUE"
            title="[VALUE_PROPOSITION]"
            description="Платформа объединяет консультации, каталог специалистов и контекст: от запроса до активаций и рекомендаций."
            items={[
              { title: "Консультации по запросу", description: "Каталог тем и систем. Быстрый выбор формата." },
              { title: "История и преемственность", description: "Консультант хранит контекст и не начинает с нуля." },
              { title: "Системные рекомендации", description: "Рекомендации и активации — структурно и прозрачно." }
            ]}
          />
        </SectionContainer>

        <SectionContainer>
          <FeatureGrid
            eyebrow="ПРОБЛЕМЫ"
            title="Что мы решаем"
            description="Уберите хаос: консультации становятся процессом с понятными этапами и результатами."
            items={[
              { title: "Разрозненные источники", description: "Единый контур: заметки, история и материалы." },
              { title: "Сложно выбрать направление", description: "Фильтры по системам и запросам." },
              { title: "Нет долгосрочного сопровождения", description: "Активности, рекомендации и follow-up." },
              { title: "Слабая коммуникация", description: "Лёгкая фиксация событий и согласований." },
              { title: "Сложно отслеживать динамику", description: "Продуманная структура консультаций." },
              { title: "Страх ошибиться", description: "Премиальная подача и статусные сценарии." }
            ]}
          />
        </SectionContainer>

        <SectionContainer>
          <FeatureGrid
            eyebrow="МЕТОДЫ"
            title="Основные системы"
            description="Не мистическая витрина — технологичный экспертный интерфейс."
            items={[
              { title: "BaZi", description: "Анализ структуры времени и ресурсов." },
              { title: "Qi Men Dun Jia", description: "Фокус на окна возможностей." },
              { title: "Feng Shui", description: "Баланс пространства и устойчивость." },
              { title: "I Ching", description: "Стратегические ориентиры и решение." },
              { title: "Date Selection", description: "Выбор дат под задачи и события." },
              { title: "Activations", description: "Активации как последовательность действий." }
            ]}
          />
        </SectionContainer>

        <SectionContainer>
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <SectionHeading eyebrow="КАТАЛОГ" title="Популярные консультации" description="Подбор по запросу и системе." />
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {featuredConsultations.map((c) => (
                  <ConsultationCard key={c.consultationId} {...c} />
                ))}
              </div>
              <div className="mt-6">
                <Link href="/consultations">
                  <span className="text-sm font-semibold text-[rgb(var(--primary))] hover:opacity-90">Перейти в каталог</span>
                </Link>
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="СПЕЦИАЛИСТЫ" title="Выбор консультанта" description="Качество профиля, рейтинг и системы." />
              <div className="mt-6 space-y-4">
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
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="ДЛЯ КЛИЕНТОВ" title="Спокойствие клиента" description="Чёткие этапы и понятные сценарии." />
              <div className="mt-6 space-y-4">
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <Badge variant="accent">1</Badge>
                      <div>
                        <div className="text-sm font-semibold">Вы выбираете консультацию</div>
                        <div className="mt-1 text-sm text-[rgb(var(--text-muted))]">Фильтры по системам и теме. Без перегруза.</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <Badge variant="accent">2</Badge>
                      <div>
                        <div className="text-sm font-semibold">История сохраняется</div>
                        <div className="mt-1 text-sm text-[rgb(var(--text-muted))]">События, заметки и материалы — в одном контуре.</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <Badge variant="accent">3</Badge>
                      <div>
                        <div className="text-sm font-semibold">Сопровождение на дистанции</div>
                        <div className="mt-1 text-sm text-[rgb(var(--text-muted))]">Рекомендации, активации и follow-up.</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="ДЛЯ КОНСУЛЬТАНТОВ" title="Удобный рабочий процесс" description="Лёгкая CRM-консоль для консультаций." />
              <div className="mt-6 space-y-4">
                <Card>
                  <CardContent className="p-5">
                    <div className="text-sm font-semibold">Клиенты и история</div>
                    <div className="mt-1 text-sm text-[rgb(var(--text-muted))]">Увидьте контекст и храните взаимодействие.</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-5">
                    <div className="text-sm font-semibold">Консультации с разметкой</div>
                    <div className="mt-1 text-sm text-[rgb(var(--text-muted))]">Рекомендации, активации, заметки — структурно.</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-5">
                    <div className="text-sm font-semibold">Кампания и шаблоны</div>
                    <div className="mt-1 text-sm text-[rgb(var(--text-muted))]">Предложения и системные сообщения клиентам.</div>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-6">
                <Link href="/consultants">
                  <span className="text-sm font-semibold text-[rgb(var(--primary))] hover:opacity-90">Запросить подключение</span>
                </Link>
              </div>
            </div>
          </div>
        </SectionContainer>

        <SectionContainer>
          <SectionHeading eyebrow="КАК ЭТО РАБОТАЕТ" title="Процесс без лишнего шума" description="Понятная последовательность действий для обоих сторон." />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { title: "Выбор", desc: "Каталог тем и систем. Быстрые фильтры." },
              { title: "Анализ", desc: "Сервис удерживает контекст консультации и статусы." },
              { title: "Результат", desc: "Рекомендации и активации, закрепленные в истории." }
            ].map((s) => (
              <Card key={s.title} className="p-5">
                <div className="text-sm font-semibold">{s.title}</div>
                <div className="mt-2 text-sm text-[rgb(var(--text-muted))]">{s.desc}</div>
              </Card>
            ))}
          </div>
        </SectionContainer>

        <SectionContainer>
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="ЗНАНИЯ" title="Knowledge Base" description="Долгие чтения и практичные статьи для консультантов." />
              <div className="mt-6 grid gap-4">
                {featuredKnowledge.map((a) => (
                  <Link key={a.id} href={`/knowledge/${a.slug}`}>
                    <Card className="p-5 transition hover:opacity-95">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-sm font-semibold">{a.title}</div>
                          <div className="mt-2 text-sm text-[rgb(var(--text-muted))]">{a.excerpt}</div>
                        </div>
                        <Badge>{a.category}</Badge>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading eyebrow="БЛОГ" title="Редакционный взгляд" description="Публикации про стратегии, отношения и фокус на действия." />
              <div className="mt-6 grid gap-4">
                {featuredBlog.map((a) => (
                  <Link key={a.id} href={`/blog/${a.slug}`}>
                    <Card className="p-5 transition hover:opacity-95">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-sm font-semibold">{a.title}</div>
                          <div className="mt-2 text-sm text-[rgb(var(--text-muted))]">{a.excerpt}</div>
                        </div>
                        <Badge variant="accent">Статья</Badge>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </SectionContainer>

        <SectionContainer>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div>
              <SectionHeading eyebrow="ОТЗЫВЫ" title="Что говорят клиенты" description="Короткие свидетельства о процессе и результате." />
              <div className="mt-6 grid gap-4">
                {testimonialItems.map((t) => (
                  <Card key={t.id} className="p-5">
                    <div className="text-sm text-[rgb(var(--text-muted))]">“{t.text}”</div>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold">{t.reviewerName}</div>
                      <Badge variant="success">Рейтинг {t.rating}</Badge>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/testimonials">
                  <span className="text-sm font-semibold text-[rgb(var(--primary))] hover:opacity-90">Все отзывы</span>
                </Link>
              </div>
            </div>
            <div>
              <SectionHeading eyebrow="FAQ" title="Частые вопросы" description="Быстро найдите ответ перед консультацией." />
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
