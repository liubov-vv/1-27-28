import { User } from "@/lib/types/models";

export const users: User[] = [
  { id: "u1", role: "client", fullName: "Анна Смирнова", email: "client@example.com", status: "active" },
  { id: "u2", role: "consultant", fullName: "Марина Ли", email: "consultant@example.com", status: "active" },
  { id: "u3", role: "client", fullName: "Дмитрий Волков", email: "client2@example.com", status: "active" },
  { id: "u4", role: "client", fullName: "Елена Ковалева", email: "client3@example.com", status: "active" },
  { id: "u5", role: "client", fullName: "Игорь Беляев", email: "client4@example.com", status: "active" }
];
