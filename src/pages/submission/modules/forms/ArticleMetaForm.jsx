import { useToastMutation } from "@/hooks/useNotification";
import useSaveSteps from "@/hooks/useSaveSteps";
import { useAddArticleMetaDataMutation } from "@/services/features/manuscript/slice";
import { useLazyGetArticleIntroByIdQuery } from "@/services/features/submission/submissionApi";
import { Formik, Form, Field } from "formik";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const ArticleMetaForm = () => {
  const [queryparams] = useSearchParams();

  const [getArticleIntro, IntroData] = useLazyGetArticleIntroByIdQuery();

  useEffect(() => {
    getArticleIntro(queryparams.get("article_id"));
  }, [queryparams.get("article_id")]);

  const IntroDataObject =
    IntroData.status === "fulfilled" ? IntroData.data?.data : null;

  // Special issue options - modify these according to your needs
  const specialIssueOptions = [
    { value: 1, label: "Special Issue 1 - AI and Machine Learning" },
    { value: 2, label: "Special Issue 2 - Climate Change Research" },
    { value: 3, label: "Special Issue 3 - Medical Innovations" },
    { value: 4, label: "Special Issue 4 - Technology Advances" },
    { value: 5, label: "Special Issue 5 - Social Sciences" },
  ];

  const intitialValues = {
    intro_id: Number(queryparams.get("article_id")) || null,
    title: IntroDataObject ? IntroDataObject.title : "",
    abstract: IntroDataObject ? IntroDataObject.abstract : "",
    keywords: IntroDataObject ? IntroDataObject.keywords : "",
    pages: IntroDataObject ? IntroDataObject.pages : "",
    specialIssue: IntroDataObject
      ? IntroDataObject.specialIssue
        ? IntroDataObject.specialIssue
        : null
      : null,
    issueType: IntroDataObject
      ? IntroDataObject.issueType
        ? IntroDataObject.issueType
        : "regular"
      : "regular",
  };

  const { updateSaveSteps } = useSaveSteps({
    saveObject: { reviewers: true },
    nextHighlight: "articleDetails",
  });

  const [addMetaData] = useToastMutation(useAddArticleMetaDataMutation(), {
    showLoading: true,
  });

  const SubmitAndContinueHandler = async (values, setSubmitting) => {
    await addMetaData(values);
    updateSaveSteps(
      `/submission/article-details?article_id=${queryparams.get("article_id")}`
    );
    // console.log(values)
    setSubmitting(false);
  };

  const handleIssueTypeChange = (value, setFieldValue) => {
    if (value === "regular") {
      setFieldValue("specialIssue", null);
    } else if (value === "special") {
      setFieldValue("specialIssue", null); // Reset to empty string for dropdown
    }
    setFieldValue("issueType", value);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <Formik
        initialValues={intitialValues}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting }) =>
          SubmitAndContinueHandler(values, setSubmitting)
        }
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Article Introduction
              </h2>

              {/* Title Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Title
                </label>
                <Field
                  name="title"
                  type="text"
                  placeholder="Enter title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                />
              </div>

              {/* Abstract Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Abstract
                </label>
                <Field
                  as="textarea"
                  name="abstract"
                  placeholder="Enter abstract"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 resize-vertical"
                />
              </div>

              {/* Keywords Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Keywords
                </label>
                <Field
                  name="keywords"
                  type="text"
                  placeholder="Enter keywords (comma separated)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                />
              </div>

              {/* Pages Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Pages
                </label>
                <Field
                  name="pages"
                  type="number"
                  placeholder="Enter number of pages"
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                />
              </div>

              {/* Issue Type Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What type of Issue this ??
                </label>
                <div className="flex space-x-6">
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="issueType"
                      value="regular"
                      onChange={(e)=> handleIssueTypeChange(e.target.value, setFieldValue)}
                      className="form-radio text-blue-700 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">Regular</span>
                  </label>

                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="issueType"
                      value="special"
                      onChange={(e)=> handleIssueTypeChange(e.target.value, setFieldValue)}
                      className="form-radio text-blue-700 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">Special</span>
                  </label>
                </div>
              </div>

              {/* Special Issue Dropdown - Only shown when Special is selected */}
              {values.issueType === "special" && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Special Issue
                  </label>
                  <Field
                    as="select"
                    name="specialIssue"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                  >
                    <option value="">Select a special issue...</option>
                    {specialIssueOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
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
  );
};

export default ArticleMetaForm;
