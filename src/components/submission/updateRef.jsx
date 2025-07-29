import { useToastMutation } from "@/hooks/useNotification";
import { useUpdateReffenceMutation } from "@/services/features/submission/submissionApi";
import { Field, Form, Formik } from "formik";

const UpdateReff = ({ isOpen, onClose, initialValues }) => {
  const [updateReffrence] = useToastMutation(useUpdateReffenceMutation(), {
    showLoading: true,
  });

  const handleSave = async (values, setSubmitting) => {
    await updateReffrence(values);
    setSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/45  flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-blue-800 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="font-medium">EDIT MODE</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onClose({ isOpen: false, initialValues: {} })}
              className="text-white hover:text-blue-200 px-3 py-1 rounded"
            >
              Exit
            </button>
          </div>
        </div>

        {/* Content */}
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) =>
            handleSave(values, setSubmitting)
          }
        >
          {({ isSubmitting, resetForm }) => (
            <Form>
              <div className="p-6">
                {/* Type Field */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reffrence Number:
                  </label>
                  <Field
                    type="text"
                    name="reffrence_html_id"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter reffenrence number..."
                  />
                </div>

                {/* Text Area */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Refference
                  </label>
                  <Field
                    name="reffrence"
                    as="textarea"
                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Enter a reffrences related your journal..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Update
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateReff;
