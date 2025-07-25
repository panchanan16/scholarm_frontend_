import AddAuthorModal from "@/components/ui/authorModal";
import { Breadcrumb } from "@/components/ui/breadCrumb";
import { useState } from "react";
import AddedAuthors from "../AddedAuthors";

export default function Author() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [authorExists, setAuthorExists] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [workDone, setWorkDone] = useState(false);

  const handleAddAuthor = () => {
    setWorkDone(true);
  };

  const existingAuthors = ["jane@example.com", "john@university.edu"];

  const handleSearch = () => {
    setHasSearched(true);
    const found = existingAuthors.includes(searchTerm.trim().toLowerCase());
    setAuthorExists(found);

    if (!found) {
      setShowModal(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Breadcrumb title="Author" content="Add Co-Author" />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Add Co-Author</h1>
          <p className="text-sm text-gray-500 mt-4">
            This study investigates [insert research topic or objective],
            addressing key gaps in the existing literature on [relevant field or
            subject].
          </p>

          <div className="mt-5 bg-gray-50 p-6 rounded-lg">
            <div className="flex space-x-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search email of your co-author"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium flex items-center space-x-2"
              >
                <span>Search</span>
              </button>
            </div>
          </div>

          {hasSearched && (
            <div className="mt-8">
              <h1 className="text-2xl font-bold">Search Results</h1>
              <p className="text-sm text-gray-500 mt-4">
                {authorExists ? (
                  <>
                    Author found: <strong>{searchTerm}</strong>
                  </>
                ) : (
                  <>
                    No Co-Author found with email <strong>{searchTerm}</strong>.
                    Add a new co-author to continue.
                  </>
                )}
              </p>
            </div>
          )}

          <AddedAuthors />

          <button
            className="px-4 py-2 mt-5 text-white bg-gray-800 rounded-md hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => HandleAddAuthor()}
          >
            Save and Continue
          </button>
        </div>
      </div>
      <AddAuthorModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        email={searchTerm}
      />
    </div>
  );
}
