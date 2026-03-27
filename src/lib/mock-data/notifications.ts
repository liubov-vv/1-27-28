import { Notification } from "@/lib/types/models";

export const notifications: Notification[] = [
  { id: "n1", userId: "u1", title: "Consultation scheduled", message: "Your consultation is booked for next week.", isRead: false },
  { id: "n2", userId: "u1", title: "New recommendation", message: "Consultant added an actionable recommendation.", isRead: false },
  { id: "n3", userId: "u1", title: "Activation reminder", message: "Activation window starts tomorrow morning.", isRead: true }
];
