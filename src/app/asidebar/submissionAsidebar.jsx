import { modifyExpand } from "@/store/feature/submission/slice";
import {
  Tag,
  BookOpen,
  ChevronDown,
  FileText,
  ChevronRight,
  CircleCheckBigIcon,
  HelpCircle,
  Users,
  User,
  Eye,
  Send,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SubmissionAsidebar() {
  const [highlight, setHighlight] = useState("");
  const { expandedSections, savedSteps } = useSelector(
    (state) => state["submission"]
  );
  const dispatch = useDispatch();

  const sidebarItems = [
    {
      id: "getting-started",
      label: "Getting Started",
      items: [{ id: "articletype", label: "Article Type", icon: Tag, link: "intro-section" }],
    },
    {
      id: "content",
      label: "Content",
      items: [
        { id: "intro", label: "Title, etc.", icon: FileText },
        {
          id: "authors",
          label: "Authors",
          icon: Users,
          link: "authors",
        },
        { id: "article", label: "Article", icon: FileText, link: "article-sections" },
        { id: "reviewers", label: "Reviewers", icon: User, link: "reviewers" },
        { id: "refference", label: "References", icon: BookOpen, link: "reffrences" },
        { id: "summary", label: "Summary", icon: FileText, link: "summary" },
        { id: "submit", label: "Submit", icon: Send },
      ],
    },
  ];

  const toggleSection = (sectionId) => {
    console.log(expandedSections)
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    dispatch(modifyExpand(newExpanded));
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-4">Type: Original Article</div>

        {sidebarItems.map((section) => (
          <div key={section.id} className="mb-2">
            <button
              onClick={() => toggleSection(section.id)}
              className="flex items-center justify-between w-full p-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span className="font-medium text-gray-700">{section.label}</span>
              {expandedSections.has(section.id) ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </button>

            {expandedSections.has(section.id) && (
              <div className="ml-4 mt-1 space-y-1">
                {section.items.map((item) => (
                  <Link
                    onClick={() => setHighlight(item.id)}
                    to={item.link}
                    key={item.id}
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group"
                  >
                    <item.icon className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    <span
                      className={`text-sm ${
                        item.id === highlight
                          ? "text-blue-600 font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {item.label}
                    </span>
                    {savedSteps.some((obj) => obj[item.id] === true) && (
                      <CircleCheckBigIcon className="w-4 h-4 text-green-500 ml-auto animate-in slide-in-from-right-2 duration-300" />
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Help Section */}
      <div className="border-t border-gray-200 p-4 mt-8">
        <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer mb-2">
          <HelpCircle className="w-4 h-4" />
          <span className="text-sm">How-to & Info</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer">
          <BookOpen className="w-4 h-4" />
          <span className="text-sm">Author Guide</span>
        </div>
      </div>
    </div>
  );
}

export default SubmissionAsidebar;
