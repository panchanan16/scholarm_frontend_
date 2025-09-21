import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Plus,
  Mail,
  Edit2,
  Trash2,
  Save,
  X,
  ChevronDown,
  ChevronRight,
  Eye,
  Power,
} from "lucide-react";
import {
  useCreateEmailTemplateMutation,
  useDeleteEmailTemplateMutation,
  useGetAllEmailTemplateQuery,
  useGetAllFieldTypeQuery,
  useUpdateEmailTemplateMutation,
} from "@/services/features/template/templateApi";
import TextEditor from "@/components/TextEditor";
import { emailTemplateTypes } from "@/data/emailTypes";
import { useToastMutation } from "@/hooks/useNotification";

const EmailTemplatePage = () => {
  const editorRef = useRef(null);
  const { data: emailTemplates } = useGetAllEmailTemplateQuery();
  const { data: templateFields } = useGetAllFieldTypeQuery();
  const [createEmailTemplate] = useToastMutation(
    useCreateEmailTemplateMutation(),
    { showLoading: true }
  );
  const [updateEmailTemplate] = useToastMutation(
    useUpdateEmailTemplateMutation(),
    { showLoading: true }
  );
  const [deleteEmailTemplate] = useToastMutation(useDeleteEmailTemplateMutation(), {showLoading: true})

  const [showForm, setShowForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [currentFormValues, setCurrentFormValues] = useState(null);

  const templateForOptions = ["editor", "user", "admin", "reviewer", "author"];

  // Initial values for Formik
  const initialValues = {
    template_type: "general",
    template_name: "",
    template_for: "editor",
    is_active: true,
    subject: "",
    body: "",
  };

  const insertTemplateDynamicValue = (field) => {
    if (editorRef.current) {
      editorRef.current.insertContent(field.field_value);
    }
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    template_name: Yup.string().trim().required("Template name is required"),
    subject: Yup.string().trim().required("Subject is required"),
    body: Yup.string().trim().required("Body content is required"),
    template_type: Yup.string().required("Template type is required"),
    template_for: Yup.string().required("Template for is required"),
  });

  // Handle form submission
  const handleTemplateSubmit = async (values, { setSubmitting, resetForm }) => {
    if (editingTemplate) {
      await updateEmailTemplate(values)
    } else {
      await createEmailTemplate(values);
    }

    setSubmitting(false);
    resetForm();
    setShowForm(false);
  };

  const handleAddTemplate = () => {
    setEditingTemplate(null);
    setShowForm(true);
  };

  const handleEditTemplate = (template) => {
    setEditingTemplate(template);
    setShowForm(true);
  };

  const handleDeleteTemplate = async (template_id) => {
    if (window.confirm('Are you sure to delete ??')) {
      await deleteEmailTemplate({template_id})
    }
  };

  const toggleCategory = (typeId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [typeId]: !prev[typeId],
    }));
  };

  const toggleTemplateStatus = (templateId) => {
    setTemplates((prev) =>
      prev.map((template) =>
        template.id === templateId
          ? { ...template, is_active: !template.is_active }
          : template
      )
    );
  };

  if (showForm) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {editingTemplate ? "Edit Template" : "Create Email Template"}
            </h1>
          </div>
          <button
            onClick={() => setShowForm(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-6">
          {/* Left Sidebar - Select Fields (Outside Form) */}
          <div className="w-64 bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Select Fields</h3>
            <div className="space-y-3">
              {templateFields &&
                templateFields.data.map((fieldCategory) => (
                  <div key={fieldCategory.type_id}>
                    <div
                      className="flex items-center gap-2 p-2 bg-white rounded border cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleCategory(fieldCategory.type_id)}
                    >
                      {expandedCategories[fieldCategory.type_id] ? (
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      )}
                      <span className="font-medium text-sm text-gray-800">
                        {fieldCategory.field_type}
                      </span>
                    </div>

                    {expandedCategories[fieldCategory.type_id] && (
                      <div className="ml-6 mt-2 space-y-1">
                        {fieldCategory.EmailTemplateField.map((field) => (
                          <button
                            key={field.field_id}
                            type="button"
                            onClick={() => insertTemplateDynamicValue(field)}
                            className="block text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded transition-colors w-full text-left border border-transparent hover:border-blue-200"
                            title={`Insert ${field.field_value}`}
                          >
                            <div className="font-medium">
                              {field.field_name}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {field.field_value}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Main Form */}
          <div className="flex-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <Formik
                initialValues={
                  editingTemplate
                    ? {
                        template_id: editingTemplate.template_id,
                        template_type:
                          editingTemplate.template_type || "general",
                        template_name: editingTemplate.template_name || "",
                        template_for: editingTemplate.template_for || "editor",
                        is_active:
                          editingTemplate.is_active !== undefined
                            ? editingTemplate.is_active
                            : true,
                        subject: editingTemplate.subject || "",
                        body: editingTemplate.body || "",
                      }
                    : initialValues
                }
                validationSchema={validationSchema}
                onSubmit={handleTemplateSubmit}
                enableReinitialize={true}
              >
                {({ isSubmitting, values, setFieldValue }) => {
                  // Store form values and setFieldValue for use in insertField
                  React.useEffect(() => {
                    setCurrentFormValues({ values, setFieldValue });
                  }, [values, setFieldValue]);

                  return (
                    <Form>
                      <div className="space-y-6">
                        {/* Template Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name
                          </label>
                          <Field
                            name="template_name"
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter template name"
                          />
                          <ErrorMessage
                            name="template_name"
                            component="div"
                            className="mt-1 text-sm text-red-600"
                          />
                        </div>

                        {/* Subject */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Subject
                          </label>
                          <Field
                            name="subject"
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter email subject"
                          />
                          <ErrorMessage
                            name="subject"
                            component="div"
                            className="mt-1 text-sm text-red-600"
                          />
                        </div>

                        {/* Template Type and Role */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Template Type
                            </label>
                            <Field
                              as="select"
                              name="template_type"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              {emailTemplateTypes.map((type) => (
                                <option key={type} value={type}>
                                  {type.charAt(0).toUpperCase() + type.slice(1)}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="template_type"
                              component="div"
                              className="mt-1 text-sm text-red-600"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Role
                            </label>
                            <Field
                              as="select"
                              name="template_for"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              {templateForOptions.map((option) => (
                                <option key={option} value={option}>
                                  {option.charAt(0).toUpperCase() +
                                    option.slice(1)}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="template_for"
                              component="div"
                              className="mt-1 text-sm text-red-600"
                            />
                          </div>
                        </div>

                        {/* Active Status */}
                        <div className="flex items-center gap-3">
                          <Field
                            type="checkbox"
                            id="is_active"
                            name="is_active"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label
                            htmlFor="is_active"
                            className="text-sm font-medium text-gray-700"
                          >
                            Active Template
                          </label>
                        </div>

                        {/* Rich Text Editor */}
                        <TextEditor
                          name={"body"}
                          setInForm={setFieldValue}
                          editorRef={editorRef}
                          // initialContent={values.body}
                        />

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                          >
                            <Save className="w-4 h-4" />
                            {isSubmitting ? "Saving..." : "Save Template"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Email Templates
            </h1>
          </div>
          <p className="text-gray-600">
            Create and manage email templates for your application
          </p>
        </div>

        <button
          onClick={handleAddTemplate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Template
        </button>
      </div>

      {/* Templates List */}
      <div className="bg-white border border-gray-200 rounded-lg">
        {emailTemplates && emailTemplates.data.length === 0 ? (
          <div className="text-center py-12">
            <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              No templates found. Create your first template.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {emailTemplates &&
              emailTemplates.data.map((template) => (
                <div
                  key={template.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {template.template_name}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            template.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {template.is_active ? "Active" : "Inactive"}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {template.template_type}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                          {template.template_for}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-1">
                        <strong>Subject:</strong> {template.subject}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Created: {template.created_at}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleTemplateStatus(template.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          template.is_active
                            ? "text-green-600 hover:bg-green-50"
                            : "text-gray-400 hover:bg-gray-100"
                        }`}
                        title={template.is_active ? "Deactivate" : "Activate"}
                      >
                        <Power className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditTemplate(template)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit template"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTemplate(template?.template_id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete template"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailTemplatePage;
