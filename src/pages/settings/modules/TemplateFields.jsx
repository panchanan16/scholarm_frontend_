import React, { useState } from "react";
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

// Mock Formik implementation
const useFormik = (config) => {
  const [values, setValues] = useState(config.initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (config.validate) {
      const validationErrors = config.validate(values);
      setErrors(validationErrors);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    const touchedFields = {};
    Object.keys(values).forEach((key) => {
      touchedFields[key] = true;
    });
    setTouched(touchedFields);

    let validationErrors = {};
    if (config.validate) {
      validationErrors = config.validate(values);
      setErrors(validationErrors);
    }

    if (Object.keys(validationErrors).length === 0) {
      await config.onSubmit(values);
      setValues(config.initialValues);
      setTouched({});
      setErrors({});
    }

    setIsSubmitting(false);
  };

  const setFieldValue = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  };
};

const FieldsPageForm = ({ onSubmit, onEdit, onDelete }) => {
  // Mock field types
  const fieldTypes = [
    { id: 1, name: "Email Template", color: "bg-blue-100 text-blue-800" },
    { id: 2, name: "User Data", color: "bg-green-100 text-green-800" },
    { id: 3, name: "System Config", color: "bg-purple-100 text-purple-800" },
    { id: 4, name: "Notification", color: "bg-orange-100 text-orange-800" },
    { id: 5, name: "Authentication", color: "bg-red-100 text-red-800" },
  ];

  // Mock existing fields organized by category
  const existingFields = {
    "Email Template": [
      {
        id: 1,
        field_name: "user_email",
        field_value: "{user_email}",
        field_type: 1,
      },
      {
        id: 2,
        field_name: "welcome_subject",
        field_value: "Welcome to our platform",
        field_type: 1,
      },
      {
        id: 3,
        field_name: "email_footer",
        field_value: "{company_name} © 2024",
        field_type: 1,
      },
    ],
    "User Data": [
      {
        id: 4,
        field_name: "user_name",
        field_value: "{user_name}",
        field_type: 2,
      },
      {
        id: 5,
        field_name: "user_role",
        field_value: "{user_role}",
        field_type: 2,
      },
      {
        id: 6,
        field_name: "user_avatar",
        field_value: "{user_avatar_url}",
        field_type: 2,
      },
    ],
    "System Config": [
      { id: 7, field_name: "app_version", field_value: "1.0.0", field_type: 3 },
      {
        id: 8,
        field_name: "api_endpoint",
        field_value: "https://api.example.com",
        field_type: 3,
      },
    ],
    Notification: [
      { id: 9, field_name: "push_enabled", field_value: "true", field_type: 4 },
      {
        id: 10,
        field_name: "email_notifications",
        field_value: "true",
        field_type: 4,
      },
    ],
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Email Template");
  const [fields, setFields] = useState(existingFields);

  const formik = useFormik({
    initialValues: {
      field_type: "",
      field_name: "",
      field_value: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.field_type) {
        errors.field_type = "Field type is required";
      }
      if (!values.field_name.trim()) {
        errors.field_name = "Field name is required";
      }
      if (!values.field_value.trim()) {
        errors.field_value = "Field value is required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const selectedType = fieldTypes.find(
        (type) => type.id === parseInt(values.field_type)
      );
      const newField = {
        id: Date.now(),
        ...values,
        field_type: parseInt(values.field_type),
      };

      if (selectedType) {
        setFields((prev) => ({
          ...prev,
          [selectedType.name]: [...(prev[selectedType.name] || []), newField],
        }));
      }

      if (onSubmit) {
        onSubmit(values);
      }

      console.log("Field added:", values);
    },
  });

  const handleTypeSelect = (typeId, typeName) => {
    formik.setFieldValue("field_type", typeId);
    setIsDropdownOpen(false);
  };

  const handleEdit = (field) => {
    if (onEdit) {
      onEdit(field);
    }
  };

  const handleDelete = (field) => {
    const typeName = fieldTypes.find(
      (type) => type.id === field.field_type
    )?.name;
    if (typeName) {
      setFields((prev) => ({
        ...prev,
        [typeName]: prev[typeName].filter((f) => f.id !== field.id),
      }));
    }
    if (onDelete) {
      onDelete(field);
    }
  };

  const selectedTypeName =
    fieldTypes.find((type) => type.id === parseInt(formik.values.field_type))
      ?.name || "Select field type";

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

            <div className="space-y-6">
              {/* Field Type Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Field Type
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`
                      w-full px-4 py-3 border-2 rounded-lg transition-colors text-left flex items-center justify-between
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                      ${
                        formik.errors.field_type && formik.touched.field_type
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-300 focus:border-blue-500"
                      }
                      ${
                        !formik.values.field_type
                          ? "text-gray-500"
                          : "text-gray-900"
                      }
                    `}
                  >
                    <span>{selectedTypeName}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-200 rounded-lg shadow-lg">
                      {fieldTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => handleTypeSelect(type.id, type.name)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors flex items-center justify-between"
                        >
                          <span className="text-gray-900">{type.name}</span>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${type.color}`}
                          >
                            Type {type.id}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {formik.errors.field_type && formik.touched.field_type && (
                  <p className="mt-2 text-sm text-red-600">
                    {formik.errors.field_type}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Field Name */}
                <div>
                  <label
                    htmlFor="field_name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Field Name
                  </label>
                  <input
                    type="text"
                    id="field_name"
                    name="field_name"
                    value={formik.values.field_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`
                      w-full px-4 py-3 border-2 rounded-lg transition-colors
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                      ${
                        formik.errors.field_name && formik.touched.field_name
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-300 focus:border-blue-500"
                      }
                    `}
                    placeholder="e.g., user_email"
                  />
                  {formik.errors.field_name && formik.touched.field_name && (
                    <p className="mt-2 text-sm text-red-600">
                      {formik.errors.field_name}
                    </p>
                  )}
                </div>

                {/* Field Value */}
                <div>
                  <label
                    htmlFor="field_value"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Field Value
                  </label>
                  <input
                    type="text"
                    id="field_value"
                    name="field_value"
                    value={formik.values.field_value}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`
                      w-full px-4 py-3 border-2 rounded-lg transition-colors
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                      ${
                        formik.errors.field_value && formik.touched.field_value
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-300 focus:border-blue-500"
                      }
                    `}
                    placeholder="e.g., {user_email}"
                  />
                  {formik.errors.field_value && formik.touched.field_value && (
                    <p className="mt-2 text-sm text-red-600">
                      {formik.errors.field_value}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={formik.handleSubmit}
                  disabled={formik.isSubmitting}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
                    ${
                      formik.isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:scale-[1.02]"
                    }
                    text-white
                  `}
                >
                  <Save className="w-4 h-4" />
                  {formik.isSubmitting ? "Adding..." : "Add Field"}
                </button>
              </div>
            </div>
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
              {Object.entries(fields).map(([category, categoryFields]) => {
                if (categoryFields.length === 0) return null;

                return (
                  <div key={category}>
                    <button
                      onClick={() =>
                        setSelectedCategory(
                          selectedCategory === category ? "" : category
                        )
                      }
                      className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            fieldTypes
                              .find((t) => t.name === category)
                              ?.color.replace("text-", "bg-")
                              .replace("-800", "-500") || "bg-gray-500"
                          }`}
                        />
                        <span className="font-medium text-gray-900">
                          {category}
                        </span>
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                          {categoryFields.length}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          selectedCategory === category ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {selectedCategory === category && (
                      <div className="mt-2 space-y-2">
                        {categoryFields.map((field) => (
                          <div
                            key={field.id}
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
