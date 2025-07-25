import React from "react";
import { Link } from "react-router-dom";

function SubmissionHeader() {
  return (
    <div className="bg-slate-700 text-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-sm font-bold">C</span>
        </div>
        <span className="text-sm font-medium bg-slate-600 px-3 py-1 rounded-full">
          EDIT MODE
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Link to="preview">
          <button className="px-4 font-medium py-2 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors">
            Preview
          </button>
        </Link>
        <button className="px-4 font-medium py-2 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors">
          Exit
        </button>
      </div>
    </div>
  );
}

export default SubmissionHeader;
