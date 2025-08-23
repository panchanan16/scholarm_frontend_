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
// } from "lucide-react";

// const inntroHtml = `          <p
//             class="MsoNormal"
//             style="box-sizing: border-box; border: 0px solid; margin: 0px 0px 1rem; padding: 0px; line-height: 1.6; color: #4b5563; font-family: Arial, Helvetica, sans-serif; font-size: medium; text-align: justify;"
//           >
//             <span style="box-sizing: border-box; border: 0px solid; margin: 0px; padding: 0px;">
//               <span style="box-sizing: border-box; border: 0px solid; margin: 0px; padding: 0px; font-size: 10pt;">
//                 Ocular trauma is a leading cause of avoidable monocular
//                 blindness and visual impairment worldwide. The incidence and
//                 prevalence of ocular trauma vary based on geographical location,
//                 climate and societal factors. Approximately 1.6 million people
//                 worldwide are blind due to ocular trauma, 2.3 million being
//                 bilaterally visually impaired and 19 million have unilateral
//                 loss of vision.
//                 <span style="box-sizing: border-box; border: 0px solid; margin: 0px; padding: 0px; vertical-align: baseline; font-size: 10px; line-height: 0; position: relative; top: -0.5em;">
//                   &nbsp;<a href="#ref-1">[1]</a>
//                 </span>
//                 <span style="box-sizing: border-box; border: 0px solid; margin: 0px; padding: 0px;">
//                   &nbsp;&nbsp;
//                 </span>
//                 the reported incidence of ocular trauma in India varies from 1%
//                 to 5%.
//                 <span style="box-sizing: border-box; border: 0px solid; margin: 0px; padding: 0px;">
//                   &nbsp;&nbsp;
//                 </span>
//                 5% of all ophthalmic hospitalisation in the developed countries
//                 are due to ocular trauma and this figure is much higher in
//                 developing countries.
//                 <span style="box-sizing: border-box; border: 0px solid; margin: 0px; padding: 0px; vertical-align: baseline; font-size: 10px; line-height: 0; position: relative; top: -0.5em;">
//                   <span style="box-sizing: border-box; border: 0px solid; margin: 0px; padding: 0px;">
//                     &nbsp;&nbsp;
//                   </span>
//                 </span>
//                 Despite its public health importance, ocular trauma is most
//                 neglected and underreported disorder.
//                 <span style="box-sizing: border-box; border: 0px solid; margin: 0px; padding: 0px; vertical-align: baseline; font-size: 10px; line-height: 0; position: relative; top: -0.5em;">
//                   <a href="#ref-2">[2]</a>
//                 </span>
//               </span>
//             </span>
//           </p>
//           <p
//             class="MsoNormal"
//             style="box-sizing: border-box; border: 0px solid; margin: 0px 0px 1rem; padding: 0px; line-height: 1.6; color: #4b5563; font-family: Arial, Helvetica, sans-serif; font-size: medium; text-align: justify;"
//           >
//             <span style="box-sizing: border-box; border: 0px solid; margin: 0px; padding: 0px;">
//               <span style="box-sizing: border-box; border: 0px solid; margin: 0px; padding: 0px; font-size: 10pt;">
//                 Severity and extent of ocular injury is determined by the amount
//                 of energy transferred to the globe &amp; orbit, characteristic
//                 of traumatic agent and location of impact area. Blunt trauma is
//                 the commonest form (54.9%) of ocular injury.
//                 <span style="box-sizing: border-box; border: 0px solid; margin: 0px; padding: 0px;">
//                   &nbsp;&nbsp;
//                 </span>
//                 Blunt trauma can occur in almost any setting and circumstances
//                 including workplace / domestic accidents, road traffic
//                 accidents, sports &amp; recreational activities and physical
//                 assaults etc.&nbsp;
//                 <span style="box-sizing: border-box; border: 0px solid; margin: 0px; padding: 0px; vertical-align: baseline; font-size: 10px; line-height: 0; position: relative; top: -0.5em;">
//                   <a href="#ref-3">[3]</a>
//                 </span>
//               </span>
//             </span>
//           </p>`;

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
//     `}</style>
//     {children}
//   </div>
// );

// const PreviewArticlePage = () => {
//   const [isBookmarked, setIsBookmarked] = useState(false);

