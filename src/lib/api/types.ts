export type UserDto = {
  id: string;
  role: "client" | "consultant" | "admin";
  full_name: string;
  email: string;
  status: "active" | "inactive";
};

export type ClientDto = {
  id: string;
  user_id: string;
  tags: string[];
  main_request: string;
  timezone: string;
  birth_date?: string;
  birth_place?: string;
  contact_phone?: string;
};

export type ConsultationDto = {
  id: string;
  client_id: string;
  consultant_id: string;
  service_id: string;
  status: "draft" | "scheduled" | "completed";
  scheduled_at: string;
  topic: string;
};

