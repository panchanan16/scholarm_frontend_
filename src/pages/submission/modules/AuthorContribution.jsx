import React, { use, useState } from "react";
import ContributionForm from "./forms/ContributionForm";
import { contributionOptions } from "@/utils/contributionOption";
import { useGetArticleAuthorsByArticleIdQuery } from "@/services/features/submission/submissionApi";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useSaveSteps from "@/hooks/useSaveSteps";

const AuthorContributionForm = () => {
  const [searchParam] = useSearchParams();
  const { data: articleAuthors } = useGetArticleAuthorsByArticleIdQuery({
    article_id: searchParam.get("article_id") || 0,
  });

  console.log(articleAuthors);
  const [authors, setAuthors] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      contributions: [], // Changed to store keys instead of strings
      dropdownOpen: false,
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      contributions: [],
      dropdownOpen: false,
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      contributions: [],
      dropdownOpen: false,
    },
    {
      id: 4,
      name: "Dr. James Thompson",
      contributions: [],
      dropdownOpen: false,
    },
  ]);

  const { articlePresections } = useSelector((state) => state.submission);

  const { updateSaveSteps } = useSaveSteps({
    saveObject: { authors: true },
    nextHighlight: "articlemain",
  });

  const toggleDropdown = (authorId) => {
    setAuthors(
      authors.map((author) =>
        author.id === authorId
          ? { ...author, dropdownOpen: !author.dropdownOpen }
          : { ...author, dropdownOpen: false }
      )
    );
  };

  // Modified to work with keys instead of full contribution strings
  const handleContributionSelect = (authorId, contributionKey) => {
    setAuthors(
      authors.map((author) => {
        if (author.id === authorId) {
          const contributions = author.contributions.includes(contributionKey)
            ? author.contributions.filter((key) => key !== contributionKey)
            : [...author.contributions, contributionKey];
          return { ...author, contributions };
        }
        return author;
      })
    );
  };

  const handleAuthorApply = (authorId) => {
    setAuthors(
      authors.map((author) =>
        author.id === authorId ? { ...author, dropdownOpen: false } : author
      )
    );
  };

  const goToNext = () => {
    updateSaveSteps(
      `/submission/article-sections/${
        articlePresections && articlePresections[0].link
      }`
    );
  };

  const handleBack = () => {
    console.log("Going back...");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-cyan-900 px-8 py-6">
          <h1 className="text-2xl font-semibold text-white mb-2">
            How did each listed author contribute?
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Authors List */}
          <div className="flex-1 p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Authors
            </h2>
            <div className="space-y-6 overflow-y-auto">
              {articleAuthors &&
                articleAuthors.data.map((author, index) => (
                  <div
                    key={author.id}
                    className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="bg-blue-100 text-blue-800 font-semibold px-3 py-2 rounded-full text-sm">
                        {index + 1}
                      </span>
                      <span className="font-medium text-gray-900 text-lg">
                        {author?.author.author_fname}{" "}
                        {author?.author.author_lname}
                      </span>
                    </div>

                    {/* Custom Multi-Select Dropdown */}
                    <ContributionForm
                      toggleDropdown={toggleDropdown}
                      author={author}
                      handleContributionSelect={handleContributionSelect}
                      handleAuthorApply={handleAuthorApply}
                    />

                    {/* Selected Contributions Display - Modified to show values based on keys */}
                    {author.contribution && JSON.parse(author.contribution) && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Selected Contributions:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {JSON.parse(author.contribution).map(
                            (contributionKey, idx) => (
                              <span
                                key={idx}
                                className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                              >
                                {contributionOptions[contributionKey]}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-50 px-8 py-4 flex justify-between items-center border-t border-gray-200">
          <button
            onClick={handleBack}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
          >
            BACK
          </button>

          <button
            onClick={goToNext}
            className="px-4 py-2 mt-5 text-white bg-gray-800 rounded-md hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorContributionForm;
