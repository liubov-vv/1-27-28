import { Consultation } from "@/lib/types/models";

export const consultations: Consultation[] = [
  {
    id: "cs1",
    clientId: "c1",
    consultantId: "con1",
    serviceId: "s1",
    status: "scheduled",
    scheduledAt: "2026-04-10T10:00:00+03:00",
    topic: "Purpose and relocation"
  },
  {
    id: "cs2",
    clientId: "c1",
    consultantId: "con1",
    serviceId: "s1",
    status: "completed",
    scheduledAt: "2026-03-15T15:00:00+03:00",
    topic: "Long-term support and follow-up"
  },
  {
    id: "cs3",
    clientId: "c2",
    consultantId: "con1",
    serviceId: "s1",
    status: "scheduled",
    scheduledAt: "2026-04-22T08:30:00+03:00",
    topic: "Health and balance"
  },
  {
    id: "cs4",
    clientId: "c3",
    consultantId: "con1",
    serviceId: "s1",
    status: "draft",
    scheduledAt: "2026-04-25T12:00:00+03:00",
    topic: "Relocation timing draft"
  }
];
