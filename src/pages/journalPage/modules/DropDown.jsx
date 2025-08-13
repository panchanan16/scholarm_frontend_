import { Archive, Edit, Eye, Flag, Share, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

function JournalDropDown({ manuscript }) {
  return (
    <div className="absolute right-0 top-8 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-100">
      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
        <Eye className="h-4 w-4" />
        View Details
      </button>
      <Link to={`assign-editor?article_id=${manuscript.intro_id}`}>
        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
          <Edit className="h-4 w-4" />
          Invite Editor
        </button>
      </Link>
      <Link to={`assign-editor?article_id=${manuscript.intro_id}`}>
        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
          <Edit className="h-4 w-4" />
          Edit Manuscript
        </button>
      </Link>

      <Link to={`assign-reviewer?article_id=${manuscript.intro_id}`}>
        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
          <Edit className="h-4 w-4" />
          Invite Reviewer
        </button>
      </Link>

      <button
        onClick={(e) => handleEditorDescision("edit", manuscript, e)}
        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
      >
        <Edit className="h-4 w-4" />
        Post Editor Descision
      </button>

      <button
        onClick={(e) => handleReviewerDescision(manuscript.intro_id)}
        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
      >
        <Edit className="h-4 w-4" />
        Reviewer Descision
      </button>

      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
        <Share className="h-4 w-4" />
        Share
      </button>
      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
        <Archive className="h-4 w-4" />
        Archive
      </button>
      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
        <Flag className="h-4 w-4" />
        Flag for Review
      </button>

      {/* Separator */}
      <div className="border-t border-gray-100 my-1"></div>

      <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
        <Trash2 className="h-4 w-4" />
        Delete
      </button>
    </div>
  );
}

export default JournalDropDown;
