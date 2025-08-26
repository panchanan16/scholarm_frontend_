import React, { useState } from "react";
import {
  Mail,
  FileText,
  Bell,
  Tags,
  FolderTree,
  Layout,
  ChevronRight,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

function MainSettings() {
  const [activeSection, setActiveSection] = useState(null);

  const settingsItems = [
    {
      id: "email-template",
      title: "Email Template",
      description: "Configure and manage email templates for notifications",
      icon: Mail,
      color: "bg-blue-50 text-blue-600 border-blue-200",
      link: "email-template",
    },
    {
      id: "fields",
      title: "Fields",
      description: "Customize form fields and data collection parameters",
      icon: FileText,
      color: "bg-green-50 text-green-600 border-green-200",
      link: "fields",
    },
    {
      id: "reminder-template",
      title: "Reminder Template",
      description: "Set up automated reminder messages and schedules",
      icon: Bell,
      color: "bg-orange-50 text-orange-600 border-orange-200",
      link: "fieldtype",
    },
    {
      id: "classification",
      title: "Classification of Articles",
      description: "Define article categories and classification rules",
      icon: Tags,
      color: "bg-purple-50 text-purple-600 border-purple-200",
      link: "fieldtype",
    },
    {
      id: "subclass",
      title: "Subclass",
      description: "Configure subcategory hierarchies and relationships",
      icon: FolderTree,
      color: "bg-indigo-50 text-indigo-600 border-indigo-200",
      link: "fieldtype",
    },
    {
      id: "section",
      title: "Section",
      description: "Manage content sections and organizational structure",
      icon: Layout,
      color: "bg-teal-50 text-teal-600 border-teal-200",
      link: "fieldtype",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Settings className="w-6 h-6 text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>
        <p className="text-gray-600">
          Configure your application settings and preferences
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link to={item.link}>
              <div
                key={item.id}
                className={`
                relative group cursor-pointer transition-all duration-200 
                bg-white border-2 rounded-xl p-6 hover:shadow-lg hover:scale-[1.02]
              `}
              >
                {/* Icon */}
                <div
                  className={`inline-flex p-3 rounded-lg border-2 mb-4 ${item.color}`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 text-center">
          Click on any setting item to configure its options
        </p>
      </div>
    </div>
  );
}

export default MainSettings;
