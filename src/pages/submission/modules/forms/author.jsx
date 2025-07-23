
import AddAuthorModal from "@/components/ui/authorModal";
import { Breadcrumb } from "@/components/ui/breadCrumb";
import { useState } from "react";


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
            This study investigates [insert research topic or objective], addressing key gaps in the existing literature on [relevant field or subject]. Utilizing a [qualitative/quantitative/mixed-methods] approach, we analyze [data sources, experimental methods, or theoretical frameworks] to explore [specific research questions or hypotheses]. Preliminary findings indicate that [summarize key results or trends], suggesting implications for [theory, practice, or policy]. The study contributes to [disciplinary field] by [highlighting novel insights, methodologies, or applications]. Limitations and directions for future research are also discussed.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <input
              type="text"
              placeholder="Search email of your co-author"
              className="flex-1 border-4 border-gray-300 rounded-lg p-2 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>

          {hasSearched && (
            <div className="mt-8">
              <h1 className="text-2xl font-bold">Search Results</h1>
              <p className="text-sm text-gray-500 mt-4">
                {authorExists ? (
                  <>Author found: <strong>{searchTerm}</strong></>
                ) : (
                  <>No Co-Author found with email <strong>{searchTerm}</strong>. Add a new co-author to continue.</>
                )}
              </p>
            </div>
          )}

          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors mt-8"
          
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
