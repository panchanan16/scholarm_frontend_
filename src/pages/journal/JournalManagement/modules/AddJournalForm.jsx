import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { useToastMutation } from "@/hooks/useNotification";
import { useCreateJournalMutation } from "@/services/features/journal/journalApi";

export default function AddJournalModal({ isOpen, onClose }) {
  const initialValues = {
    journal_type: "",
    journal_issn: "",
    journal_eissn: "",
    publication_type: "",
    journal_name: "",
    is_active: true,
  };

  const [createJournal] = useToastMutation(useCreateJournalMutation(), {
    showLoading: true,
  });

  const handleJournalSubmit = async (values, setSubmitting) => {
    await createJournal(values);
    setSubmitting(false);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Add New Journal
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Create a new journal entry in the system
            </p>
          </div>
          <button
            onClick={onClose}
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
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) =>
              handleJournalSubmit(values, setSubmitting)
            }
          >
            {({ values, isSubmitting, setFieldValue }) => (
              <Form>
                <div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Journal Name */}
                      <div>
                        <div className="flex items-center mb-3">
                          <svg
                            className="w-5 h-5 text-blue-600 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <label className="text-lg font-medium text-gray-900">
                            Journal Name *
                          </label>
                        </div>
                        <Field
                          name="journal_name"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="Enter journal name"
                          maxLength="500"
                          required
                        />
                      </div>

                      {/* Journal Type */}
                      <div>
                        <div className="flex items-center mb-3">
                          <svg
                            className="w-5 h-5 text-blue-600 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <label className="text-lg font-medium text-gray-900">
                            Journal Type *
                          </label>
                        </div>
                        <Field
                          name="journal_type"
                          as="select"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="e.g., Academic, Technical, Scientific"
                          maxLength="300"
                          required
                        >
                          <option value="" disabled>
                            -- select type ---
                          </option>
                          <option value="Academic">Academic</option>
                          <option value="Non-Academic">Non Academic</option>
                          <option value="Technical">Technical</option>
                          <option value="Research">Research</option>
                        </Field>
                      </div>

                      {/* Publication Type */}
                      <div>
                        <div className="flex items-center mb-3">
                          <svg
                            className="w-5 h-5 text-blue-600 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-1H8v1a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v4H7V5zm2 6H7v2h2v-2zm2-6h2v4h-2V5zm2 6h-2v2h2v-2z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <label className="text-lg font-medium text-gray-900">
                            Publication Type *
                          </label>
                        </div>

                        <Field
                          name="publication_type"
                          as="select"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="e.g., Peer Reviewed, Open Access, Subscription"
                          maxLength="300"
                          required
                        >
                          <option value="" disabled>
                            -- select Publication type ---
                          </option>
                          <option value="Academic">Academic</option>
                          <option value="Non-Academic">Non Academic</option>
                          <option value="Technical">Technical</option>
                          <option value="Research">Research</option>
                        </Field>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Journal ISSN */}
                      <div>
                        <div className="flex items-center mb-3">
                          <svg
                            className="w-5 h-5 text-blue-600 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <label className="text-lg font-medium text-gray-900">
                            ISSN
                          </label>
                        </div>
                        <Field
                          name="journal_issn"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="e.g., 1234-5678"
                          maxLength="100"
                        />
                      </div>

                      {/* Journal eISSN */}
                      <div>
                        <div className="flex items-center mb-3">
                          <svg
                            className="w-5 h-5 text-blue-600 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <label className="text-lg font-medium text-gray-900">
                            eISSN
                          </label>
                        </div>
                        <Field
                          name="journal_eissn"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="e.g., 8765-4321"
                          maxLength="100"
                        />
                      </div>

                      {/* Is Active */}
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
                            Status
                          </label>
                        </div>
                        <label className="flex items-center cursor-pointer group">
                          <Field
                            type="checkbox"
                            name="is_active"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                            Active
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="border-t mt-10 border-gray-200 px-8 py-6 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        Please fill in all required fields before submitting
                      </div>
                      <div className="flex space-x-4">
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="px-6 py-3 text-black bg-white border-2 border-gray-300 rounded-lg font-semibold hover:border-black transition-colors duration-200"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 flex items-center disabled:opacity-50"
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
                          {isSubmitting ? "Creating..." : "Create Journal"}
                        </button>
                      </div>
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
