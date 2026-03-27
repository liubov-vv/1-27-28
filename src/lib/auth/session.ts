import { redirect } from "next/navigation";
import { users } from "@/lib/mock-data";

export type SessionRole = "client" | "consultant" | "admin";

export type AppSession = {
  userId: string;
  role: SessionRole;
  fullName: string;
};

const ROLE_ENV = "DEMO_SESSION_ROLE";

function normalizeRole(input: string | undefined): SessionRole {
  if (input === "admin" || input === "consultant" || input === "client") return input;
  return "client";
}

export async function getMockSession(): Promise<AppSession> {
  const role = normalizeRole(process.env[ROLE_ENV]);
  const candidate =
    users.find((u) => u.role === role && u.status === "active") ??
    users.find((u) => u.role === "client" && u.status === "active")!;

  return {
    userId: candidate.id,
    role: candidate.role,
    fullName: candidate.fullName
  };
}

export async function requireRole(expectedRole: SessionRole): Promise<AppSession> {
  const roleFromEnv = process.env[ROLE_ENV];
  if (!roleFromEnv) {
    const candidate = users.find((u) => u.role === expectedRole && u.status === "active");
    if (!candidate) redirect("/auth/login");
    return {
      userId: candidate.id,
      role: candidate.role,
      fullName: candidate.fullName
    };
  }

  const session = await getMockSession();
  if (session.role !== expectedRole) redirect("/auth/login");
  return session;
}

