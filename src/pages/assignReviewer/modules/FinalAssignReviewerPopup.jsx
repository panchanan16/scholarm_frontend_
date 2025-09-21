import { useRef, useState } from "react";
import { X, Minus } from "lucide-react";
import { useToastMutation } from "@/hooks/useNotification";
import { useAssignReviewerToManuscriptMutation } from "@/services/features/manuscript/slice";
import { useSearchParams } from "react-router-dom";
import TextEditor from "@/components/TextEditor";
import { useGetAllEmailTemplateQuery } from "@/services/features/template/templateApi";

const FinalAssignReviewerPopup = ({ isOpen, onClose, AssignedReviewers }) => {
  const [numberOfDays, setNumberOfDays] = useState(10);
  const [searchParams] = useSearchParams();
  const { data: emailTemplates } = useGetAllEmailTemplateQuery();

  const article_id = searchParams.get("article_id") || 0;
  const round = searchParams.get("round");

  const [subject, setSubject] = useState("");
  const [intialEmail, setInitialEmail] = useState("")
  const emailContent = useRef(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  function setSubjectAndEmail(temp_id) {
    if (temp_id) {
      const template =
        emailTemplates &&
        emailTemplates.data.filter((temp) => temp.template_id == temp_id);
      if (template?.length > 0) {
        setSelectedTemplate(temp_id);
        setSubject(template[0].subject);
        setInitialEmail(template[0].body);
      }
    }
  }

  const [assignReviewersToArticle] = useToastMutation(
    useAssignReviewerToManuscriptMutation(),
    {
      showLoading: true,
    }
  );

  if (!isOpen) return null;

  const handleAssign = async () => {
    const sendData = [];
    AssignedReviewers.forEach((reviewer) => {
      sendData.push({
        article_id: Number(article_id),
        round: Number(round) + 1,
        reviewer_id: reviewer.reviewer_id,
        no_days: numberOfDays,
      });
    });

    await assignReviewersToArticle({
      reviewers: sendData,
      emailInfo: { subject, body: emailContent.current.getContent() },
      round: Number(round) + 1,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div
        className={`bg-white rounded-lg shadow-2xl w-full max-w-4xl transition-all duration-300 max-h-[90vh] flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-3 rounded-t-lg">
          <h2 className="text-lg font-semibold">Assign Reviewer</h2>
          <div className="flex items-center space-x-2">            
            <button
              onClick={() => onClose(false)}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Select Email Template
                  </label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSubjectAndEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  >
                    <option value="">Select Email Template</option>
                    {emailTemplates &&
                      emailTemplates?.data.map((temp) => (
                        <option value={temp.template_id}>
                          {temp.template_name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    No. of Days
                  </label>
                  <input
                    type="number"
                    value={numberOfDays}
                    onChange={(e) =>
                      setNumberOfDays(parseInt(e.target.value) || 0)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    min="1"
                  />
                </div>

                <div className="md:col-span-1"></div>
              </div>

              {/* Subject Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>

              {/* Email Content */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email Content
                </label>
                <TextEditor
                  editorRef={emailContent}
                  initialContent={intialEmail ? intialEmail : ""}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-lg">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => onClose(false)}
                  className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssign}
                  className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors font-medium"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default FinalAssignReviewerPopup;
