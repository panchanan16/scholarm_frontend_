import JournalListTable from "@/pages/journalPage/modules/JournalList";
import { useParams, Navigate } from "react-router-dom";


export function ValidatedJournalListTable() {
  const { role } = useParams();
  const allowedRoutes = ["editor-dashboard", "dashboard", "200"]; 

  // Check if ID exists in the array
  if (!allowedRoutes.includes(role)) {
    return <Navigate to="/not-found" replace />;
  }

  return <JournalListTable />;
}


