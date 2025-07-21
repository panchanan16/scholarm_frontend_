import SubmissionAsidebar from "@/app/asidebar/submissionAsidebar";
import SubmissionHeader from "@/app/headers/submissionHeader";

function SubmissionLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar at the top */}
      <SubmissionHeader />
      <div className="flex flex-1">
        <SubmissionAsidebar />
        <main className="flex-1 bg-gray-50 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

export default SubmissionLayout;
