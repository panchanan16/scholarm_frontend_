import { useToastLazyQuery } from "@/hooks/useNotification";
import { useUpdateReviewerRecommendationMutation } from "@/services/features/manuscript/slice";
import { Field, Formik, Form } from "formik";

export default function DecisonReviewer({ isOpen, onClose, reviewer_id, article_id }) {
  const [updateReviewerRecommendation] = useToastLazyQuery(
    useUpdateReviewerRecommendationMutation()
  );

  const initialValues = {
    reviewer_id: Number(reviewer_id),
    article_id: article_id,
    is_completed: false,
    is_under_scope: "",
    is_need_revision: "",
    editor_comment: "",
    comment: "",
    reviewerDecision: "",
    attach_file: null,
    attach_file_link: "/fileofreviewer.pdf",
  };

  async function submitReviewerRecommendation(values) {
    await updateReviewerRecommendation(values);
    onClose(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-100">
        {/* Modern Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Reviewer Recommendation
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

        {/* Modern Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) =>
              submitReviewerRecommendation(values, setSubmitting)
            }
          >
            {({ values, isSubmitting, setFieldValue }) => (
              <Form>
                <div className="space-y-8">
                  {/* Question 1 Section */}
                  <div className="group">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0 w-32">
                        <h3 className="text-sm font-semibold text-black border-b-2 border-black pb-2">
                          Question 1
                        </h3>
                      </div>
                      <div className="flex-1 space-y-4 pt-1">
                        <div className="space-y-3">
                          <label className="flex items-start cursor-pointer group hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200">
                            <Field
                              type="radio"
                              name="is_under_scope"
                              value="true"
                              checked={values.is_under_scope === true}
                              onChange={(e) =>
                                setFieldValue(
                                  "is_under_scope",
                                  e.target.value === "true"
                                )
                              }
                              className="w-5 h-5 text-black border-2 border-gray-300 mt-0.5"
                            />
                            <span className="ml-4 text-gray-700 group-hover:text-black transition-colors duration-200">
                              This paper falls within the scope of the journal
                            </span>
                          </label>
                          <label className="flex items-start cursor-pointer group hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200">
                            <Field
                              type="radio"
                              name="is_under_scope"
                              value="false"
                              checked={values.is_under_scope === false}
                              onChange={(e) =>
                                setFieldValue(
                                  "is_under_scope",
                                  e.target.value === "true"
                                )
                              }
                              className="w-5 h-5 text-black border-2 border-gray-300 mt-0.5"
                            />
                            <span className="ml-4 text-gray-700 group-hover:text-black transition-colors duration-200">
                              This paper does not fall within the scope of the
                              journal
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Question 2 Section */}
                  <div className="group">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0 w-32">
                        <h3 className="text-sm font-semibold text-black border-b-2 border-black pb-2">
                          Question 2
                        </h3>
                      </div>
                      <div className="flex-1 space-y-4 pt-1">
                        <div className="space-y-3">
                          <label className="flex items-start cursor-pointer group hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200">
                            <Field
                              type="radio"
                              name="is_need_revision"
                              value="true"
                              checked={values.is_need_revision === true}
                              onChange={(e) =>
                                setFieldValue(
                                  "is_need_revision",
                                  e.target.value === "true"
                                )
                              }
                              className="w-5 h-5 text-black border-2 border-gray-300 mt-0.5"
                            />
                            <span className="ml-4 text-gray-700 group-hover:text-black transition-colors duration-200">
                              This paper need another round of review
                            </span>
                          </label>
                          <label className="flex items-start cursor-pointer group hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200">
                            <Field
                              type="radio"
                              name="is_need_revision"
                              value="false"
                              checked={values.is_need_revision === false}
                              onChange={(e) =>
                                setFieldValue(
                                  "is_need_revision",
                                  e.target.value === "true"
                                )
                              }
                              className="w-5 h-5 text-black border-2 border-gray-300 mt-0.5"
                            />
                            <span className="ml-4 text-gray-700 group-hover:text-black transition-colors duration-200">
                              This paper does not need another round of review
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments For Editor Section */}
                  <div className="group">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0 w-32">
                        <h3 className="text-sm font-semibold text-black border-b-2 border-black pb-2">
                          Comments For Editor
                        </h3>
                      </div>
                      <div className="flex-1 pt-1">
                        <Field
                          as="textarea"
                          name="editor_comment"
                          className="w-full h-36 p-4 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none resize-none text-gray-700 placeholder-gray-400 transition-colors duration-200"
                          placeholder="Enter comments for the editor here..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div className="group">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0 w-32">
                        <h3 className="text-sm font-semibold text-black border-b-2 border-black pb-2">
                          Reviewer Comments
                        </h3>
                      </div>
                      <div className="flex-1 pt-1">
                        <Field
                          as="textarea"
                          name="comment"
                          className="w-full h-36 p-4 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none resize-none text-gray-700 placeholder-gray-400 transition-colors duration-200"
                          placeholder="Enter general comments here..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* File Upload Section */}
                  <div className="group">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0 w-32">
                        <h3 className="text-sm font-semibold text-black border-b-2 border-black pb-2">
                          Select File
                        </h3>
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="relative">
                          <input
                            type="file"
                            name="attach_file"
                            className="hidden"
                            id="file-upload"
                            onChange={(event) => {
                              setFieldValue(
                                "attach_file",
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                          <label
                            htmlFor="file-upload"
                            className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-black hover:bg-gray-50 transition-all duration-200"
                          >
                            <div className="text-center">
                              <div className="w-12 h-12 mx-auto mb-3 text-gray-400">
                                <svg fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              {/* <p className="text-gray-600 font-medium">
                                {selectedFile
                                  ? selectedFile.name
                                  : "Choose Files"}
                              </p>
                              <p className="text-gray-400 text-sm mt-1">
                                {selectedFile
                                  ? "File selected"
                                  : "No file chosen"}
                              </p> */}
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decision Section */}
                  <div className="group">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0 w-32">
                        <h3 className="text-sm font-semibold text-black border-b-2 border-black pb-2">
                          Decision
                        </h3>
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            "accept",
                            "reject",
                            "MinorRevision",
                            "MajorRevision",
                          ].map((option) => (
                            <label
                              key={option}
                              className="flex items-center cursor-pointer group hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200"
                            >
                              <Field
                                type="radio"
                                name="reviewerDecision"
                                value={option}
                                className="w-5 h-5 text-black border-2 border-gray-300"
                              />
                              <span className="ml-3 text-gray-700 group-hover:text-black transition-colors duration-200 font-medium">
                                {option}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modern Footer */}
                <div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Please review all fields before submitting your decision
                    </div>
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        className="px-6 py-3 text-black bg-white border-2 border-gray-300 rounded-lg font-semibold hover:border-black transition-colors duration-200"
                      >
                        Close
                      </button>
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 flex items-center"
                      >
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
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
