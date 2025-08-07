import { useToastMutation } from "@/hooks/useNotification";
import { useDeleteReviewerFromArticleMutation } from "@/services/features/submission/submissionApi";
import { Edit3, Trash2 } from "lucide-react";

const ReviewerCard = ({ reviewer, deleteReviewer }) => {
  const reviewerOne = reviewer ? reviewer?.reviewer : {};
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {reviewerOne.reviewer_name}
            </h3>
          </div>
          <p className="text-gray-600 text-sm mt-1">
            {reviewerOne.reviewer_designation}
          </p>
          <a
            href={`mailto:${reviewerOne.reviewer_email}`}
            className="text-blue-500 hover:text-blue-700 text-sm mt-1 inline-block"
          >
            {reviewerOne.reviewer_email}
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
          onClick={() => deleteReviewer({article_id: reviewer.article_id, reviewer_id: reviewerOne.reviewer_id})}
          className="px-4 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50 hover:text-red-700 transition-colors text-sm font-medium"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const AddedReviewers = ({ title, reviewers, bgColor = "bg-gray-50" }) => {
  if (reviewers.length === 0) return null;

  const [deleteReviewer] = useToastMutation(
    useDeleteReviewerFromArticleMutation(),
    { showLoading: true }
  );

  return (
    <div className={`${bgColor} rounded-lg p-4 mb-6`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
        {title} ({reviewers.length})
      </h3>
      <div className="space-y-3">
        {reviewers.map((author, id) => (
          <ReviewerCard key={id} reviewer={author} deleteReviewer={deleteReviewer} />
        ))}
      </div>
    </div>
  );
};

export default AddedReviewers;
