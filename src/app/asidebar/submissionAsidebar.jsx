// import {
//   modifyExpand,
//   modifyHighlight,
// } from "@/store/feature/submission/slice";
// import {
//   Tag,
//   BookOpen,
//   ChevronDown,
//   FileText,
//   ChevronRight,
//   CircleCheckBigIcon,
//   HelpCircle,
//   Users,
//   User,
//   Eye,
//   Send,
// } from "lucide-react";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// function SubmissionAsidebar() {
//   const { expandedSections, savedSteps, hightLightedItem } = useSelector(
//     (state) => state["submission"]
//   );

//   console.log(hightLightedItem);
//   const dispatch = useDispatch();

//   const sidebarItems = [
//     {
//       id: "getting-started",
//       label: "Getting Started",
//       items: [
//         {
//           id: "articletype",
//           label: "Article Type",
//           icon: Tag,
//           link: "intro-section",
//         },
//       ],
//     },
//     {
//       id: "content",
//       label: "Content",
//       items: [
//         { id: "intro", label: "Title, etc.", icon: FileText },
//         {
//           id: "authors",
//           label: "Authors",
//           icon: Users,
//           link: "authors",
//         },
//         {
//           id: "article",
//           label: "Article",
//           icon: FileText,
//           link: "article-sections",
//           sub: [
//             { id: 1, label: "Introduction" },
//             { id: 2, label: "Result" },
//           ],
//         },
//         { id: "reviewers", label: "Reviewers", icon: User, link: "reviewers" },
//         {
//           id: "refference",
//           label: "References",
//           icon: BookOpen,
//           link: "reffrences",
//         },
//         { id: "summary", label: "Summary", icon: FileText, link: "summary" },
//         { id: "submit", label: "Submit", icon: Send },
//       ],
//     },
//   ];

//   const toggleSection = (sectionId) => {
//     const newExpanded = new Set(expandedSections);
//     if (newExpanded.has(sectionId)) {
//       newExpanded.delete(sectionId);
//     } else {
//       newExpanded.add(sectionId);
//     }
//     dispatch(modifyExpand(newExpanded));
//   };

//   return (
//     <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
//       <div className="p-4">
//         <div className="text-sm text-gray-500 mb-4">Type: Original Article</div>

//         {sidebarItems.map((section) => (
//           <div key={section.id} className="mb-2">
//             <button
//               onClick={() => toggleSection(section.id)}
//               className="flex items-center justify-between w-full p-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
//             >
//               <span className="font-medium text-gray-700">{section.label}</span>
//               {expandedSections.has(section.id) ? (
//                 <ChevronDown className="w-4 h-4 text-gray-400" />
//               ) : (
//                 <ChevronRight className="w-4 h-4 text-gray-400" />
//               )}
//             </button>

//             {expandedSections.has(section.id) && (
//               <div className="ml-4 mt-1 space-y-1">
//                 {section.items.map((item) => (
//                   <Link
//                     onClick={() => dispatch(modifyHighlight(item.id))}
//                     to={item.link}
//                     key={item.id}
//                     className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group"
//                   >
//                     <item.icon className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
//                     <span
//                       className={`text-sm ${
//                         item.id === hightLightedItem
//                           ? "text-blue-600 font-medium"
//                           : "text-gray-600"
//                       }`}
//                     >
//                       {item.label}
//                     </span>
//                     {savedSteps.some((obj) => obj[item.id] === true) && (
//                       <CircleCheckBigIcon className="w-4 h-4 text-green-500 ml-auto animate-in slide-in-from-right-2 duration-300" />
//                     )}
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Help Section */}
//       <div className="border-t border-gray-200 p-4 mt-8">
//         <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer mb-2">
//           <HelpCircle className="w-4 h-4" />
//           <span className="text-sm">How-to & Info</span>
//         </div>
//         <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer">
//           <BookOpen className="w-4 h-4" />
//           <span className="text-sm">Author Guide</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SubmissionAsidebar;

import { useGetArticleSectionsQuery } from "@/services/features/submission/submissionApi";
import {
  modifyExpand,
  modifyHighlight,
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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

function SubmissionAsidebar() {
  const { expandedSections, savedSteps, hightLightedItem } = useSelector(
    (state) => state["submission"]
  );

  const [queryParams] = useSearchParams()

  const { data: articlePreSections } = useGetArticleSectionsQuery({
    article_id: queryParams.get('article_id') || 0,
  });

  const articleSection =
    articlePreSections &&
    articlePreSections.data.map((sec, ind) => {
      return {
        id: sec.section_title,
        label: sec.section_title.toUpperCase(),
        link: `${sec.section_title}-section`,
      };
    });

  // State to manage expanded sub-items (for sub-subcategories)
  const [expandedSubItems, setExpandedSubItems] = useState(new Set());

  const dispatch = useDispatch();

  const sidebarItems = [
    {
      id: "getting-started",
      label: "Getting Started",
      items: [
        {
          id: "articletype",
          label: "Article Type",
          icon: Tag,
          link: "intro-section",
        },
      ],
    },
    {
      id: "content",
      label: "Content",
      items: [
        { id: "intro", label: "Title, etc.", icon: FileText },
        { id: "articleDetails", label: "Article Details", icon: TypeOutline, link: "article-details" },
        {
          id: "authors",
          label: "Authors",
          icon: Users,
          link: "authors",
        },
        {
          id: "article",
          label: "Article",
          icon: FileText,
          link: "article-sections",
          sub: articleSection,
        },
        { id: "reviewers", label: "Reviewers", icon: User, link: "reviewers" },
        {
          id: "refference",
          label: "References",
          icon: BookOpen,
          link: "reffrences",
        },
        { id: "summary", label: "Summary", icon: FileText, link: "summary" },
        { id: "submit", label: "Submit", icon: Send },
      ],
    },
  ];

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
                subsubItem.id === hightLightedItem
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
        {subItems.map((subItem) => (
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
                    subItem.id === hightLightedItem
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
                          item.id === hightLightedItem
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
                    {item.sub && renderSubItems(item.sub, item.id)}
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
