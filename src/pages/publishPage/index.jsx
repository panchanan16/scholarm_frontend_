import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema
const validationSchema = Yup.object({
  article_id: Yup.number()
    .required('Article ID is required')
    .positive('Article ID must be a positive number')
    .integer('Article ID must be an integer'),
  volume: Yup.number()
    .required('Volume is required')
    .positive('Volume must be a positive number'),
  year: Yup.number()
    .required('Year is required')
    .min(1900, 'Year must be after 1900')
    .max(2100, 'Year must be before 2100')
    .integer('Year must be an integer'),
  issue: Yup.number()
    .required('Issue is required')
    .positive('Issue must be a positive number')
});

const PublishArticlePage = () => {
  // Initial values - journal kept in background
  const initialValues = {
    journal: 2, // Hidden field
    article_id: 5,
    volume: 3,
    year: 2025,
    issue: 1
  };

  // Journal name mapping (you can make this dynamic based on journal ID)
  const journalName = "International Journal of Computer Science & Technology";

  // Volume options (1-50)
  const volumeOptions = Array.from({ length: 50 }, (_, i) => i + 1);

  // Issue options (1-12 for quarterly/monthly issues)
  const issueOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    console.log('Form submitted with values:', values);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`Article information submitted successfully!\n\nJournal: ${journalName}\nArticle ID: ${values.article_id}\nVolume: ${values.volume}\nYear: ${values.year}\nIssue: ${values.issue}`);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Journal Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              Journal Submission
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {journalName}
            </h1>           
          </div>

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-8 py-8">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
              >
                {({ isSubmitting, values, errors, touched }) => (
                  <Form className="space-y-8">
                    {/* Hidden journal field */}
                    <Field name="journal" type="hidden" />

                    {/* Volume and Issue Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Volume Field */}
                      <div className="space-y-2">
                        <label htmlFor="volume" className="block text-sm font-semibold text-gray-800">
                          Volume
                        </label>
                        <Field
                          as="select"
                          name="volume"
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900 text-lg cursor-pointer ${
                            touched.volume && errors.volume
                              ? 'border-red-400 bg-red-50'
                              : 'border-gray-200'
                          }`}
                        >
                          <option value="">Select Volume</option>
                          {volumeOptions.map((vol) => (
                            <option key={vol} value={vol}>
                              Volume {vol}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="volume"
                          component="div"
                          className="text-sm text-red-600 font-medium"
                        />
                      </div>

                      {/* Issue Field */}
                      <div className="space-y-2">
                        <label htmlFor="issue" className="block text-sm font-semibold text-gray-800">
                          Issue
                        </label>
                        <Field
                          as="select"
                          name="issue"
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900 text-lg cursor-pointer ${
                            touched.issue && errors.issue
                              ? 'border-red-400 bg-red-50'
                              : 'border-gray-200'
                          }`}
                        >
                          <option value="">Select Issue</option>
                          {issueOptions.map((iss) => (
                            <option key={iss} value={iss}>
                              Issue {iss}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="issue"
                          component="div"
                          className="text-sm text-red-600 font-medium"
                        />
                      </div>
                    </div>

                    {/* Year Field */}
                    <div className="space-y-2">
                      <label htmlFor="year" className="block text-sm font-semibold text-gray-800">
                        Publication Year
                      </label>
                      <Field
                        name="year"
                        type="number"
                        placeholder="Enter publication year"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900 text-lg ${
                          touched.year && errors.year
                            ? 'border-red-400 bg-red-50'
                            : 'border-gray-200'
                        }`}
                      />
                      <ErrorMessage
                        name="year"
                        component="div"
                        className="text-sm text-red-600 font-medium"
                      />
                    </div>                    

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </span>
                        ) : (
                          'Publish Article'
                        )}
                      </button>
                      
                      <button
                        type="button"
                        className="sm:flex-none px-8 py-4 text-gray-600 bg-gray-100 hover:bg-gray-200 font-semibold rounded-lg focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-200"
                      >
                        Save as Draft
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishArticlePage;