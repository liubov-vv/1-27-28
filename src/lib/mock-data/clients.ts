import { Client } from "@/lib/types/models";

export const clients: Client[] = [
  {
    id: "c1",
    userId: "u1",
    tags: ["отношения", "финансы"],
    mainRequest: "Жизненная стратегия и финансовый ритм",
    timezone: "Europe/Moscow",
    birthDate: "1986-09-14",
    birthPlace: "Москва",
    contactPhone: "+7 999 123-45-67"
  },
  {
    id: "c2",
    userId: "u3",
    tags: ["здоровье", "баланс"],
    mainRequest: "Стабилизация энергии и режим на сезон",
    timezone: "Europe/Moscow",
    birthDate: "1979-03-02",
    birthPlace: "Санкт-Петербург",
    contactPhone: "+7 999 765-43-21"
  },
  {
    id: "c3",
    userId: "u4",
    tags: ["переезд", "цели"],
    mainRequest: "Окна возможностей для переезда и сроков",
    timezone: "Europe/Moscow",
    birthDate: "1991-12-08",
    birthPlace: "Казань",
    contactPhone: "+7 999 222-11-00"
  },
  {
    id: "c4",
    userId: "u5",
    tags: ["бизнес", "рост"],
    mainRequest: "Стратегия развития и устойчивость решений",
    timezone: "Europe/Moscow",
    birthDate: "1983-06-25",
    birthPlace: "Екатеринбург",
    contactPhone: "+7 999 444-55-66"
  }
];
