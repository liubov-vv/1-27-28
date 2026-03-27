import { ApiClient } from "@/lib/api/client";
import { getClientsDto, getConsultationsDto, getUsersDto } from "@/lib/api/mock-db";
import type { ClientDto, ConsultationDto, UserDto } from "@/lib/api/types";

const client = new ApiClient({
  "/users": getUsersDto(),
  "/clients": getClientsDto(),
  "/consultations": getConsultationsDto()
});

export const api = {
  listUsers: () => client.getList<UserDto>("/users"),
  listClients: () => client.getList<ClientDto>("/clients"),
  listConsultations: () => client.getList<ConsultationDto>("/consultations")
};

export type { UserDto, ClientDto, ConsultationDto };

