import { useGetArticleSectionsQuery } from "@/services/features/submission/submissionApi";
import {
  modifyExpand,
  modifyHighlight,
  resetArticlePresection,
} from "@/store/feature/submission/slice";
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
  Send,
  TypeOutline,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams, useLocation } from "react-router-dom";

function SubmissionAsidebar() {
  const { expandedSections, savedSteps, hightLightedItem } = useSelector(
    (state) => state["submission"]
  );

  const [queryParams] = useSearchParams();
  const article_id = queryParams.get("article_id") || 0;
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    data: articlePreSections,
  } = useGetArticleSectionsQuery({
    article_id: article_id,
  });

  const articleSection = useMemo(() => {
    if (!article_id || !articlePreSections) return [];
    return articlePreSections.data.map((sec) => ({
      id: sec.section_title,
      label: sec.section_title.toUpperCase(),
      link: `${sec.section_title}-section?article_id=${article_id}`,
    }));
  }, [article_id, articlePreSections]);
  useEffect(() => {
    if (articleSection) {
      dispatch(resetArticlePresection(articleSection));
    }
  }, [article_id, articleSection]);

  // State to manage expanded sub-items (for sub-subcategories)
  const [expandedSubItems, setExpandedSubItems] = useState(new Set());

  const sidebarItems = [
    {
      id: "getting-started",
      label: "Getting Started",
      items: [
        {
          id: "articletype",
          label: "Article Type",
          icon: Tag,
          link: `intro-section?article_id=${article_id}`,
        },
      ],
    },
    {
      id: "content",
      label: "Content",
      items: [
        {
          id: "intro",
          label: "Title, etc.",
          icon: FileText,
          link: `article-title?article_id=${article_id}`,
        },
        {
          id: "articleDetails",
          label: "Article Details",
          icon: TypeOutline,
          link: `article-details?article_id=${article_id}`,
        },
        {
          id: "authors",
          label: "Authors",
          icon: Users,
          link: `authors?article_id=${article_id}`,
        },
        {
          id: "article",
          label: "Article",
          icon: FileText,
          link:
            article_id &&
            articlePreSections &&
            `article-sections/${articlePreSections?.data[0]?.section_title}-section?article_id=${article_id}`,
          sub: articleSection ? articleSection : [],
        },
        {
          id: "reviewers",
          label: "Reviewers",
          icon: User,
          link: `reviewers?article_id=${article_id}`,
        },
        {
          id: "refference",
          label: "References",
          icon: BookOpen,
          link: `reffrences?article_id=${article_id}`,
        },
        {
          id: "summary",
          label: "Summary",
          icon: FileText,
          link: `summary?article_id=${article_id}`,
        },
        { id: "submit", label: "Submit", icon: Send },
      ],
    },
  ];

  // Function to check if current URL matches the link
  const isCurrentPath = (link) => {
    if (!link) return false;

    // Extract the base path without query parameters
    const currentPath = location.pathname;
    const linkPath = link.split("?")[0];

    return currentPath.includes(linkPath) || currentPath === `/${linkPath}`;
  };

  // Function to check if any sub-item is active
  const hasActiveSubItem = (subItems) => {
    if (!subItems) return false;
    return subItems.some((subItem) =>
      isCurrentPath(`article-sections/${subItem.link}`)
    );
  };

  // Function to get the active item ID based on current URL
  const getActiveItemId = () => {
    const currentPath = location.pathname;

    // Check all sections and items for matches
    for (const section of sidebarItems) {
      for (const item of section.items) {
        // Check main items
        if (item.link && isCurrentPath(item.link)) {
          return item.id;
        }

        // Check sub items
        if (item.sub) {
          for (const subItem of item.sub) {
            if (isCurrentPath(`article-sections/${subItem.link}`)) {
              return subItem.id;
            }
          }
        }
      }
    }

    return hightLightedItem; // fallback to Redux state
  };

  // Update highlighted item based on current URL
  useEffect(() => {
    const activeItemId = getActiveItemId();
    if (activeItemId && activeItemId !== hightLightedItem) {
      dispatch(modifyHighlight(activeItemId));
    }
  }, [location.pathname, dispatch, hightLightedItem]);

  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    dispatch(modifyExpand(newExpanded));
  };

  const toggleSubItem = (subItemId) => {
    const newExpandedSub = new Set(expandedSubItems);
    if (newExpandedSub.has(subItemId)) {
      newExpandedSub.delete(subItemId);
    } else {
      newExpandedSub.add(subItemId);
    }
    setExpandedSubItems(newExpandedSub);
  };

  const renderSubSubItems = (subsubItems, parentId) => {
    return (
      <div className="ml-6 mt-1 space-y-1">
        {subsubItems.map((subsubItem) => (
          <Link
            onClick={() => dispatch(modifyHighlight(subsubItem.id))}
            to={subsubItem.link}
            key={subsubItem.id}
            className="flex items-center gap-2 p-1.5 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group"
          >
            <div className="w-2 h-2 bg-gray-300 rounded-full group-hover:bg-gray-400"></div>
            <span
              className={`text-xs ${
                subsubItem.id === hightLightedItem ||
                isCurrentPath(subsubItem.link)
                  ? "text-blue-600 font-medium"
                  : "text-gray-500"
              }`}
            >
              {subsubItem.label}
            </span>
            {savedSteps.some((obj) => obj[subsubItem.id] === true) && (
              <CircleCheckBigIcon className="w-3 h-3 text-green-500 ml-auto animate-in slide-in-from-right-2 duration-300" />
            )}
          </Link>
        ))}
      </div>
    );
  };

  const renderSubItems = (subItems, parentId) => {
    return (
      <div className="ml-6 mt-1 space-y-1">
        {subItems.length &&
          subItems.map((subItem) => (
            <div key={subItem.id}>
              <div className="flex items-center">
                {subItem.subsub && (
                  <button
                    onClick={() => toggleSubItem(subItem.id)}
                    className="p-1 hover:bg-gray-50 rounded"
                  >
                    {expandedSubItems.has(subItem.id) ? (
                      <ChevronDown className="w-3 h-3 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                    )}
                  </button>
                )}
                <Link
                  onClick={() => dispatch(modifyHighlight(subItem.id))}
                  to={`article-sections/${subItem.link}`}
                  className="flex items-center gap-2 p-1.5 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group flex-1"
                >
                  <div className="w-2 h-2 bg-gray-400 rounded-full group-hover:bg-gray-600"></div>
                  <span
                    className={`text-sm ${
                      subItem.id === hightLightedItem ||
                      isCurrentPath(`article-sections/${subItem.link}`)
                        ? "text-blue-600 font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    {subItem.label}
                  </span>
                  {savedSteps.some((obj) => obj[subItem.id] === true) && (
                    <CircleCheckBigIcon className="w-4 h-4 text-green-500 ml-auto animate-in slide-in-from-right-2 duration-300" />
                  )}
                </Link>
              </div>
              {subItem.subsub &&
                expandedSubItems.has(subItem.id) &&
                renderSubSubItems(subItem.subsub, subItem.id)}
            </div>
          ))}
      </div>
    );
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
                  <div key={item.id}>
                    <Link
                      onClick={() => dispatch(modifyHighlight(item.id))}
                      to={item.link}
                      className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group"
                    >
                      <item.icon className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                      <span
                        className={`text-sm ${
                          item.id === hightLightedItem ||
                          isCurrentPath(item.link) ||
                          hasActiveSubItem(item.sub)
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
                    {item.sub &&
                      item.sub.length > 0 &&
                      renderSubItems(item.sub, item.id)}
                  </div>
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
