import React, { useState } from 'react';
import { Mail, Edit3, Trash2, Search, ChevronDown } from 'lucide-react';

const AddReviewersForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

  // Sample data - in real app this would come from props or API
  const [authors, setAuthors] = useState([
    {
      id: 1,
      name: 'Panchanan Deka',
      email: 'p.deka.1625@gmail.com',
      affiliation: 'ytjyt, gfyjty, Guwah, IND',
      type: 'co-author',
      position: '1st',
      isCorresponding: false
    },
    {
      id: 2,
      name: 'nasim deka',
      email: 'nasim@gmail.com',
      affiliation: 'eefreytu, eeeee, Guwah, USA',
      type: 'corresponding-author',
      position: '2nd',
      isCorresponding: true
    }
  ]);

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'co-author', label: 'Co-Author' },
    { value: 'corresponding-author', label: 'Corresponding Author' },
    { value: 'reviewer', label: 'Reviewer' },
    { value: 'editor', label: 'Editor' }
  ];

  const handleSearch = () => {
    // Search logic would go here
    console.log('Searching for:', searchQuery, 'Type:', selectedType);
  };

  const handleEdit = (authorId) => {
    console.log('Edit author:', authorId);
  };

  const handleDelete = (authorId) => {
    setAuthors(authors.filter(author => author.id !== authorId));
  };

  const handleSaveAndContinue = () => {
    console.log('Save and continue');
  };

  // Filter authors by type for categorization
  const coAuthors = authors.filter(author => author.type === 'co-author');
  const correspondingAuthors = authors.filter(author => author.type === 'corresponding-author');
  const reviewers = authors.filter(author => author.type === 'reviewer');
  const editors = authors.filter(author => author.type === 'editor');

  const AuthorCard = ({ author }) => (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
       
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-900">{author.name}</h3>           
          </div>
          <p className="text-gray-600 text-sm mt-1">{author.affiliation}</p>
          <a 
            href={`mailto:${author.email}`} 
            className="text-blue-500 hover:text-blue-700 text-sm mt-1 inline-block"
          >
            {author.email}
          </a>
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => handleEdit(author.id)}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 transition-colors text-sm font-medium"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleDelete(author.id)}
          className="px-4 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50 hover:text-red-700 transition-colors text-sm font-medium"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const AuthorSection = ({ title, authors, bgColor = "bg-gray-50" }) => {
    if (authors.length === 0) return null;
    
    return (
      <div className={`${bgColor} rounded-lg p-4 mb-6`}>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
          {title} ({authors.length})
        </h3>
        <div className="space-y-3">
          {authors.map(author => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Add Reviewers</h2>
        <p className="text-gray-600 leading-relaxed">
          This study investigates [insert research topic or objective], addressing key gaps in the existing literature on [relevant field or subject].
        </p>
      </div>

      {/* Search Section */}
      <div className="mb-8 bg-gray-50 p-6 rounded-lg">
        <div className="flex space-x-4">
          {/* Type Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
              className="flex items-center justify-between w-48 px-4 py-3 text-left bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <span className="text-gray-700">
                {typeOptions.find(opt => opt.value === selectedType)?.label}
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isTypeDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isTypeDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                {typeOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSelectedType(option.value);
                      setIsTypeDropdownOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search email of your co-author"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium flex items-center space-x-2"
          >            
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Authors Sections */}
      <div className="mb-8">
        <AuthorSection 
          title="Suggested Reviewers" 
          authors={coAuthors}
          bgColor="bg-blue-50"
        />
        
        <AuthorSection 
          title="Oppose Rviewers" 
          authors={correspondingAuthors}
          bgColor="bg-green-50"
        />
        
      </div>

      {/* Save Button */}
      <div className="flex justify-start">
        <button
          onClick={handleSaveAndContinue}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
};

export default AddReviewersForm;
