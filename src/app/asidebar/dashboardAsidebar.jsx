// import Logout from "@/components/logout/Logout";
// import { useAuth } from "@/hooks/useAuth";
// import {
//   Users,
//   Search,
//   Plus,
//   LayoutDashboardIcon,
//   Settings,
//   ChartNoAxesCombined,
//   BookAIcon,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function DashboardSideBar() {
//   const { userRole, isAuthenticated } = useAuth();

//   return (
//     <aside className="w-64 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 min-h-screen p-4">
//       <div className="space-y-6">
//         {/* Quick Actions */}
//         <div className="space-y-4">
//           <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
//             Quick Actions
//           </h2>
//           <div className="space-y-2">
//             {userRole === "admin" && isAuthenticated && (
//               <Link
//                 to={"/dashboard"}
//                 className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
//               >
//                 <LayoutDashboardIcon className="w-4 h-4" />
//                 Dashboard
//               </Link>
//             )}

//             {userRole === "reviewer" && isAuthenticated && (
//               <Link
//                 to={"/reviewer-dashboard"}
//                 className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
//               >
//                 <ChartNoAxesCombined className="w-4 h-4" />
//                 Reviewer Dashboard
//               </Link>
//             )}

//             {userRole === "author" && isAuthenticated && (
//               <Link
//                 to={"/author-dashboard?role=author&id=1"}
//                 className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
//               >
//                 <ChartNoAxesCombined className="w-4 h-4" />
//                 Author Dashboard
//               </Link>
//             )}

//             {userRole === "editor" && isAuthenticated && (
//               <Link
//                 to={"/editor-dashboard?id=1"}
//                 className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
//               >
//                 <ChartNoAxesCombined className="w-4 h-4" />
//                 Editor Dashboard
//               </Link>
//             )}
//             <Link to={'/dashboard/journals'} className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
//               <BookAIcon className="w-4 h-4" />
//               Our Journals
//             </Link>
//             <button className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
//               <Users className="w-4 h-4" />
//               Activate User
//             </button>
//             <Link to={'/dashboard/authors'} className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
//               <Plus className="w-4 h-4" />
//               Add New Author
//             </Link>
//             <Link to={'/dashboard/editors'} className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
//               <Plus className="w-4 h-4" />
//               Add New Editor
//             </Link>
//             <Link to={'/dashboard/reviewers'} className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
//               <Plus className="w-4 h-4" />
//               Add New Reviewer
//             </Link>
//             <Link to={'/dashboard/publishers'} className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
//               <Plus className="w-4 h-4" />
//               Add New Publisher
//             </Link>
//             <Link to={'/settings'} className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
//               <Settings className="w-4 h-4" />
//               Settings
//             </Link >
//             <Logout />
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// }

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
  const { user, isAuthenticated } = useAuth();

  // Common links that all authenticated users can see
  const commonLinks = [    
  ];

    // Super Admin-specific links
  const superAdminLinks = [
    {
      to: "/dashboard/journals",
      icon: BookAIcon,
      label: "Our Journals",
    },
    {
      to: "/dashboard/publishers",
      icon: Plus,
      label: "Add New Publisher",
    },
  ];

  // Admin-specific links
  const adminLinks = [
    {
      to: "/dashboard",
      icon: LayoutDashboardIcon,
      label: "Dashboard",
    },
    ...commonLinks,
    {
      to: "/dashboard/authors",
      icon: Plus,
      label: "Add New Author",
    },
    {
      to: "/dashboard/editors",
      icon: Plus,
      label: "Add New Editor",
    },
    {
      to: "/dashboard/reviewers",
      icon: Plus,
      label: "Add New Reviewer",
    }
  ];

  // Editor-specific links
  const editorLinks = [
    {
      to: "/editor-dashboard?id=1",
      icon: ChartNoAxesCombined,
      label: "Editor Dashboard",
    },
    ...commonLinks,
    {
      to: "/dashboard/authors",
      icon: Plus,
      label: "Add New Author",
    },
    {
      to: "/dashboard/reviewers",
      icon: Plus,
      label: "Add New Reviewer",
    },
  ];

  // Reviewer-specific links
  const reviewerLinks = [
    {
      to: "/reviewer-dashboard",
      icon: ChartNoAxesCombined,
      label: "Reviewer Dashboard",
    },
    ...commonLinks,
  ];

  // Author-specific links
  const authorLinks = [
    {
      to: "/author-dashboard?role=author&id=1",
      icon: ChartNoAxesCombined,
      label: "Author Dashboard",
    },
    ...commonLinks,
  ];

  // Function to get role-specific links
  const getRoleLinks = () => {
    if (!isAuthenticated) return [];

    switch (user && user.role) {
      case "system_admin":
        return superAdminLinks;
      case "admin":
        return adminLinks;
      case "editor":
        return editorLinks;
      case "reviewer":
        return reviewerLinks;
      case "author":
        return authorLinks;
      default:
        return commonLinks;
    }
  };

  // Function to render a link item
  const renderLinkItem = (item, index) => {
    const baseClassName =
      "w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors";

    if (item.type === "button") {
      return (
        <button key={index} className={baseClassName}>
          <item.icon className="w-4 h-4" />
          {item.label}
        </button>
      );
    }

    return (
      <Link key={index} to={item.to} className={baseClassName}>
        <item.icon className="w-4 h-4" />
        {item.label}
      </Link>
    );
  };

  // Function to get section title based on role
  const getSectionTitle = () => {
    switch (user && user.role) {
      case "admin":
        return "Admin Panel";
      case "editor":
        return "Editor Tools";
      case "reviewer":
        return "Reviewer Tools";
      case "author":
        return "Author Tools";
      default:
        return "Quick Actions";
    }
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 min-h-screen p-4">
      <div className="space-y-6">
        {/* Role-specific Actions */}
        {isAuthenticated && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              {getSectionTitle()}
            </h2>
            <div className="space-y-2">
              {getRoleLinks().map((item, index) => renderLinkItem(item, index))}
            </div>
          </div>
        )}

        {/* Settings Section - Available to all authenticated users */}
        {isAuthenticated && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Account
            </h2>
            <div className="space-y-2">
              <Link
                to={"/settings"}
                className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
              <Logout />
            </div>
          </div>
        )}

        {/* Guest Section - For non-authenticated users */}
        {!isAuthenticated && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Guest Access
            </h2>
            <div className="space-y-2">
              <Link
                to={"/dashboard/journals"}
                className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
              >
                <BookAIcon className="w-4 h-4" />
                Our Journals
              </Link>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