//   const journalData = {
//     intro_id: 6,
//     case_number: "JP00003",
//     type: "article",
//     title:
//       "Exploring the Psychological Aspects of the Occupational and Social Stresses on the Dental Professionals",
//     abstract:
//       "Exploring the Psychological Aspects of the Occupational and Social Stresses on the Dental ProfessionalsExploring the Psychological Aspects of the Occupational and Social Stresses on the Dental ProfessionalsExploring the Psychological Aspects of the Occupational and Social Stresses on the Dental ProfessionalsExploring the Psychological Aspects of the Occupational and Social Stresses on the Dental Professionals",
//     keywords: "kwy;jhgg;kjfhi",
//     sub_class: "news",
//     pages: 25,
//     belong_to: "regular",
//     article_status: "submissionneedadditionalreviewers",
//     main_author: 1,
//     istick: false,
//     revision_round: 0,
//     articleAuthors: [
//       {
//         article_id: 6,
//         author_id: 2,
//         isMain: false,
//         status: null,
//         istick: false,
//         author: {
//           author_id: 2,
//           author_fname: "pancha",
//           author_lname: "deka",
//           author_email: "pancha@example.com",
//         },
//       },
//       {
//         article_id: 6,
//         author_id: 3,
//         isMain: true,
//         status: null,
//         istick: false,
//         author: {
//           author_id: 3,
//           author_fname: "Panchanan",
//           author_lname: "Deka",
//           author_email: "dekapanchanan16@gmail.com",
//         },
//       },
//       {
//         article_id: 6,
//         author_id: 4,
//         isMain: false,
//         status: null,
//         istick: false,
//         author: {
//           author_id: 4,
//           author_fname: "nasim",
//           author_lname: "ahmed",
//           author_email: "nasim@gmail.com",
//         },
//       },
//     ],
//     ArticleSection: [
//       {
//         section_id: 14,
//         article_id: 6,
//         section_title: "Introduction",
//         Section_description:
//           '<p class="article-paragraph">this is intro duction</p>',
//         istick: false,
//         refCount: 0,
//       },
//       {
//         section_id: 15,
//         article_id: 6,
//         section_title: "Body",
//         Section_description:
//           '<p class="article-paragraph">this is the body of the article <a href="#ref-1">[1]</a>&nbsp;</p>',
//         istick: false,
//         refCount: 1,
//       },
//       {
//         section_id: 16,
//         article_id: 6,
//         section_title: "Conclusion",
//         Section_description:
//           '<p class="article-paragraph">this is the conclusion</p>',
//         istick: false,
//         refCount: 0,
//       },
//     ],
//     Reffences: [
//       {
//         ref_id: 21,
//         article_id: 6,
//         reffrence_html_id: "1",
//         reffrence:
//           "ffkfjghfeig avebivbei kaber vkwgfiew ksdgd sfkhvisb dflnoewjp;bjfwphweohg",
//       },
//     ],
//   };
//   const handleBookmark = () => {
//     setIsBookmarked(!isBookmarked);
//   };

//   const handleShare = () => {
//     navigator.share?.({
//       title: journalData.title,
//       url: window.location.href,
//     });
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <div className="bg-gray-600 text-white py-4 px-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2">
//                 <BookOpen className="w-5 h-5" />
//                 <span className="font-medium">{journalData.journal.name}</span>
//               </div>
//               <div className="text-sm opacity-90">
//                 Volume {journalData.publication.volume}, Issue{" "}
//                 {journalData.publication.issue}
//               </div>
//             </div>
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={handleBookmark}
//                 className={`flex items-center space-x-1 px-3 py-1.5 rounded text-sm ${
//                   isBookmarked
//                     ? "bg-white bg-opacity-20"
//                     : "hover:bg-white hover:bg-opacity-10"
//                 }`}
//               >
//                 <Bookmark
//                   className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
//                 />
//                 <span>Save</span>
//               </button>
//               <button
//                 onClick={handleShare}
//                 className="flex items-center space-x-1 px-3 py-1.5 rounded text-sm hover:bg-white hover:bg-opacity-10"
//               >
//                 <Share2 className="w-4 h-4" />
//                 <span>Share</span>
//               </button>
//               <button className="flex items-center space-x-1 px-4 py-1.5 bg-blue-600 rounded hover:bg-blue-700 text-sm">
//                 <Download className="w-4 h-4" />
//                 <span>PDF</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-4xl mx-auto px-6 py-8">
//         {/* Journal Info */}
//         <div className="mb-6">
//           <div className="text-sm text-gray-600 mb-2">
//             <span className="font-medium">{journalData.journal.name}</span> •
//             Published by {journalData.journal.publisher} • Impact Factor:{" "}
//             {journalData.journal.impactFactor}
//           </div>
//           <div className="text-sm text-gray-500">
//             ISSN: {journalData.journal.issn} • eISSN:{" "}
//             {journalData.journal.eissn} • Published:{" "}
//             {new Date(
//               journalData.publication.publishedOnline
//             ).toLocaleDateString()}
//           </div>
//         </div>

//         {/* Title */}
//         <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
//           {journalData.title}
//         </h1>

