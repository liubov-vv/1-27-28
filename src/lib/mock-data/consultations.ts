import { Consultation } from "@/lib/types/models";

export const consultations: Consultation[] = [
  {
    id: "cs1",
    clientId: "c1",
    consultantId: "con1",
    serviceId: "s1",
    status: "scheduled",
    scheduledAt: "2026-04-10T10:00:00+03:00",
    topic: "Карьерный разворот в течение квартала"
  },
  {
    id: "cs2",
    clientId: "c1",
    consultantId: "con1",
    serviceId: "s3",
    status: "completed",
    scheduledAt: "2026-03-15T15:00:00+03:00",
    topic: "Финансовая стратегия на 6 месяцев"
  },
  {
    id: "cs3",
    clientId: "c2",
    consultantId: "con3",
    serviceId: "s2",
    status: "scheduled",
    scheduledAt: "2026-04-22T08:30:00+03:00",
    topic: "Сценарии для сложного решения в отношениях"
  },
  {
    id: "cs4",
    clientId: "c3",
    consultantId: "con2",
    serviceId: "s4",
    status: "pending_confirmation",
    scheduledAt: "2026-04-25T12:00:00+03:00",
    topic: "Выбор города и сроков переезда"
  },
  {
    id: "cs5",
    clientId: "c2",
    consultantId: "con3",
    serviceId: "s2",
    status: "in_progress",
    scheduledAt: "2026-04-03T09:00:00+03:00",
    topic: "Переговорная стратегия в семейном конфликте"
  },
  {
    id: "cs6",
    clientId: "c3",
    consultantId: "con2",
    serviceId: "s4",
    status: "follow_up",
    scheduledAt: "2026-03-30T14:30:00+03:00",
    topic: "Сопровождение после переезда"
  }
];
