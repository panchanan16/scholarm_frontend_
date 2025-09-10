import React, { useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { 
  Plus, 
  User, 
  Edit2, 
  Trash2, 
  Save,
  X,
  Mail,
  Users,
  BookOpen,
  Crown,
  Key,
  Lock
} from 'lucide-react';
import { useCreatePublisherMutation, useDeletePublisherMutation, useGetAllPublisherQuery } from '@/services/features/publisher/slice';
import { useToastMutation } from '@/hooks/useNotification';
import { useGetAllJournalQuery } from '@/services/features/journal/journalApi';
import { useUpdatePublisherPasswordMutation } from '@/services/features/auth/slice';

const PublisherPage = () => {
  const {data: AllSuperAdmins} = useGetAllPublisherQuery()
  const {data: AllJournals} = useGetAllJournalQuery()
  const [createSuperAdmin] = useToastMutation(useCreatePublisherMutation(), {showLoading: true})
  const [deleteSuperAdmin] = useToastMutation(useDeletePublisherMutation(), {showLoading: true})
  const [updatePassword] = useToastMutation(useUpdatePublisherPasswordMutation(), {showLoading: true})

  const [showForm, setShowForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [editingSuperAdmin, setEditingSuperAdmin] = useState(null);
  const [selectedAdminForPassword, setSelectedAdminForPassword] = useState(null);

  // Initial values for Formik
  const initialValues = {
    admin_name: '',
    admin_email: '',
    journal_id: ''
  };

  // Initial values for password form
  const passwordInitialValues = {
    admin_id: '',
    current_password: '',
    new_password: '',
    confirm_password: ''
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    admin_name: Yup.string()
      .trim()
      .min(2, 'Admin name must be at least 2 characters')
      .required('Admin name is required'),
    admin_email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    journal_id: Yup.number()
      .positive('Please select a journal')
      .required('Journal selection is required')
  });

  // Password validation schema
  const passwordValidationSchema = Yup.object({
    current_password: Yup.string()
      .required('Current password is required'),
    new_password: Yup.string()
      .min(8, 'New password must be at least 8 characters')
      .required('New password is required'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
      .required('Please confirm your new password')
  });

  // Handle form submission
  const handleSuperAdminSubmit = async (values, { setSubmitting, resetForm }) => {
    await createSuperAdmin(values)
    setShowForm(false);
    resetForm();
    setSubmitting(false);
  };

  // Handle password update submission
  const handlePasswordSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values)
    await updatePassword(values);
    setShowPasswordForm(false);
    setSelectedAdminForPassword(null);
    resetForm();
    setSubmitting(false);
  };

  const handleAddSuperAdmin = () => {
    setEditingSuperAdmin(null);
    setShowForm(true);
  };

  const handleEditSuperAdmin = (admin) => {
    setEditingSuperAdmin(admin);
    setShowForm(true);
  };

  const handleDeleteSuperAdmin = async (adminId) => {
    if (window.confirm("Are you sure you want to delete this Super Admin?")) {
      await deleteSuperAdmin(adminId)
    }
  };

  const handlePasswordUpdate = (admin) => {
    setSelectedAdminForPassword(admin);
    setShowPasswordForm(true);
  };

  // Helper function to get journal name by ID
  const getJournalName = (journalId) => {
    const journal = AllJournals?.data?.find(j => j.journal_id === journalId);
    return journal ? journal.journal_name : 'Unknown Journal';
  };

  // Password Update Form Component
  if (showPasswordForm && selectedAdminForPassword) {
    return (
      <div className="w-full p-3 bg-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Key className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Update Password</h1>
              <p className="text-sm text-gray-600">Update password for {selectedAdminForPassword.admin_name}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setShowPasswordForm(false);
              setSelectedAdminForPassword(null);
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
              admin_id: selectedAdminForPassword.admin_id
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
                      placeholder="Enter new password"
                    />
                    <ErrorMessage
                      name="new_password"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Password must be at least 8 characters with uppercase, lowercase, and number
                    </p>
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Key className="w-4 h-4 inline mr-1" />
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
                      {isSubmitting ? 'Updating...' : 'Update Password'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordForm(false);
                        setSelectedAdminForPassword(null);
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

  // Main Publisher Form Component
  if (showForm) {
    return (
      <div className="w-full p-3 bg-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Crown className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {editingSuperAdmin ? 'Edit Super Admin' : 'Add New Super Admin'}
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
            initialValues={editingSuperAdmin ? {
              admin_name: editingSuperAdmin.admin_name || '',
              admin_email: editingSuperAdmin.admin_email || '',
              journal_id: Number(editingSuperAdmin.journal_id) || ''
            } : initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSuperAdminSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting, handleSubmit, values }) => (
              <div onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Admin Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Admin Name
                    </label>
                    <Field
                      name="admin_name"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      placeholder="Enter full name"
                    />
                    <ErrorMessage
                      name="admin_name"
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
                      name="admin_email"
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      placeholder="Enter email address"
                    />
                    <ErrorMessage
                      name="admin_email"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  {/* Journal Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <BookOpen className="w-4 h-4 inline mr-1" />
                      Assigned Journal
                    </label>
                    <Field
                      as="select"
                      name="journal_id"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white"
                    >
                      <option value="">Select a journal...</option>
                      {AllJournals?.data?.map((journal) => (
                        <option key={journal.journal_id} value={journal.journal_id}>
                          {journal.journal_name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="journal_id"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                    {values.journal_id && (
                      <p className="mt-1 text-xs text-gray-500">
                        Selected: {getJournalName(parseInt(values.journal_id))}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                      className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      {isSubmitting ? 'Saving...' : editingSuperAdmin ? 'Update Super Admin' : 'Save Super Admin'}
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
    <div className="max-w-8xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Crown className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Publishers Management</h1>
          </div>
          <p className="text-gray-600">Manage Publishers</p>
        </div>
        
        <button
          onClick={handleAddSuperAdmin}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Publisher
        </button>
      </div>

      {/* Publishers Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {AllSuperAdmins && AllSuperAdmins?.data.length === 0 ? (
          <div className="text-center py-12">
            <Crown className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No Publishers found</p>
            <p className="text-sm text-gray-400">Add your first super admin to get started</p>
          </div>
        ) : (
          <>
            {/* Table Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 font-medium text-sm text-gray-700">
                <div className="col-span-3">Admin Name</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-3">Assigned Journal</div>
                <div className="col-span-3">Actions</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {AllSuperAdmins && AllSuperAdmins?.data.map((admin) => (
                <div key={admin.admin_id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Admin Name */}
                    <div className="col-span-3">
                      <div className="flex items-center gap-3">                        
                        <div>
                          <p className="font-medium text-gray-900">
                            {admin.admin_name}
                          </p>
                          <p className="text-xs text-gray-500">ID: {admin.admin_id}</p>
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-span-3">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900 text-sm">{admin.admin_email}</span>
                      </div>
                    </div>

                    {/* Assigned Journal */}
                    <div className="col-span-3">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full font-medium">
                          {getJournalName(admin.journal_id)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="col-span-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditSuperAdmin(admin)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit super admin"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handlePasswordUpdate(admin)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Update password"
                        >
                          <Key className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteSuperAdmin(admin.admin_id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete super admin"
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
          <span>Total Publishers: {AllSuperAdmins && AllSuperAdmins?.data.length}</span>
          <span>Available Journals: {AllJournals && AllJournals?.data.length}</span>
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PublisherPage;