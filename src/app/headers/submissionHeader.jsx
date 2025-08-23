import React from "react";
import { Link, useSearchParams } from "react-router-dom";

function SubmissionHeader() {
  const [queryParam] = useSearchParams();
  // if (queryParam.get("mode") === "edit") {
    return (
      <div className="bg-slate-700 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">          
          <span className="text-sm font-medium bg-slate-600 px-3 py-1 rounded-full">
            Submit Mode
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link to={`preview?article_id=${queryParam.get('article_id')}`}>
            <button className="px-4 font-medium py-2 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors">
              Preview
            </button>
          </Link>
          <Link to={"/"}>
            <button className="px-4 font-medium py-2 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors">
              Exit
            </button>
          </Link>
        </div>
      </div>
    );
  // }
}

export default SubmissionHeader;
