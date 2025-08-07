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

const Dashboard = () => {
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
    <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300">
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
    { label: "New Submission", count: 0, priority: "green", link: 'dashboard' },
    { label: "Editor Invited", count: 23, priority: "orange" },
    { label: "Need To Assign Editor", count: 23, priority: "red" },
    { label: "Need To Assign Reviewers", count: 6, priority: "yellow" },
  ];

  const revisionItems = [
    { label: "New Revision Received", count: 26, priority: "blue" },
    { label: "Editor Invited", count: 0, priority: "gray" },
    { label: "Need To Assign Editor", count: 0, priority: "gray" },
    { label: "Need To Assign Reviewers", count: 0, priority: "gray" },
  ];

  const reviewProgressItems = [
    { label: "Reviewers Invited", count: 54, priority: "blue" },
    {
      label: "Submission Require Additional Reviews",
      count: 51,
      priority: "orange",
    },
    {
      label: "Submission With Required Reviews Completed",
      count: 3,
      priority: "green",
    },
    { label: "Under Review", count: 25, priority: "yellow" },
  ];

  const revisionProgressItems = [
    { label: "Reviewers Invited", count: 0, priority: "gray" },
    {
      label: "Submission Require Additional Reviews",
      count: 0,
      priority: "gray",
    },
    {
      label: "Submission With Required Reviews Completed",
      count: 0,
      priority: "gray",
    },
    { label: "Under Review", count: 0, priority: "gray" },
  ];

  const completedItems = [
    { label: "Decision In Process", count: 0, priority: "blue" },
    { label: "In Press", count: 0, priority: "green" },
    { label: "Publish", count: 0, priority: "green" },
    { label: "Accept", count: 78, priority: "green" },
  ];

  const incompleteItems = [
    { label: "Incompleted Submissions", count: 56, priority: "red" },
    { label: "Revisions Due", count: 34, priority: "orange" },
    { label: "Submissions Sent Back to Author", count: 0, priority: "gray" },
  ];

  return (
    <AdminLayout>
      <main className="flex-1 p-6 bg-gradient-to-b from-transparent to-gray-50/50">
        <div className="max-w-7xl mx-auto">
          {/* Top Actions */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Publisher Dashboard
              </h1>
              <p className="text-gray-600">
                Manage submissions and track progress
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <Link to={"/submission/intro-section"}>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                  <CirclePlus className="w-4 h-4" />
                  Submit New
                </button>
              </Link>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                <BarChart3 className="w-4 h-4" />
                Analytics
              </button>
            </div>
          </div>

          {/* Overview Stats */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50/50 to-blue-50/80 rounded-xl border border-blue-100">
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              Submission Overview
            </h2>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <StatCard
                title="No Review Completed"
                value="12"
                icon={FileText}
                color="gray"
              />
              <StatCard
                title="One Review Completed"
                value="10"
                icon={Clock}
                color="blue"
              />
              <StatCard
                title="Two Reviews Completed"
                value="1"
                icon={Users}
                color="blue"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 max-w-2xl">
              <StatCard
                title="Three Reviews Completed"
                value="2"
                icon={CheckCircle}
                color="blue"
              />
              <StatCard
                title="Four or More Reviews"
                value="0"
                icon={BarChart3}
                color="gray"
              />
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Publisher To Do */}
            <ActionCard
              title="Publisher To Do List"
              items={publisherTodoItems}
              icon={AlertCircle}
              color="blue"
            />

            {/* Revisions */}
            <ActionCard
              title="Revisions"
              items={revisionItems}
              icon={FileText}
              color="blue"
            />

            {/* Review in Progress */}
            <ActionCard
              title="Review in Progress"
              items={reviewProgressItems}
              icon={Clock}
              color="blue"
            />

            {/* Revisions Review in Progress */}
            <ActionCard
              title="Revisions Review in Progress"
              items={revisionProgressItems}
              icon={Clock}
              color="gray"
            />

            {/* Completed Assignments */}
            <ActionCard
              title="Completed Assignments"
              items={completedItems}
              icon={CheckCircle}
              color="blue"
            />

            {/* Incomplete Assignments */}
            <ActionCard
              title="Incomplete Assignments"
              items={incompleteItems}
              icon={AlertCircle}
              color="gray"
            />
          </div>
        </div>
      </main>
    </AdminLayout>
  );
};

export default Dashboard;
