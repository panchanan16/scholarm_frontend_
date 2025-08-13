import { Link } from "react-router-dom";
import { roleMenuConfigs } from "./roleMenuConfig";


function JournalReviewDropDown({ 
  manuscript, 
  userRole = 'admin', 
  onAction,
  className = ""
}) {
  // Get menu items for the current user role
  const menuItems = roleMenuConfigs[userRole] || roleMenuConfigs.admin;

  // Handle button clicks
  const handleButtonClick = (action, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onAction && typeof onAction === 'function') {
      onAction(action, manuscript, e);
    } else {
      console.warn(`No handler provided for action: ${action}`);
    }
  };

  // Render individual menu item
  const renderMenuItem = (item) => {
    const { id, label, icon: Icon, type, url, action, className: itemClassName } = item;

    // Handle separator
    if (type === 'separator') {
      return (
        <div key={id} className="border-t border-gray-100 my-1"></div>
      );
    }

    // Base classes for menu items
    const baseClasses = `w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 ${
      itemClassName || 'text-gray-700'
    }`;

    // Handle link items
    if (type === 'link' && url) {
      const linkUrl = typeof url === 'function' ? url(manuscript) : url;
      
      return (
        <Link key={id} to={linkUrl}>
          <button className={baseClasses}>
            {Icon && <Icon className="h-4 w-4" />}
            {label}
          </button>
        </Link>
      );
    }

    // Handle button items
    if (type === 'button' && action) {
      return (
        <button
          key={id}
          onClick={(e) => handleButtonClick(action, e)}
          className={baseClasses}
        >
          {Icon && <Icon className="h-4 w-4" />}
          {label}
        </button>
      );
    }

    return null;
  };

  return (
    <div className={`absolute right-0 top-8 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-100 ${className}`}>
      {menuItems.map(renderMenuItem)}
    </div>
  );
}

export default JournalReviewDropDown;