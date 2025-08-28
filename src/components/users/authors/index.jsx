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
  Briefcase,
  Lock,
} from "lucide-react";
import {
  useCreateAuthorMutation,
  useDeleteAuthorsMutation,
  useGetAllAuthorsQuery,
} from "@/services/features/authors/slice";
import { useToastMutation } from "@/hooks/useNotification";

const AuthorPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(null);
  const { data: AllAuthors } = useGetAllAuthorsQuery();
  const [createAuthor] = useToastMutation(useCreateAuthorMutation(), {
    showLoading: true,
  });
  const [deleteAuthor] = useToastMutation(useDeleteAuthorsMutation(), {
    showLoading: true,
  });

  // Initial values for Formik
  const initialValues = {
    author_email: "",
    author_fname: "",
    author_lname: "",
    author_designation: "",
    author_password: "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    author_email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    author_fname: Yup.string()
      .trim()
      .min(2, "First name must be at least 2 characters")
      .required("First name is required"),
    author_lname: Yup.string()
      .trim()
      .min(2, "Last name must be at least 2 characters")
      .required("Last name is required"),
    author_designation: Yup.string().trim().required("Designation is required"),
    author_password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Handle form submission
  const handleAuthorSubmit = async (values, { setSubmitting, resetForm }) => {
    await createAuthor(values);
    setShowForm(false);
    resetForm();
    setSubmitting(false);
  };

  const handleAddAuthor = () => {
    setEditingAuthor(null);
    setShowForm(true);
  };

  const handleEditAuthor = (author) => {
    setEditingAuthor(author);
    setShowForm(true);
    if (onEdit) onEdit(author);
  };

  const handleDeleteAuthor = async (authorId) => {
    if (window.confirm("Are you sure delete this Author ?")) {
      await deleteAuthor(authorId);
    }
  };

  if (showForm) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white mt-10">
        <div className="flex items-center justify-between mt-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {editingAuthor ? "Edit Author" : "Add New Author"}
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
              editingAuthor
                ? {
                    author_email: editingAuthor.author_email || "",
                    author_fname: editingAuthor.author_fname || "",
                    author_lname: editingAuthor.author_lname || "",
                    author_designation: editingAuthor.author_designation || "",
                    author_password: editingAuthor.author_password || "",
                  }
                : initialValues
            }
            validationSchema={validationSchema}
            onSubmit={handleAuthorSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting, handleSubmit }) => (
              <div onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* First Name and Last Name Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Users className="w-4 h-4 inline mr-1" />
                        First Name
                      </label>
                      <Field
                        name="author_fname"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter first name"
                      />
                      <ErrorMessage
                        name="author_fname"
                        component="div"
                        className="mt-1 text-sm text-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Users className="w-4 h-4 inline mr-1" />
                        Last Name
                      </label>
                      <Field
                        name="author_lname"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter last name"
                      />
                      <ErrorMessage
                        name="author_lname"
                        component="div"
                        className="mt-1 text-sm text-red-600"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email Address
                    </label>
                    <Field
                      name="author_email"
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter email address"
                    />
                    <ErrorMessage
                      name="author_email"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  {/* Designation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Briefcase className="w-4 h-4 inline mr-1" />
                      Designation
                    </label>
                    <Field
                      name="author_designation"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter designation (e.g., Content Writer, Senior Editor)"
                    />
                    <ErrorMessage
                      name="author_designation"
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
                      name="author_password"
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter password (minimum 6 characters)"
                    />
                    <ErrorMessage
                      name="author_password"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                      className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      {isSubmitting
                        ? "Saving..."
                        : editingAuthor
                        ? "Update Author"
                        : "Save Author"}
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
            )}
          </Formik>
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
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Authors Management
            </h1>
          </div>
          <p className="text-gray-600">Manage authors and their information</p>
        </div>

        <button
          onClick={handleAddAuthor}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add New Author
        </button>
      </div>

      {/* Authors Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {AllAuthors && AllAuthors?.data.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No authors found</p>
            <p className="text-sm text-gray-400">
              Add your first author to get started
            </p>
          </div>
        ) : (
          <>
            {/* Table Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 font-medium text-sm text-gray-700">
                <div className="col-span-2">Name</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-2">Designation</div>
                <div className="col-span-2">Password</div>
                <div className="col-span-2">Actions</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {AllAuthors &&
                AllAuthors?.data.map((author) => (
                  <div
                    key={author.id}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Name */}
                      <div className="col-span-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              {author.author_fname} {author.author_lname}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="col-span-3">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900 text-sm">
                            {author.author_email}
                          </span>
                        </div>
                      </div>

                      {/* Designation */}
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full font-medium">
                            {author.author_designation}
                          </span>
                        </div>
                      </div>

                      {/* Password Status */}
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-gray-400" />
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full font-medium">
                            Set
                          </span>
                        </div>
                      </div>

                      {/* Created Date */}
                      <div className="col-span-1">
                        <p className="text-xs text-gray-500">
                          {author.created_at}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="col-span-2">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditAuthor(author)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit author"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAuthor(author.author_id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete author"
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
          <span>Total Authors: {AllAuthors && AllAuthors?.data.length}</span>
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;
