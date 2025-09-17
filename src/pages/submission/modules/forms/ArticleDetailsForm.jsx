import useInitialObject from "@/hooks/useInitialObject";
import { useToastMutation } from "@/hooks/useNotification";
import useSaveSteps from "@/hooks/useSaveSteps";
import {
  useCreateArticleMainDetailsMutation,
  useLazyGetArticleDetailsByIdQuery,
  useUpdateArticleMainDetailsMutation,
} from "@/services/features/submission/submissionApi";
import { Formik, Form, Field } from "formik";
import { useSearchParams } from "react-router-dom";

const ArticleDetailsForm = () => {
  const [queryparams] = useSearchParams();

  const [IntialObject] = useInitialObject({
    article_id: queryparams.get("article_id"),
    useLazyQueryHook: useLazyGetArticleDetailsByIdQuery,
  });
  const IntroDataObject =
    IntialObject.status === "fulfilled" ? IntialObject.data?.data : null;

  const initialValues = {
    article_id: Number(queryparams.get("article_id")) || null,
    isConflictInterest: IntroDataObject
      ? IntroDataObject.isConflictInterest
        ? "true"
        : "false"
      : "",
    conflict: IntroDataObject ? IntroDataObject.conflict : "",
    isFunded: IntroDataObject
      ? IntroDataObject.isFunded
        ? "true"
        : "false"
      : "",
    funding_info: IntroDataObject ? IntroDataObject.funding_info : "",
    isEthical: IntroDataObject
      ? IntroDataObject.isEthical
        ? "true"
        : "false"
      : "false",
    ethical_info: IntroDataObject ? IntroDataObject.ethical_info : "",
    isInformedConsent: IntroDataObject
      ? IntroDataObject.isInformedConsent
        ? "true"
        : "false"
      : "false",
    consent_info: IntroDataObject ? IntroDataObject.consent_info : "",
    isClinical: IntroDataObject
      ? IntroDataObject.isClinical
        ? "true"
        : "false"
      : "false",
    clinical_info: IntroDataObject ? IntroDataObject.clinical_info : "",
    copyright: IntroDataObject ? IntroDataObject.copyright : "",
    manuscript_file: "",
    manuscript_file_link: IntroDataObject
      ? IntroDataObject.manuscript_file
      : "",
    istick: IntroDataObject ? IntroDataObject.istick : true,
  };

  const { updateSaveSteps } = useSaveSteps({
    saveObject: { submission: true },
    nextHighlight: "authors",
  });

  const [createArticleMainDetails] = useToastMutation(
    useCreateArticleMainDetailsMutation(),
    { showLoading: true }
  );

  const [updateArticleMainDetails] = useToastMutation(
    useUpdateArticleMainDetailsMutation(),
    { showLoading: true }
  );

  const SubmitAndContinueHandler = async (values, setSubmitting) => {
    // Convert string values back to booleans for backend
    const submitData = {
      ...values,
      isConflictInterest: values.isConflictInterest === "true",
      isFunded: values.isFunded === "true",
      isEthical: values.isEthical === "true",
      isInformedConsent: values.isInformedConsent === "true",
      isClinical: values.isClinical === "true",
    };

    if (IntialObject.status === "fulfilled") {
      await updateArticleMainDetails(submitData);
    } else {
      await createArticleMainDetails(submitData);
    }

   
    setSubmitting(false);
    updateSaveSteps(
      `/submission/authors?article_id=${queryparams.get("article_id")}`
    );
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
        enableReinitialize={true}
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
                {values.manuscript_file_link && (
                  <span className="text-xs text-gray-500">
                    Current File: {values.manuscript_file_link}
                  </span>
                )}
              </div>

              {/* Conflict of Interest */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Do you have any conflict of interest?
                </label>
                <div className="flex space-x-6">
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="isConflictInterest"
                      value="true"
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="isConflictInterest"
                      value="false"
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">No</span>
                  </label>
                </div>
              </div>

              {/* Conflict Details */}
              {values.isConflictInterest === true ||
                (values.isConflictInterest === "true" && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Conflict of Interest Details
                    </label>
                    <Field
                      as="textarea"
                      name="conflict"
                      placeholder="Please describe your conflict of interest"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 resize-vertical"
                    />
                  </div>
                ))}

              {/* Funding Information */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Is this research funded?
                </label>
                <div className="flex space-x-6">
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="isFunded"
                      value="true"
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="isFunded"
                      value="false"
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">No</span>
                  </label>
                </div>
              </div>

              {/* Funding Details */}
              {values.isFunded === true ||
                (values.isFunded === "true" && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Funding Information
                    </label>
                    <Field
                      as="textarea"
                      name="funding_info"
                      placeholder="Please provide details about funding sources"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 resize-vertical"
                    />
                  </div>
                ))}

              {/* Ethical Approval */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Does this research have ethical approval?
                </label>
                <div className="flex space-x-6">
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="isEthical"
                      value="true"
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="isEthical"
                      value="false"
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">No</span>
                  </label>
                </div>
              </div>

              {/* Ethical Details */}
              {values.isEthical === true ||
                (values.isEthical === "true" && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Ethical Approval Information
                    </label>
                    <Field
                      as="textarea"
                      name="ethical_info"
                      placeholder="Please provide details about ethical approval"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 resize-vertical"
                    />
                  </div>
                ))}

              {/* Informed Consent */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Was informed consent obtained?
                </label>
                <div className="flex space-x-6">
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="isInformedConsent"
                      value="true"
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="isInformedConsent"
                      value="false"
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">No</span>
                  </label>
                </div>
              </div>

              {/* Consent Details */}
              {values.isInformedConsent === true ||
                (values.isInformedConsent === "true" && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Informed Consent Information
                    </label>
                    <Field
                      as="textarea"
                      name="consent_info"
                      placeholder="Please provide details about informed consent process"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 resize-vertical"
                    />
                  </div>
                ))}

              {/* Clinical Trial */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Is this a clinical trial?
                </label>
                <div className="flex space-x-6">
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="isClinical"
                      value="true"
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="isClinical"
                      value="false"
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">No</span>
                  </label>
                </div>
              </div>

              {/* Clinical Details */}
              {values.isClinical === true ||
                (values.isClinical === "true" && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Clinical Trial Information
                    </label>
                    <Field
                      as="textarea"
                      name="clinical_info"
                      placeholder="Please provide clinical trial registration details, protocol number, etc."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 resize-vertical"
                    />
                  </div>
                ))}

              {/* Copyright */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Copyright Statement *
                </label>
                <Field
                  as="textarea"
                  name="copyright"
                  placeholder="Enter copyright statement (maximum 500 characters)"
                  rows={3}
                  maxLength={500}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 resize-vertical"
                />
                <div className="mt-1 text-xs text-gray-500 text-right">
                  {values.copyright?.length || 0}/500 characters
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="mb-6">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="istick"
                    checked={values.istick}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
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
