import React, { useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Plus,
  User,
  Edit2,
  Trash2,
  Save,
  X,
  Mail,
  Users,
  Lock,
  Power,
  UserCheck,
} from "lucide-react";
import {
  useCreateEditorsMutation,
  useDeleteEditorsMutation,
  useGetAllEditorsQuery,
} from "@/services/features/editors/slice";
import { useToastMutation } from "@/hooks/useNotification";
import { useSelector } from "react-redux";
import { selectJournal } from "@/store/feature/auth/authSlice";

const EditorPage = () => {
  const journal = useSelector(selectJournal);
  const { data: AllEditors } = useGetAllEditorsQuery({journal_id: journal?.journal_id});
  const [createEditor] = useToastMutation(useCreateEditorsMutation(), {
    showLoading: true,
  });
  const [deleteEditor] = useToastMutation(useDeleteEditorsMutation(), {
    showLoading: true,
  });

  const [showForm, setShowForm] = useState(false);
  const [editingEditor, setEditingEditor] = useState(null);

  // Initial values for Formik
  const initialValues = {
    journal_id: journal?.journal_id || "",
    editor_name: "",
    editor_email: "",
    is_active: true,
    editor_password: "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    journal_id: Yup.number("Invalid Submission").required(
      "Invalid Submission!"
    ),
    editor_name: Yup.string()
      .trim()
      .min(2, "Editor name must be at least 2 characters")
      .required("Editor name is required"),
    editor_email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    editor_password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    is_active: Yup.boolean(),
  });

  // Handle form submission
  const handleEditorSubmit = async (values, { setSubmitting, resetForm }) => {
    await createEditor(values);
    console.log(values)
    setShowForm(false);
    resetForm();
    setSubmitting(false);
  };

  const handleAddEditor = () => {
    setEditingEditor(null);
    setShowForm(true);
  };

  const handleEditEditor = (editor) => {
    setEditingEditor(editor);
    setShowForm(true);
  };

  const handleDeleteEditor = async (editorId) => {
    if (window.confirm("Are you sure delete this Editor ?")) {
      await deleteEditor(editorId);
    }
  };

  if (showForm) {
    return (
      <div className="w-full p-3 bg-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {editingEditor ? "Edit Editor" : "Add New Editor"}
            </h1>
          </div>
          <button
            onClick={() => setShowForm(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <Formik
            initialValues={
              editingEditor
                ? {
                    journal_id: journal?.journal_id || "",
                    editor_name: editingEditor.editor_name || "",
                    editor_email: editingEditor.editor_email || "",
                    is_active:
                      editingEditor.is_active !== undefined
                        ? editingEditor.is_active
                        : true,
                    editor_password: editingEditor.editor_password || "",
                  }
                : initialValues
            }
            validationSchema={validationSchema}
            onSubmit={handleEditorSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting, handleSubmit, values }) => (
              <div onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Editor Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Editor Name
                    </label>
                    <Field
                      name="editor_name"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Enter full name"
                    />
                    <ErrorMessage
                      name="editor_name"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email Address
                    </label>
                    <Field
                      name="editor_email"
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Enter email address"
                    />
                    <ErrorMessage
                      name="editor_email"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Lock className="w-4 h-4 inline mr-1" />
                      Password
                    </label>
                    <Field
                      name="editor_password"
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Enter password (minimum 6 characters)"
                    />
                    <ErrorMessage
                      name="editor_password"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  {/* Active Status */}
                  <div className="flex items-center gap-3">
                    <Field
                      type="checkbox"
                      id="is_active"
                      name="is_active"
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label
                      htmlFor="is_active"
                      className="text-sm font-medium text-gray-700"
                    >
                      <Power className="w-4 h-4 inline mr-1" />
                      Active Editor
                    </label>
                    <span className="text-xs text-gray-500">
                      (
                      {values.is_active
                        ? "Editor can access the system"
                        : "Editor access is disabled"}
                      )
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-gray-200">
                    <ErrorMessage
                      name="journal_id"
                      component="div"
                      className="mt-1 mb-3 ml-2 text-sm text-red-600"
                    />
                    <div className="flex gap-3 mt-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        {isSubmitting
                          ? "Saving..."
                          : editingEditor
                          ? "Update Editor"
                          : "Save Editor"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Editors Management
            </h1>
          </div>
          <p className="text-gray-600">
            Manage editors and their access permissions
          </p>
        </div>

        <button
          onClick={handleAddEditor}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add New Editor
        </button>
      </div>

      {/* Editors Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {AllEditors && AllEditors?.data.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No editors found</p>
            <p className="text-sm text-gray-400">
              Add your first editor to get started
            </p>
          </div>
        ) : (
          <>
            {/* Table Header */}
            <div className="bg-gray-50 px-3 py-4 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 font-medium text-sm text-gray-700">
                <div className="col-span-3">Editor Name</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Password</div>
                <div className="col-span-1">Actions</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {AllEditors &&
                AllEditors?.data.map((editor) => (
                  <div
                    key={editor.id}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Editor Name */}
                      <div className="col-span-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <UserCheck className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {editor.editor_name}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="col-span-3">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900 text-sm">
                            {editor.editor_email}
                          </span>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              editor.is_active
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {editor.is_active ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>

                      {/* Password Status */}
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-gray-400" />
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full font-medium">
                            Set
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="col-span-1">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleEditorStatus(editor.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              editor.is_active
                                ? "text-green-600 hover:bg-green-50"
                                : "text-red-600 hover:bg-red-50"
                            }`}
                            title={editor.is_active ? "Deactivate" : "Activate"}
                          >
                            <Power className="w-4 h-4" />
                          </button>
                          {/* <button
                            onClick={() => handleEditEditor(editor)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit editor"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button> */}
                          <button
                            onClick={() => handleDeleteEditor(editor.editor_id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete editor"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>

      {/* Stats Footer */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Total Editors: {AllEditors && AllEditors?.data.length}</span>
          <span>
            Active Editors:{" "}
            {AllEditors && AllEditors?.data.filter((e) => e.is_active).length}
          </span>
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
