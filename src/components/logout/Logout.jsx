import { useAuth } from "@/hooks/useAuth";
import { LogOutIcon } from "lucide-react";

function Logout() {
  const { user, logout } = useAuth();

  return (
    <button
      onClick={() =>
        logout(`${user && user.role === "system_admin" ? "/admin" : "/"}`)
      }
      className="w-full cursor-pointer flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
    >
      <LogOutIcon className="w-4 h-4" />
      Logout
    </button>
  );
}

export default Logout;