//         {/* Authors */}
//         <div className="mb-8">
//           <div className="space-y-4">
//             {journalData.authors.map((author, index) => (
//               <div key={index} className="flex items-start space-x-4">
//                 <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-600">
//                   {index + 1}
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex items-center space-x-2 mb-1">
//                     <h3 className="font-semibold text-gray-900">
//                       {author.name}
//                     </h3>
//                     {author.isCorresponding && (
//                       <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
//                         ✉ Corresponding Author
//                       </span>
//                     )}
//                   </div>
//                   <p className="text-gray-600 text-sm mb-1">
//                     {author.affiliation}
//                   </p>
//                   <div className="flex items-center space-x-4 text-xs">
//                     <a
//                       href={`mailto:${author.email}`}
//                       className="text-blue-600 hover:underline"
//                     >
//                       {author.email}
//                     </a>
//                     <a
//                       href={`https://orcid.org/${author.orcid}`}
//                       className="text-green-600 hover:underline"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       ORCID: {author.orcid}
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* DOI and Publication Info */}
//         <div className="border-t border-b border-gray-200 py-4 mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//             <div>
//               <div className="flex items-center space-x-2 mb-2">
//                 <ExternalLink className="w-4 h-4 text-gray-500" />
//                 <span className="text-gray-600">DOI:</span>
//                 <a
//                   href={`https://doi.org/${journalData.doi}`}
//                   className="text-blue-600 hover:underline"
//                 >
//                   {journalData.doi}
//                 </a>
//                 <button
//                   onClick={() => copyToClipboard(journalData.doi)}
//                   className="p-1 hover:bg-gray-100 rounded"
//                 >
//                   <Copy className="w-3 h-3 text-gray-500" />
//                 </button>
//               </div>
//               <div className="text-gray-600">
//                 Pages: {journalData.publication.pages} • Article:{" "}
//                 {journalData.publication.articleNumber}
//               </div>
//             </div>
//             <div className="flex items-center space-x-6">
//               <div className="flex items-center space-x-1">
//                 <Eye className="w-4 h-4 text-gray-500" />
//                 <span className="text-gray-600">
//                   {journalData.metrics.views.toLocaleString()} views
//                 </span>
//               </div>
//               <div className="flex items-center space-x-1">
//                 <Download className="w-4 h-4 text-gray-500" />
//                 <span className="text-gray-600">
//                   {journalData.metrics.downloads.toLocaleString()} downloads
//                 </span>
//               </div>
//               <div className="flex items-center space-x-1">
//                 <Quote className="w-4 h-4 text-gray-500" />
//                 <span className="text-gray-600">
//                   {journalData.metrics.citations} citations
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Timeline */}
//         <div className="mb-8 text-sm text-gray-600">
//           <div className="flex items-center space-x-6">
//             <span>
//               Received:{" "}
//               {new Date(journalData.publication.received).toLocaleDateString()}
//             </span>
//             <ChevronRight className="w-4 h-4" />
//             <span>
//               Accepted:{" "}
//               {new Date(journalData.publication.accepted).toLocaleDateString()}
//             </span>
//             <ChevronRight className="w-4 h-4" />
//             <span>
//               Published:{" "}
//               {new Date(
//                 journalData.publication.publishedOnline
//               ).toLocaleDateString()}
//             </span>
//           </div>
//         </div>

//         {/* Abstract */}
//         <div className="mb-10">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Abstract</h2>
//           <p className="text-gray-700 leading-relaxed text-justify mb-6">
//             This comprehensive study presents novel machine learning
//             methodologies for predictive healthcare analytics, with a specific
//             focus on early disease detection systems. Our research introduces
//             innovative deep learning architectures that integrate multi-modal
//             healthcare data, including electronic health records, medical
//             imaging, and genomic information. The proposed framework
//             demonstrates superior performance in predicting cardiovascular
//             diseases, diabetes, and cancer with accuracy rates exceeding 94.5%.
//             Through extensive validation on diverse patient populations across
//             multiple healthcare institutions, we establish new benchmarks for
//             healthcare prediction systems. The methodology incorporates
//             explainable AI techniques to ensure clinical interpretability,
//             addressing crucial requirements for medical decision-making. Our
//             findings suggest significant potential for transforming preventive
//             healthcare through advanced computational approaches, potentially
//             reducing healthcare costs by 25-30% while improving patient
//             outcomes. The study also explores ethical considerations and
//             regulatory compliance aspects essential for real-world deployment in
//             clinical environments.
//           </p>

