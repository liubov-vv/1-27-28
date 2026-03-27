import { Consultant } from "@/lib/types/models";

export const consultants: Consultant[] = [
  {
    id: "con1",
    userId: "u2",
    systems: ["BaZi", "Qi Men Dun Jia", "Date Selection"],
    yearsExperience: 8,
    rating: 4.9,
    bio: "Помогаю клиентам превращать сложные жизненные и бизнес-запросы в последовательные решения с измеримым результатом.",
    specialization: "Карьерные и управленческие решения",
    positioning: "Стратег-консультант для руководителей и собственников",
    competencies: ["Карьерные переходы", "Приоритизация решений", "Календарь действий"],
    consultationsCount: 420,
    formats: ["Онлайн", "Асинхронно"],
    languages: ["Русский", "English"],
    avatarBg: "from-[#D9C2A3] to-[#B98F63]"
  },
  {
    id: "con2",
    userId: "u6",
    systems: ["Feng Shui", "Date Selection", "Activations"],
    yearsExperience: 11,
    rating: 4.8,
    bio: "Собираю рабочие стратегии для переезда, выбора локации и устойчивого домашнего ритма под конкретные цели клиента.",
    specialization: "Релокация и пространство",
    positioning: "Консультант по среде и точкам усиления",
    competencies: ["Выбор локации", "План переезда", "Пространственные решения"],
    consultationsCount: 510,
    formats: ["Онлайн", "Офлайн"],
    languages: ["Русский"],
    avatarBg: "from-[#BFC7D5] to-[#8C9BB3]"
  },
  {
    id: "con3",
    userId: "u7",
    systems: ["Qi Men Dun Jia", "I Ching", "BaZi"],
    yearsExperience: 9,
    rating: 5,
    bio: "Работаю с кризисными развилками в отношениях и бизнесе: помогаю выбрать стратегию и пройти ее с поддержкой.",
    specialization: "Кризисные и переговорные сценарии",
    positioning: "Консультант по решениям в условиях неопределенности",
    competencies: ["Сценарный анализ", "Переговорные стратегии", "Сопровождение решений"],
    consultationsCount: 360,
    formats: ["Онлайн", "Асинхронно"],
    languages: ["Русский", "English", "中文"],
    avatarBg: "from-[#BFAEA0] to-[#8F6F60]"
  }
];
