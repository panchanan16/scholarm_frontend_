// import React, { useState } from "react";
// import {
//   BookOpen,
//   Download,
//   Share2,
//   Bookmark,
//   Eye,
//   Calendar,
//   MapPin,
//   Mail,
//   ExternalLink,
//   Copy,
//   FileText,
//   BarChart3,
//   Users,
//   Quote,
//   Tag,
//   Globe,
//   Star,
//   MessageSquare,
//   ThumbsUp,
//   TrendingUp,
//   ChevronRight,
//   ChevronLeft,
// } from "lucide-react";
// import { useGetManuscriptForViewQuery } from "@/services/features/manuscript/slice";
// import { useSearchParams } from "react-router-dom";

// // Styled Article Content Component
// const ArticleContent = ({ children }) => (
//   <div
//     style={{
//       lineHeight: "1.7",
//       color: "#374151",
//     }}
//     className="article-content"
//   >
//     <style jsx>{`
//       .article-content h2 {
//         font-size: 2rem;
//         font-weight: 700;
//         color: #111827;
//         margin-bottom: 1rem;
//         margin-top: 2.5rem;
//       }

//       .article-content h2:first-child {
//         margin-top: 0;
//       }

//       .article-content h3 {
//         font-size: 1.25rem;
//         font-weight: 600;
//         color: #111827;
//         margin-bottom: 0.75rem;
//         margin-top: 1.5rem;
//       }

//       .article-content p {
//         margin-bottom: 1rem;
//         text-align: justify;
//         line-height: 1.7;
//         color: #374151;
//       }

//       .article-content em {
//         font-style: italic;
//       }

//       .article-content strong {
//         font-weight: 600;
//         color: #111827;
//       }

//       .article-content .reference-item {
//         display: flex;
//         margin-bottom: 1rem;
//         gap: 1rem;
//       }

//       .article-content .reference-number {
//         color: #6b7280;
//         font-weight: 500;
//         min-width: 2rem;
//         flex-shrink: 0;
//       }

//       .article-content .reference-text {
//         font-size: 0.875rem;
//         line-height: 1.6;
//         color: #374151;
//       }

//       .article-content .reference-text a {
//         color: #2563eb;
//         text-decoration: none;
//       }

//       .article-content .reference-text a:hover {
//         text-decoration: underline;
//       }

//       .article-content .funding-list {
//         margin-bottom: 0.5rem;
//       }

//       .article-content .funding-list p {
//         font-size: 0.875rem;
//         margin-bottom: 0.5rem;
//         text-align: left;
//       }

//       .article-content a[href^="#ref-"] {
//         color: #2563eb;
//         text-decoration: none;
//         cursor: pointer;
//       }

//       .article-content a[href^="#ref-"]:hover {
//         text-decoration: underline;
//       }
//     `}</style>
//     {children}
//   </div>
// );

// const PreviewArticlePage = () => {
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [queryParams] = useSearchParams();

//   const { data } = useGetManuscriptForViewQuery(queryParams.get("article_id"));
//   // console.log(data)

//   const journalData = data && data.data;

//   // console.log(data);
//   // Helper functions to format data
//   const formatKeywords = (keywordsString) => {
//     if (!keywordsString) return [];
//     return keywordsString.split(";").filter((keyword) => keyword.trim());
//   };

//   const handleShare = () => {
//     navigator.share?.({
//       title: journalData.title,
//       url: window.location.href,
//     });
//   };

//   const scrollToReference = (refId) => {
//     const element = document.getElementById(`ref-${refId}`);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth", block: "center" });
//     }
//   };

