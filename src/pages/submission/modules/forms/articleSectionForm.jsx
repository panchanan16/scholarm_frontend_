import TextEditor from "@/components/TextEditor";
import { Form, Formik } from "formik";

function ArticleSectionForm() {
  const initialValues = {
    introduction: null,
    result: null,
    conclusion: null,
  };

  function SubmitAndContinueHandler(values, setSubmitting) {
    console.log(values);
    setSubmitting(false);
  }

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) =>
          SubmitAndContinueHandler(values, setSubmitting)
        }
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Write Your Research here
              </h2>

              {Object.entries(initialValues).map(([key, value]) => (
                <div className="mt-10" key={key}>
                  <h3 className="mb-5 font-bold text-xl underline text-gray-600">
                    {key.toUpperCase()}
                  </h3>
                  <TextEditor
                    name={key}
                    setInForm={setFieldValue}
                    initialContent={""}
                  />
                </div>
              ))}
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

export default ArticleSectionForm;
