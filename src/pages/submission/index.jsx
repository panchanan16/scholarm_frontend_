import { useState } from "react";
import { useDispatch } from "react-redux";
import { addData } from "@/store/feature/submission/slice";
import SubmissionLayout from "@/components/layout/submissionLayout";
import { Outlet } from "react-router-dom";

export default function SubmissionPage() {
  const [selectedEntry, setSelectedEntry] = useState("no");
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (continueNext = false) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Add current step to saved steps
    dispatch(addData("authors"));

    setIsLoading(false);

    if (continueNext) {
      // Simulate navigation to next step
      console.log("Continuing to next step...");
    }
  };

  return (
    <SubmissionLayout>
      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </SubmissionLayout>
  );
}
