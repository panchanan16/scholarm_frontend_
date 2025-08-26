import { AdminLayout } from "@/components/layout/AdminLayout";
import { Outlet } from "react-router-dom";

const SettingsPage = ({ onNavigate }) => {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default SettingsPage;
