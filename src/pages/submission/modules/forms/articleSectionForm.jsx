import TextEditor from "@/components/TextEditor";
import { useToastMutation } from "@/hooks/useNotification";
import useSaveSteps from "@/hooks/useSaveSteps";
import {
  useCreateArticleSectionMutation,
  useGetArticleSectionsQuery,
} from "@/services/features/submission/submissionApi";
import { Form, Formik } from "formik";
import { useParams, useSearchParams } from "react-router-dom";

function ArticleSectionForm() {
  const [queryParams] = useSearchParams();
  const { data: articlePreSections } = useGetArticleSectionsQuery({
    article_id: Number(queryParams.get("article_id")),
  });

  console.log(articlePreSections);
  const { section_name } = useParams();
  const [createArticleSection] = useToastMutation(
    useCreateArticleSectionMutation(),
    { showLoading: true }
  );

  const { updateSaveSteps } = useSaveSteps({
    saveObject: { introduction: true },
    isExpand: true,
    nextHighlight: section_name.split("-")[0].toLowerCase().trim(),
  });

  const section =
    articlePreSections &&
    articlePreSections.data.filter(
      (sec) =>
        sec.section_title.toLowerCase().trim() ===
        section_name.split("-")[0].toLowerCase().trim()
    );

  console.log(section);

  function convertSectionsInitialObject(sections) {
    const result = {};

    sections.forEach((section) => {
      const key = section.section_title.toLowerCase().trim();
      const value = section.Section_description
        ? section.Section_description
        : "";
      result[key] = value;
    });

    return result;
  }

  const initialValues = convertSectionsInitialObject(
    articlePreSections ? articlePreSections.data : []
  );

  console.log(initialValues);

  async function SubmitAndContinueHandler(values, setSubmitting) {
    // alert(JSON.stringify(values))
    const parser = new DOMParser();
    const doc = await parser.parseFromString(
      values[section_name.split("-")[0].toLowerCase().trim()],
      "text/html"
    );

    const atag = doc.querySelectorAll('a[href^="#ref-"]');

    const createResult = await createArticleSection({
      article_id: Number(queryParams.get("article_id")),
      section_title: section_name.split("-")[0].toLowerCase().trim(),
      Section_description:
        values[section_name.split("-")[0].toLowerCase().trim()],
      refCount: atag.length,
    });

    if (createResult && createResult.status) {
      const article_id = queryParams.get("article_id");
      const ind =
        articlePreSections &&
        articlePreSections.data.findIndex(
          (sec) => sec.section_title === section[0].section_title
        );
      console.log(ind, articlePreSections.data.length);
      const nextRedirectURl =
        ind !== articlePreSections.data.length - 1
          ? `/submission/article-sections/${
              articlePreSections.data[ind + 1].section_title
            }-section?article_id=${article_id}`
          : `/submission/reviewers?article_id=${article_id}`;
      updateSaveSteps(nextRedirectURl);
    }
    setSubmitting(false);
  }

  // if (section && section.length > 0) {
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting }) =>
          SubmitAndContinueHandler(values, setSubmitting)
        }
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Write Your Research here
              </h2>

              <div className="mt-10">
                <h3 className="mb-5 font-bold text-xl underline text-gray-600">
                  {section_name.split("-")[0].toUpperCase()}
                </h3>
                <TextEditor
                  key={section_name}
                  name={section_name.split("-")[0].toLowerCase().trim()}
                  setInForm={setFieldValue}
                  initialContent={
                    section && section.length > 0
                      ? section[0].Section_description
                      : ""
                  }
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                disabled={isSubmitting}
                className="px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed"
              >
                Save & Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
// }

export default ArticleSectionForm;

// import TextEditor from "@/components/TextEditor";
// import { useToastMutation } from "@/hooks/useNotification";
// import useSaveSteps from "@/hooks/useSaveSteps";
// import {
//   useCreateArticleSectionMutation,
//   useGetArticleSectionsQuery,
// } from "@/services/features/submission/submissionApi";
// import { Form, Formik } from "formik";
// import { useParams, useSearchParams } from "react-router-dom";
// import { useEffect, useMemo } from "react";

