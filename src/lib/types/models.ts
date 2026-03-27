export type Role = "client" | "consultant" | "admin";

export type User = {
  id: string;
  role: Role;
  fullName: string;
  email: string;
  phone?: string;
  status: "active" | "inactive";
};

export type Client = {
  id: string;
  userId: string;
  tags: string[];
  mainRequest: string;
  timezone: string;
  status?: "active" | "paused" | "archived";
  contactPhone?: string;
  contactEmail?: string;
  birthDate?: string;
  birthPlace?: string;
};

export type Consultant = {
  id: string;
  userId: string;
  systems: Array<"BaZi" | "Qi Men Dun Jia" | "Feng Shui" | "I Ching" | "Date Selection" | "Activations">;
  yearsExperience: number;
  rating: number;
  bio: string;
  specialization: string;
  positioning: string;
  competencies: string[];
  consultationsCount: number;
  formats: Array<"Онлайн" | "Офлайн" | "Асинхронно">;
  languages: string[];
  avatarBg?: string;
};

export type Service = {
  id: string;
  title: string;
  system: string;
  durationMin: number;
  priceFrom: number;
  description: string;
  audience: string;
  result: string;
  format: "Онлайн" | "Офлайн" | "Асинхронно";
  tags: string[];
};

export type Consultation = {
  id: string;
  clientId: string;
  consultantId: string;
  serviceId: string;
  status: "draft" | "scheduled" | "in_progress" | "completed" | "pending_confirmation" | "follow_up";
  scheduledAt: string;
  topic: string;
};

export type Recommendation = {
  id: string;
  consultationId: string;
  clientId: string;
  text: string;
  priority: "low" | "medium" | "high";
};

export type Activation = {
  id: string;
  clientId: string;
  title: string;
  instructions: string;
  dateWindow: string;
};

export type InteractionEvent = {
  id: string;
  clientId: string;
  consultantId: string;
  type: "message" | "call" | "email" | "meeting";
  occurredAt: string;
  summary: string;
};

export type KnowledgeArticle = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  tags?: string[];
  sections?: ContentSection[];
};

export type BlogArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  tags?: string[];
  category?: string;
  sections?: ContentSection[];
};

export type Campaign = {
  id: string;
  title: string;
  audience: string;
  status: "draft" | "scheduled" | "sent";
};

export type Notification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
};

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export type Review = {
  id: string;
  clientId: string;
  consultantId: string;
  rating: number;
  text: string;
};

export type ContentSection = {
  id: string;
  title: string;
  level: 2 | 3;
  body: string;
};

export type ReferenceMaterial = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  tags?: string[];
  description: string;
};

export type ClientNote = {
  id: string;
  clientId: string;
  consultantId: string;
  title: string;
  body: string;
  occurredAt: string;
};
