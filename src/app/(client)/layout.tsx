import { DashboardShell } from "@/components/layout/dashboard-shell";
import { requireRole } from "@/lib/auth/session";
import { api } from "@/lib/api";

type ClientLayoutProps = Readonly<{ children: React.ReactNode }>;
export const dynamic = "force-dynamic";

const clientNav = [
  { label: "Dashboard", href: "/client/dashboard" },
  { label: "Profile", href: "/client/profile" },
  { label: "Consultations", href: "/client/consultations" },
  { label: "History", href: "/client/history" },
  { label: "Recommendations", href: "/client/recommendations" },
  { label: "Activations", href: "/client/activations" },
  { label: "Materials", href: "/client/materials" },
  { label: "Notifications", href: "/client/notifications" },
  { label: "Preferences", href: "/client/preferences" }
];

export default async function ClientLayout({ children }: ClientLayoutProps) {
  const session = await requireRole("client");
  const allClients = await api.listClients();
  const activeClientsCount = allClients.filter((c) => c.user_id === session.userId).length;

  return (
    <DashboardShell
      sidebarTitle="Client Area"
      sidebarItems={clientNav}
      topbar={{ greetingName: session.fullName, activeClientsCount, unreadCount: 1 }}
    >
      {children}
    </DashboardShell>
  );
}

