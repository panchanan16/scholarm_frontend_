import { useState } from "react";
import { Check, ChevronDown, ChevronRight } from "lucide-react";
import SubmissionAsidebar from "@/app/asidebar/submissionAsidebar";
import { useDispatch } from "react-redux";
import { addData } from "@/store/feature/submission/slice";
import SubmissionLayout from "@/components/layout/submissionLayout";

export default function SubmissionPage() {
  const [selectedEntry, setSelectedEntry] = useState("no");
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (continueNext = false) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Add current step to saved steps
    dispatch(addData("article-type"));

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
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <span>Getting Started</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Competition</span>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Is this a competition entry?
              </h1>

              {/* Radio Options */}
              <div className="space-y-4 mb-8">
                <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="competition"
                    value="no"
                    checked={selectedEntry === "no"}
                    onChange={(e) => setSelectedEntry(e.target.value)}
                    className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 mt-0.5"
                  />
                  <div>
                    <div className="font-medium text-gray-900">
                      No, this is not a competition entry.
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="competition"
                    value="yes"
                    checked={selectedEntry === "yes"}
                    onChange={(e) => setSelectedEntry(e.target.value)}
                    className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 mt-0.5"
                  />
                  <div>
                    <div className="font-medium text-gray-900">
                      Yes, this is a competition entry.
                    </div>
                  </div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <button
                  onClick={() => handleSave(false)}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>

                <button
                  onClick={() => handleSave(true)}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-gray-200 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    "Save & Continue"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SubmissionLayout>
  );
}
