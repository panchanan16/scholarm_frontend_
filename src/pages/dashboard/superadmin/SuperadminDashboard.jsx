import React, { useState } from "react";
import {
  Eye,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Filter,
  BarChart3,
  CirclePlus,
} from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Link, Outlet } from "react-router-dom";

const SuperAdminDashboard = () => {
  const StatCard = ({ title, value, icon: Icon, trend, color = "gray" }) => (
    <div className="bg-gradient-to-br from-white to-gray-50/70 rounded-lg border border-gray-100 p-4 hover:shadow-md hover:border-gray-200 transition-all duration-300 group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-lg font-bold text-gray-900">{value}</p>
          {trend && <p className="text-xs text-gray-500 mt-1">{trend}</p>}
        </div>
        <div
          className={`p-2 rounded-lg bg-gradient-to-br from-${color}-50 to-${color}-100 group-hover:from-${color}-100 group-hover:to-${color}-200 transition-colors shadow-sm`}
        >
          <Icon className={`w-4 h-4 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const ActionCard = ({ title, items, icon: Icon, color = "blue" }) => (
    <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300">
      <div
        className={`bg-gradient-to-r from-${color}-50 via-${color}-50 to-${color}-100 px-6 py-4 border-b border-${color}-100`}
      >
        <div className="flex items-center gap-3">
          <div className={`p-1.5 rounded-lg bg-${color}-100`}>
            <Icon className={`w-5 h-5 text-${color}-600`} />
          </div>
          <h3 className={`font-semibold text-${color}-900`}>{title}</h3>
        </div>
      </div>
      <div className="p-6 bg-gradient-to-b from-white to-gray-50/30">
        <div className="space-y-3">
          {items.map((item, index) => (
              <Link to={item.link || "#"} key={index}               
                className="flex items-center justify-between p-3 rounded-lg border border-gray-50 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white hover:border-gray-100 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      item.priority === "red"
                        ? "bg-red-400"
                        : item.priority === "orange"
                        ? "bg-orange-400"
                        : item.priority === "yellow"
                        ? "bg-yellow-400"
                        : item.priority === "green"
                        ? "bg-green-400"
                        : "bg-blue-400"
                    } shadow-sm`}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                    {item.count}
                  </span>
                  <Eye className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </Link>      
          ))}
        </div>
      </div>
    </div>
  );

  const publisherTodoItems = [
    { label: "New Assignment", count: 23, priority: "orange", link: `manuscript?reviewerStatus=invited` },
    { label: "Pending Assignment", count: 23, priority: "red", link: `manuscript?reviewerStatus=accepted&completed=false` },
    { label: "Completed Assignment", count: 6, priority: "yellow", link: `manuscript?reviewerStatus=accepted&completed=true` },
  ];


  return (
    <AdminLayout>
      <main className="flex-1 p-6 bg-gradient-to-b from-transparent to-gray-50/50">
        <div className="max-w-7xl mx-auto">

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            {/* Publisher To Do */}
            <ActionCard
              title="My Assignments"
              items={publisherTodoItems}
              icon={AlertCircle}
              color="blue"
            />

          </div>
        </div>
      </main>
      <Outlet />
    </AdminLayout>
  );
};

export default SuperAdminDashboard;
