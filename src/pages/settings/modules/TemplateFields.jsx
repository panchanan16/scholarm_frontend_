import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Plus,
  Settings,
  ChevronDown,
  Edit2,
  Trash2,
  Save,
  X,
  ChevronRight,
  ChevronLeft,
  Layers,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCreateEmailFieldMutation, useCreateFieldTypeMutation, useGetAllFieldTypeQuery } from "@/services/features/template/templateApi";
import { useToastMutation } from "@/hooks/useNotification";

const FieldsPageForm = ({onEdit, onDelete }) => {
  const { data: templateFields } = useGetAllFieldTypeQuery();
  const [createEmailField] = useToastMutation(useCreateEmailFieldMutation(), {showLoading: true})
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [fields, setFields] = useState([]);

  // Helper function to assign colors based on field type
  function getColorForFieldType(fieldType) {
    const colorMap = {
      User: "bg-blue-100 text-blue-800",
      Email: "bg-green-100 text-green-800",
      System: "bg-purple-100 text-purple-800",
      Notification: "bg-orange-100 text-orange-800",
      Authentication: "bg-red-100 text-red-800",
    };
    return colorMap[fieldType] || "bg-gray-100 text-gray-800";
  }

  // Initial values for Formik
  const initialValues = {
    field_type: "",
    field_name: "",
    field_value: "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    field_type: Yup.string().required("Field type is required"),
    field_name: Yup.string().trim().required("Field name is required"),
    field_value: Yup.string().trim().required("Field value is required"),
  });

  // Handle form submission
  const handleFieldSubmit = async (values, { setSubmitting, resetForm }) => {
    await createEmailField(values)
    resetForm();
    setSubmitting(false);
  };

  const handleEdit = (field) => {
    if (onEdit) {
      onEdit(field);
    }
  };

  const handleDelete = (field) => {
    // Remove from local state
    setFields((prev) => prev.filter((f) => f.field_id !== field.field_id));
    
    if (onDelete) {
      onDelete(field);
    }
  };

  // Set initial selected category when data loads
  React.useEffect(() => {
    if (templateFields?.data?.length > 0 && !selectedCategory) {
      setSelectedCategory(templateFields.data[0].field_type);
    }
  }, [templateFields, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white relative">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Field Management
              </h1>
            </div>
            <p className="text-gray-600">
              Create and manage dynamic fields for your application
            </p>
          </div>

          <div className="flex gap-5">
            <Link
              to={"/settings/fieldType"}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all text-white bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:scale-[1.02]`}
            >
              <Save className="w-4 h-4" />
              Add New Type
            </Link>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Layers className="w-4 h-4" />
              {sidebarOpen ? "Hide Fields" : "View Fields"}
              {sidebarOpen ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Main Form */}
        <div
          className={`transition-all duration-300 ${
            sidebarOpen ? "w-2/3" : "w-full"
          }`}
        >
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Field
            </h2>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleFieldSubmit}
            >
              {({ isSubmitting, values, setFieldValue }) => {
                return (
                  <Form>
                    <div className="space-y-6">
                      {/* Field Type Dropdown */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Field Type
                        </label>
                        <div className="relative">                           
                          <Field as='select' name="field_type" className='w-full px-4 py-3 border-2 rounded-lg transition-colors focus:outline-none border-gray-300 focus:border-blue-500'>
                            <option value="">Select Category</option>
                            {templateFields && templateFields.data?.map((type) => (
                                <option value={type.type_id}>{type.field_type}</option>
                              ))}
                          </Field>
                        </div>
                        <ErrorMessage
                          name="field_type"
                          component="div"
                          className="mt-2 text-sm text-red-600"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Field Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Field Name
                          </label>
                          <Field
                            name="field_name"
                            type="text"
                            className="w-full px-4 py-3 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border-gray-300 focus:border-blue-500"
                            placeholder="e.g., user_email"
                          />
                          <ErrorMessage
                            name="field_name"
                            component="div"
                            className="mt-2 text-sm text-red-600"
                          />
                        </div>

                        {/* Field Value */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Field Value
                          </label>
                          <Field
                            name="field_value"
                            type="text"
                            className="w-full px-4 py-3 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border-gray-300 focus:border-blue-500"
                            placeholder="e.g., {user_email}"
                          />
                          <ErrorMessage
                            name="field_value"
                            component="div"
                            className="mt-2 text-sm text-red-600"
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`
                            flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
                            ${
                              isSubmitting
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:scale-[1.02]"
                            }
                            text-white
                          `}
                        >
                          <Save className="w-4 h-4" />
                          {isSubmitting ? "Adding..." : "Add Field"}
                        </button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>

        {/* Right Sidebar */}
        <div
          className={`
          fixed right-0 top-0 h-full bg-white shadow-xl border-l-2 border-gray-200 transition-transform duration-300 z-50
          ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
          w-96 overflow-y-auto
        `}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Existing Fields
              </h3>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Category Tabs */}
            <div className="space-y-4">
              {templateFields?.data?.map((fieldTypeGroup) => {
                if (fieldTypeGroup.EmailTemplateField.length === 0) return null;

                const isExpanded = selectedCategory === fieldTypeGroup.field_type;
                const fieldColor = getColorForFieldType(fieldTypeGroup.field_type);

                return (
                  <div key={fieldTypeGroup.type_id}>
                    <button
                      onClick={() =>
                        setSelectedCategory(
                          isExpanded ? "" : fieldTypeGroup.field_type
                        )
                      }
                      className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${fieldColor
                            .replace("text-", "bg-")
                            .replace("-800", "-500")}`}
                        />
                        <span className="font-medium text-gray-900">
                          {fieldTypeGroup.field_type}
                        </span>
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                          {fieldTypeGroup.EmailTemplateField.length}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="mt-2 space-y-2">
                        {fieldTypeGroup.EmailTemplateField.map((field) => (
                          <div
                            key={field.field_id}
                            className="p-3 border border-gray-200 rounded-lg"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 text-sm">
                                  {field.field_name}
                                </h4>
                                <p className="text-xs text-gray-600 mt-1 font-mono bg-gray-50 px-2 py-1 rounded">
                                  {field.field_value}
                                </p>
                              </div>
                              <div className="flex items-center space-x-1 ml-2">
                                <button
                                  onClick={() => handleEdit(field)}
                                  className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                  title="Edit field"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => handleDelete(field)}
                                  className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                  title="Delete field"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Show loading state if data is not available */}
              {!templateFields?.data && (
                <div className="text-center text-gray-500 py-8">
                  Loading field types...
                </div>
              )}

              {/* Show empty state if no field types exist */}
              {templateFields?.data?.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  No field types available. Create a new field type first.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default FieldsPageForm;