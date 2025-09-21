import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Eye,
  Edit,
  Calendar,
  User,
  FileText,
  Plus,
  ChevronDown,
  Settings,
  LogOut,
} from "lucide-react";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import useRenderManuscript from "@/hooks/useRenderManuscript";


const AuthorDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const itemsPerPage = 5;

  // Page meta data ---
  const { user: userInfo, logout, journal } = useAuth();
  const user = userInfo
    ? {
        role: userInfo?.["role"],
        userId: userInfo?.[`author_id`],
        name: `${userInfo?.["author_fname"]} ${userInfo?.["author_lname"]}`,
      }
    : null;

  // Call data ---
  const { manuscriptsData } = useRenderManuscript({
    role: user.role,
    ...(statusFilter !== "all" &&
      statusFilter !== "processed" && { status: statusFilter }),
    userId: user.userId,
    processed: statusFilter === "processed",
    journal: journal?.journal_id
    // completed: queryParams.get("completed"),
  });

  function handleProfile() {
    console.log("View profile");
    // Add your profile navigation logic here
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
              editorComments:
                "Ensure to have 3 internal citations from VOSðŸ˜Š",
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Editor Invited":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Under Review":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Accepted":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Rejected":
        return "bg-red-50 text-red-700 border-red-200";
      case "Review Completed":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const truncateText = (text, maxLength) => {
    if (text?.length <= maxLength) return text;
    return text?.substring(0, maxLength) + "...";
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            {/* Title and Stats */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  ScholarM
                </h1>
                <span className="text-blue-800">{journal?.journal_name}</span>
                <p className="text-sm text-gray-500">
                  {manuscriptsData ? manuscriptsData.data.length : 0} total
                  manuscripts
                </p>
              </div>
            </div>

            {/* User Profile and Action Buttons */}
            <div className="flex items-center space-x-4">
              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <Link
                  to={"/submission/intro-section"}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Submit New
                </Link>
              </div>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(true)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {/* Avatar */}
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-medium text-white">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="text-left hidden sm:block">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {user.role}
                    </div>
                  </div>

                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                {showProfileDropdown && (
                  <div
                    onMouseEnter={() => setShowProfileDropdown(true)}
                    onMouseLeave={() => setShowProfileDropdown(false)}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                  >
                    {/* User Info in Dropdown */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-sm font-medium text-white">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {user.email}
                          </div>
                          <div className="text-xs text-blue-600 capitalize font-medium">
                            {user.role}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <button
                        onClick={handleProfile}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <Settings className="w-4 h-4 mr-3 text-gray-400" />
                        View Profile
                      </button>

                      <button
                        onClick={() => logout(`/journal/${journal?.journal_code}`)}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4 mr-3 text-red-500" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search manuscripts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Filter */}
            <div className="md:w-64">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />               
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All</option>
                  <option value="incomplete">Incomplete Submission</option>
                  <option value="senttoauthor">Sent back to author</option>
                  <option value="processed">Processing</option>
                  <option value="revise">Sent for revision</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                  <option value="revise">Sent for revision</option>
                  <option value="processed">Revision being processed</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Case Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Article Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Authors
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {manuscriptsData &&
                  manuscriptsData?.data.map((manuscript, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                            {manuscript.case_number}
                          </div>
                          <div className="text-xs text-gray-500">
                            {manuscript.sub_class}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <div className="text-sm font-medium text-gray-900 mb-1">
                            {truncateText(manuscript.title, 80)}
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {manuscript.type}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="h-4 w-4 text-gray-500" />
                            </div>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
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
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
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
                        <div className="flex items-center justify-end space-x-2">
                          <Link target="_blank" to={`/submission/preview?article_id=${manuscript.intro_id}`}>
                            <button
                              className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition-colors"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          </Link>

                          <Link
                            to={`/submission/article-title?article_id=${manuscript.intro_id}`}
                          >
                            <button
                              className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded transition-colors"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(endIndex, filteredManuscripts.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">
                    {filteredManuscripts.length}
                  </span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === i + 1
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default AuthorDashboard;
