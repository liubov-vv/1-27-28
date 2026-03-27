import { SidebarNav } from "@/components/navigation/sidebar-nav";
import { Topbar } from "@/components/dashboard/topbar";

type DashboardShellProps = {
  children: React.ReactNode;
  sidebarItems: Array<{ label: string; href: string }>;
  sidebarTitle: string;
  topbar?: {
    greetingName: string;
    activeClientsCount: number;
    unreadCount?: number;
  };
};

export function DashboardShell({ children, sidebarItems, sidebarTitle, topbar }: DashboardShellProps) {
  const greetingName = topbar?.greetingName ?? "Эксперт VIBO";
  const activeClientsCount = topbar?.activeClientsCount ?? 3;
  const unreadCount = topbar?.unreadCount ?? 1;

  return (
    <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[256px_minmax(0,1fr)] lg:px-10">
      <SidebarNav title={sidebarTitle} items={sidebarItems} />
      <div className="space-y-6">
        <Topbar greetingName={greetingName} activeClientsCount={activeClientsCount} unreadCount={unreadCount} />
        {children}
      </div>
    </div>
  );
}