//           <div className="mb-4">
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">
//               Keywords
//             </h3>
//             <div className="flex flex-wrap gap-2">
//               {journalData.keywords.map((keyword, index) => (
//                 <span
//                   key={index}
//                   className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
//                 >
//                   {keyword}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Main Article Content - Styled with JSX */}
//         <ArticleContent>
//           {/* Introduction */}
//           <h2>1. Introduction</h2>
//           <div dangerouslySetInnerHTML={{ __html: inntroHtml }}></div>
//           {/* Methods */}
//           <h2>2. Methods</h2>
//           <h3>2.1 Data Sources and Preprocessing</h3>
//           <p>
//             Our study utilized a comprehensive dataset comprising electronic
//             health records from 15 major healthcare institutions across North
//             America and Europe, encompassing over 2.3 million patient records
//             spanning a 10-year period (2014-2024). The dataset included
//             demographic information, laboratory results, diagnostic imaging
//             reports, prescription histories, and clinical notes processed
//             through natural language processing techniques.
//           </p>
//           <h3>2.2 Machine Learning Architecture</h3>
//           <p>
//             We developed a novel ensemble architecture combining deep neural
//             networks, gradient boosting machines, and attention mechanisms to
//             process heterogeneous healthcare data. The framework incorporates
//             temporal modeling capabilities to capture disease progression
//             patterns and utilizes transfer learning techniques to adapt
//             pre-trained models to specific clinical domains.
//           </p>
//           <h3>2.3 Explainability and Interpretability</h3>
//           <p>
//             To ensure clinical adoption and regulatory compliance, our
//             methodology integrates multiple explainability techniques, including
//             LIME (Local Interpretable Model-agnostic Explanations), SHAP
//             (SHapley Additive exPlanations), and custom attention visualization
//             methods. These approaches provide clinicians with transparent
//             insights into model decision-making processes and highlight key
//             predictive factors.
//           </p>
//           {/* Results */}
//           <h2>3. Results</h2>
//           <h3>3.1 Predictive Performance</h3>
//           <p>
//             Our proposed framework achieved remarkable predictive performance
//             across all target disease categories. For cardiovascular disease
//             prediction, the model demonstrated an area under the ROC curve (AUC)
//             of 0.947, with sensitivity of 92.3% and specificity of 94.1% when
//             predicting events 12 months in advance. Diabetes prediction showed
//             similarly impressive results with an AUC of 0.952, while cancer
//             prediction models achieved AUCs ranging from 0.938 to 0.965
//             depending on cancer type.
//           </p>
//           <h3>3.2 Multi-institutional Validation</h3>
//           <p>
//             Cross-institutional validation confirmed the robustness and
//             generalizability of our approach. Performance metrics remained
//             consistent across different healthcare systems, demographic
//             populations, and geographic regions, with minimal degradation in
//             predictive accuracy. This finding suggests strong potential for
//             real-world deployment across diverse clinical environments.
//           </p>
//           <h3>3.3 Clinical Impact Assessment</h3>
//           <p>
//             Economic analysis revealed substantial potential cost savings, with
//             estimated reductions of 25-30% in overall healthcare costs through
//             early intervention strategies enabled by our predictive models.
//             Patient outcome improvements included 40% reduction in emergency
//             department visits and 35% decrease in hospital readmissions for
//             high-risk patients identified by the system.
//           </p>
//           {/* Discussion */}
//           <h2>4. Discussion</h2>
//           <p>
//             The results of this study demonstrate the significant potential of
//             advanced machine learning approaches in transforming predictive
//             healthcare analytics. Our framework's superior performance compared
//             to existing methods can be attributed to several key innovations:
//             the integration of multi-modal data sources, the implementation of
//             temporal modeling capabilities, and the incorporation of explainable
//             AI techniques that address critical clinical adoption barriers.
//           </p>
//           <p>
//             The consistently high performance across diverse patient populations
//             and healthcare institutions suggests that our approach addresses
//             fundamental challenges in healthcare ML, including data
//             heterogeneity, population bias, and model generalizability. The
//             incorporation of explainability mechanisms not only enhances
//             clinical trust but also provides valuable insights into disease
//             mechanisms and risk factors.
//           </p>
//           <p>
//             However, several limitations must be acknowledged. The study was
//             conducted primarily in developed healthcare systems with robust
//             electronic health record infrastructure, potentially limiting
//             generalizability to resource-constrained environments. Additionally,
//             the long-term impact of model predictions on clinical
//             decision-making and patient outcomes requires further longitudinal
//             investigation.
//           </p>
//           {/* Conclusion */}
//           <h2>5. Conclusion</h2>
//           <p>
//             This study presents a comprehensive machine learning framework for
//             predictive healthcare analytics that achieves unprecedented accuracy
//             in early disease detection while maintaining clinical
//             interpretability. The demonstrated performance improvements,
//             combined with substantial potential cost savings and enhanced
//             patient outcomes, position this approach as a transformative tool
//             for modern healthcare systems.
//           </p>
//           <p>
//             Future research directions include expanding the framework to
//             additional disease categories, investigating the integration of
//             emerging data modalities such as continuous physiological monitoring
//             and environmental factors, and conducting prospective clinical
//             trials to validate real-world implementation strategies. The
//             continued advancement of explainable AI techniques will be crucial
//             for ensuring widespread clinical adoption and maintaining trust in
//             AI-assisted healthcare decision-making.
//           </p>
//           {/* References */}
//           <h2>References</h2>
//           <div className="reference-item">
//             <span className="reference-number">1.</span>
//             <p className="reference-text">
//               Rajkomar, A., Oren, E., Chen, K., Dai, A. M., Hajaj, N., Hardt,
//               M., ... & Dean, J. (2018). Scalable and accurate deep learning
//               with electronic health records. <em>npj Digital Medicine</em>,
//               1(1), 18.{" "}
//               <a href="https://doi.org/10.1038/s41746-018-0029-1">
//                 https://doi.org/10.1038/s41746-018-0029-1
//               </a>
//             </p>
//           </div>
//           <div className="reference-item">
//             <span className="reference-number">2.</span>
//             <p className="reference-text">
//               Esteva, A., Kuprel, B., Novoa, R. A., Ko, J., Swetter, S. M.,
//               Blau, H. M., & Thrun, S. (2017). Dermatologist-level
//               classification of skin cancer with deep neural networks.{" "}
//               <em>Nature</em>, 542(7639), 115-118.{" "}
//               <a href="https://doi.org/10.1038/nature21056">
//                 https://doi.org/10.1038/nature21056
//               </a>
//             </p>
//           </div>
//           <div className="reference-item">
//             <span className="reference-number">3.</span>
//             <p className="reference-text">
//               Goldstein, B. A., Navar, A. M., Pencina, M. J., & Ioannidis, J. P.
//               (2017). Opportunities and challenges in developing risk prediction
//               models with electronic health records data: a systematic review.{" "}
//               <em>Journal of the American Medical Informatics Association</em>,
//               24(1), 198-208.{" "}
//               <a href="https://doi.org/10.1093/jamia/ocw042">
//                 https://doi.org/10.1093/jamia/ocw042
//               </a>
//             </p>
//           </div>
//           <div className="reference-item">
//             <span className="reference-number">4.</span>
//             <p className="reference-text">
//               Lundberg, S. M., Nair, B., Vavilala, M. S., Horibe, M., Eisses, M.
//               J., Adams, T., ... & Lee, S. I. (2018). Explainable
//               machine-learning predictions for the prevention of hypoxaemia
//               during surgery. <em>Nature Biomedical Engineering</em>, 2(10),
//               749-760.{" "}
//               <a href="https://doi.org/10.1038/s41551-018-0304-0">
//                 https://doi.org/10.1038/s41551-018-0304-0
//               </a>
//             </p>
//           </div>
//           <div className="reference-item">
//             <span className="reference-number">5.</span>
//             <p className="reference-text">
//               Miotto, R., Wang, F., Wang, S., Jiang, X., & Dudley, J. T. (2018).
//               Deep learning for healthcare: review, opportunities and
//               challenges. <em>Briefings in Bioinformatics</em>, 19(6),
//               1236-1246.{" "}
//               <a href="https://doi.org/10.1093/bib/bbx044">
//                 https://doi.org/10.1093/bib/bbx044
//               </a>
//             </p>
//           </div>
//           <div className="reference-item">
//             <span className="reference-number">6.</span>
//             <p className="reference-text">
//               Shameer, K., Johnson, K. W., Glicksberg, B. S., Dudley, J. T., &
//               Sengupta, P. P. (2018). Machine learning in cardiovascular
//               medicine: are we there yet?. <em>Heart</em>, 104(14), 1156-1164.{" "}
//               <a href="https://doi.org/10.1136/heartjnl-2017-311198">
//                 https://doi.org/10.1136/heartjnl-2017-311198
//               </a>
//             </p>
//           </div>
//           <div className="reference-item">
//             <span className="reference-number">7.</span>
//             <p className="reference-text">
//               Topol, E. J. (2019). High-performance medicine: the convergence of
//               human and artificial intelligence. <em>Nature Medicine</em>,
//               25(1), 44-56.{" "}
//               <a href="https://doi.org/10.1038/s41591-018-0300-7">
//                 https://doi.org/10.1038/s41591-018-0300-7
//               </a>
//             </p>
//           </div>
//           <div className="reference-item">
//             <span className="reference-number">8.</span>
//             <p className="reference-text">
//               Chen, I. Y., Pierson, E., Rose, S., Joshi, S., Ferryman, K., &
//               Ghassemi, M. (2021). Ethical machine learning in healthcare.{" "}
//               <em>Annual Review of Biomedical Data Science</em>, 4, 123-144.{" "}
//               <a href="https://doi.org/10.1146/annurev-biodatasci-092820-114757">
//                 https://doi.org/10.1146/annurev-biodatasci-092820-114757
//               </a>
//             </p>
//           </div>
//           <div className="reference-item">
//             <span className="reference-number">9.</span>
//             <p className="reference-text">
//               Shickel, B., Tighe, P. J., Bihorac, A., & Rashidi, P. (2018). Deep
//               EHR: a survey of recent advances in deep learning techniques for
//               electronic health record (EHR) analysis.{" "}
//               <em>IEEE Journal of Biomedical and Health Informatics</em>, 22(5),
//               1589-1604.{" "}
//               <a href="https://doi.org/10.1109/JBHI.2017.2767063">
//                 https://doi.org/10.1109/JBHI.2017.2767063
//               </a>
//             </p>
//           </div>
//           <div className="reference-item">
//             <span className="reference-number">10.</span>
//             <p className="reference-text">
//               Zhang, J., Whebell, S., Gallifant, J., Budhdeo, S., Mattie, H.,
//               Leroi, L., ... & Peacock, A. (2020). An interactive web-based
//               dashboard to track COVID-19 in real time.{" "}
//               <em>The Lancet Digital Health</em>, 2(10), e543-e546.{" "}
//               <a href="https://doi.org/10.1016/S2589-7500(20)30196-8">
//                 https://doi.org/10.1016/S2589-7500(20)30196-8
//               </a>
//             </p>
//           </div>
//           <div className="reference-item">
//             <span className="reference-number">11.</span>
//             <p className="reference-text">
//               Johnson, A. E., Pollard, T. J., Shen, L., Lehman, L. W. H., Feng,
//               M., Ghassemi, M., ... & Mark, R. G. (2016). MIMIC-III, a freely
//               accessible critical care database. <em>Scientific Data</em>, 3(1),
//               160035.{" "}
//               <a href="https://doi.org/10.1038/sdata.2016.35">
//                 https://doi.org/10.1038/sdata.2016.35
//               </a>
//             </p>
//           </div>
//           <div className="reference-item">
//             <span className="reference-number">12.</span>
//             <p className="reference-text">
//               Beam, A. L., & Kohane, I. S. (2018). Big data and machine learning
//               in health care. <em>JAMA</em>, 319(13), 1317-1318.{" "}
//               <a href="https://doi.org/10.1001/jama.2017.18391">
//                 https://doi.org/10.1001/jama.2017.18391
//               </a>
//             </p>
//           </div>
//           <div className="reference-item">
//             <span className="reference-number">13.</span>
//             <p className="reference-text">
//               Ribeiro, M. T., Singh, S., & Guestrin, C. (2016). "Why should I
//               trust you?" Explaining the predictions of any classifier.{" "}
//               <em>
//                 Proceedings of the 22nd ACM SIGKDD International Conference on
//                 Knowledge Discovery and Data Mining
//               </em>
//               , 1135-1144.{" "}
//               <a href="https://doi.org/10.1145/2939672.2939778">
//                 https://doi.org/10.1145/2939672.2939778
//               </a>
//             </p>
//           </div>
//           <div className="reference-item">
//             <span className="reference-number">14.</span>
//             <p className="reference-text">
//               Doshi-Velez, F., & Kim, B. (2017). Towards a rigorous science of
//               interpretable machine learning.{" "}
//               <em>arXiv preprint arXiv:1702.08608</em>.{" "}
//               <a href="https://doi.org/10.48550/arXiv.1702.08608">
//                 https://doi.org/10.48550/arXiv.1702.08608
//               </a>
//             </p>
//           </div>
//           <div className="reference-item">
//             <span className="reference-number">15.</span>
//             <p className="reference-text">
//               Obermeyer, Z., Powers, B., Vogeli, C., & Mullainathan, S. (2019).
//               Dissecting racial bias in an algorithm used to manage the health
//               of populations. <em>Science</em>, 366(6464), 447-453.{" "}
//               <a href="https://doi.org/10.1126/science.aax2342">
//                 https://doi.org/10.1126/science.aax2342
//               </a>
//             </p>
//           </div>
//           <div className="reference-item">
//             <span className="reference-number">16.</span>
//             <p className="reference-text">
//               Wiens, J., Saria, S., Sendak, M., Ghassemi, M., Liu, V. X.,
//               Doshi-Velez, F., ... & Goldenberg, A. (2019). Do no harm: a
//               roadmap for responsible machine learning for health care.{" "}
//               <em>Nature Medicine</em>, 25(9), 1337-1340.{" "}
//               <a href="https://doi.org/10.1038/s41591-019-0548-6">
//                 https://doi.org/10.1038/s41591-019-0548-6
//               </a>
//             </p>
//           </div>
//           <div className="reference-item">
//             <span className="reference-number">17.</span>
//             <p className="reference-text">
//               Yu, K. H., Beam, A. L., & Kohane, I. S. (2018). Artificial
//               intelligence in healthcare. <em>Nature Biomedical Engineering</em>
//               , 2(10), 719-731.{" "}
//               <a href="https://doi.org/10.1038/s41551-018-0305-z">
//                 https://doi.org/10.1038/s41551-018-0305-z
//               </a>
//             </p>
//           </div>
//           <div className="reference-item">
//             <span className="reference-number">18.</span>
//             <p className="reference-text">
//               Holzinger, A., Biemann, C., Pattichis, C. S., & Kell, D. B.
//               (2017). What do we need to build explainable AI systems for the
//               medical domain?. <em>arXiv preprint arXiv:1712.09923</em>.{" "}
//               <a href="https://doi.org/10.48550/arXiv.1712.09923">
//                 https://doi.org/10.48550/arXiv.1712.09923
//               </a>
//             </p>
//           </div>
//           <div className="reference-item">
//             <span className="reference-number">19.</span>
//             <p className="reference-text">
//               Sendak, M. P., Gao, M., Brajer, N., & Balu, S. (2020). Presenting
//               machine learning model information to clinical end users with
//               model facts labels. <em>npj Digital Medicine</em>, 3(1), 41.{" "}
//               <a href="https://doi.org/10.1038/s41746-020-0253-3">
//                 https://doi.org/10.1038/s41746-020-0253-3
//               </a>
//             </p>
//           </div>
//           <div className="reference-item">
//             <span className="reference-number">20.</span>
//             <p className="reference-text">
//               Char, D. S., Shah, N. H., & Magnus, D. (2018). Implementing
//               machine learning in health care—addressing ethical challenges.{" "}
//               <em>New England Journal of Medicine</em>, 378(11), 981-983.{" "}
//               <a href="https://doi.org/10.1056/NEJMp1714229">
//                 https://doi.org/10.1056/NEJMp1714229
//               </a>
//             </p>
//           </div>
//           {/* Funding */}
//           <h2>Funding</h2>
//           <div className="funding-list">
//             {journalData.funding.map((fund, index) => (
//               <p key={index}>• {fund}</p>
//             ))}
//           </div>
//         </ArticleContent>

