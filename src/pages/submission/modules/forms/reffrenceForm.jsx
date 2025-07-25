import React, { useRef, useState } from "react";
import {
  Edit3,
  Trash2,
  ChevronDown,
  FileText,
  Book,
  Globe,
  Users,
  CheckSquare,
  Square,
  Plug2Icon,
  PlusCircleIcon,
} from "lucide-react";
import TextEditor from "@/components/TextEditor";

const ReferenceManager = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [isConverterOpen, setIsConverterOpen] = useState(false);
  const [isAddref, setIsAddRef] = useState(false);
  const [converterText, setConverterText] = useState("");
  const [selectedItems, setSelectedItems] = useState(new Set());
  const refContent = useRef();

  const [references, setReferences] = useState([
    {
      id: 1,
      type: "research-paper",
      title: "Machine Learning Applications in Healthcare Diagnostics",
      authors: "Smith, J.A., Johnson, M.K., Williams, R.L.",
      journal: "Journal of Medical Technology",
      year: "2024",
      volume: "15",
      pages: "234-251",
      doi: "10.1234/jmt.2024.15.234",
      status: "published",
    },
    {
      id: 2,
      type: "conference-paper",
      title: "Sustainable Energy Solutions for Urban Infrastructure",
      authors: "Davis, P.R., Thompson, S.M.",
      conference: "International Conference on Green Technology",
      year: "2023",
      pages: "45-62",
      location: "Berlin, Germany",
      status: "peer-reviewed",
    },
    {
      id: 3,
      type: "book-chapter",
      title: "Advanced Data Analytics in Financial Markets",
      authors: "Brown, K.E., Miller, A.J., Wilson, T.C.",
      book: "Modern Financial Technology Handbook",
      editor: "Anderson, L.M.",
      publisher: "Academic Press",
      year: "2024",
      pages: "178-205",
      status: "in-press",
    },
    {
      id: 4,
      type: "web-resource",
      title: "Global Climate Change Database",
      organization: "World Climate Research Institute",
      url: "https://climate-data.org/global-trends",
      accessDate: "2024-03-15",
      status: "online",
    },
  ]);

  const handleSelectItem = (id) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedItems.size === references.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(references.map((ref) => ref.id)));
    }
  };

  const handleRemoveSelected = () => {
    setReferences(references.filter((ref) => !selectedItems.has(ref.id)));
    setSelectedItems(new Set());
  };

  const handleEdit = (id) => {
    console.log("Edit reference:", id);
  };

  const handleDelete = (id) => {
    setReferences(references.filter((ref) => ref.id !== id));
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleLaunchConverter = () => {
    setIsConverterOpen(!isConverterOpen);
    setIsAddRef(false);
  };

  const handleReffAdder = () => {
    setIsConverterOpen(false);
    setIsAddRef(!isAddref);
  };

  const handleConvertReferences = () => {
    const content = refContent.current.getContent();
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const count = doc.querySelectorAll('a[href^="#ref-"]');
    const reffs = extractListItemsFromOL(content)
    console.log(count[0], reffs);
  };

  // Function to extract list items from OL tags
  const extractListItemsFromOL = (htmlContent) => {
    if (!htmlContent) return [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    const orderedLists = doc.querySelectorAll("ol");
    const result = [];

    orderedLists.forEach((ol, olIndex) => {
      const listItems = ol.querySelectorAll("li");
      const items = [];

      listItems.forEach((li, liIndex) => {
        items.push({
          index: liIndex + 1,
          text: li.textContent.trim(),
          html: li.innerHTML.trim(),
        });
      });

      result.push({
        listIndex: olIndex + 1,
        items: items,
      });
    });

    return result;
  };

  const filteredReferences =
    selectedType === "all"
      ? references
      : references.filter((ref) => ref.type === selectedType);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between">
          {/* Launch Converter Button */}
          <div className="flex-1">
            <button
              onClick={handleLaunchConverter}
              className="w-full lg:w-auto px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              LAUNCH REFERENCE CONVERTER
            </button>
          </div>

          {/* Type Selector */}
          <div>
            <div className="relative">
              <button
                onClick={handleReffAdder}
                className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100  transition-colors"
              >
                Add New Reffrence
                <PlusCircleIcon className={`w-5 h-5 text-gray-400`} />
              </button>
            </div>
          </div>
        </div>

        {/* Converter Text Area */}
        {isAddref && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Add a single refference:
              </label>
              <textarea
                value={converterText}
                onChange={(e) => setConverterText(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Add a reffrence here..."
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => setIsConverterOpen(false)}
                  className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConvertReferences}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Convert & Add
                </button>
              </div>
            </div>
          </div>
        )}
        {isConverterOpen && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Paste your references here{" "}
                <span className="text-red-600">
                  (copy from only word doc not from pdf)
                </span>
                :
              </label>
              <TextEditor editorRef={refContent} />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => setIsConverterOpen(false)}
                  className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConvertReferences}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Convert & Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSelectAll}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            {selectedItems.size === references.length ? (
              <CheckSquare className="w-5 h-5" />
            ) : (
              <Square className="w-5 h-5" />
            )}
            <span className="font-medium">Select All</span>
          </button>

          {selectedItems.size > 0 && (
            <button
              onClick={handleRemoveSelected}
              className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-medium"
            >
              Remove Selected ({selectedItems.size})
            </button>
          )}
        </div>

        <div className="text-sm text-gray-500">
          Showing {filteredReferences.length} of {references.length} references
        </div>
      </div>

      {/* References Grid */}
      <div className="grid gap-6">
        {filteredReferences.map((ref, index) => (
          <div
            key={ref.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start space-x-4">
                {/* Selection Checkbox */}
                <button
                  onClick={() => handleSelectItem(ref.id)}
                  className="mt-1 flex-shrink-0"
                >
                  {selectedItems.has(ref.id) ? (
                    <CheckSquare className="w-5 h-5 text-blue-500" />
                  ) : (
                    <Square className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>

                {/* Reference Number */}
                <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-semibold text-gray-600">
                    {index + 1}
                  </span>
                </div>

                {/* Reference Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-md font-semibold text-gray-700 mb-2 leading-tight">
                        {ref.title}
                      </h3>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(ref.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(ref.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredReferences.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No references found
          </h3>
          <p className="text-gray-500">
            Try selecting a different reference type or add some references.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReferenceManager;
