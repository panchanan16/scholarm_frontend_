import { AlertCircle, X } from 'lucide-react';

 const SubmissionError = ({ heading = "Error", onClose }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">
            {heading}
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>Something went wrong. Please check your input and try again.</p>
          </div>
          <div className="mt-3">
            <button
              type="button"
              className="bg-red-100 px-3 py-1.5 rounded-md text-sm font-medium text-red-800 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex rounded-md bg-red-50 p-1.5 text-red-400 hover:bg-red-100 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-50 transition-colors duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionError;

