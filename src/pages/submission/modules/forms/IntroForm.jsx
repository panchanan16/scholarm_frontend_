import {
  modifyExpand,
  updateSaveSteps,
} from "@/store/feature/submission/slice";
import { Field, FieldArray, Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { typeSubtypes } from "@/data/submissionType";

export default function IntroForm() {
  const [type, setType] = useState("");
  const [subClass, setSubClass] = useState([]);
  const dispatch = useDispatch();

  const initialValues = {
    articleDetails: {
      type: "",
      sub_class: "",
      main_author: "",
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

  function SubmitAndContinueHandler(values, setSubmitting) {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      dispatch(updateSaveSteps({ article: true }));
      dispatch(modifyExpand("content"));
      setSubmitting(false);
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
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
                  Classification Details
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
                    <option value="article">Article</option>
                    <option value="research">Research</option>
                    <option value="review">Review</option>
                    <option value="report">Report</option>
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
                  Save & Continue
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
