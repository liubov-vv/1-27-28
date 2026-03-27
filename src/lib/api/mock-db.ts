import { clients, consultations, users } from "@/lib/mock-data";
import type { ClientDto, ConsultationDto, UserDto } from "@/lib/api/types";

export function getUsersDto(): UserDto[] {
  return users.map((u) => ({
    id: u.id,
    role: u.role,
    full_name: u.fullName,
    email: u.email,
    status: u.status
  }));
}

export function getClientsDto(): ClientDto[] {
  return clients.map((c) => ({
    id: c.id,
    user_id: c.userId,
    tags: c.tags,
    main_request: c.mainRequest,
    timezone: c.timezone,
    birth_date: c.birthDate,
    birth_place: c.birthPlace,
    contact_phone: c.contactPhone
  }));
}

export function getConsultationsDto(): ConsultationDto[] {
  return consultations.map((c) => ({
    id: c.id,
    client_id: c.clientId,
    consultant_id: c.consultantId,
    service_id: c.serviceId,
    status: c.status,
    scheduled_at: c.scheduledAt,
    topic: c.topic
  }));
}

