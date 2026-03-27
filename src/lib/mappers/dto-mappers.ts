import type { ClientDto, ConsultationDto, UserDto } from "@/lib/api";

export function mapUserDto(user: UserDto) {
  return {
    id: user.id,
    role: user.role,
    fullName: user.full_name,
    email: user.email,
    status: user.status
  };
}

export function mapClientDto(client: ClientDto) {
  return {
    id: client.id,
    userId: client.user_id,
    tags: client.tags,
    mainRequest: client.main_request,
    timezone: client.timezone,
    birthDate: client.birth_date,
    birthPlace: client.birth_place,
    contactPhone: client.contact_phone
  };
}

export function mapConsultationDto(consultation: ConsultationDto) {
  return {
    id: consultation.id,
    clientId: consultation.client_id,
    consultantId: consultation.consultant_id,
    serviceId: consultation.service_id,
    status: consultation.status,
    scheduledAt: consultation.scheduled_at,
    topic: consultation.topic
  };
}

