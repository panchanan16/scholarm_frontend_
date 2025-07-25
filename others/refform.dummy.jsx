import React, { useState } from 'react';
import { Edit3, Trash2, ChevronDown, FileText, Book, Globe, Users, CheckSquare, Square } from 'lucide-react';

const ReferenceManager = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isConverterOpen, setIsConverterOpen] = useState(false);
  const [converterText, setConverterText] = useState('');
  const [selectedItems, setSelectedItems] = useState(new Set());

  const [references, setReferences] = useState([
    {
      id: 1,
      type: 'research-paper',
      title: 'Machine Learning Applications in Healthcare Diagnostics',
      authors: 'Smith, J.A., Johnson, M.K., Williams, R.L.',
      journal: 'Journal of Medical Technology',
      year: '2024',
      volume: '15',
      pages: '234-251',
      doi: '10.1234/jmt.2024.15.234',
      status: 'published'
    },
    {
      id: 2,
      type: 'conference-paper',
      title: 'Sustainable Energy Solutions for Urban Infrastructure',
      authors: 'Davis, P.R., Thompson, S.M.',
      conference: 'International Conference on Green Technology',
      year: '2023',
      pages: '45-62',
      location: 'Berlin, Germany',
      status: 'peer-reviewed'
    },
    {
      id: 3,
      type: 'book-chapter',
      title: 'Advanced Data Analytics in Financial Markets',
      authors: 'Brown, K.E., Miller, A.J., Wilson, T.C.',
      book: 'Modern Financial Technology Handbook',
      editor: 'Anderson, L.M.',
      publisher: 'Academic Press',
      year: '2024',
      pages: '178-205',
      status: 'in-press'
    },
    {
      id: 4,
      type: 'web-resource',
      title: 'Global Climate Change Database',
      organization: 'World Climate Research Institute',
      url: 'https://climate-data.org/global-trends',
      accessDate: '2024-03-15',
      status: 'online'
    }
  ]);

  const referenceTypes = [
    { value: 'all', label: 'All Reference Types', icon: FileText },
    { value: 'research-paper', label: 'Research Papers', icon: FileText },
    { value: 'conference-paper', label: 'Conference Papers', icon: Users },
    { value: 'book-chapter', label: 'Book Chapters', icon: Book },
    { value: 'web-resource', label: 'Web Resources', icon: Globe }
  ];

  const handleSelectItem = (id) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedItems.size === references.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(references.map(ref => ref.id)));
    }
  };

  const handleRemoveSelected = () => {
    setReferences(references.filter(ref => !selectedItems.has(ref.id)));
    setSelectedItems(new Set());
  };

  const handleEdit = (id) => {
    console.log('Edit reference:', id);
  };

  const handleDelete = (id) => {
    setReferences(references.filter(ref => ref.id !== id));
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleLaunchConverter = () => {
    setIsConverterOpen(!isConverterOpen);
  };

  const handleConvertReferences = () => {
    console.log('Converting references:', converterText);
    // Process the text and add new references
    setIsConverterOpen(false);
    setConverterText('');
  };

  const getTypeIcon = (type) => {
    const iconMap = {
      'research-paper': FileText,
      'conference-paper': Users,
      'book-chapter': Book,
      'web-resource': Globe
    };
    const IconComponent = iconMap[type] || FileText;
    return <IconComponent className="w-4 h-4" />;
  };

  const getStatusColor = (status) => {
    const colors = {
      'published': 'bg-green-100 text-green-800',
      'peer-reviewed': 'bg-blue-100 text-blue-800',
      'in-press': 'bg-yellow-100 text-yellow-800',
      'online': 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredReferences = selectedType === 'all' 
    ? references 
    : references.filter(ref => ref.type === selectedType);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Launch Converter Button */}
          <div className="flex-1">
            <button
              onClick={handleLaunchConverter}
              className="w-full lg:w-auto px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              LAUNCH REFERENCE CONVERTER
            </button>
          </div>

          {/* Type Selector */}
          <div className="flex-1 lg:max-w-md">
            <div className="relative">
              <button
                onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <span className="text-gray-700 font-medium">
                  {referenceTypes.find(type => type.value === selectedType)?.label}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isTypeDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isTypeDropdownOpen && (
                <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                  {referenceTypes.map(type => {
                    const IconComponent = type.icon;
                    return (
                      <button
                        key={type.value}
                        onClick={() => {
                          setSelectedType(type.value);
                          setIsTypeDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                      >
                        <IconComponent className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Converter Text Area */}
        {isConverterOpen && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Paste your references here (any format):
              </label>
              <textarea
                value={converterText}
                onChange={(e) => setConverterText(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Paste your references here... The converter will automatically detect and format them."
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => setIsConverterOpen(false)}
                  className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConvertReferences}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Convert & Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSelectAll}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            {selectedItems.size === references.length ? 
              <CheckSquare className="w-5 h-5" /> : 
              <Square className="w-5 h-5" />
            }
            <span className="font-medium">Select All</span>
          </button>
          
          {selectedItems.size > 0 && (
            <button
              onClick={handleRemoveSelected}
              className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-medium"
            >
              Remove Selected ({selectedItems.size})
            </button>
          )}
        </div>

        <div className="text-sm text-gray-500">
          Showing {filteredReferences.length} of {references.length} references
        </div>
      </div>

      {/* References Grid */}
      <div className="grid gap-6">
        {filteredReferences.map((ref, index) => (
          <div
            key={ref.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start space-x-4">
                {/* Selection Checkbox */}
                <button
                  onClick={() => handleSelectItem(ref.id)}
                  className="mt-1 flex-shrink-0"
                >
                  {selectedItems.has(ref.id) ? 
                    <CheckSquare className="w-5 h-5 text-blue-500" /> : 
                    <Square className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  }
                </button>

                {/* Reference Number */}
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-semibold text-gray-600">{index + 1}</span>
                </div>

                {/* Reference Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2 text-gray-500">
                        {getTypeIcon(ref.type)}
                        <span className="text-sm font-medium capitalize">
                          {ref.type.replace('-', ' ')}
                        </span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ref.status)}`}>
                        {ref.status}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(ref.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(ref.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                    {ref.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-3">
                    <span className="font-medium">Authors:</span> {ref.authors || ref.organization}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500">
                    {ref.journal && (
                      <div><span className="font-medium">Journal:</span> {ref.journal}</div>
                    )}
                    {ref.conference && (
                      <div><span className="font-medium">Conference:</span> {ref.conference}</div>
                    )}
                    {ref.book && (
                      <div><span className="font-medium">Book:</span> {ref.book}</div>
                    )}
                    {ref.publisher && (
                      <div><span className="font-medium">Publisher:</span> {ref.publisher}</div>
                    )}
                    <div><span className="font-medium">Year:</span> {ref.year}</div>
                    {ref.volume && (
                      <div><span className="font-medium">Volume:</span> {ref.volume}</div>
                    )}
                    {ref.pages && (
                      <div><span className="font-medium">Pages:</span> {ref.pages}</div>
                    )}
                    {ref.doi && (
                      <div><span className="font-medium">DOI:</span> {ref.doi}</div>
                    )}
                    {ref.url && (
                      <div><span className="font-medium">URL:</span> 
                        <a href={ref.url} className="text-blue-500 hover:text-blue-600 ml-1" target="_blank" rel="noopener noreferrer">
                          {ref.url}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredReferences.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No references found</h3>
          <p className="text-gray-500">Try selecting a different reference type or add some references.</p>
        </div>
      )}
    </div>
  );
};

export default ReferenceManager;