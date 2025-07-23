import { useState } from 'react';

const ArticleMetaForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    keywords: '',
    pages: '',
    belong_to: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Only belong_to needs dropdown options
  const belongToOptions = [
    { value: '', label: 'Select category' },
    { value: 'regular', label: 'Regular' },
    { value: 'special', label: 'Special' },
    { value: 'premium', label: 'Premium' },
    { value: 'featured', label: 'Featured' },
  ];

  const SubmitAndContinueHandler = () => {
    setIsSubmitting(true);
    console.log('Form submitted:', formData);
    // Handle form submission here
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Form submitted successfully!');
    }, 1000);
  };

  const handleFieldChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Article Details
        </h2>

        {/* Title Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            placeholder="Enter title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
          />
        </div>

        {/* Abstract Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Abstract
          </label>
          <textarea
            value={formData.abstract}
            onChange={(e) => handleFieldChange('abstract', e.target.value)}
            placeholder="Enter abstract"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 resize-vertical"
          />
        </div>

        {/* Keywords Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Keywords
          </label>
          <input
            type="text"
            value={formData.keywords}
            onChange={(e) => handleFieldChange('keywords', e.target.value)}
            placeholder="Enter keywords (comma separated)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
          />
        </div>

        {/* Pages Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Pages
          </label>
          <input
            type="number"
            value={formData.pages}
            onChange={(e) => handleFieldChange('pages', e.target.value)}
            placeholder="Enter number of pages"
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
          />
        </div>

        {/* Belong To Field */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Belong To
          </label>
          <select
            value={formData.belong_to}
            onChange={(e) => handleFieldChange('belong_to', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
          >
            {belongToOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={SubmitAndContinueHandler}
          disabled={isSubmitting}
          className="px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save & Continue'}
        </button>
      </div>
    </div>
  );
};

export default ArticleMetaForm;