import React, { useState, useMemo } from "react";
import {
  ChevronUp,
  ChevronDown,
  Filter,
  Search,
  Calendar,
  User,
  Mail,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
} from "lucide-react";
import { useGetAllEditorsQuery } from "@/services/features/editors/slice";
import AssignEditorPopup from "./modules/AssignEditorPopup";

const AssignEditorPage = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filterText, setFilterText] = useState("");
  const [classificationFilter, setClassificationFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [editorId, setEditorId] = useState(0);

  const { data: editors } = useGetAllEditorsQuery({})

  const assignEditor = (editor_id) => {
    setIsAssignOpen(true);
    setEditorId(editor_id)
  };

  // Sample data matching the original screenshot
  const [reviewers] = useState([
    {
      id: 1,
      name: "Iftikhar Ahmed",
      email: "editor@jpmsonline.com",
      classification: "Basic Medical Sciences",
      currentAssignments: 101,
      availableNext60Days: "Yes",
      totalAssigned: 266,
      agreed: 121,
      declined: 1,
      completed: 20,
      underProcess: 101,
      pendingInvitation: 0,
      unassignedTerminated: 144,
      lastAssignmentAssigned: "08/01/2025",
      lastAssignmentAgreed: "08/01/2025",
    },
    {
      id: 2,
      name: "Dr. Amit Sachdeva",
      email: "dramitsachdeva2410@gmail.com",
      classification: "Preventive and Community Medicine",
      currentAssignments: 0,
      availableNext60Days: "Yes",
      totalAssigned: 47,
      agreed: 1,
      declined: 1,
      completed: 1,
      underProcess: 0,
      pendingInvitation: 0,
      unassignedTerminated: 45,
      lastAssignmentAssigned: "01/09/2025",
      lastAssignmentAgreed: "10/04/2024",
    },
    {
      id: 3,
      name: "Adawia Fadhel Abbas Alzubaidi",
      email: "adawiaAlzubaidi.2015@gmail.com",
      classification:
        "Basic Medical Sciences, Clinical Sciences, Medical Research and Education",
      currentAssignments: 1,
      availableNext60Days: "Yes",
      totalAssigned: 7,
      agreed: 2,
      declined: 0,
      completed: 1,
      underProcess: 1,
      pendingInvitation: 0,
      unassignedTerminated: 5,
      lastAssignmentAssigned: "05/13/2025",
      lastAssignmentAgreed: "05/13/2025",
    },
  ]);

  const [selectedReviewer, setSelectedReviewer] = useState(reviewers[0]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronUp className="w-4 h-4 text-gray-400" />;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4 text-gray-600" />
    ) : (
      <ChevronDown className="w-4 h-4 text-gray-600" />
    );
  };

  const filteredAndSortedReviewers = useMemo(() => {
    let filtered = reviewers.filter((reviewer) => {
      const matchesText =
        reviewer.name.toLowerCase().includes(filterText.toLowerCase()) ||
        reviewer.email.toLowerCase().includes(filterText.toLowerCase());
      const matchesClassification =
        !classificationFilter ||
        reviewer.classification
          .toLowerCase()
          .includes(classificationFilter.toLowerCase());
      const matchesAvailability =
        !availabilityFilter ||
        reviewer.availableNext60Days
          .toLowerCase()
          .includes(availabilityFilter.toLowerCase());
      return matchesText && matchesClassification && matchesAvailability;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [
    reviewers,
    sortConfig,
    filterText,
    classificationFilter,
    availabilityFilter,
  ]);

  const StatCard = ({ icon: Icon, label, value, color = "gray" }) => (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100">
      <Icon className={`w-5 h-5 text-${color}-600`} />
      <div className="flex-1">
        <div className="text-xs text-gray-600 font-medium">{label}</div>
        <div className="font-semibold text-gray-900">{value}</div>
      </div>
    </div>
  );

  return (
      <div className="w-full bg-white shadow-sm overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 p-3">          
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <div className="text-sm text-gray-600 mb-2">
              Case Number: JPM5968691
            </div>
            <div className="text-gray-700 font-medium leading-relaxed">
              Title: Clinical Characteristics and Procedural Outcomes of
              Esophageal Varices in Pediatric Patients: A Retrospective Review
              from a Tertiary Hospital in Saudi Arabia
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 p-8">
            {/* Filters */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name or email..."
                      value={filterText}
                      onChange={(e) => setFilterText(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-gray-50 text-gray-700 placeholder-gray-500"
                    />
                  </div>
                </div>
                <div className="min-w-48">
                  <select
                    value={classificationFilter}
                    onChange={(e) => setClassificationFilter(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-gray-50"
                  >
                    <option value="">All Classifications</option>
                    <option value="Basic Medical Sciences">
                      Basic Medical Sciences
                    </option>
                    <option value="Preventive and Community Medicine">
                      Preventive and Community Medicine
                    </option>
                    <option value="Clinical Sciences">Clinical Sciences</option>
                    <option value="Medical Research and Education">
                      Medical Research and Education
                    </option>
                  </select>
                </div>
                <div className="min-w-32">
                  <select
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-gray-50"
                  >
                    <option value="">All Availability</option>
                    <option value="Yes">Available</option>
                    <option value="No">Not Available</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="border border-gray-100 rounded-2xl bg-white">
              <div
                className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                style={{ scrollbarWidth: "thin" }}
              >
                <table className="w-full min-w-[1200px]">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 w-[120px]">
                        Action
                      </th>
                      <th
                        className="px-4 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors w-[200px]"
                        onClick={() => handleSort("name")}
                      >
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Name
                          {getSortIcon("name")}
                        </div>
                      </th>
                      <th
                        className="px-4 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors w-[280px]"
                        onClick={() => handleSort("email")}
                      >
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email
                          {getSortIcon("email")}
                        </div>
                      </th>
                      <th
                        className="px-4 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors w-[300px]"
                        onClick={() => handleSort("classification")}
                      >
                        <div className="flex items-center gap-2">
                          Classification
                          {getSortIcon("classification")}
                        </div>
                      </th>
                      <th
                        className="px-4 py-4 text-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors w-[140px]"
                        onClick={() => handleSort("currentAssignments")}
                      >
                        <div className="flex items-center justify-center gap-2">
                          Current Assignments
                          {getSortIcon("currentAssignments")}
                        </div>
                      </th>
                      <th
                        className="px-4 py-4 text-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors w-[140px]"
                        onClick={() => handleSort("totalAssigned")}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Users className="w-4 h-4" />
                          Total Assignments
                          {getSortIcon("totalAssigned")}
                        </div>
                      </th>
                      <th
                        className="px-4 py-4 text-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors w-[200px]"
                        onClick={() => handleSort("availableNext60Days")}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Availability
                          {getSortIcon("availableNext60Days")}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {editors && editors.data.map((reviewer, ind) => (
                      <tr
                        key={ind}
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => setSelectedReviewer(reviewer)}
                      >
                        <td className="px-4 py-4">
                          <button onClick={()=> assignEditor(reviewer.editor_id)} className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap">
                            Assign
                          </button>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900 font-medium">
                          {reviewer.editor_name}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">
                          {reviewer.editor_email}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700">
                          <div title={reviewer.classification}>
                            {reviewer.classification}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900 text-center font-semibold">
                          {reviewer.currentAssignments}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900 text-center font-semibold">
                          {reviewer.totalAssigned}
                        </td>
                        <td className="px-4 py-4 text-sm text-center">
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                              reviewer.is_active
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {reviewer.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Scroll Indicator */}
              <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500 text-center border-t border-gray-100">
                ← Scroll horizontally to view all columns →
              </div>
            </div>

            {filteredAndSortedReviewers.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No reviewers found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Assignment Details Panel */}
          <div className="w-80 hidden bg-gray-50 border-l border-gray-100 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Assignment Details
              </h3>
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {selectedReviewer.name}
                </div>
                <div className="text-xs text-gray-600">
                  {selectedReviewer.email}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <StatCard
                icon={Users}
                label="Total Assigned"
                value={`(${selectedReviewer.totalAssigned})`}
                color="gray"
              />
              <StatCard
                icon={CheckCircle}
                label="Agreed"
                value={`(${selectedReviewer.agreed})`}
                color="green"
              />
              <StatCard
                icon={XCircle}
                label="Declined"
                value={`(${selectedReviewer.declined})`}
                color="red"
              />
              <StatCard
                icon={Award}
                label="Completed"
                value={`(${selectedReviewer.completed})`}
                color="purple"
              />
              <StatCard
                icon={Clock}
                label="Under Process"
                value={`(${selectedReviewer.underProcess})`}
                color="yellow"
              />
              <StatCard
                icon={Mail}
                label="Pending Invitation"
                value={`(${selectedReviewer.pendingInvitation})`}
                color="orange"
              />
              <StatCard
                icon={AlertCircle}
                label="Unassigned/Terminated"
                value={`(${selectedReviewer.unassignedTerminated})`}
                color="gray"
              />
            </div>

            <div className="mt-6 space-y-3">
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="text-xs text-gray-600 mb-1 font-medium">
                  Last Assignment Assigned On
                </div>
                <div className="text-sm font-medium text-gray-900">
                  ({selectedReviewer.lastAssignmentAssigned})
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="text-xs text-gray-600 mb-1 font-medium">
                  Last Assignment Agreed
                </div>
                <div className="text-sm font-medium text-gray-900">
                  ({selectedReviewer.lastAssignmentAgreed})
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="mt-6  bg-white rounded-xl p-4 border border-gray-100">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Quick Summary
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="font-semibold text-gray-700">
                    {selectedReviewer.totalAssigned}
                  </div>
                  <div className="text-gray-600">Total</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
                  <div className="font-semibold text-green-700">
                    {selectedReviewer.agreed}
                  </div>
                  <div className="text-gray-600">Agreed</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                  <div className="font-semibold text-yellow-700">
                    {selectedReviewer.underProcess}
                  </div>
                  <div className="text-gray-600">Active</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="font-semibold text-purple-700">
                    {selectedReviewer.completed}
                  </div>
                  <div className="text-gray-600">Done</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AssignEditorPopup isOpen={isAssignOpen} editor_id={editorId} onClose={setIsAssignOpen} />
      </div>
   
  );
};

export default AssignEditorPage;
