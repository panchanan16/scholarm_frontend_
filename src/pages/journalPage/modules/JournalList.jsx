import { useState, useEffect, useRef } from "react";
import {
  Filter,
  Eye,
  Edit,
  MoreHorizontal,
  Calendar,
  User,
  FileText,
} from "lucide-react";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import DecisonEditor from "@/components/Decision/DecisonEditor";
import DecisonReviewer from "@/components/Decision/DecisonReviewer";
import JournalReviewDropDown from "@/components/JournalReviewDropdown/JournalReviewDropdown";
import { AdminLayout } from "@/components/layout/AdminLayout";
import useRenderManuscript from "@/hooks/useRenderManuscript";
import DescisionAdmin from "@/components/Decision/DecisionAdmin";

const JournalListTable = () => {
  const [queryParams] = useSearchParams();
  const [statusFilter, setStatusFilter] = useState(queryParams.get("status"));
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpenReviewerDecision, setIsOpenReviewerDecision] = useState(false);
  const [isOpenEditorDecision, setIsOpenEditorDecision] = useState(false);
  const [isOpenAdminDecision, setIsOpenAdminDecision] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const [articleId, setArticleId] = useState(null);
  const dropdownRef = useRef(null);

  // Page meta data ---
  const user = { role: "reviewer", userId: 1 };
  const type = queryParams.get("type");

  // Call data ---
  const { manuscriptsData } = useRenderManuscript({
    role: user.role,
    status: statusFilter,
    editorStatus: queryParams.get("editorStatus"),
    userId: user.userId,
    completed: queryParams.get("complete"),
    reviewerStatus: queryParams.get("reviewerStatus"),
  });

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

  function handleReviewerDescision(article_id) {
    setIsOpenReviewerDecision(true);
    setArticleId(article_id);
  }

  function handleEditorDescision(article_id) {
    setIsOpenEditorDecision(true);
    setArticleId(article_id);
  }

    function handlePublisherDescision(article_id) {
    setIsOpenAdminDecision(true);
    setArticleId(article_id);
  }

  // handle actions ---
  const handleDropdownAction = (action, manuscript) => {
    switch (action) {
      case "handleViewDetails":
        // Handle view details
        console.log("Viewing details for:", manuscript.intro_id);
        break;

      case "handleEditorDecision":
        // Handle editor decision
        handleEditorDescision(manuscript.intro_id);
        break;

      case "handleReviewerDecision":
        // Handle reviewer decision
        handleReviewerDescision(manuscript.intro_id);
        break;

      case "handlePublisherDecision":
        // Handle publisher decision
        handlePublisherDescision(manuscript.intro_id);
        break;

      case "handleShare":
        // Handle share
        console.log("Sharing manuscript:", manuscript.intro_id);
        break;

      case "handleArchive":
        // Handle archive
        console.log("Archiving manuscript:", manuscript.intro_id);
        break;

      case "handleFlag":
        // Handle flag for review
        console.log("Flagging manuscript:", manuscript.intro_id);
        break;

      case "handleDelete":
        // Handle delete with confirmation
        if (
          window.confirm("Are you sure you want to delete this manuscript?")
        ) {
          console.log("Deleting manuscript:", manuscript.intro_id);
        }
        break;

      default:
        console.warn("Unknown action:", action);
    }

    // Close dropdown after action
    setOpenDropdown(null);
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

  const truncateText = (text, maxLength) => {
    if (text?.length <= maxLength) return text;
    return text?.substring(0, maxLength) + "...";
  };

  const toggleDropdown = (manuscriptId, event) => {
    event.stopPropagation();
    setOpenDropdown(openDropdown === manuscriptId ? null : manuscriptId);
  };

  return (
    <AdminLayout>
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
        <div className="overflow-x-auto min-h-112">
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
                            openDropdown === manuscript.intro_id
                              ? dropdownRef
                              : null
                          }
                        >
                          <button
                            onClick={(e) =>
                              toggleDropdown(manuscript.intro_id, e)
                            }
                            className="text-gray-600 hover:text-gray-800 p-1 rounded-md hover:bg-gray-50 transition-colors"
                            title="More Options"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>

                          {/* Dropdown Menu */}
                          {openDropdown === manuscript.intro_id && (
                            <JournalReviewDropDown
                              manuscript={manuscript}
                              userRole="admin"
                              onAction={handleDropdownAction}
                            />
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
      </div>
      {manuscriptsData && (
        <>
          <DecisonEditor
            isOpen={isOpenEditorDecision}
            onClose={setIsOpenEditorDecision}
            article_id={articleId}
            editor_id={1}
          />
          <DecisonReviewer
            isOpen={isOpenReviewerDecision}
            onClose={setIsOpenReviewerDecision}
            article_id={articleId}
          />

          <DescisionAdmin
            isOpen={isOpenAdminDecision}
            onClose={setIsOpenAdminDecision}
            article_id={articleId}
          />
        </>
      )}
      <Outlet />
    </AdminLayout>
  );
};

export default JournalListTable;
