import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Check,
  ArrowLeft,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useGetFilteredJournalMutation } from "@/services/features/journal/journalApi";

const JournalFinder = () => {
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [filteredJournals, setFilteredJournals] = useState([])

  const [getFilteredJournals] = useGetFilteredJournalMutation();

  const specializations = [
    "Nurology",
    "Community Medicine",
    "yoga",
    "Laboratory Physicians",
    "Clinical Practice",
    "Pathology",
    "Cardiology",
    "Dermatology",
    "Orthopedics",
    "Pediatrics",
  ];

  const handleSpecializationToggle = (specialization) => {
    setSelectedSpecializations((prev) =>
      prev.includes(specialization)
        ? prev.filter((s) => s !== specialization)
        : [...prev, specialization]
    );
  };

  const handleFindJournal = async () => {
    setSearchTriggered(true);
    const journals = await getFilteredJournals({
      journal_type: selectedSpecializations,
    }).unwrap();
    setFilteredJournals(journals && journals.data ? journals.data : []);
    console.log(journals)
  };

  const getPublicationTypeColor = (type) => {
    switch (type) {
      case "Open Access":
        return "bg-green-100 text-green-800 border-green-200";
      case "Subscription":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Hybrid":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Home</span>
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Saturday, September 6, 2025
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Journal Finder
          </h1>
          <p className="text-lg text-gray-600">
            Discover academic journals tailored to your research specializations
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Filter className="w-4 h-4 inline mr-2" />
                Select Specializations
              </label>

              {/* Custom Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-left flex items-center justify-between hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <span className="text-gray-700">
                    {selectedSpecializations.length > 0
                      ? `${selectedSpecializations.length} specializations selected`
                      : "Select specializations"}
                  </span>
                  {isDropdownOpen ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                    {specializations.map((specialization) => (
                      <label
                        key={specialization}
                        className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSpecializations.includes(
                            specialization
                          )}
                          onChange={() =>
                            handleSpecializationToggle(specialization)
                          }
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-3 transition-colors ${
                            selectedSpecializations.includes(specialization)
                              ? "bg-blue-500 border-blue-500"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedSpecializations.includes(specialization) && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span className="text-gray-700">{specialization}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Selected Tags */}
              {selectedSpecializations.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedSpecializations.map((spec) => (
                    <span
                      key={spec}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 border border-blue-200"
                    >
                      {spec}
                      <button
                        onClick={() => handleSpecializationToggle(spec)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleFindJournal}
              disabled={selectedSpecializations.length === 0}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
            >
              <Search className="w-5 h-5" />
              <span>Find Journals</span>
            </button>
          </div>
        </div>

        {/* Results Section */}
        {searchTriggered && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results ({filteredJournals.length} journals found)
              </h2>
            </div>

            {filteredJournals.length > 0 ? (
              <div className="grid gap-6">
                {filteredJournals.map((journal) => (
                  <div
                    key={journal.journal_id}
                    className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {journal.journal_name}
                        </h3>
                        <p className="text-gray-600 mb-3">
                          ({journal.journal_code})
                        </p>

                        {/* Specializations */}
                        <div className="mb-4">
                          <span className="text-sm font-medium text-gray-500 mb-2 block">
                            Specializations:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {journal.journal_type.map((spec, index) => (
                              <span
                                key={`${journal.id}-${spec}-${index}`}
                                className={`px-3 py-1 rounded-full text-sm font-medium border ${
                                  selectedSpecializations.includes(spec)
                                    ? "bg-blue-100 text-blue-800 border-blue-200 ring-2 ring-blue-300"
                                    : "bg-gray-100 text-gray-700 border-gray-200"
                                }`}
                              >
                                {spec}
                                {selectedSpecializations.includes(spec) && (
                                  <span className="ml-1 text-blue-600">✓</span>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Link
                        to={`/journal/${journal.journal_code}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Go to Journal
                      </Link>
                    </div>

                    {/* Journal Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          ISSN
                        </span>
                        <p className="text-gray-900 font-mono">
                          {journal.issn}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          E-ISSN
                        </span>
                        <p className="text-gray-900 font-mono">
                          {journal.eissn}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Impact Factor
                        </span>
                        <p className="text-gray-900 font-semibold">
                          {journal.impact}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Publication Type
                        </span>
                        <span
                          className={`inline-block px-2 py-1 rounded-md text-xs font-medium border ${getPublicationTypeColor(
                            journal.publicationType
                          )}`}
                        >
                          {journal.publicationType}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No journals found
                </h3>
                <p className="text-gray-600">
                  Try selecting different specializations or check back later
                  for new journals.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalFinder;
