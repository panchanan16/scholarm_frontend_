import { useEffect, useState } from "react";
import { X, Minus, Trash2 } from "lucide-react";
import FinalAssignReviewerPopup from "./FinalAssignReviewerPopup";


const AssignReviewerPopup = ({ isOpen, onClose, selectedReviewers, removeSelection }) => {
  const [isOpenSendBox, setIsOpenSendBox] = useState(false);

  function removeReviewers(reviewerId) {
    removeSelection((prev) =>
      prev.filter((reviewer) => reviewer.reviewer_id !== reviewerId)
    );
  }

  function gotToSendBox() {
    if (selectedReviewers.length === 0) {
      alert("Please select at least one reviewer to assign.");
      return;
    }
    setIsOpenSendBox(true);
  }

  // Default columns if none provided
  const defaultColumns = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
  ];

  const tableColumns = defaultColumns;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div
        className={`bg-white rounded-lg shadow-2xl w-full max-h-[90vh] max-w-4xl transition-all duration-300 flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-3 rounded-t-lg">
          <h2 className="text-lg font-semibold">Assign Reviewers</h2>
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
              <div className="w-full overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      {tableColumns.map((column) => (
                        <th
                          key={column.key}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                        >
                          {column.header}
                        </th>
                      ))}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedReviewers?.map((row, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {row.reviewer_id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {row.reviewer_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {row.reviewer_email}
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm"
                          onClick={() =>
                            removeReviewers(row.reviewer_id)
                          }
                        >
                          <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded text-sm font-medium transition-colors duration-200">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-lg">
              <div className="flex justify-end space-x-3">
                <button
                  className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={gotToSendBox}
                  className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors font-medium"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
      </div>
      <FinalAssignReviewerPopup
        isOpen={isOpenSendBox}
        onClose={setIsOpenSendBox}
        AssignedReviewers={selectedReviewers}
      />
    </div>
  );
};

export default AssignReviewerPopup;
