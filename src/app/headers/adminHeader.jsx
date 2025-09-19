import { useAuth } from "@/hooks/useAuth";
import {
  Bell,
  ChevronDown,
  FileText,
  LogOut,
  Notebook,
  Plus,
  Search,
  Settings,
  User,
} from "lucide-react";
import { useState } from "react";

export function AdminHeader() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Page meta data ---
  const { user: userInfo, logout, journal } = useAuth();
  const user = userInfo
    ? {
        role: userInfo?.["role"],
        userId: userInfo?.[`${userInfo.role}_id`],
        name: userInfo?.[`${userInfo.role}_name`],
      }
    : null;



  console.log(journal);
  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ScholarM</h1>
                <p className="text-sm text-blue-600">
                  {journal && journal.journal_name}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search submissions..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-4">
                {/* User Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    {/* Avatar */}
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                      <span className="text-sm font-medium text-white">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>

                    {/* User Info */}
                    <div className="text-left hidden sm:block">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {user.role}
                      </div>
                    </div>

                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {showProfileDropdown && (
                    <div
                      onClick={() =>
                        setShowProfileDropdown(!showProfileDropdown)
                      }
                      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    >
                      {/* User Info in Dropdown */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full">
                            {user.avatar ? (
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <span className="text-sm font-medium text-white">
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {user.email}
                            </div>
                            <div className="text-xs text-blue-600 capitalize font-medium">
                              {user.role}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                          <Settings className="w-4 h-4 mr-3 text-gray-400" />
                          View Profile
                        </button>

                        <button
                          onClick={() =>
                            logout(
                              `${
                                user && user.role === "system_admin"
                                  ? "/admin"
                                  : `/journal/${journal?.journal_code}`
                              }`
                            )
                          }
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                          <LogOut className="w-4 h-4 mr-3 text-red-500" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
