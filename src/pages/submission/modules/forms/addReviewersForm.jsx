import { useState } from "react";
import {
  useDeleteReviewerFromArticleMutation,
  useGetArticleReviewersQuery,
} from "@/services/features/submission/submissionApi";
import AddedReviewers from "../AddedReviewers";
import { useToastLazyQuery, useToastMutation } from "@/hooks/useNotification";
import { Breadcrumb } from "@/components/ui/breadCrumb";
import { useLazyGetOneReviewerQuery } from "@/services/features/reviewers/slice";
import AddReviewerModal from "@/components/ui/reviewerModal";
import { useSearchParams } from "react-router-dom";
import useSaveSteps from "@/hooks/useSaveSteps";

const AddReviewersForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSection, setIsSectionError] = useState(false);

  const [queryParams] = useSearchParams();
  const articleId = Number(queryParams.get("article_id"));
  const { updateSaveSteps } = useSaveSteps({
    saveObject: { reviewers: true },
    isExpand: true,
  });

  const [getReviewerWithEmail, { data }] = useToastLazyQuery(
    useLazyGetOneReviewerQuery(),
    { showLoading: true }
  );

  const { data: addedReviewers } = useGetArticleReviewersQuery({
    article_id: articleId,
  })

  const suggestedReviewers =
    addedReviewers &&
    addedReviewers?.data.filter((rev) => rev.reviewer_type == "suggested");
  const opposedReviewers =
    addedReviewers &&
    addedReviewers?.data.filter((rev) => rev.reviewer_type == "oppose");

  function handleSaveAndContinue() {
    if (addedReviewers && addedReviewers.data.length < 3) {
      setIsSectionError(true);
    } else {
      updateSaveSteps(`/submission/reffrences?article_id=${queryParams.get('article_id')}`)
    }
  }

  const handleSearch = async () => {
    try {
      await getReviewerWithEmail({ reviewer_email: searchTerm.trim() });
      setHasSearched(true);
      setShowModal(true);
    } catch (error) {
      setShowModal(true);
      setHasSearched(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Breadcrumb title="Author" content="Add Co-Author" />
      {isSection && <SubmissionError />}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Add Reviewers</h1>
          <p className="text-sm text-gray-500 mt-4">
            This study investigates [insert research topic or objective],
            addressing key gaps in the existing literature on [relevant field or
            subject].
          </p>

          <div className="mt-5 bg-gray-50 p-6 rounded-lg">
            <div className="flex space-x-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search email of your Reviewer"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium flex items-center space-x-2"
              >
                <span>Search</span>
              </button>
            </div>
          </div>

          <AddedReviewers
            title={"Suggested"}
            reviewers={suggestedReviewers ? suggestedReviewers : []}
          />

          <AddedReviewers
            title={"Opposed"}
            reviewers={opposedReviewers ? opposedReviewers : []}
          />

          <button
            className="px-4 py-2 mt-5 text-white bg-gray-800 rounded-md hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => handleSaveAndContinue()}
          >
            Save and Continue
          </button>
        </div>
      </div>

      <AddReviewerModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        txt={false}
        email={searchTerm}
        hasAuthor={hasSearched}
        reviewer={data ? data : {}}
        articleId={articleId}
      />
    </div>
  );
};

export default AddReviewersForm;
