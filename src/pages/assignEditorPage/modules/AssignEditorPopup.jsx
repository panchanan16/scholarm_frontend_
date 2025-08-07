import { use, useState } from "react";
import { X, Minus } from "lucide-react";
import { useToastMutation } from "@/hooks/useNotification";
import { useAssignEditorToManuscriptMutation } from "@/services/features/manuscript/slice";
import { useSearchParams } from "react-router-dom";

const AssignEditorPopup = ({ isOpen, onClose, onSend, email, editor_id }) => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams();

  const article_id = searchParams.get("article_id") || 0;

  const [subject, setSubject] = useState(
    "Assignment as Editor for Manuscript ID: JPMS148833"
  );
  const [emailContent, setEmailContent] =
    useState(`Dear Professor Iftikhar Ahmed,

You are invited to serve as Editor for:

Manuscript ID: JPMS148833
Title: Self-care Behaviors and Associated Factors among Patients with Hypertension in the Kurdistan Region of Iraq: A cross-sectional analysis
Authors: Hero Ali; Muhammad Amen
Journal: Journal of Pioneering Medical Sciences

Log in at https://scholarmanuscript.com/journals/JPMS (User ID: editor@jpmsonline.com) to view details and the PDF at https://scholarmanuscript.com/File/Download/Gfc62dc2-ca3c-40ba-b5e8-444c01038002?source=manuscriptFile, then accept or decline the assignment. Reset your password at https://scholarmanuscript.com/Account/ForgotPassword/JPMS if needed.

Best regards,
Iftikhar Ahmed (PhD)
Publication Office
Journal of Pioneering Medical Sciences
www.jpmsonline.com

This email and any attached information is only intended for individual/s or entities mentioned and is confidential and privileged. Be aware that any disclosure, copying, distribution, or use of the contents`);

  const [isMinimized, setIsMinimized] = useState(false);

  const [assignEditorToArticle] = useToastMutation(
    useAssignEditorToManuscriptMutation(),
    {
      showLoading: true,
    }
  );

  if (!isOpen) return null;

  const handleAssign = async () => {
    await assignEditorToArticle({
      article_id: Number(article_id),
      editor_id: editor_id,
      editor_email: email,
      email_subject: subject,
      email_body: emailContent,
      no_days: numberOfDays,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div
        className={`bg-white rounded-lg shadow-2xl w-full max-w-4xl transition-all duration-300 ${
          isMinimized ? "h-16" : "max-h-[90vh]"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-3 rounded-t-lg">
          <h2 className="text-lg font-semibold">Assign Editor</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
            >
              <Minus size={16} />
            </button>
            <button
              onClick={() => onClose(false)}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        {!isMinimized && (
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
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  >
                    <option value="">Select Email Template</option>
                    <option value="editor-invitation">Editor Invitation</option>
                    <option value="reviewer-invitation">
                      Reviewer Invitation
                    </option>
                    <option value="author-notification">
                      Author Notification
                    </option>
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
                <textarea
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none text-sm"
                  placeholder="Enter your email content here..."
                />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-lg">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={onClose}
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
        )}
      </div>
    </div>
  );
};

export default AssignEditorPopup;
