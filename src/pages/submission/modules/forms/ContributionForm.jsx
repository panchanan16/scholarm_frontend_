import { useToastMutation } from "@/hooks/useNotification";
import { useCreateAuthorContributionMutation } from "@/services/features/submission/submissionApi";
import { contributionOptions } from "@/utils/contributionOption";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

function ContributionForm({ author }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [authorContributions, setAuthorContributions] = useState(
    author?.contribution ? JSON.parse(author.contribution) : []
  );
  const [createAuthorContribution] = useToastMutation(
    useCreateAuthorContributionMutation(),
    { showLoading: true }
  );

  const authorContribution = useMemo(() => {
    return author?.contribution ? JSON.parse(author.contribution) : [];
  }, [author, authorContributions]);

  function handleContributionSelect(contributionKey) {
    setAuthorContributions((prev) => {
      if (prev.includes(contributionKey)) {
        return prev.filter((n) => n !== contributionKey);
      }
      return [...prev, contributionKey];
    });

    if (authorContribution.includes(contributionKey)) {
      return authorContribution.filter((n) => n !== contributionKey);
    } else {
      return [...authorContribution, contributionKey];
    }
  }

  async function handleAddContribution() {
    await createAuthorContribution({
      article_id: author.article_id,
      author_id: author.author_id,
      contribution: JSON.stringify(authorContributions),
    });
    setOpenDropdown(false);
  }

  return (
    <div className="relative mb-4">
      <button
        onClick={() => setOpenDropdown(!openDropdown)}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left text-gray-700 hover:border-blue-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm">
            {authorContribution.length === 0
              ? "Select contributions..."
              : `${authorContribution.length} contribution${
                  authorContribution.length > 1 ? "s" : ""
                } selected`}
          </span>
          <ChevronDown
            className={`h-5 w-5 text-gray-400 transform transition-transform ${
              openDropdown ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {openDropdown && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="max-h-72 overflow-y-auto">
            <div className="p-2">
              {/* Modified to iterate over object entries */}
              {Object.entries(contributionOptions).map(([key, value]) => (
                <label
                  key={key}
                  className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={
                      // authorContribution.includes(parseInt(key)) ||
                      authorContributions.includes(parseInt(key))
                    }
                    onChange={() => handleContributionSelect(parseInt(key))}
                    className="mt-0.5 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 leading-5">
                    {value}
                  </span>
                </label>
              ))}
            </div>
            {/* Apply Button Inside Dropdown */}
            <div className="border-t border-gray-200 p-3 bg-gray-50 rounded-b-lg">
              <button
                onClick={() => handleAddContribution(author.author_id)}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all font-medium shadow-sm hover:shadow-md text-sm"
              >
                APPLY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContributionForm;
