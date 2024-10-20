import { UserButton } from "@clerk/nextjs";
import { MainNav } from "@/components/layout/main-nav";
import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <header className="h-16 border-b px-6 flex items-center justify-between">
          <MainNav />
          <UserButton />
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}