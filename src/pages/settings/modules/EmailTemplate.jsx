import React, { useState } from 'react';
import { 
  Plus, 
  Mail, 
  Edit2, 
  Trash2, 
  Save,
  X,
  ChevronDown,
  Eye,
  Power,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  Link,
  Image,
  Code
} from 'lucide-react';

// Mock Formik implementation
const useFormik = (config) => {
  const [values, setValues] = useState(config.initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setValues(prev => ({ ...prev, [name]: fieldValue }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    if (config.validate) {
      const validationErrors = config.validate(values);
      setErrors(validationErrors);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    
    const touchedFields = {};
    Object.keys(values).forEach(key => {
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
    setValues(prev => ({ ...prev, [name]: value }));
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue
  };
};

const EmailTemplatePage = ({ onSubmit, onEdit, onDelete }) => {
  // Mock existing templates
  const [templates, setTemplates] = useState([
    {
      id: 1,
      template_name: 'welcome_template',
      template_type: 'general',
      template_for: 'editor',
      subject: 'Welcome to our service!',
      body: 'Hi {{name}}, thank you for signing up.',
      is_active: true,
      created_at: '2024-01-15'
    },
    {
      id: 2,
      template_name: 'password_reset',
      template_type: 'security',
      template_for: 'user',
      subject: 'Reset your password',
      body: 'Click the link to reset: {{reset_link}}',
      is_active: true,
      created_at: '2024-01-14'
    },
    {
      id: 3,
      template_name: 'notification_template',
      template_type: 'notification',
      template_for: 'admin',
      subject: 'New notification',
      body: 'You have a new message: {{message}}',
      is_active: false,
      created_at: '2024-01-13'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedFields, setSelectedFields] = useState([]);
  const [editingTemplate, setEditingTemplate] = useState(null);

  // Available field categories
  const fieldCategories = {
    'User': ['Title', 'First Name', 'Last Name', 'Email', 'User Name'],
    'Manuscript': ['Title', 'Abstract', 'Authors', 'Journal'],
    'Journal': ['Name', 'ISSN', 'Impact Factor'],
    'Miscellaneous': ['Date', 'Time', 'Company Name', 'Logo']
  };

  const templateTypes = ['general', 'security', 'notification', 'marketing', 'system'];
  const templateForOptions = ['editor', 'user', 'admin', 'reviewer', 'author'];

  const formik = useFormik({
    initialValues: {
      template_type: 'general',
      template_name: '',
      template_for: 'editor',
      is_active: true,
      subject: '',
      body: ''
    },
    validate: (values) => {
      const errors = {};
      if (!values.template_name.trim()) {
        errors.template_name = 'Template name is required';
      }
      if (!values.subject.trim()) {
        errors.subject = 'Subject is required';
      }
      if (!values.body.trim()) {
        errors.body = 'Body content is required';
      }
      return errors;
    },
    onSubmit: async (values) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (editingTemplate) {
        setTemplates(prev => prev.map(template => 
          template.id === editingTemplate.id 
            ? { ...template, ...values, updated_at: new Date().toISOString().split('T')[0] }
            : template
        ));
        setEditingTemplate(null);
      } else {
        const newTemplate = {
          id: templates.length + 1,
          ...values,
          created_at: new Date().toISOString().split('T')[0]
        };
        setTemplates(prev => [newTemplate, ...prev]);
      }
      
      setShowForm(false);
      
      if (onSubmit) {
        onSubmit(values);
      }
    }
  });

  const handleAddTemplate = () => {
    setEditingTemplate(null);
    formik.setFieldValue('template_type', 'general');
    formik.setFieldValue('template_name', '');
    formik.setFieldValue('template_for', 'editor');
    formik.setFieldValue('is_active', true);
    formik.setFieldValue('subject', '');
    formik.setFieldValue('body', '');
    setShowForm(true);
  };

  const handleEditTemplate = (template) => {
    setEditingTemplate(template);
    Object.keys(template).forEach(key => {
      if (formik.values.hasOwnProperty(key)) {
        formik.setFieldValue(key, template[key]);
      }
    });
    setShowForm(true);
    if (onEdit) onEdit(template);
  };

  const handleDeleteTemplate = (template) => {
    setTemplates(prev => prev.filter(t => t.id !== template.id));
    if (onDelete) onDelete(template);
  };

  const insertField = (fieldName) => {
    const placeholder = `{{${fieldName.toLowerCase().replace(' ', '_')}}}`;
    const currentBody = formik.values.body;
    const newBody = currentBody + ' ' + placeholder;
    formik.setFieldValue('body', newBody);
  };

  const toggleTemplateStatus = (templateId) => {
    setTemplates(prev => prev.map(template => 
      template.id === templateId 
        ? { ...template, is_active: !template.is_active }
        : template
    ));
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
              {editingTemplate ? 'Edit Template' : 'Create Email Template'}
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
          {/* Left Sidebar - Select Fields */}
          <div className="w-64 bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Select Fields</h3>
            <div className="space-y-3">
              {Object.entries(fieldCategories).map(([category, fields]) => (
                <div key={category}>
                  <div className="flex items-center gap-2 p-2 bg-white rounded border cursor-pointer">
                    <ChevronDown className="w-4 h-4" />
                    <span className="font-medium text-sm">{category}</span>
                  </div>
                  <div className="ml-6 mt-2 space-y-1">
                    {fields.map(field => (
                      <button
                        key={field}
                        onClick={() => insertField(field)}
                        className="block text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors w-full text-left"
                      >
                        {field}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Form */}
          <div className="flex-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="space-y-6">
                {/* Template Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="template_name"
                    value={formik.values.template_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter template name"
                  />
                  {formik.errors.template_name && formik.touched.template_name && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.template_name}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter email subject"
                  />
                  {formik.errors.subject && formik.touched.subject && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.subject}</p>
                  )}
                </div>

                {/* Template Type and Role */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      TemplateType
                    </label>
                    <select
                      name="template_type"
                      value={formik.values.template_type}
                      onChange={formik.handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {templateTypes.map(type => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select
                      name="template_for"
                      value={formik.values.template_for}
                      onChange={formik.handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {templateForOptions.map(option => (
                        <option key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Active Status */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    checked={formik.values.is_active}
                    onChange={formik.handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                    Active Template
                  </label>
                </div>

                {/* Rich Text Editor Toolbar */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Content
                  </label>
                  <div className="border border-gray-300 rounded-md">
                    {/* Toolbar */}
                    <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
                      <button type="button" className="p-1.5 hover:bg-gray-200 rounded"><Bold className="w-4 h-4" /></button>
                      <button type="button" className="p-1.5 hover:bg-gray-200 rounded"><Italic className="w-4 h-4" /></button>
                      <button type="button" className="p-1.5 hover:bg-gray-200 rounded"><Underline className="w-4 h-4" /></button>
                      <div className="w-px h-6 bg-gray-300 mx-1" />
                      <button type="button" className="p-1.5 hover:bg-gray-200 rounded"><AlignLeft className="w-4 h-4" /></button>
                      <button type="button" className="p-1.5 hover:bg-gray-200 rounded"><AlignCenter className="w-4 h-4" /></button>
                      <button type="button" className="p-1.5 hover:bg-gray-200 rounded"><AlignRight className="w-4 h-4" /></button>
                      <div className="w-px h-6 bg-gray-300 mx-1" />
                      <button type="button" className="p-1.5 hover:bg-gray-200 rounded"><List className="w-4 h-4" /></button>
                      <button type="button" className="p-1.5 hover:bg-gray-200 rounded"><Link className="w-4 h-4" /></button>
                      <button type="button" className="p-1.5 hover:bg-gray-200 rounded"><Image className="w-4 h-4" /></button>
                      <button type="button" className="p-1.5 hover:bg-gray-200 rounded"><Code className="w-4 h-4" /></button>
                      
                      <div className="ml-auto flex items-center gap-2">
                        <select className="text-xs border border-gray-300 rounded px-2 py-1">
                          <option>Format</option>
                          <option>Paragraph</option>
                          <option>Heading 1</option>
                          <option>Heading 2</option>
                        </select>
                        <select className="text-xs border border-gray-300 rounded px-2 py-1">
                          <option>(inherited font)</option>
                          <option>Arial</option>
                          <option>Georgia</option>
                        </select>
                        <select className="text-xs border border-gray-300 rounded px-2 py-1">
                          <option>(inherited size)</option>
                          <option>12px</option>
                          <option>14px</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Text Area */}
                    <textarea
                      name="body"
                      value={formik.values.body}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      rows={10}
                      className="w-full p-3 border-0 focus:outline-none focus:ring-0 resize-none"
                      placeholder="Enter your email content here..."
                    />
                  </div>
                  {formik.errors.body && formik.touched.body && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.body}</p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={formik.handleSubmit}
                    disabled={formik.isSubmitting}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    {formik.isSubmitting ? 'Saving...' : 'Save Template'}
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
            <h1 className="text-2xl font-bold text-gray-900">Email Templates</h1>
          </div>
          <p className="text-gray-600">Create and manage email templates for your application</p>
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
        {templates.length === 0 ? (
          <div className="text-center py-12">
            <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No templates found. Create your first template.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {templates.map((template) => (
              <div key={template.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{template.template_name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        template.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {template.is_active ? 'Active' : 'Inactive'}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {template.template_type}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                        {template.template_for}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-1"><strong>Subject:</strong> {template.subject}</p>
                    <p className="text-gray-500 text-sm">Created: {template.created_at}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleTemplateStatus(template.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        template.is_active 
                          ? 'text-green-600 hover:bg-green-50' 
                          : 'text-gray-400 hover:bg-gray-100'
                      }`}
                      title={template.is_active ? 'Deactivate' : 'Activate'}
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
                      onClick={() => handleDeleteTemplate(template)}
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