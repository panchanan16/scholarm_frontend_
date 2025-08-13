import { useState } from "react";

export default function DecisonEditor({ isOpen, onClose }) {
  const [decision, setDecision] = useState("");
  const [comments, setComments] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const reviewers = [
    {
      name: "Hassan Mohammad",
      question1: "This paper falls within the scope of the journal the journal",
      question2: "This paper does not need another round of review",
      decision: "Accept",
      commentsForEditor: "",
      commentsForAuthor: "",
      files: "",
    },
    {
      name: "Wajd Ali Chatha",
      question1: "This paper falls within the scope of the journal the journal",
      question2: "This paper needs another round of review",
      decision: "Accept",
      commentsForEditor:
        "The title needs to be revised. Author needs to define young population. The population range is from 15 to 50 years, which does not coincides with title. Aims of the study shall be new or author shall clearly state what is the purpose of this study and new findings now. Shall be revised.",
      commentsForAuthor: "",
      files: "",
    },
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    console.log("Submitting review...", { decision, comments, selectedFile });
    onClose();
  };

  const handleCancel = () => {
    setDecision("");
    setComments("");
    setSelectedFile(null);
    onClose();
  };

  async function submitEditorRecommendation(values) {
    alert(JSON.stringify(values))
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Journal Review System
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Review and provide feedback on the submitted manuscript
            </p>
          </div>
          <button
            onClick={() => onClose(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="px-6 py-6">
          {/* Reviewers Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <svg
                className="w-5 h-5 text-blue-600 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">Reviewer(s)</h3>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Question 1
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Question 2
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Decision
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Comments For Editor
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Comments For Author
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Files
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reviewers.map((reviewer, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {reviewer.name}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 max-w-xs">
                        <div className="truncate" title={reviewer.question1}>
                          {reviewer.question1}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 max-w-xs">
                        <div className="truncate" title={reviewer.question2}>
                          {reviewer.question2}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {reviewer.decision}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 max-w-xs">
                        {reviewer.commentsForEditor && (
                          <div
                            className="truncate"
                            title={reviewer.commentsForEditor}
                          >
                            {reviewer.commentsForEditor}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {reviewer.commentsForAuthor}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {reviewer.files}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Form Section */}
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) =>
              submitEditorRecommendation(values, setSubmitting)
            }
          >
            {({ values, isSubmitting, setFieldValue }) => (
              <Form>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column - Comments */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center mb-3">
                        <svg
                          className="w-5 h-5 text-blue-600 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <label className="text-lg font-medium text-gray-900">
                          Comments
                        </label>
                      </div>
                      <textarea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
                        placeholder="Enter your review comments here..."
                      />
                    </div>

                    {/* File Upload */}
                    <div>
                      <div className="flex items-center mb-3">
                        <svg
                          className="w-5 h-5 text-blue-600 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <label className="text-lg font-medium text-gray-900">
                          Select File
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200"
                        >
                          <div className="text-center">
                            <div className="w-10 h-10 mx-auto mb-2 text-gray-400">
                              <svg fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <p className="text-sm font-medium text-gray-600">
                              {selectedFile
                                ? selectedFile.name
                                : "Choose Files"}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {selectedFile
                                ? "File selected"
                                : "No file chosen"}
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Decision */}
                  <div>
                    <div className="flex items-center mb-3">
                      <svg
                        className="w-5 h-5 text-blue-600 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <label className="text-lg font-medium text-gray-900">
                        Decision
                      </label>
                    </div>
                    <div className="space-y-3">
                      {[
                        "Accept",
                        "Reject",
                        "Minor Revision",
                        "Major Revision",
                      ].map((option) => (
                        <label
                          key={option}
                          className="flex items-center cursor-pointer group"
                        >
                          <input
                            type="radio"
                            name="decision"
                            value={option}
                            checked={decision === option}
                            onChange={(e) => setDecision(e.target.value)}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Please review all fields before submitting your decision
            </div>
            <div className="flex space-x-4">
              <button className="px-6 py-3 text-black bg-white border-2 border-gray-300 rounded-lg font-semibold hover:border-black transition-colors duration-200">
                Close
              </button>
              <button className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Submit Decision
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
