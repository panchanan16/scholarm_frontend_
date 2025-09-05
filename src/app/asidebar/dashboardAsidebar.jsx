import Logout from "@/components/logout/Logout";
import { useAuth } from "@/hooks/useAuth";
import {
  Users,
  Search,
  Plus,
  LayoutDashboardIcon,
  Settings,
  ChartNoAxesCombined,
  BookAIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardSideBar() {
  const { userRole, isAuthenticated } = useAuth();

  return (
    <aside className="w-64 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 min-h-screen p-4">
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Quick Actions
          </h2>
          <div className="space-y-2">
            {userRole === "admin" && isAuthenticated && (
              <Link
                to={"/dashboard"}
                className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
              >
                <LayoutDashboardIcon className="w-4 h-4" />
                Dashboard
              </Link>
            )}

            {userRole === "reviewer" && isAuthenticated && (
              <Link
                to={"/reviewer-dashboard"}
                className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
              >
                <ChartNoAxesCombined className="w-4 h-4" />
                Reviewer Dashboard
              </Link>
            )}

            {userRole === "author" && isAuthenticated && (
              <Link
                to={"/author-dashboard?role=author&id=1"}
                className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
              >
                <ChartNoAxesCombined className="w-4 h-4" />
                Author Dashboard
              </Link>
            )}

            {userRole === "editor" && isAuthenticated && (
              <Link
                to={"/editor-dashboard?id=1"}
                className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
              >
                <ChartNoAxesCombined className="w-4 h-4" />
                Editor Dashboard
              </Link>
            )}
            <Link to={'/dashboard/journals'} className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
              <BookAIcon className="w-4 h-4" />
              Our Journals
            </Link>
            <button className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
              <Users className="w-4 h-4" />
              Activate User
            </button>
            <Link to={'/dashboard/authors'} className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              Add New Author
            </Link>
            <Link to={'/dashboard/editors'} className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              Add New Editor
            </Link>
            <Link to={'/dashboard/reviewers'} className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              Add New Reviewer
            </Link>
            <Link to={'/settings'} className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
              <Settings className="w-4 h-4" />
              Settings
            </Link >
            <Logout />
          </div>
        </div>
      </div>
    </aside>
  );
}
