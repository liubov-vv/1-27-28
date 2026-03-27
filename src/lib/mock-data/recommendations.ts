import { Recommendation } from "@/lib/types/models";

export const recommendations: Recommendation[] = [
  { id: "r1", consultationId: "cs1", clientId: "c1", text: "[RECOMMENDATION_TEXT]", priority: "high" },
  { id: "r2", consultationId: "cs2", clientId: "c1", text: "Закрепить ритм планирования: обзор недели и 2 приоритетных действия.", priority: "medium" }
];
