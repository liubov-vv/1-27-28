import { InteractionEvent } from "@/lib/types/models";

export const interactionEvents: InteractionEvent[] = [
  {
    id: "ie1",
    clientId: "c1",
    consultantId: "con1",
    type: "message",
    occurredAt: "2026-03-23T13:00:00+03:00",
    summary: "Уточнение деталей по окнам возможностей."
  },
  {
    id: "ie2",
    clientId: "c2",
    consultantId: "con1",
    type: "email",
    occurredAt: "2026-03-18T09:20:00+03:00",
    summary: "Отправка краткого плана по стабилизации энергии."
  },
  {
    id: "ie3",
    clientId: "c3",
    consultantId: "con1",
    type: "meeting",
    occurredAt: "2026-03-12T16:40:00+03:00",
    summary: "Созвон по теме переезда и сроков."
  },
  {
    id: "ie4",
    clientId: "c1",
    consultantId: "con1",
    type: "call",
    occurredAt: "2026-03-08T11:10:00+03:00",
    summary: "Подтверждение follow-up целей."
  }
];
