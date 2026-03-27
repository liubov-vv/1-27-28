import { User } from "@/lib/types/models";

export const users: User[] = [
  { id: "u1", role: "client", fullName: "[CLIENT_NAME]", email: "client@example.com", status: "active" },
  { id: "u2", role: "consultant", fullName: "[CONSULTANT_NAME]", email: "consultant@example.com", status: "active" },
  { id: "u3", role: "client", fullName: "[CLIENT_NAME] (2)", email: "client2@example.com", status: "active" },
  { id: "u4", role: "client", fullName: "[CLIENT_NAME] (3)", email: "client3@example.com", status: "active" },
  { id: "u5", role: "client", fullName: "[CLIENT_NAME] (4)", email: "client4@example.com", status: "active" }
];
