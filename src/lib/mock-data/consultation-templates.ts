export type ConsultationTemplate = {
  id: string;
  title: string;
  system: string;
  description: string;
  sections: string[];
  updatedAt: string;
};

export const consultationTemplates: ConsultationTemplate[] = [
  {
    id: "tpl1",
    title: "BaZi: Базовая структура консультации",
    system: "BaZi",
    description: "Шаблон для первой сессии с клиентом: запрос -> анализ -> действия -> follow-up.",
    sections: ["Request", "Analysis", "Recommendations", "Activations", "Follow-up"],
    updatedAt: "2026-03-20"
  },
  {
    id: "tpl2",
    title: "Qi Men: Окна возможностей",
    system: "Qi Men Dun Jia",
    description: "Фрейм для решения срочных задач и выбора временных окон.",
    sections: ["Context", "Window Mapping", "Action Plan", "Control Points"],
    updatedAt: "2026-03-14"
  }
];

