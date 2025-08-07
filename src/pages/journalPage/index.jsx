import React from "react";
import JournalListTable from "./modules/JournalList";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Outlet } from "react-router-dom";

function JournalPage() {
  return (
    <AdminLayout>
      <div>
        <Outlet />
      </div>
    </AdminLayout>
  );
}

export default JournalPage;
