import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { 
  Plus, 
  Tag, 
  Edit2, 
  Trash2, 
  Save,
  X
} from 'lucide-react';
import { useToastMutation } from '@/hooks/useNotification';
import { useCreateFieldTypeMutation, useGetAllFieldTypeQuery } from '@/services/features/template/templateApi';

const FieldTypePage = ({ onSubmit, onEdit, onDelete }) => {
  const [createFieldType] = useToastMutation(useCreateFieldTypeMutation(), {showLoading: true});
  const {data: templateFields} = useGetAllFieldTypeQuery();
  // Mock existing categories
  const [categories, setCategories] = useState([
    { id: 1, field_name: 'Technology', field_type: 'Primary Category', created_at: '2024-01-15' },
    { id: 2, field_name: 'Business', field_type: 'Primary Category', created_at: '2024-01-14' },
    { id: 3, field_name: 'Health', field_type: 'Secondary Category', created_at: '2024-01-13' },
    { id: 4, field_name: 'Education', field_type: 'Primary Category', created_at: '2024-01-12' },
    { id: 5, field_name: 'Sports', field_type: 'Secondary Category', created_at: '2024-01-11' }
  ]);

  const [editingId, setEditingId] = useState(null);

  // Initial values for Formik
  const initialValues = {
    field_type: ''
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    field_type: Yup.string().trim().required('Field type is required')
  });

  // Handle form submission
  const handleCategorySubmit = async (values, { setSubmitting, resetForm }) => { 
    await createFieldType(values)   
    resetForm();
    setSubmitting(false);
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    if (onEdit) {
      onEdit(category);
    }
  };

  const handleDelete = (category) => {
    setCategories(prev => prev.filter(cat => cat.id !== category.id));
    if (onDelete) {
      onDelete(category);
    }
  };

  const getFieldTypeColor = (type) => {
    return type === 'Primary Category' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-green-100 text-green-800';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Tag className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Categories</h1>
        </div>
        <p className="text-gray-600">Add new categories and manage existing ones</p>
      </div>

      {/* Form */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Category
        </h2>
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCategorySubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">                
                  {/* Field Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Field Type
                    </label>
                    <Field
                      name="field_type"
                      type="text"
                      className="w-full px-4 py-3 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border-gray-300 focus:border-blue-500"
                      placeholder="Enter field type"
                    />
                    <ErrorMessage
                      name="field_type"
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
                      ${isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:scale-[1.02]'
                      }
                      text-white
                    `}
                  >
                    <Save className="w-4 h-4" />
                    {isSubmitting ? 'Adding...' : 'Add Category'}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Existing Categories List */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Existing Categories</h2>
        
        {templateFields && templateFields.data.length === 0 ? (
          <div className="text-center py-8">
            <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No categories found. Add your first category above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {templateFields && templateFields.data.map((category, ind) => (
              <div
                key={ind}
                className={`
                  flex items-center justify-between p-4 border-2 rounded-lg transition-all
                  ${editingId === category.id ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
                `}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Tag className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{category.field_type}</h3>
                    <div className="flex items-center gap-2 mt-1">                     
                      {/* <span className="text-xs text-gray-500">Created: {category.created_at}</span> */}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit category"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldTypePage;