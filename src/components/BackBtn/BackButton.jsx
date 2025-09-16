import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ 
  disabled = false, 
  className = "", 
  variant = "default",
  size = "md" 
}) => {

 const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };

  // Size variants
  const sizeClasses = {
    sm: "p-1.5 text-sm",
    md: "p-2 text-base",
    lg: "p-3 text-lg"
  };

  // Style variants
  const variantClasses = {
    default: "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm hover:shadow-md",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-800",
    solid: "bg-gray-800 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl",
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl",
    minimal: "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800"
  };

  return (
    <button
      onClick={handleBack}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        rounded-full
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        group
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      title="Go back"
      aria-label="Go back to previous step"
    >
      <svg
        className="w-5 h-5 transition-transform group-hover:-translate-x-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
    </button>
  );
};



export default BackButton;