//   if (journalData) {
//     return (
//       <div className="min-h-screen bg-white">
//         {/* Header */}
//         <div className="bg-gray-600 text-white py-4 px-6 fixed top-0 w-full">
//           <div className="max-w-4xl mx-auto">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <div className="flex items-center space-x-2">
//                   <BookOpen className="w-5 h-5" />
//                   <span className="font-medium">Medical Journal</span>
//                 </div>
//                 <div className="text-sm opacity-90">
//                   Article {journalData.case_number}
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3">               
//                 <button
//                   onClick={handleShare}
//                   className="flex items-center space-x-1 px-3 py-1.5 rounded text-sm hover:bg-white hover:bg-opacity-10"
//                 >
//                   <Share2 className="w-4 h-4" />
//                   <span>Share</span>
//                 </button>
//                 <button className="flex items-center space-x-1 px-4 py-1.5 bg-blue-600 rounded hover:bg-blue-700 text-sm">
//                   <Download className="w-4 h-4" />
//                   <span>PDF</span>
//                 </button>
//                 <button className="flex items-center space-x-1 px-4 py-1.5 bg-blue-600 rounded hover:bg-blue-700 text-sm">
//                   <ChevronLeft className="w-4 h-4" />
//                   <span>Exit</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-4xl mx-auto px-6 py-8 mt-15">
//           {/* Journal Info */}
//           <div className="mb-6">
//             <div className="text-sm text-gray-600 mb-2">
//               <span className="font-medium">Medical Journal</span> • Case
//               Number: {journalData.case_number} • Type: {journalData.type}
//             </div>
//             <div className="text-sm text-gray-500">
//               Pages: {journalData.pages} • Status: {journalData.article_status}{" "}
//               • Category: {journalData.sub_class}
//             </div>
//           </div>

//           {/* Title */}
//           <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
//             {journalData.title}
//           </h1>

//           {/* Authors */}
//           <div className="mb-8">
//             <div className="space-y-4">
//               {journalData.articleAuthors &&
//                 journalData.articleAuthors.map((authorItem, index) => (
//                   <div key={index} className="flex items-start space-x-4">
//                     <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-600">
//                       {index + 1}
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-center space-x-2 mb-1">
//                         <h3 className="font-semibold text-gray-900">
//                           {authorItem.author.author_fname}{" "}
//                           {authorItem.author.author_lname}
//                         </h3>
//                         {authorItem.isMain && (
//                           <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
//                             ✉ Main Author
//                           </span>
//                         )}
//                       </div>
//                       <div className="flex items-center space-x-4 text-xs">
//                         <a
//                           href={`mailto:${authorItem.author.author_email}`}
//                           className="text-blue-600 hover:underline"
//                         >
//                           {authorItem.author.author_email}
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </div>

//           {/* DOI and Publication Info */}
//           <div className="border-t border-b border-gray-200 py-4 mb-8">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//               <div>
//                 <div className="text-gray-600 mb-2">
//                   <span className="font-medium">Article ID:</span>{" "}
//                   {journalData.case_number}
//                 </div>
//                 <div className="text-gray-600">
//                   Pages: {journalData.pages} 
//                   {journalData.revision_round}
//                 </div>
//               </div>
//               <div className="flex items-center space-x-6">
//                 <div className="flex items-center space-x-1">
//                   <FileText className="w-4 h-4 text-gray-500" />
//                   <span className="text-gray-600">
//                     Type: {journalData.type}
//                   </span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <Tag className="w-4 h-4 text-gray-500" />
//                   <span className="text-gray-600">
//                     Category: {journalData.sub_class}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Timeline - Only show if future data is available */}
//           {/* <div className="mb-8 text-sm text-gray-600">
//           <div className="flex items-center space-x-6">
//             <span>Submitted: Coming soon</span>
//             <ChevronRight className="w-4 h-4" />
//             <span>Under Review</span>
//           </div>
//         </div> */}

//           {/* Abstract */}
//           <div className="mb-10">
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">Abstract</h2>
//             <p className="text-gray-700 leading-relaxed text-justify mb-6">
//               {journalData.abstract}
//             </p>

