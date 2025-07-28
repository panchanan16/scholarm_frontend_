import useSaveSteps from "@/hooks/useSaveSteps";
import { Formik, Form, Field } from "formik";
import { useState } from "react";

const ArticleMetaForm = () => {
  const intitialValues = {
    title: "",
    abstract: "",
    keywords: "",
    pages: "",
    belong_to: "",
  };

  const { updateSaveSteps } = useSaveSteps({
    saveObject: { reviewers: true },
    nextHighlight: "authors",
  });

  const SubmitAndContinueHandler = (values, setSubmitting) => {
    setTimeout(() => {
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
      updateSaveSteps("authors");
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <Formik
        initialValues={intitialValues}
        onSubmit={(values, { setSubmitting }) =>
          SubmitAndContinueHandler(values, setSubmitting)
        }
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Article Details
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

              {/* Belong To Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What type of Issue this ??
                </label>
                <div className="flex space-x-6">
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="belong_to"
                      value="regular"
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">Regular</span>
                  </label>

                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="belong_to"
                      value="special"
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-900">Special</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
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
};

export default ArticleMetaForm;
