import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutGrid,
  MessageSquare,
  Settings,
  BarChart3,
  Plus,
  User,
} from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) redirect("/login");

  return (
    <div className="force-light flex h-screen bg-background">
      {/* Sidebar — 1:1 Teamly */}
      <aside className="flex w-56 shrink-0 flex-col border-r border-border/60 bg-muted/20">
        <div className="flex h-14 items-center gap-2 border-b border-border/40 px-4">
          <div className="flex size-6 items-center justify-center rounded bg-brand-500">
            <span className="text-[8px] font-bold text-white">T</span>
          </div>
          <span className="text-sm font-semibold tracking-tight">Teamly</span>
        </div>

        <nav className="flex-1 space-y-0.5 px-2 py-3">
          <SidebarLink href="/dashboard" icon={LayoutGrid} active>
            Pixel Department
          </SidebarLink>
          <SidebarLink href="/dashboard/chat" icon={MessageSquare}>
            Chat
          </SidebarLink>
          <SidebarLink href="/dashboard/analytics" icon={BarChart3}>
            Analytics
          </SidebarLink>
          <SidebarLink href="/dashboard/settings" icon={Settings}>
            Settings
          </SidebarLink>
        </nav>

        <div className="border-t border-border/40 p-3">
          <button className="flex w-full items-center gap-2 rounded-md border border-border/60 px-3 py-2 font-pixel text-[8px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-brand-500/40 hover:text-foreground">
            <Plus className="size-3" />
            New Agent
          </button>
        </div>

        <div className="flex items-center gap-2 border-t border-border/40 px-4 py-3">
          <div className="flex size-7 items-center justify-center rounded-full bg-brand-100 text-[10px] font-medium text-brand-700">
            {user.firstName?.[0] ?? "U"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-foreground">
              {user.fullName ?? user.emailAddresses[0]?.emailAddress}
            </p>
            <p className="truncate text-[10px] text-muted-foreground">
              {user.emailAddresses[0]?.emailAddress}
            </p>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

function SidebarLink({
  href,
  icon: Icon,
  children,
  active,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-brand-50 text-brand-700 font-medium"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      }`}
    >
      <Icon className="size-4" />
      {children}
    </Link>
  );
}
