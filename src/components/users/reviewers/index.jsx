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
  Lock,
  Power,
  Shield,
  Briefcase,
  Key,
} from "lucide-react";
import {
  useCreateReviewerMutation,
  useDeleteReviewerMutation,
  useGetAllReviewersQuery,
} from "@/services/features/reviewers/slice";
import { useToastMutation } from "@/hooks/useNotification";
import { useUpdateReviewerPasswordMutation } from "@/services/features/auth/slice";
import { useSelector } from "react-redux";
import { selectJournal } from "@/store/feature/auth/authSlice";

const ReviewerPage = () => {
  const journal = useSelector(selectJournal);
  const [showForm, setShowForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [editingReviewer, setEditingReviewer] = useState(null);
  const [selectedReviewerForPassword, setSelectedReviewerForPassword] =
    useState(null);

  const { data: AllReviewers } = useGetAllReviewersQuery({journal_id: journal?.journal_id});
  const [createReviewer] = useToastMutation(useCreateReviewerMutation(), {
    showLoading: true,
  });
  const [deleteReviwer] = useToastMutation(useDeleteReviewerMutation(), {
    showLoading: true,
  });

  const [updatePassword] = useToastMutation(
    useUpdateReviewerPasswordMutation(),
    {
      showLoading: true,
    }
  );

  // Initial values for Formik (main form)
  const initialValues = {
    journal_id: journal?.journal_id,
    reviewer_name: "",
    reviewer_email: "",
    reviewer_designation: "",
    is_active: true,
    reviewer_password: "",
  };

  // Initial values for password update form
  const passwordInitialValues = {
    reviewer_id: "",
    current_password: "",
    new_password: "",
    confirm_password: "",
  };

  // Validation schema using Yup (main form)
  const validationSchema = Yup.object({
    journal_id: Yup.number("Invalid Submission").required(
      "Invalid Submission!"
    ),
    reviewer_name: Yup.string()
      .trim()
      .min(2, "Reviewer name must be at least 2 characters")
      .required("Reviewer name is required"),
    reviewer_email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    reviewer_designation: Yup.string()
      .trim()
      .required("Designation is required"),
    reviewer_password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    is_active: Yup.boolean(),
  });

  // Validation schema for password update form
  const passwordValidationSchema = Yup.object({
    current_password: Yup.string().min(
      8,
      "Current password must be at least 8 characters"
    ),
    // .required("Current password is required"),
    new_password: Yup.string()
      .min(8, "New password must be at least 8 characters")
      .required("New password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  // Handle form submission (main form)
  const handleReviewerSubmit = async (values, { setSubmitting, resetForm }) => {
    await createReviewer(values);
    setShowForm(false);
    resetForm();
    setSubmitting(false);
  };

  // Handle password update form submission
  const handlePasswordSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Here you would call your password update API
      await updatePassword(values);
      console.log("Password update values:", values);
      setShowPasswordForm(false);
      setSelectedReviewerForPassword(null);
      resetForm();
      setSubmitting(false);
    } catch (error) {
      console.error("Error updating password:", error);
      setSubmitting(false);
    }
  };

  const handleAddReviewer = () => {
    setEditingReviewer(null);
    setShowForm(true);
  };

  const handleEditReviewer = (reviewer) => {
    setEditingReviewer(reviewer);
    setShowForm(true);
    if (onEdit) onEdit(reviewer);
  };

  const handleDeleteReviewer = async (reviewerId) => {
    if (window.confirm("Are you sure delete this reviewer ?")) {
      await deleteReviwer(reviewerId);
    }
  };

  const handleUpdatePassword = (reviewer) => {
    setSelectedReviewerForPassword(reviewer);
    setShowPasswordForm(true);
  };

  // Password Update Modal/Form
  if (showPasswordForm && selectedReviewerForPassword) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Key className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Update Password for {selectedReviewerForPassword.reviewer_name}
            </h1>
          </div>
          <button
            onClick={() => {
              setShowPasswordForm(false);
              setSelectedReviewerForPassword(null);
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <Formik
            initialValues={{
              ...passwordInitialValues,
              reviewer_id:
                selectedReviewerForPassword.reviewer_id ||
                selectedReviewerForPassword.id,
            }}
            validationSchema={passwordValidationSchema}
            onSubmit={handlePasswordSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting, handleSubmit }) => (
              <div onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Current Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Lock className="w-4 h-4 inline mr-1" />
                      Current Password
                    </label>
                    <Field
                      name="current_password"
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter current password"
                    />
                    <ErrorMessage
                      name="current_password"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Key className="w-4 h-4 inline mr-1" />
                      New Password
                    </label>
                    <Field
                      name="new_password"
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter new password (minimum 8 characters)"
                    />
                    <ErrorMessage
                      name="new_password"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Lock className="w-4 h-4 inline mr-1" />
                      Confirm New Password
                    </label>
                    <Field
                      name="confirm_password"
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Confirm new password"
                    />
                    <ErrorMessage
                      name="confirm_password"
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
                      {isSubmitting ? "Updating..." : "Update Password"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordForm(false);
                        setSelectedReviewerForPassword(null);
                      }}
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

  // Main Reviewer Form (unchanged)
  if (showForm) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {editingReviewer ? "Edit Reviewer" : "Add New Reviewer"}
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
              editingReviewer
                ? {
                    journal_id: journal?.journal_id,
                    reviewer_name: editingReviewer.reviewer_name || "",
                    reviewer_email: editingReviewer.reviewer_email || "",
                    reviewer_designation:
                      editingReviewer.reviewer_designation || "",
                    is_active:
                      editingReviewer.is_active !== undefined
                        ? editingReviewer.is_active
                        : true,
                    reviewer_password: editingReviewer.reviewer_password || "",
                  }
                : initialValues
            }
            validationSchema={validationSchema}
            onSubmit={handleReviewerSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting, handleSubmit, values }) => (
              <div onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Reviewer Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Reviewer Name
                    </label>
                    <Field
                      name="reviewer_name"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      placeholder="Enter full name"
                    />
                    <ErrorMessage
                      name="reviewer_name"
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
                      name="reviewer_email"
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      placeholder="Enter email address"
                    />
                    <ErrorMessage
                      name="reviewer_email"
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
                      name="reviewer_designation"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      placeholder="Enter designation (e.g., developer, Senior Reviewer)"
                    />
                    <ErrorMessage
                      name="reviewer_designation"
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
                      name="reviewer_password"
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      placeholder="Enter password (minimum 6 characters)"
                    />
                    <ErrorMessage
                      name="reviewer_password"
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
                      className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label
                      htmlFor="is_active"
                      className="text-sm font-medium text-gray-700"
                    >
                      <Power className="w-4 h-4 inline mr-1" />
                      Active Reviewer
                    </label>
                    <span className="text-xs text-gray-500">
                      (
                      {values.is_active
                        ? "Reviewer can access review assignments"
                        : "Reviewer access is disabled"}
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
                        className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        {isSubmitting
                          ? "Saving..."
                          : editingReviewer
                          ? "Update Reviewer"
                          : "Save Reviewer"}
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
    <div className="max-w-7xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Reviewers Management
            </h1>
          </div>
          <p className="text-gray-600">
            Manage reviewers and their review permissions
          </p>
        </div>

        <button
          onClick={handleAddReviewer}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add New Reviewer
        </button>
      </div>

      {/* Reviewers Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {AllReviewers && AllReviewers?.data.length === 0 ? (
          <div className="text-center py-12">
            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No reviewers found</p>
            <p className="text-sm text-gray-400">
              Add your first reviewer to get started
            </p>
          </div>
        ) : (
          <>
            {/* Table Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 font-medium text-sm text-gray-700">
                <div className="col-span-3">Reviewer Name</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-2">Designation</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-1">Password</div>
                <div className="col-span-2">Actions</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {AllReviewers &&
                AllReviewers?.data.map((reviewer) => (
                  <div
                    key={reviewer.id}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Reviewer Name */}
                      <div className="col-span-3">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-medium text-gray-900">
                              {reviewer.reviewer_name}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="col-span-3">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900 text-sm">
                            {reviewer.reviewer_email}
                          </span>
                        </div>
                      </div>

                      {/* Designation */}
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full font-medium">
                            {reviewer.reviewer_designation}
                          </span>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="col-span-1">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            reviewer.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {reviewer.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>

                      {/* Password Status */}
                      <div className="col-span-1">
                        <div className="flex items-center gap-2">
                          <Lock className="w-3 h-3 text-gray-400" />
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full font-medium">
                            Set
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="col-span-2">
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleUpdatePassword(reviewer)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Update password"
                          >
                            <Key className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditReviewer(reviewer)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit reviewer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteReviewer(reviewer.reviewer_id)
                            }
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete reviewer"
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
          <span>
            Total Reviewers: {AllReviewers && AllReviewers?.data.length}
          </span>
          <span>
            Active Reviewers:{" "}
            {AllReviewers &&
              AllReviewers?.data.filter((r) => r.is_active).length}
          </span>
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewerPage;
