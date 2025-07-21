import {
  Users,
  Search,
  Plus,
  LayoutDashboardIcon,
  Settings,
} from "lucide-react";

export function SideBar() {
  return (
    <aside className="w-64 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 min-h-screen p-6">
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Quick Actions
          </h2>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
              <LayoutDashboardIcon className="w-4 h-4" />
              Dashboard
            </button>
            <button className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
              <Search className="w-4 h-4" />
              Search People
            </button>
            <button className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
              <Users className="w-4 h-4" />
              Activate User
            </button>
            <button className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              Add New Author
            </button>
            <button className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              Add New Editor
            </button>
            <button className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              Add New Reviewer
            </button>
            <button className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