//             <div className="mb-4">
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 Keywords
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {formatKeywords(journalData.keywords).map((keyword, index) => (
//                   <span
//                     key={index}
//                     className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
//                   >
//                     {keyword}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Main Article Content - Using actual sections */}
//           <ArticleContent>
//             {journalData.ArticleSection &&
//               journalData.ArticleSection.map((section, index) => (
//                 <div key={section.section_id}>
//                   <h2>
//                     {index + 1}. {section.section_title}
//                   </h2>
//                   <div
//                     dangerouslySetInnerHTML={{
//                       __html: section.Section_description,
//                     }}
//                     onClick={(e) => {
//                       if (
//                         e.target.tagName === "A" &&
//                         e.target.getAttribute("href")?.startsWith("#ref-")
//                       ) {
//                         e.preventDefault();
//                         const refId = e.target
//                           .getAttribute("href")
//                           .replace("#ref-", "");
//                         scrollToReference(refId);
//                       }
//                     }}
//                   />
//                 </div>
//               ))}

//             {/* References */}
//             {journalData.Reffences && journalData.Reffences.length > 0 && (
//               <>
//                 <h2>References</h2>
//                 {journalData.Reffences.map((reference, index) => (
//                   <div
//                     key={reference.ref_id}
//                     className="reference-item"
//                     id={`ref-${reference.reffrence_html_id}`}
//                   >
//                     <span className="reference-number">
//                       {reference.reffrence_html_id}.
//                     </span>
//                     <p className="reference-text">{reference.reffrence}</p>
//                   </div>
//                 ))}
//               </>
//             )}
//           </ArticleContent>        

//           {/* Copyright */}
//           <div className="border-t border-gray-200 pt-6">
//             <div className="text-sm text-gray-600">
//               <p className="mb-2">
//                 © 2024 The Authors. Published by Medical Journal Publishers.
//               </p>
//               <p>This article is available under standard academic license.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// };

// export default PreviewArticlePage;



import React, { useState } from "react";
import {
  BookOpen,
  Download,
  Share2,
  Bookmark,
  Eye,
  Calendar,
  MapPin,
  Mail,
  ExternalLink,
  Copy,
  FileText,
  BarChart3,
  Users,
  Quote,
  Tag,
  Globe,
  Star,
  MessageSquare,
  ThumbsUp,
  TrendingUp,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useGetManuscriptForViewQuery } from "@/services/features/manuscript/slice";
import { useSearchParams } from "react-router-dom";

// Styled Article Content Component
const ArticleContent = ({ children }) => (
  <div
    style={{
      lineHeight: "1.7",
      color: "#374151",
    }}
    className="article-content"
  >
    <style jsx>{`
      .article-content h2 {
        font-size: 2rem;
        font-weight: 700;
        color: #111827;
        margin-bottom: 1rem;
        margin-top: 2.5rem;
      }

      .article-content h2:first-child {
        margin-top: 0;
      }

      .article-content h3 {
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
        margin-bottom: 0.75rem;
        margin-top: 1.5rem;
      }

      .article-content p {
        margin-bottom: 1rem;
        text-align: justify;
        line-height: 1.7;
        color: #374151;
      }

      .article-content em {
        font-style: italic;
      }

      .article-content strong {
        font-weight: 600;
        color: #111827;
      }

      .article-content .reference-item {
        display: flex;
        margin-bottom: 1rem;
        gap: 1rem;
      }

      .article-content .reference-number {
        color: #6b7280;
        font-weight: 500;
        min-width: 2rem;
        flex-shrink: 0;
      }

      .article-content .reference-text {
        font-size: 0.875rem;
        line-height: 1.6;
        color: #374151;
      }

      .article-content .reference-text a {
        color: #2563eb;
        text-decoration: none;
      }

      .article-content .reference-text a:hover {
        text-decoration: underline;
      }

      .article-content .funding-list {
        margin-bottom: 0.5rem;
      }

      .article-content .funding-list p {
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
        text-align: left;
      }

      .article-content a[href^="#ref-"] {
        color: #2563eb;
        text-decoration: none;
        cursor: pointer;
      }

      .article-content a[href^="#ref-"]:hover {
        text-decoration: underline;
      }
    `}</style>
    {children}
  </div>
);

const PreviewArticlePage = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [queryParams] = useSearchParams();

  const { data } = useGetManuscriptForViewQuery(queryParams.get("article_id"));

  const journalData = data && data.data;

  // Helper functions to format data
  const formatKeywords = (keywordsString) => {
    if (!keywordsString) return [];
    return keywordsString.split(";").filter((keyword) => keyword.trim());
  };

  const handleShare = () => {
    navigator.share?.({
      title: journalData.title,
      url: window.location.href,
    });
  };

  const handlePDFDownload = () => {
    if (!journalData) return;

    const printWindow = window.open('', '_blank');
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${journalData.title}</title>
        <style>
          @page {
            margin: 1in;
            size: A4;
          }
          
          @media print {
            body {
              font-family: 'Times New Roman', serif;
              font-size: 12pt;
              line-height: 1.6;
              color: #000;
              background: white;
            }
            
            .no-print {
              display: none !important;
            }
          }
          
          body {
            font-family: 'Times New Roman', serif;
            font-size: 12pt;
            line-height: 1.6;
            color: #000;
            background: white;
            max-width: none;
            margin: 0;
            padding: 20px;
          }
          
          .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          
          .journal-info {
            font-size: 10pt;
            color: #666;
            margin-bottom: 10px;
          }
          
          .title {
            font-size: 18pt;
            font-weight: bold;
            margin: 20px 0;
            text-align: center;
          }
          
          .authors {
            margin-bottom: 20px;
          }
          
          .author {
            margin-bottom: 10px;
            font-size: 11pt;
          }
          
          .author-name {
            font-weight: bold;
          }
          
          .author-email {
            color: #666;
            font-size: 10pt;
          }
          
          .main-author {
            background: #f0f0f0;
            padding: 2px 8px;
            border-radius: 10px;
            font-size: 8pt;
            margin-left: 10px;
          }
          
          .publication-info {
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            padding: 15px 0;
            margin: 20px 0;
            font-size: 10pt;
          }
          
          .abstract {
            margin-bottom: 30px;
          }
          
          .abstract h2, .content h2 {
            font-size: 14pt;
            font-weight: bold;
            margin-top: 25px;
            margin-bottom: 10px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 5px;
          }
          
          .abstract p, .content p {
            text-align: justify;
            margin-bottom: 10px;
          }
          
          .keywords {
            margin-top: 15px;
          }
          
          .keywords h3 {
            font-size: 12pt;
            font-weight: bold;
            margin-bottom: 5px;
          }
          
          .keyword-list {
            font-style: italic;
          }
          
          .content h3 {
            font-size: 12pt;
            font-weight: bold;
            margin-top: 15px;
            margin-bottom: 8px;
          }
          
          .references {
            margin-top: 30px;
          }
          
          .reference-item {
            display: flex;
            margin-bottom: 8px;
            font-size: 10pt;
            line-height: 1.4;
          }
          
          .reference-number {
            font-weight: bold;
            min-width: 25px;
            flex-shrink: 0;
          }
          
          .reference-text {
            flex: 1;
          }
          
          .copyright {
            border-top: 1px solid #ccc;
            padding-top: 15px;
            margin-top: 30px;
            font-size: 10pt;
            color: #666;
          }
          
          .page-break {
            page-break-before: always;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="journal-info">Medical Journal</div>
          <div class="title">${journalData.title}</div>
        </div>
        
        <div class="journal-info">
          <strong>Medical Journal</strong> • Case Number: ${journalData.case_number} • Type: ${journalData.type}<br>
          Pages: ${journalData.pages} • Status: ${journalData.article_status} • Category: ${journalData.sub_class}
        </div>
        
        <div class="authors">
          <h3>Authors:</h3>
          ${journalData.articleAuthors ? journalData.articleAuthors.map((authorItem, index) => `
            <div class="author">
              <span class="author-name">${index + 1}. ${authorItem.author.author_fname} ${authorItem.author.author_lname}</span>
              ${authorItem.isMain ? '<span class="main-author">✉ Main Author</span>' : ''}
              <br>
              <span class="author-email">${authorItem.author.author_email}</span>
            </div>
          `).join('') : ''}
        </div>
        
        <div class="publication-info">
          <div><strong>Article ID:</strong> ${journalData.case_number}</div>
          <div><strong>Pages:</strong> ${journalData.pages}</div>
          <div><strong>Type:</strong> ${journalData.type}</div>
          <div><strong>Category:</strong> ${journalData.sub_class}</div>
        </div>
        
        <div class="abstract">
          <h2>Abstract</h2>
          <p>${journalData.abstract}</p>
          
          <div class="keywords">
            <h3>Keywords</h3>
            <div class="keyword-list">
              ${formatKeywords(journalData.keywords).join(', ')}
            </div>
          </div>
        </div>
        
        <div class="content">
          ${journalData.ArticleSection ? journalData.ArticleSection.map((section, index) => `
            <h2>${index + 1}. ${section.section_title}</h2>
            <div>${section.Section_description}</div>
          `).join('') : ''}
          
          ${journalData.Reffences && journalData.Reffences.length > 0 ? `
            <div class="references">
              <h2>References</h2>
              ${journalData.Reffences.map((reference) => `
                <div class="reference-item">
                  <span class="reference-number">${reference.reffrence_html_id}.</span>
                  <div class="reference-text">${reference.reffrence}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
        
        <div class="copyright">
          <p><strong>© 2024 The Authors. Published by Medical Journal Publishers.</strong></p>
          <p>This article is available under standard academic license.</p>
        </div>
        
        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            };
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  const scrollToReference = (refId) => {
    const element = document.getElementById(`ref-${refId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  if (journalData) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-gray-600 text-white py-4 px-6 fixed top-0 w-full">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-medium">Medical Journal</span>
                </div>
                <div className="text-sm opacity-90">
                  Article {journalData.case_number}
                </div>
              </div>
              <div className="flex items-center space-x-3">               
                {/* <button
                  onClick={handleShare}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded text-sm hover:bg-white hover:bg-opacity-10"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button> */}
                <button 
                  onClick={handlePDFDownload}
                  className="flex items-center space-x-1 px-4 py-1.5 bg-blue-600 rounded hover:bg-blue-700 text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>PDF</span>
                </button>
                <button className="flex items-center space-x-1 px-4 py-1.5 bg-blue-600 rounded hover:bg-blue-700 text-sm">
                  <ChevronLeft className="w-4 h-4" />
                  <span>Exit</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8 mt-15">
          {/* Journal Info */}
          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Medical Journal</span> • Case
              Number: {journalData.case_number} • Type: {journalData.type}
            </div>
            <div className="text-sm text-gray-500">
              Pages: {journalData.pages} • Status: {journalData.article_status}{" "}
              • Category: {journalData.sub_class}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {journalData.title}
          </h1>

          {/* Authors */}
          <div className="mb-8">
            <div className="space-y-4">
              {journalData.articleAuthors &&
                journalData.articleAuthors.map((authorItem, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-600">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {authorItem.author.author_fname}{" "}
                          {authorItem.author.author_lname}
                        </h3>
                        {authorItem.isMain && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                            ✉ Main Author
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-xs">
                        <a
                          href={`mailto:${authorItem.author.author_email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {authorItem.author.author_email}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* DOI and Publication Info */}
          <div className="border-t border-b border-gray-200 py-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-600 mb-2">
                  <span className="font-medium">Article ID:</span>{" "}
                  {journalData.case_number}
                </div>
                <div className="text-gray-600">
                  Pages: {journalData.pages} 
                  {journalData.revision_round}
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-1">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">
                    Type: {journalData.type}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">
                    Category: {journalData.sub_class}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Abstract */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Abstract</h2>
            <p className="text-gray-700 leading-relaxed text-justify mb-6">
              {journalData.abstract}
            </p>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {formatKeywords(journalData.keywords).map((keyword, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Main Article Content - Using actual sections */}
          <ArticleContent>
            {journalData.ArticleSection &&
              journalData.ArticleSection.map((section, index) => (
                <div key={section.section_id}>
                  <h2>
                    {index + 1}. {section.section_title}
                  </h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: section.Section_description,
                    }}
                    onClick={(e) => {
                      if (
                        e.target.tagName === "A" &&
                        e.target.getAttribute("href")?.startsWith("#ref-")
                      ) {
                        e.preventDefault();
                        const refId = e.target
                          .getAttribute("href")
                          .replace("#ref-", "");
                        scrollToReference(refId);
                      }
                    }}
                  />
                </div>
              ))}

            {/* References */}
            {journalData.Reffences && journalData.Reffences.length > 0 && (
              <>
                <h2>References</h2>
                {journalData.Reffences.map((reference, index) => (
                  <div
                    key={reference.ref_id}
                    className="reference-item"
                    id={`ref-${reference.reffrence_html_id}`}
                  >
                    <span className="reference-number">
                      {reference.reffrence_html_id}.
                    </span>
                    <p className="reference-text">{reference.reffrence}</p>
                  </div>
                ))}
              </>
            )}
          </ArticleContent>        

          {/* Copyright */}
          <div className="border-t border-gray-200 pt-6">
            <div className="text-sm text-gray-600">
              <p className="mb-2">
                © 2024 The Authors. Published by Medical Journal Publishers.
              </p>
              <p>This article is available under standard academic license.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PreviewArticlePage;