//         {/* How to Cite */}
//         <div className="mb-8">
//           <h2 className="text-xl font-bold text-gray-900 mb-3">
//             How to Cite This Article
//           </h2>
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <p className="text-sm text-gray-700 leading-relaxed">
//               Johnson, S., Chen, M., Rodriguez, E., & Wilson, J. (2024).{" "}
//               {journalData.title}. <em>{journalData.journal.name}</em>,{" "}
//               {journalData.publication.volume}({journalData.publication.issue}),{" "}
//               {journalData.publication.pages}. https://doi.org/{journalData.doi}
//             </p>
//             <button
//               onClick={() =>
//                 copyToClipboard(
//                   `Johnson, S., Chen, M., Rodriguez, E., & Wilson, J. (2024). ${journalData.title}. ${journalData.journal.name}, ${journalData.publication.volume}(${journalData.publication.issue}), ${journalData.publication.pages}. https://doi.org/${journalData.doi}`
//                 )
//               }
//               className="mt-2 flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
//             >
//               <Copy className="w-4 h-4" />
//               <span>Copy Citation</span>
//             </button>
//           </div>
//         </div>
//         <div className="mb-8">
//           <h2 className="text-xl font-bold text-gray-900 mb-3">
//             How to Cite This Article
//           </h2>
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <p className="text-sm text-gray-700 leading-relaxed">
//               Johnson, S., Chen, M., Rodriguez, E., & Wilson, J. (2024).{" "}
//               {journalData.title}. <em>{journalData.journal.name}</em>,{" "}
//               {journalData.publication.volume}({journalData.publication.issue}),{" "}
//               {journalData.publication.pages}. https://doi.org/{journalData.doi}
//             </p>
//             <button
//               onClick={() =>
//                 copyToClipboard(
//                   `Johnson, S., Chen, M., Rodriguez, E., & Wilson, J. (2024). ${journalData.title}. ${journalData.journal.name}, ${journalData.publication.volume}(${journalData.publication.issue}), ${journalData.publication.pages}. https://doi.org/${journalData.doi}`
//                 )
//               }
//               className="mt-2 flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
//             >
//               <Copy className="w-4 h-4" />
//               <span>Copy Citation</span>
//             </button>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="border-t border-gray-200 pt-6">
//           <div className="text-sm text-gray-600">
//             <p className="mb-2">
//               © {journalData.copyrightYear} The Authors. Published by{" "}
//               {journalData.journal.publisher}.
//             </p>
//             <p>This article is licensed under a {journalData.license}.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
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
  // console.log(data)

  const journalData = data && data.data;

  // console.log(data);

  // const journalData = {
  //   intro_id: 6,
  //   case_number: "JP00003",
  //   type: "article",
  //   title:
  //     "Exploring the Psychological Aspects of the Occupational and Social Stresses on the Dental Professionals",
  //   abstract:
  //     "Exploring the Psychological Aspects of the Occupational and Social Stresses on the Dental ProfessionalsExploring the Psychological Aspects of the Occupational and Social Stresses on the Dental ProfessionalsExploring the Psychological Aspects of the Occupational and Social Stresses on the Dental ProfessionalsExploring the Psychological Aspects of the Occupational and Social Stresses on the Dental Professionals",
  //   keywords: "kwy;jhgg;kjfhi",
  //   sub_class: "news",
  //   pages: 25,
  //   belong_to: "regular",
  //   article_status: "submissionneedadditionalreviewers",
  //   main_author: 1,
  //   istick: false,
  //   revision_round: 0,
  //   articleAuthors: [
  //     {
  //       article_id: 6,
  //       author_id: 2,
  //       isMain: false,
  //       status: null,
  //       istick: false,
  //       author: {
  //         author_id: 2,
  //         author_fname: "pancha",
  //         author_lname: "deka",
  //         author_email: "pancha@example.com",
  //       },
  //     },
  //     {
  //       article_id: 6,
  //       author_id: 3,
  //       isMain: true,
  //       status: null,
  //       istick: false,
  //       author: {
  //         author_id: 3,
  //         author_fname: "Panchanan",
  //         author_lname: "Deka",
  //         author_email: "dekapanchanan16@gmail.com",
  //       },
  //     },
  //     {
  //       article_id: 6,
  //       author_id: 4,
  //       isMain: false,
  //       status: null,
  //       istick: false,
  //       author: {
  //         author_id: 4,
  //         author_fname: "nasim",
  //         author_lname: "ahmed",
  //         author_email: "nasim@gmail.com",
  //       },
  //     },
  //   ],
  //   ArticleSection: [
  //     {
  //       section_id: 14,
  //       article_id: 6,
  //       section_title: "Introduction",
  //       Section_description:
  //         '<p class="article-paragraph"><span lang="EN-US" style="font-size: 12.0pt; line-height: 115%; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: \'Times New Roman\'; mso-bidi-theme-font: minor-bidi; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">A descriptive, cross-sectional survey was conducted over three months (May&ndash;July 2025) using a Google Forms questionnaire distributed digitally across Himachal Pradesh via WhatsApp, Facebook, and local community networks. A total of 400 adult participants were recruited using convenience sampling. The questionnaire comprised socio-demographic <a href="#ref-2">[2]</a>&nbsp; details, 20 multiple-choice questions assessing awareness and misconceptions about footwear and falls, and an optional section on attitudes and preventive practices. Knowledge levels were categorized into four tiers: Very Good (17&ndash;20 correct), Good (13&ndash;16), Fair (9&ndash;12), and Poor (0&ndash;8). Descriptive and inferential statistics were analyzed using SPSS, with chi-square tests employed to explore associations between awareness and demographic variables (p &lt; 0.05 considered significant).</span></p>',
  //       istick: false,
  //       refCount: 1,
  //     },
  //     {
  //       section_id: 15,
  //       article_id: 6,
  //       section_title: "Body",
  //       Section_description:
  //         '<h2 style="text-align: justify; line-height: 115%;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 115%; font-weight: normal; mso-bidi-font-weight: bold;">Among 400 participants, 53.0% were female and 57.5% resided in rural areas. Awareness regarding the link between inappropriate footwear and increased fall risk was relatively high <a href="#ref-3">[3]</a> (74.0%). While 69.5% identified grooved rubber soles as the safest for hills, only 59.5% recognized soft slippers as hazardous on steep paths. The majority (65.3%) fell into the Good or Very Good knowledge categories, while 34.8% scored Fair or Poor. Significant associations were found between knowledge scores and age (p = 0.022), education level (p &lt; 0.001), and place of residence (p = 0.030), with younger, better-educated, and urban respondents displaying higher awareness. No significant gender differences were observed (p = 0.256).<o:p></o:p></span></h2>',
  //       istick: false,
  //       refCount: 1,
  //     },
  //     {
  //       section_id: 16,
  //       article_id: 6,
  //       section_title: "Conclusion",
  //       Section_description:
  //         '<h2 style="text-align: justify; line-height: 115%;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 115%; font-weight: normal; mso-bidi-font-weight: bold;">While general awareness about footwear safety in hilly terrain is encouraging, substantial gaps persist&mdash;particularly among older adults, rural residents, and the less educated. These <a href="#ref-4">[4]</a> findings call for targeted public health interventions focused on promoting affordable, terrain-appropriate footwear and correcting deeply rooted misconceptions. Integrating footwear safety education into rural health programs, school initiatives, and geriatric outreach could significantly reduce preventable fall injuries in hilly regions like Himachal Pradesh.<o:p></o:p></span></h2>',
  //       istick: false,
  //       refCount: 1,
  //     },
  //   ],
  //   Reffences: [
  //     {
  //       ref_id: 21,
  //       article_id: 6,
  //       reffrence_html_id: "1",
  //       reffrence:
  //         "ffkfjghfeig avebivbei kaber vkwgfiew ksdgd sfkhvisb dflnoewjp;bjfwphweohg",
  //     },
  //     {
  //       ref_id: 41,
  //       article_id: 6,
  //       reffrence_html_id: "2",
  //       reffrence:
  //         "Goh JW, Singh DKA, Mesbah N, et al. Fall awareness behaviour and its associated factors among community dwelling older adults. BMC Geriatr. 2021;21:226.",
  //     },
  //     {
  //       ref_id: 42,
  //       article_id: 6,
  //       reffrence_html_id: "3",
  //       reffrence:
  //         "Thakur A, Chaudhary J. Awareness regarding preventive factors & practices followed in case of low backache (LBA) among people of high hilly area of Himachal Pradesh. Himal J Appl Med Sci Res. 2022;3(2):1–5.",
  //     },
  //   ],
  // };
  // Helper functions to format data
  const formatKeywords = (keywordsString) => {
    if (!keywordsString) return [];
    return keywordsString.split(";").filter((keyword) => keyword.trim());
  };

  const getMainAuthor = () => {
    const mainAuthor = journalData.articleAuthors?.find(
      (authorItem) => authorItem.isMain
    );
    return mainAuthor
      ? mainAuthor.author
      : journalData.articleAuthors?.[0]?.author;
  };

  const getCorrespondingAuthor = () => {
    // For now, treating main author as corresponding author
    return getMainAuthor();
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    navigator.share?.({
      title: journalData.title,
      url: window.location.href,
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
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
        <div className="bg-gray-600 text-white py-4 px-6">
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
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded text-sm hover:bg-white hover:bg-opacity-10"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
                <button className="flex items-center space-x-1 px-4 py-1.5 bg-blue-600 rounded hover:bg-blue-700 text-sm">
                  <Download className="w-4 h-4" />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
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
                  Pages: {journalData.pages} • Revision Round:{" "}
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

          {/* Timeline - Only show if future data is available */}
          {/* <div className="mb-8 text-sm text-gray-600">
          <div className="flex items-center space-x-6">
            <span>Submitted: Coming soon</span>
            <ChevronRight className="w-4 h-4" />
            <span>Under Review</span>
          </div>
        </div> */}

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
