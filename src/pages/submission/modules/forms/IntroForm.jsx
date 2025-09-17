import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { typeSubtypes } from "@/data/submissionType";
import { useToastMutation } from "@/hooks/useNotification";
import useSaveSteps from "@/hooks/useSaveSteps";
import { useGetStartedArticleMutation } from "@/services/features/manuscript/slice";
import { useAuth } from "@/hooks/useAuth";
import { useSelector } from "react-redux";
import { selectJournal } from "@/store/feature/auth/authSlice";

export default function IntroForm() {
  const journal = useSelector(selectJournal);
  const [type, setType] = useState("");
  const [subClass, setSubClass] = useState([]);
  const { updateSaveSteps } = useSaveSteps({
    saveObject: { articles: true },
    isExpand: true,
  });

  const [getArticleStart] = useToastMutation(useGetStartedArticleMutation());
  const { userRole, user, isAuthenticated } = useAuth();

  const initialValues = {
    articleDetails: {
      journal_id: journal?.journal_id || "",
      type: "",
      sub_class: "",
      main_author: user && user.author_id,
    },
    sections: [],
  };

  const handleTypeChange = (selectedType, setFieldValue) => {
    setType(selectedType);
    if (!selectedType || !typeSubtypes[selectedType]) {
      setSubClass([]);
    }
    setSubClass(typeSubtypes[selectedType].subclass);
    setFieldValue("articleDetails.type", selectedType);
    setFieldValue("sections", typeSubtypes[selectedType].section);
  };

  async function SubmitAndContinueHandler(values, setSubmitting) {
    if (
      userRole === "author" &&
      user &&
      isAuthenticated &&
      initialValues.articleDetails.main_author
    ) {
      if (journal && journal.journal_id && values.articleDetails.journal_id) {
        const article = await getArticleStart(values);
        const article_id = article.data[0]?.intro_id;
        article &&
          updateSaveSteps(`/submission/article-title?article_id=${article_id}`);
        setSubmitting(false);
      } else {
        return alert("Invalid Submission!");
      }
    } else {
      alert("You must login as author to submit");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={(values, { setSubmitting }) =>
            SubmitAndContinueHandler(values, setSubmitting)
          }
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Getting Started
                </h2>

                {/* Type Field */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Type
                  </label>
                  <Field
                    as="select"
                    value={type}
                    name="articleDetails.type"
                    onChange={(e) =>
                      handleTypeChange(e.target.value, setFieldValue)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                  >
                    <option value="">Select type</option>
                    <option value="orginalResearch">Orginal Research</option>
                    <option value="reviewArticle">Review Article</option>
                    <option value="caseBasedArticle">Case-Based Article</option>
                    <option value="methodologicalArticle">Methodological Article</option>
                    <option value="shortCommunication">Short Communication</option>
                  </Field>
                </div>

                {/* Sub Class Field */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Sub Class
                  </label>
                  <Field
                    as="select"
                    name="articleDetails.sub_class"
                    disabled={!type}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {type ? "Select sub class" : "Select type first"}
                    </option>
                    {subClass.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  disabled={isSubmitting}
                  className="px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Save & Continue"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
