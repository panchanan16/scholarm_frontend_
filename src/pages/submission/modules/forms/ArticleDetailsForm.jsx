import { useToastMutation } from "@/hooks/useNotification";
import useSaveSteps from "@/hooks/useSaveSteps";
import { useCreateArticleMainDetailsMutation } from "@/services/features/submission/submissionApi";
import { Formik, Form, Field } from "formik";
import { useSearchParams } from "react-router-dom";

const ArticleDetailsForm = () => {
  const [queryparams] = useSearchParams();

  const initialValues = {
    article_id: Number(queryparams.get("article_id")) || null,
    cover_letter: "",
    cover_letter_file: "",
    isFunding: "",
    isMaterial: null,
    materialFile: "",
    isCoding: "",
    codeFile: "",
    isData: null,
    dataFile: "",
    isHuman: "",
    isBoradApproval: "",
    approvalDetails: "",
    manuscript_file: null,
    manuscript_file_link: "",
    istick: true,
  };

  const { updateSaveSteps } = useSaveSteps({
    saveObject: { submission: true },
    nextHighlight: "authors",
  });

  const [createArticleMainDetails] = useToastMutation(useCreateArticleMainDetailsMutation(), {showLoading: true})

  const SubmitAndContinueHandler = async (values, setSubmitting) => {
    // setTimeout(() => {
    //   setSubmitting(false);
    //   alert(JSON.stringify(values, null, 2));
    // //   updateSaveSteps(`/submission/authors?article_id=${queryparams.get("article_id")}`);
    // }, 2000);
    await createArticleMainDetails(values)
    setSubmitting(false)
    updateSaveSteps(`/submission/authors?article_id=${queryparams.get("article_id")}`);

  };

  const handleFileChange = (event, setFieldValue, fieldName) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue(fieldName, file.name);
    } else {
      setFieldValue(fieldName, "");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) =>
          SubmitAndContinueHandler(values, setSubmitting)
        }
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Article Details
              </h2>

              {/* Cover Letter Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Cover Letter
                </label>
                <Field
                  as="textarea"
                  name="cover_letter"
                  placeholder="Enter your cover letter"
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 resize-vertical"
                />
              </div>

              {/* Cover Letter File */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Cover Letter File (Optional)
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) =>
                    handleFileChange(e, setFieldValue, "cover_letter_file")
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {values.cover_letter_file && (
                  <p className="mt-1 text-sm text-gray-600">
                    Selected: {values.cover_letter_file}
                  </p>
                )}
              </div>

              {/* Manuscript File */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Manuscript File *
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) =>
                    handleFileChange(e, setFieldValue, "manuscript_file")
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {values.manuscript_file && (
                  <p className="mt-1 text-sm text-gray-600">
                    Selected: {values.manuscript_file}
                  </p>
                )}
              </div>

              {/* Funding Information */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Is this research funded?
                </label>
                <div className="flex space-x-6">
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="isFunding"
                      value="Yes"
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="isFunding"
                      value="No"
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">No</span>
                  </label>
                </div>
              </div>

              {/* Material Availability */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Are materials available?
                </label>
                <div className="flex space-x-6">
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="isMaterial"
                      value="true"
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="isMaterial"
                      value="No"
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">No</span>
                  </label>
                </div>
              </div>

              {/* Material File */}
              {values.isMaterial === "true" && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Material File
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.zip,.rar"
                    onChange={(e) =>
                      handleFileChange(e, setFieldValue, "materialFile")
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {values.materialFile && (
                    <p className="mt-1 text-sm text-gray-600">
                      Selected: {values.materialFile}
                    </p>
                  )}
                </div>
              )}

              {/* Code Availability */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Is code available?
                </label>
                <div className="flex space-x-6">
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="isCoding"
                      value="true"
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="isCoding"
                      value="No"
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">No</span>
                  </label>
                </div>
              </div>

              {/* Code File */}
              {values.isCoding === "true" && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Code File
                  </label>
                  <input
                    type="file"
                    accept=".zip,.rar,.tar,.gz,.py,.js,.cpp,.java,.r"
                    onChange={(e) =>
                      handleFileChange(e, setFieldValue, "codeFile")
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {values.codeFile && (
                    <p className="mt-1 text-sm text-gray-600">
                      Selected: {values.codeFile}
                    </p>
                  )}
                </div>
              )}

              {/* Data Availability */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Is data available?
                </label>
                <div className="flex space-x-6">
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="isData"
                      value="true"
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="isData"
                      value="No"
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">No</span>
                  </label>
                </div>
              </div>

              {/* Data File */}
              {values.isData === "true" && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Data File
                  </label>
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls,.json,.xml,.zip,.rar"
                    onChange={(e) =>
                      handleFileChange(e, setFieldValue, "dataFile")
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {values.dataFile && (
                    <p className="mt-1 text-sm text-gray-600">
                      Selected: {values.dataFile}
                    </p>
                  )}
                </div>
              )}

              {/* Human Subjects */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Does this research involve human subjects?
                </label>
                <div className="flex space-x-6">
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="isHuman"
                      value="Yes"
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="isHuman"
                      value="No"
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">No</span>
                  </label>
                </div>
              </div>

              {/* Board Approval */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Do you have institutional review board approval?
                </label>
                <div className="flex space-x-6">
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="isBoradApproval"
                      value="Yes"
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="isBoradApproval"
                      value="No"
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">No</span>
                  </label>
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="isBoradApproval"
                      value="not_applicable"
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">Not Applicable</span>
                  </label>
                </div>
              </div>

              {/* Approval Details */}
              {values.isBoradApproval === "Yes" && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Approval Details
                  </label>
                  <Field
                    as="textarea"
                    name="approvalDetails"
                    placeholder="Please provide details about your institutional review board approval"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 resize-vertical"
                  />
                </div>
              )}

              {/* Terms Agreement */}
              <div className="mb-6">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value="agreed"
                    className="form-checkbox text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="ml-2 text-gray-900">
                    I agree to the terms and conditions and confirm that all
                    information provided is accurate
                  </span>
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
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

export default ArticleDetailsForm;
