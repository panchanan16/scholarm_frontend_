import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Eye,
  Edit,
  MoreHorizontal,
  Calendar,
  User,
  FileText,
  Trash2,
  Share,
  Archive,
  Flag,
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { useGetManuscriptByStatusQuery } from "@/services/features/manuscript/slice";
import DecisonEditor from "@/components/Decision/DecisonEditor";
import DecisonReviewer from "@/components/Decision/DecisonReviewer";

const JournalListTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("newsubmission");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpenReviewerDecision, setIsOpenReviewerDecision] = useState(false);
  const [isOpenEditorDecision, setIsOpenEditorDecision] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const itemsPerPage = 5;

  // Call data ---
  const { data: manuscriptsData } = useGetManuscriptByStatusQuery({
    status: statusFilter,
  });
  console.log(manuscriptsData);

  // Handle outside click for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleReviewerDescision(params) {
    setIsOpenReviewerDecision(true);
  }

  function handleEditorDescision(params) {
    setIsOpenEditorDecision(true);
  }

  // Sample data with additional details for the modal
  const manuscripts = [
    {
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
    },
    {
      id: "JPMS124645",
      articleType: "Research Article",
      issueType: "Regular Issue",
      title:
        "ASSOCIATION OF SYSTEMIC CO-MORBIDITIES IN PATIENTS WITH TEMPOROMANDIBULAR DISORDER - A RETROSPECTIVE CLINICAL STUDY",
      authors: ["MADHUMITHA MAHALINGAM", "DEVIKA PILLAI"],
      submissionDate: "04/06/2025",
      statusDate: "04/06/2025",
      status: "Editor Invited",
      editor: "M.E: Editor:",
      abstract:
        "This retrospective clinical study examines the association between systemic co-morbidities and temporomandibular disorders (TMD) in a patient population. The research analyzes clinical data to identify patterns and correlations that may inform treatment approaches.",
      submissionDateTime: "4/6/2025 2:15:30 PM",
      reviewRounds: [],
    },
  ];

  // Filter manuscripts based on search term and status
  const filteredManuscripts = manuscripts.filter((manuscript) => {
    const matchesSearch =
      manuscript.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manuscript.authors.some((author) =>
        author.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      manuscript.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = manuscript.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredManuscripts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentManuscripts = filteredManuscripts.slice(startIndex, endIndex);

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

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const toggleDropdown = (manuscriptId, event) => {
    event.stopPropagation();
    setOpenDropdown(openDropdown === manuscriptId ? null : manuscriptId);
  };

  const handleDropdownAction = (action, manuscript, event) => {
    event.stopPropagation();
    setOpenDropdown(null);

    switch (action) {
      case "view":
        handleViewClick(manuscript);
        break;
      case "edit":
        console.log("Edit manuscript:", manuscript.id);
        break;
      case "delete":
        console.log("Delete manuscript:", manuscript.id);
        break;
      case "share":
        console.log("Share manuscript:", manuscript.id);
        break;
      case "archive":
        console.log("Archive manuscript:", manuscript.id);
        break;
      case "flag":
        console.log("Flag manuscript:", manuscript.id);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <FileText className="h-6 w-6 text-blue-600" />
                Manuscripts
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {manuscriptsData && manuscriptsData.data.length} manuscripts
                found
              </p>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search manuscripts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none bg-white"
                >
                  <option value="editorinvited">Editor Invited</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-80">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Case Number
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Article Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Authors
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {manuscriptsData &&
                manuscriptsData?.data.map((manuscript, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                        {manuscript.case_number}
                      </div>
                      <div className="text-xs text-gray-500">
                        {manuscript.sub_class}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <div className="text-sm font-medium text-gray-900 mb-1">
                          {truncateText(manuscript.title, 80)}
                        </div>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {manuscript.type}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm text-gray-900">
                            {manuscript.articleAuthors.length &&
                              `${manuscript.articleAuthors[0].author.author_fname} ${manuscript.articleAuthors[0].author.author_lname}`}
                          </div>
                          {manuscript.articleAuthors.length > 1 && (
                            <div className="text-xs text-gray-500">
                              +{manuscript.articleAuthors.length - 1} more
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div className="font-medium">
                            Sub: {manuscript.submissionDate}
                          </div>
                          <div className="text-xs text-gray-500">
                            Status: {manuscript.statusDate}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          manuscript.status
                        )}`}
                      >
                        {manuscript.article_status}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {manuscript.editor}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`${manuscript.intro_id}`}>
                          <button
                            className="text-blue-600 hover:text-blue-800 p-1 rounded-md hover:bg-blue-50 transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </Link>

                        <button
                          className="text-green-600 hover:text-green-800 p-1 rounded-md hover:bg-green-50 transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>

                        {/* More Options Dropdown */}
                        <div
                          className="relative"
                          ref={
                            openDropdown === manuscript.id ? dropdownRef : null
                          }
                        >
                          <button
                            onClick={(e) => toggleDropdown(manuscript.id, e)}
                            className="text-gray-600 hover:text-gray-800 p-1 rounded-md hover:bg-gray-50 transition-colors"
                            title="More Options"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>

                          {/* Dropdown Menu */}
                          {openDropdown === manuscript.id && (
                            <div className="absolute right-0 top-8 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-100">
                              <button
                                onClick={(e) =>
                                  handleDropdownAction("view", manuscript, e)
                                }
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                              >
                                <Eye className="h-4 w-4" />
                                View Details
                              </button>
                              <Link
                                to={`assign-editor?article_id=${manuscript.intro_id}`}
                              >
                                <button
                                  onClick={(e) =>
                                    handleDropdownAction("edit", manuscript, e)
                                  }
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                >
                                  <Edit className="h-4 w-4" />
                                  Invite Editor
                                </button>
                              </Link>
                              <Link
                                to={`assign-editor?article_id=${manuscript.intro_id}`}
                              >
                                <button
                                  onClick={(e) =>
                                    handleDropdownAction("edit", manuscript, e)
                                  }
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                >
                                  <Edit className="h-4 w-4" />
                                  Edit Manuscript
                                </button>
                              </Link>

                              <Link
                                to={`assign-reviewer?article_id=${manuscript.intro_id}`}
                              >
                                <button
                                  onClick={(e) =>
                                    handleDropdownAction("edit", manuscript, e)
                                  }
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                >
                                  <Edit className="h-4 w-4" />
                                  Invite Reviewer
                                </button>
                              </Link>

                              <button
                                onClick={(e) =>
                                  handleEditorDescision("edit", manuscript, e)
                                }
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                              >
                                <Edit className="h-4 w-4" />
                                Post Editor Descision
                              </button>

                              <button
                                onClick={(e) =>
                                  handleReviewerDescision("edit", manuscript, e)
                                }
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                              >
                                <Edit className="h-4 w-4" />
                                Reviewer Descision
                              </button>

                              <button
                                onClick={(e) =>
                                  handleDropdownAction("share", manuscript, e)
                                }
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                              >
                                <Share className="h-4 w-4" />
                                Share
                              </button>
                              <button
                                onClick={(e) =>
                                  handleDropdownAction("archive", manuscript, e)
                                }
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                              >
                                <Archive className="h-4 w-4" />
                                Archive
                              </button>
                              <button
                                onClick={(e) =>
                                  handleDropdownAction("flag", manuscript, e)
                                }
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                              >
                                <Flag className="h-4 w-4" />
                                Flag for Review
                              </button>

                              {/* Separator */}
                              <div className="border-t border-gray-100 my-1"></div>

                              <button
                                onClick={(e) =>
                                  handleDropdownAction("delete", manuscript, e)
                                }
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                              >
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredManuscripts.length)} of{" "}
              {filteredManuscripts.length} results
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <DecisonEditor isOpen={isOpenEditorDecision} onClose={setIsOpenEditorDecision} />
      <DecisonReviewer isOpen={isOpenReviewerDecision} onClose={setIsOpenReviewerDecision} />
      {/* Detail Modal */}
      <Outlet />
    </>
  );
};

export default JournalListTable;
