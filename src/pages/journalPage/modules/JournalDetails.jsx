import { useGetManuscriptReviewDetailsQuery } from "@/services/features/manuscript/slice";
import {
  ChevronDown,
  ChevronLeft,
  Clock,
  FileText,
  MessageSquare,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function JournalDetails({}) {
  const [expandedRounds, setExpandedRounds] = useState({});
  const [expandedReviewers, setExpandedReviewers] = useState({});
  const selectedManuscript = {
    id: "JPMS752574",
    articleType: "Research Article",
    issueType: "Regular Issue",
    title:
      "Comparative Effects of Pram Walking Combined with Aerobic Exercise Versus Pram Walking Alone on Postpartum Depression: A Randomized Controlled Trial",
    authors: ["Dr. Jeslin G N", "Dr. Pavithra Sakthivel"],
    submissionDate: "06/07/2025",
    statusDate: "06/07/2025",
    status: "Accepted",
    editor: "M.E: Editor:",
    abstract:
      "Background: Postpartum depression (PPD) is a prevalent mental health challenge affecting many women after childbirth, characterized by mood swings, sadness, and irritability. These symptoms can impair both maternal and infant well-being. Among various intervention strategies, physical exercise has emerged as a promising remedy, offering significant psychological and physiological benefits. Aim: This randomized controlled trial aims to evaluate the effects of a 12-week structured exercise program that includes pram walking and aerobic exercises on postpartum women experiencing PPD symptoms. The study focuses specifically on changes in physical activity levels, psychological symptoms, and overall wellbeing throughout the last 12 months. Results: Fifty-two participants engaged in the intervention, performing exercises at 60-70% of their maximum capacity, three times a week. Physical activity levels, assessed via the International Physical Activity Questionnaire (IPAQ), showed a significant increase from 803.85 to 1273.08 post-intervention. Moreover, depressive symptoms, measured using the Edinburgh Postnatal Depression Scale (EPDS), exhibited a notable decrease from 14.77 to 6.46. Conclusion: The findings indicate that the structured exercise program effectively enhances physical fitness and substantially reduces symptoms of postpartum depression, highlighting its importance for maternal mental health.",
    submissionDateTime: "6/7/2025 5:44:18 PM",
    reviewRounds: [
      {
        round: 1,
        status: "Accepted",
        date: "07/01/2025",
        reviewers: [
          {
            name: "K R Gopalan",
            status: "Review Completed",
            decision: "Accept",
            assignedDate: "06/09/2025",
            agreedDate: "06/09/2025",
            dueDate: "06/19/2025",
            completedDate: "06/18/2025",
            comments:
              "This manuscript presents a well-designed randomized controlled trial examining the effects of structured exercise programs on postpartum depression. The methodology is sound and the statistical analysis is appropriate. I recommend acceptance with minor revisions.",
            editorComments: "Ensure to have 3 internal citations from VOS😊",
            generalComments:
              "The study addresses an important clinical question and provides valuable insights into postpartum depression management. The sample size is adequate and the intervention protocol is clearly described. Overall, this is a solid contribution to the literature.",
          },
          {
            name: "C M Selvamuthu",
            status: "Review Completed",
            decision: "Accept",
            assignedDate: "06/09/2025",
            agreedDate: "06/10/2025",
            dueDate: "06/19/2025",
            completedDate: "06/19/2025",
            comments:
              "Well structured manuscript with clear methodology. The authors have followed proper clinical trial protocols and the results are presented effectively.",
            editorComments:
              "Minor formatting issues need to be addressed in the references section.",
            generalComments:
              "This research contributes significantly to our understanding of exercise interventions for postpartum depression. The discussion section effectively contextualizes the findings within existing literature.",
          },
        ],
      },
    ],
  };

  const { article_id } = useParams();

  const { data: manuscriptDetails } =
    useGetManuscriptReviewDetailsQuery(article_id);

  const navigate = useNavigate();

  const toggleRound = (roundIndex) => {
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
          </div>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
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
                    {selectedManuscript.submissionDateTime}
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
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-medium">
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

          {/* Assigned editor */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {manuscriptDetails &&
              manuscriptDetails.data.AssignEditor.map((editor, index) => (
                <div className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-violet-50 to-indigo-50 transition-colors">
                  <h3 className="text-lg font-semibold text-violet-600 flex items-center gap-2">
                    Editor
                  </h3>
                  <p className="text-gray-600 font-medium">
                    {editor?.editor.editor_name}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>
                        Status:{" "}
                        <span className="font-medium">
                          {editor?.is_accepted}
                        </span>
                      </span>
                      <span>
                        Date:{" "}
                        <span className="font-medium">{"22/02/2001"}</span>
                      </span>
                      <span>
                        Date:{" "}
                        <span className="font-medium">{"22/02/2001"}</span>
                      </span>
                      <span>
                        Date:{" "}
                        <span className="font-medium">{"22/02/2001"}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Review Rounds */}
          {[1, 2, 3, 4, 5].map((round, roundIndex) => {
            return (
              manuscriptDetails &&
              manuscriptDetails.data.AssignReviewer.filter((revRound)=> revRound.round == round).map((round, roundIndex) => (
                <div key={roundIndex} className="space-y-4">
                  {/* Round Header - Collapsible */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleRound(roundIndex)}
                      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
                        Round {round.round}
                      </h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>
                            Status:{" "}
                            <span className="font-medium">{round.status}</span>
                          </span>
                          <span>
                            Date:{" "}
                            <span className="font-medium">{round.date}</span>
                          </span>
                        </div>
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
                        {/* Publisher Comments */}
                        <div className="mb-6">
                          <div className="bg-blue-50 border border-blue-200 rounded p-3">
                            <h4 className="text-sm font-semibold text-blue-700 mb-2">
                              Publisher Comments
                            </h4>
                            <div className="flex gap-6 text-sm">
                              <div>
                                <span className="font-medium text-gray-600">
                                  Status:
                                </span>
                                <span className="ml-2 text-gray-900">
                                  {round.status}
                                </span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">
                                  Date:
                                </span>
                                <span className="ml-2 text-gray-900">
                                  {round.date}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

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
                                  Due Date
                                </th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">
                                  Completed Date
                                </th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {round.reviewers.map(
                                (reviewer, reviewerIndex) => (
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
                                          {reviewer.name}
                                        </span>
                                        <span className="bg-yellow-200 text-yellow-800 px-1 py-0.5 rounded text-xs">
                                          Proxy
                                        </span>
                                      </div>
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2 text-sm">
                                      {reviewer.status}
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
                                      {reviewer.dueDate}
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2 text-sm">
                                      {reviewer.completedDate}
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                                        Edit | View Reviewer Status
                                      </button>
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>

                        {/* Individual Reviewer Comments Sections - Collapsible */}
                        <div className="space-y-4">
                          {round.reviewers.map((reviewer, reviewerIndex) => {
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
                                      {reviewer.name}
                                    </span>
                                    <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs">
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
                                    {/* Reviewer Info Table */}
                                    <div className="mb-4 overflow-x-auto">
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
                                              Decision
                                            </th>
                                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">
                                              Assigned Date
                                            </th>
                                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">
                                              Agreed Date
                                            </th>
                                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">
                                              Due Date
                                            </th>
                                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">
                                              Completed Date
                                            </th>
                                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">
                                              Action
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr className="bg-gray-50">
                                            <td className="border border-gray-300 px-3 py-2">
                                              <div className="flex items-center gap-2">
                                                <span className="text-blue-600 font-medium">
                                                  {reviewer.name}
                                                </span>
                                                <span className="bg-yellow-200 text-yellow-800 px-1 py-0.5 rounded text-xs">
                                                  Proxy
                                                </span>
                                              </div>
                                            </td>
                                            <td className="border border-gray-300 px-3 py-2">
                                              {reviewer.status}
                                            </td>
                                            <td className="border border-gray-300 px-3 py-2">
                                              {reviewer.decision}
                                            </td>
                                            <td className="border border-gray-300 px-3 py-2">
                                              {reviewer.assignedDate}
                                            </td>
                                            <td className="border border-gray-300 px-3 py-2">
                                              {reviewer.agreedDate}
                                            </td>
                                            <td className="border border-gray-300 px-3 py-2">
                                              {reviewer.dueDate}
                                            </td>
                                            <td className="border border-gray-300 px-3 py-2">
                                              {reviewer.completedDate}
                                            </td>
                                            <td className="border border-gray-300 px-3 py-2">
                                              <button className="text-blue-600 hover:text-blue-800">
                                                View
                                              </button>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>

                                    {/* Comments For Editor */}
                                    <div className="mb-4">
                                      <h5 className="text-sm font-semibold text-gray-700 mb-2">
                                        Comments For Editor
                                      </h5>
                                      <div className="border border-gray-300 rounded p-3 bg-gray-50 text-sm text-gray-700 min-h-[60px]">
                                        {reviewer.comments ||
                                          "No comments provided"}
                                      </div>
                                    </div>

                                    {/* General Comments */}
                                    <div className="mb-4">
                                      <h5 className="text-sm font-semibold text-gray-700 mb-2">
                                        Comments
                                      </h5>
                                      <div className="border border-gray-300 rounded p-3 bg-gray-50 text-sm text-gray-700 min-h-[60px]">
                                        {reviewer.editorComments ||
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
              ))
            );
          })}

          {/* Back Button */}
          <div className="flex justify-end gap-5 pt-4 border-t border-gray-200">
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
