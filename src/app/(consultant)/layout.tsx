import { DashboardShell } from "@/components/layout/dashboard-shell";
import { requireRole } from "@/lib/auth/session";
import { api } from "@/lib/api";

type ConsultantLayoutProps = Readonly<{ children: React.ReactNode }>;

const consultantNav = [
  { label: "Dashboard", href: "/consultant/dashboard" },
  { label: "Clients", href: "/consultant/clients" },
  { label: "Consultations", href: "/consultant/consultations" },
  { label: "Campaigns", href: "/consultant/campaigns" },
  { label: "Templates", href: "/consultant/templates" },
  { label: "Notes", href: "/consultant/notes" },
  { label: "Calendar", href: "/consultant/calendar" }
];

export default async function ConsultantLayout({ children }: ConsultantLayoutProps) {
  const session = await requireRole("consultant");
  const allConsultations = await api.listConsultations();
  const activeClientsCount = new Set(
    allConsultations.filter((c) => c.consultant_id === "con1").map((c) => c.client_id)
  ).size;

  return (
    <DashboardShell
      sidebarTitle="Consultant Area"
      sidebarItems={consultantNav}
      topbar={{ greetingName: session.fullName, activeClientsCount, unreadCount: 1 }}
    >
      {children}
    </DashboardShell>
  );
}
