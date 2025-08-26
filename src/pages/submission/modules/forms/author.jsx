import AddAuthorModal from "@/components/ui/authorModal";
import { Breadcrumb } from "@/components/ui/breadCrumb";
import { useState } from "react";
import AddedAuthors from "../AddedAuthors";
import SubmissionError from "@/components/error/submissionError";
import { useToastLazyQuery } from "@/hooks/useNotification";
import { useLazyGetOneAuthorQuery } from "@/services/features/authors/slice";
import { useGetArticleAuthorsByArticleIdQuery } from "@/services/features/submission/submissionApi";
import { useSearchParams } from "react-router-dom";
import useSaveSteps from "@/hooks/useSaveSteps";
import { useSelector } from "react-redux";

export default function Author() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSection, setIsSectionError] = useState(false);
  const [queryParams] = useSearchParams();
  const { articlePresections } = useSelector((state) => state.submission);

  console.log(articlePresections)


  const { updateSaveSteps } = useSaveSteps({
    saveObject: { authors: true },
    nextHighlight: "articlemain",
  });

  const [getAuthorWithEmail, { data, isSuccess }] = useToastLazyQuery(
    useLazyGetOneAuthorQuery(),
    { showLoading: true }
  );

  const addedAuthors = useGetArticleAuthorsByArticleIdQuery({
    article_id: queryParams.get("article_id"),
  });

  function handleSaveAndContinue() {
    if (addedAuthors && addedAuthors.data.data.length < 3) {
      return setIsSectionError(true);
    }

    updateSaveSteps(
      `/submission/article-sections/${articlePresections && articlePresections[0].link}`
    );
  }

  const handleSearch = async () => {
    try {
      await getAuthorWithEmail({ author_email: searchTerm.trim() });
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
      {isSection && <SubmissionError msg="Three or co authors must be there!" />}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Add Co-Author</h1>
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
                  placeholder="Search email of your co-author"
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

          <AddedAuthors />

          <button
            className="px-4 py-2 mt-5 text-white bg-gray-800 rounded-md hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => handleSaveAndContinue()}
          >
            Save and Continue
          </button>
        </div>
      </div>
      <AddAuthorModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        txt={false}
        email={searchTerm}
        hasAuthor={hasSearched}
        author={isSuccess && data ? data : {}}
        articleId={Number(queryParams.get("article_id"))}
      />
    </div>
  );
}
