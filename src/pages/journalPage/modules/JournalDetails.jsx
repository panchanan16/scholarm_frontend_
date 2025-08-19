import { useAuth } from "@/hooks/useAuth";
import { useToastMutation } from "@/hooks/useNotification";
import {
  useGetManuscriptReviewDetailsQuery,
  useUpdateAssignMentStatusEditorMutation,
  useUpdateAssignMentStatusReviewerMutation,
} from "@/services/features/manuscript/slice";
import { filterbyUserRole } from "@/utils/filterByUserRole";
import groupByRound from "@/utils/handleReviewRound";
import {
  ChevronDown,
  ChevronLeft,
  Clock,
  FileText,
  MessageSquare,
  User,
  X,
  Check,
  XCircle,
  Download,
  Eye,
  File,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function JournalDetails() {
  const [expandedRounds, setExpandedRounds] = useState({});
  const [expandedReviewers, setExpandedReviewers] = useState({});
  const [expandedEditors, setExpandedEditors] = useState({});

  const { article_id } = useParams();
  const { user: userInfo } = useAuth();
  // console.log(userN?.[`${userN.role}_id`]);

  const user = userInfo ? { role: userInfo?.['role'], userId: userInfo?.[`${userInfo.role}_id`] } : null

  const { data: manuscriptDetails } =
    useGetManuscriptReviewDetailsQuery(article_id);

  // Current User Info ---
  const paramData = user && manuscriptDetails
    ? user.role == "reviewer"
      ? manuscriptDetails.data.AssignReviewer
      : manuscriptDetails.data.AssignEditor
    : [];

  const UserDataInfo = user && filterbyUserRole(paramData, user?.role, user?.userId);
  
  // Status Update by Editor ---
  const [updateStatusEditor] = useToastMutation(
    useUpdateAssignMentStatusEditorMutation(),
    { showLoading: true }
  );

  // Status Update by Reviewer ---
  const [updateStatusReviewer] = useToastMutation(
    useUpdateAssignMentStatusReviewerMutation(),
    { showLoading: true }
  );

  const navigate = useNavigate();

  const toggleRound = (roundIndex, items) => {
    setExpandedRounds((prev) => ({
      ...prev,
      [roundIndex]: !prev[roundIndex],
    }));
  };

  const toggleReviewer = (roundIndex, reviewerIndex) => {
    const key = `${roundIndex}-${reviewerIndex}`;
    setExpandedReviewers((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleEditor = (editorIndex) => {
    setExpandedEditors((prev) => ({
      ...prev,
      [editorIndex]: !prev[editorIndex],
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Editor Invited":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Under Review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "Review Completed":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAcceptanceStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "invited":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Handler functions for Accept and Reject buttons for Editor
  const handleEditorStatus = async (type) => {
    if (user) {
      await updateStatusEditor({
        editor_id: user.userId,
        article_id: Number(article_id),
        status: type === "accepted" ? "accepted" : "rejected",
      });
    }
  };

  // Handler functions for Accept and Reject buttons for Reviewer
  const handleReviewerStatus = async (type) => {
    await updateStatusReviewer({
      reviewer_id: user.userId,
      article_id: Number(article_id),
      is_accepted: type === "accepted" ? "accepted" : "rejected",
    });
  };

  // Mock function to handle file download/view
  const handleFileAction = (file, action) => {
    if (action === "download") {
      // Implement file download logic
      console.log("Downloading file:", file);
    } else if (action === "view") {
      // Implement file view logic
      console.log("Viewing file:", file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Reviewer Reports
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Case Number:{" "}
              {manuscriptDetails && manuscriptDetails.data.case_number}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              User : {user.role.toUpperCase()}
            </p>
          </div>

          {/* Accept and Reject buttons for editors only */}
          <div className="flex items-center gap-3">
            {/* Status For Editor */}
            {user.role === "editor" &&
              UserDataInfo?.is_accepted === "invited" && (
                <>
                  <button
                    onClick={() => handleEditorStatus("accepted")}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
                  >
                    <Check className="h-4 w-4" />
                    Accept
                  </button>
                  <button
                    onClick={() => handleEditorStatus("rejected")}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
                  >
                    <XCircle className="h-4 w-4" />
                    Reject
                  </button>
                </>
              )}

            {/* Status For Reviewer */}
            {user.role === "reviewer" &&
              UserDataInfo?.is_accepted === "invited" && (
                <>
                  <button
                    onClick={() => handleReviewerStatus("accepted")}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
                  >
                    <Check className="h-4 w-4" />
                    Accept
                  </button>
                  <button
                    onClick={() => handleReviewerStatus("rejected")}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
                  >
                    <XCircle className="h-4 w-4" />
                    Reject
                  </button>
                </>
              )}
            <button
              onClick={() => navigate(-1)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[80vh] space-y-6">
          {/* Article Detail Section */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Article Detail
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Case Number
                  </label>
                  <p className="text-sm text-gray-900 font-mono bg-white px-3 py-2 rounded border">
                    {manuscriptDetails && manuscriptDetails.data.case_number}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Title
                  </label>
                  <p className="text-sm text-gray-900 bg-white px-3 py-2 rounded border">
                    {manuscriptDetails && manuscriptDetails.data.title}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Submission Date
                  </label>
                  <p className="text-sm text-gray-900 bg-white px-3 py-2 rounded border flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    6/7/2025 5:44:18 PM
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Status
                  </label>
                  <div className="mt-1">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                        manuscriptDetails &&
                          manuscriptDetails.data.article_status
                      )}`}
                    >
                      {manuscriptDetails &&
                        manuscriptDetails.data.article_status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Authors
                  </label>
                  <div className="space-y-2 mt-1">
                    {manuscriptDetails &&
                      manuscriptDetails.data.articleAuthors.map(
                        (author, index) => (
                          <div
                            key={index}
                            className="bg-white px-3 py-2 rounded border flex items-center gap-2"
                          >
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-900">
                              {author?.author?.author_fname}{" "}
                              {author?.author?.author_lname}
                            </span>
                            <span className="bg-yellow-100 cursor-pointer text-yellow-800 px-2 py-0.5 rounded text-xs font-medium">
                              Proxy
                            </span>
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm font-medium text-gray-600">
                Abstract
              </label>
              <div className="mt-2 bg-white p-4 rounded border text-sm text-gray-700 leading-relaxed max-h-32 overflow-y-auto">
                {manuscriptDetails && manuscriptDetails.data.abstract}
              </div>
            </div>
          </div>

          {/* Assigned Editor - Updated Expandable Section */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {manuscriptDetails &&
              manuscriptDetails.data?.AssignEditor?.map((editor, index) => (
                <div key={index}>
                  {/* Editor Header - Clickable */}
                  <button
                    onClick={() => toggleEditor(index)}
                    className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-violet-50 to-indigo-50 hover:from-violet-100 hover:to-indigo-100 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-violet-600 flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Editor
                    </h3>
                    <div className="flex items-center gap-4">
                      <p className="text-gray-700 font-medium">
                        {editor?.editor.editor_name}
                      </p>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getAcceptanceStatusColor(
                          editor?.is_accepted
                        )}`}
                      >
                        {editor?.is_accepted || "Pending"}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                          expandedEditors[index] ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Editor Expanded Content */}
                  {expandedEditors[index] && (
                    <div className="p-6 border-t border-gray-200 bg-white space-y-6">
                      {/* Editor Details Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300 text-sm">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">
                                Name
                              </th>
                              <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">
                                Status
                              </th>
                              <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">
                                Assigned Date
                              </th>
                              <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">
                                Response Date
                              </th>
                              <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">
                                Decision Date
                              </th>
                              <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">
                                No. days
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 px-3 py-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-violet-600 font-medium">
                                    {editor?.editor.editor_name}
                                  </span>
                                </div>
                              </td>
                              <td className="border border-gray-300 px-3 py-2">
                                <span
                                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getAcceptanceStatusColor(
                                    editor?.is_accepted
                                  )}`}
                                >
                                  {editor?.is_accepted || "Pending"}
                                </span>
                              </td>
                              <td className="border border-gray-300 px-3 py-2">
                                {editor?.assigned_date || "22/02/2001"}
                              </td>
                              <td className="border border-gray-300 px-3 py-2">
                                {editor?.response_date || "25/02/2001"}
                              </td>
                              <td className="border border-gray-300 px-3 py-2">
                                {editor?.decision_date || "28/02/2001"}
                              </td>
                              <td className="border border-gray-300 px-3 py-2">
                                10
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Editor Comments Section */}
                      <div className="space-y-4">
                        <div>
                          <h5 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Editor Comments
                          </h5>
                          <div className="border border-gray-300 rounded p-3 bg-gray-50 text-sm text-gray-700 min-h-[80px]">
                            {editor?.comments || "No comment yet!"}
                          </div>
                        </div>
                      </div>

                      {/* Files Section */}
                      <div>
                        <h5 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                          <File className="h-4 w-4" />
                          Attached Files
                        </h5>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-blue-600" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  Editor_Review_Report.pdf
                                </p>
                                <p className="text-xs text-gray-500">
                                  245 KB • PDF • Uploaded 22/02/2001
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  handleFileAction(
                                    { name: "Editor_Review_Report.pdf" },
                                    "view"
                                  )
                                }
                                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                                title="View File"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() =>
                                  handleFileAction(
                                    { name: "Editor_Review_Report.pdf" },
                                    "download"
                                  )
                                }
                                className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors"
                                title="Download File"
                              >
                                <Download className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Additional Editor Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="font-medium text-gray-600">
                              Email:
                            </span>{" "}
                            <span className="text-gray-900">
                              {editor?.editor?.editor_email}
                            </span>
                          </p>
                          <p className="text-sm">
                            <span className="font-medium text-gray-600">
                              Affiliation:
                            </span>{" "}
                            <span className="text-gray-900">
                              {editor?.editor?.affiliation ||
                                "University Research Center"}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>

          {/* Review Rounds */}
          {groupByRound(
            manuscriptDetails ? manuscriptDetails.data.AssignReviewer : []
          ).map(({ round, items }, roundIndex) => (
            <div key={roundIndex} className="space-y-4">
              {/* Round Header - Collapsible */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleRound(roundIndex)}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
                    Round {round}
                  </h3>
                  <div className="flex items-center gap-4">
                    <ChevronDown
                      className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                        expandedRounds[roundIndex] ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Round Content - Collapsible */}
                {expandedRounds[roundIndex] && (
                  <div className="p-6 border-t border-gray-200">
                    {/* Reviewers Summary Table */}
                    <div className="mb-6 overflow-x-auto">
                      <table className="w-full border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">
                              Name
                            </th>
                            <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">
                              Status
                            </th>
                            <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">
                              Decision
                            </th>
                            <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">
                              Assigned Date
                            </th>
                            <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">
                              Agreed Date
                            </th>
                            <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">
                              No. days
                            </th>
                            <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">
                              Completed Date
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((reviewer, reviewerIndex) => (
                            <tr
                              key={reviewerIndex}
                              className={
                                reviewerIndex % 2 === 0
                                  ? "bg-gray-50"
                                  : "bg-white"
                              }
                            >
                              <td className="border border-gray-300 px-3 py-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-blue-600 font-medium">
                                    {reviewer.reviewer.reviewer_name}
                                  </span>
                                </div>
                              </td>
                              <td className="border border-gray-300 px-3 py-2 text-sm">
                                {reviewer.is_accepted}
                              </td>
                              <td className="border border-gray-300 px-3 py-2 text-sm">
                                {reviewer.decision}
                              </td>
                              <td className="border border-gray-300 px-3 py-2 text-sm">
                                {reviewer.assignedDate}
                              </td>
                              <td className="border border-gray-300 px-3 py-2 text-sm">
                                {reviewer.agreedDate}
                              </td>
                              <td className="border border-gray-300 px-3 py-2 text-sm">
                                {reviewer.no_days}
                              </td>
                              <td className="border border-gray-300 px-3 py-2 text-sm">
                                {reviewer.completedDate}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Individual Reviewer Comments Sections - Collapsible */}
                    <div className="space-y-4">
                      {items.map((reviewer, reviewerIndex) => {
                        const reviewerKey = `${roundIndex}-${reviewerIndex}`;
                        return (
                          <div
                            key={reviewerIndex}
                            className="border border-gray-200 rounded-lg overflow-hidden"
                          >
                            {/* Reviewer Header - Collapsible */}
                            <button
                              onClick={() =>
                                toggleReviewer(roundIndex, reviewerIndex)
                              }
                              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                              <h4 className="text-base font-semibold text-blue-600 flex items-center gap-2">
                                <MessageSquare className="h-4 w-4" />
                                Reviewer {reviewerIndex + 1} Comments
                              </h4>
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600">
                                  {reviewer.reviewer.reviewer_name}
                                </span>
                                <span className="bg-yellow-200 cursor-pointer text-yellow-800 px-2 py-1 rounded text-xs">
                                  Proxy
                                </span>
                                <ChevronDown
                                  className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                                    expandedReviewers[reviewerKey]
                                      ? "rotate-180"
                                      : ""
                                  }`}
                                />
                              </div>
                            </button>

                            {/* Reviewer Content - Collapsible */}
                            {expandedReviewers[reviewerKey] && (
                              <div className="p-4 border-t border-gray-200 bg-white">
                                {/* Comments For Editor */}
                                <div className="mb-4">
                                  <h5 className="text-sm font-semibold text-gray-700 mb-2">
                                    Comments For Editor
                                  </h5>
                                  <div className="border border-gray-300 rounded p-3 bg-gray-50 text-sm text-gray-700 min-h-[60px]">
                                    {reviewer.editor_comment ||
                                      "No comments provided"}
                                  </div>
                                </div>

                                {/* General Comments */}
                                <div className="mb-4">
                                  <h5 className="text-sm font-semibold text-gray-700 mb-2">
                                    Comments
                                  </h5>
                                  <div className="border border-gray-300 rounded p-3 bg-gray-50 text-sm text-gray-700 min-h-[60px]">
                                    {reviewer.comment ||
                                      "No additional comments"}
                                  </div>
                                </div>

                                {/* Files Section */}
                                <div>
                                  <h5 className="text-sm font-semibold text-gray-700 mb-2">
                                    Files
                                  </h5>
                                  <div className="border border-gray-300 rounded p-3 bg-gray-50 text-sm text-gray-600 min-h-[60px]">
                                    No files attached
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Back Button */}
          <div className="flex justify-end gap-5 pt-4 border-t border-gray-200 mb-10">
            <button
              onClick={() => navigate(-1)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              Post Decision
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              Assign Reviewer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JournalDetails;