// function ArticleSectionForm() {
//   const [queryParams] = useSearchParams();
//   const { data: articlePreSections } = useGetArticleSectionsQuery({
//     article_id: Number(queryParams.get("article_id")),
//   });

//   console.log(articlePreSections);
//   const { section_name } = useParams();
//   const [createArticleSection] = useToastMutation(
//     useCreateArticleSectionMutation(),
//     { showLoading: true }
//   );

//   const { updateSaveSteps } = useSaveSteps({
//     saveObject: { introduction: true },
//     isExpand: true,
//     nextHighlight: section_name.split("-")[0].toLowerCase().trim(),
//   });

//   // Memoize the current section to ensure it updates when section_name changes
//   const currentSection = useMemo(() => {
//     if (!articlePreSections) return null;

//     const sectionKey = section_name.split("-")[0].toLowerCase().trim();
//     return articlePreSections.data.find(
//       (sec) => sec.section_title.toLowerCase().trim() === sectionKey
//     );
//   }, [articlePreSections, section_name]);

//   console.log("Current section:", currentSection);

//   function convertSectionsInitialObject(sections) {
//     const result = {};

//     sections.forEach((section) => {
//       const key = section.section_title.toLowerCase().trim();
//       const value = section.Section_description
//         ? section.Section_description
//         : "";
//       result[key] = value;
//     });

//     return result;
//   }

//   const initialValues = convertSectionsInitialObject(
//     articlePreSections ? articlePreSections.data : []
//   );

//   console.log(initialValues);

//   async function SubmitAndContinueHandler(values, setSubmitting) {
//     const sectionKey = section_name.split("-")[0].toLowerCase().trim();
//     const parser = new DOMParser();
//     const doc = await parser.parseFromString(
//       values[sectionKey],
//       "text/html"
//     );

//     const atag = doc.querySelectorAll('a[href^="#ref-"]');

//     const createResult = await createArticleSection({
//       article_id: Number(queryParams.get("article_id")),
//       section_title: sectionKey,
//       Section_description: values[sectionKey],
//       refCount: atag.length,
//     });

//     if (createResult && createResult.status) {
//       const article_id = queryParams.get("article_id");
//       const ind =
//         articlePreSections &&
//         articlePreSections.data.findIndex(
//           (sec) => sec.section_title === currentSection?.section_title
//         );
//       console.log(ind, articlePreSections.data.length);
//       const nextRedirectURl =
//         ind !== (articlePreSections.data.length - 1)
//           ? `/submission/article-sections/${articlePreSections.data[ind + 1].section_title}-section?article_id=${article_id}`
//           : `/submission/reviewers?article_id=${article_id}`;
//       updateSaveSteps(nextRedirectURl);
//     }
//     setSubmitting(false);
//   }

//   // Get the current section's content, ensuring it updates when section changes
//   const getCurrentSectionContent = () => {
//     if (!currentSection) return "";
//     return currentSection.Section_description || "";
//   };

//   return (
//     <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
//       <Formik
//         initialValues={initialValues}
//         enableReinitialize={true}
//         onSubmit={(values, { setSubmitting }) =>
//           SubmitAndContinueHandler(values, setSubmitting)
//         }
//       >
//         {({ isSubmitting, setFieldValue, values }) => (
//           <Form>
//             <div className="mb-8">
//               <h2 className="text-2xl font-semibold text-gray-900 mb-6">
//                 Write Your Research here
//               </h2>

//               <div className="mt-10">
//                 <h3 className="mb-5 font-bold text-xl underline text-gray-600">
//                   {section_name.split("-")[0].toUpperCase()}
//                 </h3>
//                 <TextEditor
//                   key={section_name} // Add key prop to force re-render when section changes
//                   name={section_name.split("-")[0].toLowerCase().trim()}
//                   setInForm={setFieldValue}
//                   initialContent={getCurrentSectionContent()}
//                 />
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex gap-3">
//               <button
//                 disabled={isSubmitting}
//                 className="px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed"
//               >
//                 Save & Continue
//               </button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }

// export default ArticleSectionForm;
