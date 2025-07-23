import SubmissionLayout from "@/components/layout/submissionLayout";
import { Outlet } from "react-router-dom";

export default function SubmissionPage() {
  return (
    <SubmissionLayout>
      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </SubmissionLayout>
  );
}
