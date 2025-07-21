import { AdminHeader } from "@/app/headers/adminHeader";
import { SideBar } from "./sidebar";

export function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar at the top */}
      <AdminHeader />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 bg-gray-50 overflow-auto">{children}</main>
      </div>
    </div>
  );
}