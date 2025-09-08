import { useToastMutation } from "@/hooks/useNotification";
import {
  useDeleteAuthorsFromArticleMutation,
  useGetArticleAuthorsByArticleIdQuery,
  useSetCorrespondingAuthorMutation,
} from "@/services/features/submission/submissionApi";
import { useSearchParams } from "react-router-dom";


export default function AddedAuthors() {
  const [queryParams] = useSearchParams()
  const { data: authorsList } = useGetArticleAuthorsByArticleIdQuery({
    article_id: queryParams.get('article_id'),
  });

  const [setCorrespondingAuthor, { data }] = useToastMutation(
    useSetCorrespondingAuthorMutation(),
    { showLoading: true }
  );

  const [removeAuthor, resultdata] = useToastMutation(
    useDeleteAuthorsFromArticleMutation(),
    { showLoading: true }
  );

  const handleEdit = (authorId) => {
    console.log("Edit author:", authorId);
  };

  return (
    <div className="bg-white mt-10 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-600 text-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-medium text-sm">Position</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="font-medium text-sm">Author Details</span>
        </div>
      </div>

      {/* Author List */}
      <div className="divide-y divide-gray-200">
        {authorsList &&
          authorsList?.data.map((author) => (
            <div
              key={author.author_id}
              className="px-6 py-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                {/* Drag Handle */}
                <div className="text-gray-400 cursor-move mr-4">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 4a1 1 0 011-1h.01a1 1 0 010 2H4a1 1 0 01-1-1zM3 8a1 1 0 011-1h.01a1 1 0 010 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h.01a1 1 0 010 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h.01a1 1 0 010 2H4a1 1 0 01-1-1zM7 4a1 1 0 011-1h.01a1 1 0 010 2H8a1 1 0 01-1-1zM7 8a1 1 0 011-1h.01a1 1 0 010 2H8a1 1 0 01-1-1zM7 12a1 1 0 011-1h.01a1 1 0 010 2H8a1 1 0 01-1-1zM7 16a1 1 0 011-1h.01a1 1 0 010 2H8a1 1 0 01-1-1z" />
                  </svg>
                </div>

                {/* Position */}
                <div className="font-semibold text-gray-900 text-lg w-12 text-center mr-6">
                  {author.position}
                </div>

                {/* Radio Button */}
                <div className="mr-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="selectedAuthor"
                      value={author.author_id}
                      checked={author.isMain && author.author_id}
                      onChange={() =>
                        setCorrespondingAuthor({
                          article_id: Number(queryParams.get('article_id')),
                          author_id: author.author_id,
                          isMain: true,
                        })
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                  </label>
                </div>

                {/* Author Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {author.author.author_fname} {author.author.author_lname}
                    </h3>
                    {author.isMain && (
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-blue-600 text-sm font-medium">
                          Corresponding Author
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-1">
                    {author.author.author_designation}
                  </p>
                  <a
                    href={`mailto:${author.author.author_email}`}
                    className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
                  >
                    {author.author.author_email}
                  </a>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(author.id)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm font-medium"
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() =>
                      removeAuthor({
                        article_id: author.article_id,
                        author_id: author.author_id,
                      })
                    }
                    className="px-3 py-2 text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
