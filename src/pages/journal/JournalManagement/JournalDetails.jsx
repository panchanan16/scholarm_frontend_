import React, { use, useState } from "react";
import { Formik, Field } from "formik";
import {
  useCreateIssueMutation,
  useCreateVolumeMutation,
  useGetOneJournalQuery,
} from "@/services/features/journal/journalApi";
import { useToastMutation } from "@/hooks/useNotification";
import { useParams } from "react-router-dom";

const JournalDetailPage = () => {
  const { journalId } = useParams();
  const { data: journalDetails } = useGetOneJournalQuery({
    journal_id: journalId,
  });
  const [createVolumeToJournal] = useToastMutation(useCreateVolumeMutation(), {
    showLoading: true,
  });
    const [createIssue] = useToastMutation(useCreateIssueMutation(), {
    showLoading: true,
  });

  const [expandedVolumes, setExpandedVolumes] = useState({});
  const [showVolumeForm, setShowVolumeForm] = useState(false);
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [selectedVolumeForIssue, setSelectedVolumeForIssue] = useState(null);

  const toggleVolume = (volumeId) => {
    setExpandedVolumes((prev) => ({
      ...prev,
      [volumeId]: !prev[volumeId],
    }));
  };

  const handleVolumeSubmit = async (values, { setSubmitting, resetForm }) => {
    await createVolumeToJournal(values);
    resetForm();
    setSubmitting(false);
    setShowVolumeForm(false);
  };

  const handleIssueSubmit = async (values, { setSubmitting, resetForm }) => {
    await createIssue(values)
    // console.log(values);
    setShowIssueForm(false);
    setSelectedVolumeForIssue(null);
    resetForm();
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Journal Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {journalDetails && journalDetails.data.journal_name}
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                journalDetails && journalDetails.data.is_active
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {journalDetails && journalDetails.data.is_active
                ? "Active"
                : "Inactive"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Journal Code
              </h3>
              <p className="text-lg font-semibold text-gray-900">
                {journalDetails && journalDetails.data.journal_code}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Journal Specialization
              </h3>
              <p className="text-lg font-semibold text-gray-900 flex gap-1">
                {journalDetails && journalDetails.data.journal_type.map((type)=> (<span className="bg-purple-100 p-1 px-2 rounded-2xl text-xs text-purple-500 inline-block">{type}</span>))}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Publication Type
              </h3>
              <p className="text-lg font-semibold text-gray-900">
                {journalDetails && journalDetails.data.publication_type}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">ISSN</h3>
              <p className="text-lg font-semibold text-gray-900">
                {journalDetails && journalDetails.data.journal_issn}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">eISSN</h3>
              <p className="text-lg font-semibold text-gray-900">
                {journalDetails && journalDetails.data.journal_eissn}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setShowVolumeForm(!showVolumeForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Create New Volume
          </button>
          <button
            onClick={() => setShowIssueForm(!showIssueForm)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Create New Issue
          </button>
        </div>

        {/* Create Volume Form */}
        {showVolumeForm && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Create New Volume
            </h2>
            <Formik
              initialValues={{ vol_name: "", journal_id: Number(journalId) }}
              onSubmit={handleVolumeSubmit}
            >
              {({ isSubmitting, values, handleChange, handleSubmit }) => (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Volume Name *
                    </label>
                    <Field
                      name="vol_name"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Volume 3 (2025)"
                      required
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? "Creating..." : "Create Volume"}
                    </button>
                    <button
                      onClick={() => setShowVolumeForm(false)}
                      className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md font-semibold hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </Formik>
          </div>
        )}

        {/* Create Issue Form */}
        {showIssueForm && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Create New Issue
            </h2>
            <Formik
              initialValues={{
                iss_name: "",
                journal_id: Number(journalId),
                vol_id: Number(selectedVolumeForIssue) || NaN,
                is_special: false,
                is_published: false,
                created_at: new Date().toISOString().split("T")[0],
              }}
              onSubmit={handleIssueSubmit}
            >
              {({ isSubmitting, handleSubmit }) => (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Issue Name *
                      </label>
                      <Field
                        name="iss_name"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g., Issue 1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Volume *
                      </label>
                      <Field
                        name="vol_id"
                        as="select"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        required
                      >
                        <option value="">Select Volume</option>
                        {journalDetails &&
                          journalDetails.data.JOurnalVolume.map((volume) => (
                            <option key={volume.vol_id} value={volume.vol_id}>
                              {volume.vol_name}
                            </option>
                          ))}
                      </Field>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <Field
                        type="checkbox"
                        name="is_special"
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Special Issue
                      </span>
                    </label>
                    <label className="flex items-center">
                      <Field
                        type="checkbox"
                        name="is_published"
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Published
                      </span>
                    </label>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? "Creating..." : "Create Issue"}
                    </button>
                    <button
                      onClick={() => {
                        setShowIssueForm(false);
                        setSelectedVolumeForIssue(null);
                      }}
                      className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md font-semibold hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </Formik>
          </div>
        )}

        {/* Volumes List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Journal Volumes
          </h2>
          {journalDetails && journalDetails.data.JOurnalVolume?.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No volumes found
              </h3>
              <p className="mt-1 text-gray-500">
                Get started by creating your first volume.
              </p>
            </div>
          ) : (
            journalDetails &&
            journalDetails.data.JOurnalVolume?.map((volume) => (
              <div
                key={volume.vol_id}
                className="bg-white rounded-lg shadow-sm border"
              >
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleVolume(volume.vol_id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg
                        className={`w-5 h-5 text-gray-500 mr-3 transform transition-transform ${
                          expandedVolumes[volume.vol_id] ? "rotate-90" : ""
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {volume.vol_name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">
                        {volume.JournalIssue.length} issue
                        {volume.JournalIssue.length !== 1 ? "s" : ""}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVolumeForIssue(volume.vol_id);
                          setShowIssueForm(true);
                        }}
                        className="text-green-600 hover:text-green-700 font-medium text-sm"
                      >
                        Add Issue
                      </button>
                    </div>
                  </div>
                </div>

                {/* Issues List */}
                {expandedVolumes[volume.vol_id] && (
                  <div className="border-t bg-gray-50">
                    {volume.JournalIssue.length === 0 ? (
                      <div className="p-6 text-center text-gray-500">
                        No issues in this volume yet.
                      </div>
                    ) : (
                      <div className="p-4 space-y-2">
                        {volume.JournalIssue?.map((issue) => (
                          <div
                            key={issue.iss_id}
                            className="bg-white p-4 rounded-lg border flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {issue.iss_name}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-sm text-gray-500">
                                    Created: {issue.created_at}
                                  </span>
                                  {issue.is_special && (
                                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded">
                                      Special
                                    </span>
                                  )}
                                  <span
                                    className={`px-2 py-1 text-xs font-medium rounded ${
                                      issue.is_published
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {issue.is_published ? "Published" : "Draft"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalDetailPage;
