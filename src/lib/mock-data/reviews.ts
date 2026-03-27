import { Review } from "@/lib/types/models";

export const reviews: Review[] = [
  { id: "rev1", clientId: "c1", consultantId: "con1", rating: 5, text: "Мы получили ясность по запросу и план действий. Всё было структурно и поддерживающе." },
  { id: "rev2", clientId: "c1", consultantId: "con1", rating: 4.8, text: "Отдельно понравилась история взаимодействий — чувствуется преемственность и работа на результат." },
  { id: "rev3", clientId: "c1", consultantId: "con1", rating: 4.9, text: "Рекомендации были сформулированы так, что их действительно хочется выполнять. Спасибо!" }
];
