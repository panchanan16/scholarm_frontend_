import { useEffect, useState } from "react";
import {
  CheckCircle,
  User,
  FileText,
  Users,
  Eye,
  BookOpen,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Edit,
} from "lucide-react";
import {
  useConfirmAndSubmitManuscriptMutation,
  useGetArticleSummaryQuery,
} from "@/services/features/submission/submissionApi";
import SubmissionError from "@/components/error/submissionError";
import { Link, useSearchParams } from "react-router-dom";
import { useToastMutation } from "@/hooks/useNotification";

const SummaryForm = ({
  submissionData = {
    title:
      "Advanced Machine Learning Techniques for Predictive Analytics in Healthcare Systems",
    abstract:
      "This research presents novel machine learning approaches for predictive analytics in healthcare, focusing on early disease detection and treatment outcome prediction. Our methodology combines deep learning with traditional statistical methods to achieve superior accuracy in clinical decision support systems.",
    articleType: "Original Research",
    subject: "Computer Science - Machine Learning",
    keywords: [
      "Machine Learning",
      "Healthcare",
      "Predictive Analytics",
      "Deep Learning",
      "Clinical Decision Support",
    ],
    authors: [
      {
        name: "Dr. Sarah Johnson",
        email: "sarah.johnson@university.edu",
        affiliation: "Department of Computer Science, MIT",
        role: "Corresponding Author",
        phone: "+1-555-0123",
      },
      {
        name: "Prof. Michael Chen",
        email: "m.chen@stanford.edu",
        affiliation: "Stanford AI Lab, Stanford University",
        role: "Co-Author",
      },
      {
        name: "Dr. Emily Rodriguez",
        email: "e.rodriguez@harvard.edu",
        affiliation: "Harvard Medical School",
        role: "Co-Author",
      },
    ],
    suggestedReviewers: [
      {
        name: "Prof. David Kim",
        email: "d.kim@berkeley.edu",
        expertise: "Machine Learning in Healthcare",
        institution: "UC Berkeley",
      },
      {
        name: "Dr. Lisa Wang",
        email: "l.wang@cmu.edu",
        expertise: "Clinical Data Analytics",
        institution: "Carnegie Mellon University",
      },
    ],
    opposingReviewers: [
      {
        name: "Dr. James Miller",
        email: "j.miller@mit.edu",
        expertise: "Traditional Statistical Methods",
        institution: "MIT",
      },
    ],
    references: [
      "Smith, J. et al. (2023). Deep Learning Applications in Medical Diagnosis. Nature Medicine, 15(2), 234-245.",
      "Brown, A. & Davis, R. (2022). Predictive Analytics in Healthcare: A Comprehensive Review. Journal of Medical Informatics, 28(4), 112-128.",
      "Wilson, K. et al. (2023). Clinical Decision Support Systems: Current State and Future Directions. IEEE Transactions on Biomedical Engineering, 45(3), 567-580.",
    ],
    manuscriptDetails: {
      wordCount: 8500,
      pageCount: 15,
      figureCount: 7,
      tableCount: 3,
      fileFormat: "PDF",
      fileSize: "2.4 MB",
    },
    submissionDate: "2024-03-15",
    journalName: "International Journal of Healthcare Informatics",
    fundingInfo:
      "This research was supported by NSF Grant #1234567 and NIH Grant #R01-2345678",
    conflictOfInterest: "The authors declare no conflict of interest.",
    dataAvailability:
      "Data supporting this study are available upon reasonable request to the corresponding author.",
    ethicsApproval:
      "This study was approved by the MIT Institutional Review Board (IRB #2023-456)",
  },
}) => {
  const [queryParams] = useSearchParams();
  const articleId = Number(queryParams.get("article_id"));
  const { data: articleSummary } = useGetArticleSummaryQuery({
    article_id: articleId,
  });

  const [finalSubmission] = useToastMutation(
    useConfirmAndSubmitManuscriptMutation(),
    { showLoading: true }
  );

  const [isReffrenceError, setIsReferenceError] = useState(false);
  const [isAuthorsError, setIsAuthorsError] = useState(false);
  const [isReviewersError, setIsReviewersError] = useState(false);

  function checkReffrenceError() {
    const reffCount = articleSummary?.data?.Reffences.length || 0;
    const sectionCount = articleSummary?.data?.ArticleSection.reduce(
      (total, section) => {
        if (typeof section.refCount === "number") {
          return total + section.refCount;
        }
        return total;
      },
      0
    );

    // console.log(`ReffCount: ${reffCount}, SectionCount: ${sectionCount}`);
    if (reffCount !== sectionCount) {
      setIsReferenceError(true);
      return true; // Error: Reffrence count does not match section count
    }
    setIsReferenceError(false);
    return false; // No error
  }

  function checkAuthors() {
    // check if no of authors is less than 3
    if (articleSummary?.data?.articleAuthors.length < 3) {
      setIsAuthorsError(true);
      return true;
    } else {
      setIsAuthorsError(false);
      return false;
    }
  }

  function checkReviewer() {
    if (articleSummary?.data?.AssignReviewer.length < 3) {
      setIsReviewersError(true);
      return true;
    } else {
      setIsReviewersError(false);
      return false;
    }
  }

  useEffect(() => {
    checkReffrenceError();
    checkAuthors();
    checkReviewer();
  }, [articleSummary]);

  async function confirmAndSubmit() {
    const isSubmit = confirm("Are you sure to Submit ?");
    if (!isAuthorsError && !isReffrenceError && !isReviewersError) {
      isSubmit && (await finalSubmission({ article_id: articleId }));
    } else {
      isSubmit && alert("Make sure to correct all the errors!");
    }
    return;
  }

  const InfoCard = ({ title, children, icon: Icon, sectionKey, url = "/" }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gray-600 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon className="w-5 h-5 text-white" />
            <h3 className="text-base font-medium text-white">{title}</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Link to={url}>
              <button className="flex items-center space-x-1 px-3 py-1 bg-gray-500 bg-opacity-20 hover:bg-opacity-30 text-white rounded text-sm transition-colors">
                <Edit className="w-3 h-3" />
                <span>EDIT</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );

  const AuthorCard = ({ author, index }) => (
    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
      <div className="flex items-start space-x-2">
        <div className="bg-blue-100 rounded-full p-1.5">
          <User className="w-4 h-4 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h4 className="font-semibold text-gray-900 text-sm truncate">
              {author.author.author_fname} {author.author.author_lname}
            </h4>
            {author.isMain && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                Corresponding
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600 mt-1 truncate">
            {author.author.author_designation}
          </p>
          <div className="mt-1 space-y-0.5">
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Mail className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{author.author.author_email}</span>
            </div>
            {author.phone && (
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Phone className="w-3 h-3 flex-shrink-0" />
                <span>{author.phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const ReviewerCard = ({ reviewer, type }) => (
    <div
      className={`rounded-lg p-3 border ${
        type === "suggested"
          ? "bg-purple-50 border-purple-200"
          : "bg-red-50 border-red-200"
      }`}
    >
      <div className="flex items-start space-x-2">
        <div
          className={`rounded-full p-1.5 ${
            type === "suggested" ? "bg-purple-100" : "bg-red-100"
          }`}
        >
          <Eye
            className={`w-4 h-4 ${
              type === "suggested" ? "text-purple-600" : "text-red-600"
            }`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 text-sm truncate">
            {reviewer.reviewer_name}
          </h4>
          <p
            className={`text-xs font-medium mt-1 ${
              type === "suggested" ? "text-purple-600" : "text-red-600"
            }`}
          >
            {reviewer.reviewer_designation}
          </p>
          <div className="mt-1 space-y-0.5">
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{`xyz institute`}</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Mail className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{reviewer.reviewer_email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex justify-center items-center space-x-3 mb-3">
          <CheckCircle className="w-10 h-10 text-green-500" />
          <h1 className="text-3xl font-bold text-gray-900">
            Submission Summary
          </h1>
        </div>
        <p className="text-base text-gray-600">
          Review your journal submission details before final submission
        </p>
        <div className="mt-3 inline-flex items-center space-x-3 bg-green-100 text-green-800 px-3 py-1.5 rounded-full">
          <Calendar className="w-4 h-4" />
          <span className="font-medium text-sm">
            Submitted on{" "}
            {new Date(submissionData.submissionDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Article Details */}
        <InfoCard
          title="Article Information"
          icon={FileText}
          sectionKey="article"
        >
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Article Type
                </label>
                <p className="text-gray-900 mt-1 font-medium text-sm">
                  {articleSummary && articleSummary.data.type}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Subject
                </label>
                <p className="text-gray-900 mt-1 text-sm">
                  {submissionData.subject}
                </p>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Journal
              </label>
              <p className="text-base font-semibold text-blue-600 mt-1">
                {submissionData.journalName}
              </p>
            </div>
          </div>
        </InfoCard>

        {/* Manuscript Statistics */}
        <InfoCard
          title="Manuscript Details"
          icon={BookOpen}
          sectionKey="manuscript"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-blue-600">
                {submissionData.manuscriptDetails.wordCount.toLocaleString()}
              </div>
              <div className="text-xs text-gray-600">Words</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-green-600">
                {submissionData.manuscriptDetails.pageCount}
              </div>
              <div className="text-xs text-gray-600">Pages</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-purple-600">
                {submissionData.manuscriptDetails.figureCount}
              </div>
              <div className="text-xs text-gray-600">Figures</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-orange-600">
                {submissionData.manuscriptDetails.tableCount}
              </div>
              <div className="text-xs text-gray-600">Tables</div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">File Format:</span>
              <span className="font-medium text-gray-900">
                {submissionData.manuscriptDetails.fileFormat}
              </span>
            </div>
            <div className="flex justify-between items-center mt-1 text-sm">
              <span className="text-gray-600">File Size:</span>
              <span className="font-medium text-gray-900">
                {submissionData.manuscriptDetails.fileSize}
              </span>
            </div>
          </div>
        </InfoCard>
      </div>

      {/* Abstract */}
      <div className="mt-6">
        <InfoCard
          title="Abstract"
          icon={FileText}
          sectionKey="abstract"
          url={`submission?article_id=${articleId}`}
        >
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Title
              </label>
              <h2 className="text-lg font-bold text-gray-900 mt-1 leading-tight">
                {articleSummary && articleSummary.data.title}
              </h2>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Keywords
              </label>
              <div className="flex flex-wrap gap-1 mt-2">
                {articleSummary &&
                  articleSummary.data.keywords
                    .split(",")
                    .map((keyword, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
              </div>
            </div>
            <div className="prose prose-gray max-w-none">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Abstract
              </label>
              <p className="text-gray-900 leading-relaxed text-justify text-sm">
                {articleSummary && articleSummary.data.abstract}
              </p>
            </div>
          </div>
        </InfoCard>
      </div>

      {isAuthorsError && (
        <SubmissionError
          heading="Authors Error"
          msg="Numbers of Authors should be more than 3"
        />
      )}
      {/* Authors */}
      <div className="mt-6">
        <InfoCard
          title="Authors"
          icon={Users}
          sectionKey="authors"
          url={`/submission/authors?article_id=${articleId}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {articleSummary &&
              articleSummary.data.articleAuthors.map((author, index) => (
                <AuthorCard key={index} author={author} index={index} />
              ))}
          </div>
        </InfoCard>
      </div>

      {isReviewersError && (
        <SubmissionError
          heading="Reviewer Error"
          msg="Number reviewers must be greater than 3"
        />
      )}
      {/* Suggested Reviewers */}
      <div className="mt-6">
        <InfoCard
          title="Suggested Reviewers"
          icon={Eye}
          sectionKey="suggested-reviewers"
          url={`/submission/reviewers?article_id=${articleId}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {articleSummary &&
              articleSummary.data.AssignReviewer.map((reviewer, index) => (
                <ReviewerCard
                  key={index}
                  reviewer={reviewer?.reviewer}
                  type="suggested"
                />
              ))}
          </div>
        </InfoCard>
      </div>

      {isReffrenceError && (
        <SubmissionError
          heading="Refference Error"
          msg="Number of reffrence should be same as reffence added in article sections"
        />
      )}

      {/* References */}
      <div className="mt-6">
        <InfoCard
          title="References"
          icon={BookOpen}
          sectionKey="references"
          url={`/submission/reffrences?article_id=${articleId}`}
        >
          <div className="space-y-2">
            {articleSummary &&
              articleSummary.data.Reffences.map((reference, index) => (
                <div
                  key={index}
                  className="flex space-x-2 p-2 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                    {reference.reffrence_html_id}
                  </div>
                  <p className="text-gray-700 text-xs leading-relaxed">
                    {reference.reffrence}
                  </p>
                </div>
              ))}
          </div>
        </InfoCard>
      </div>

      {/* Additional Information */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard
          title="Funding Information"
          icon={FileText}
          sectionKey="funding"
        >
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Funding
            </label>
            <p className="text-gray-700 text-xs mt-1">
              {articleSummary && articleSummary.data.isFunded
                ? articleSummary.data.funding_info
                : "No"}
            </p>
          </div>

           <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Clinical Info
            </label>
            <p className="text-gray-700 text-xs mt-1">
              {articleSummary && articleSummary.data.isClinical
                ? articleSummary.data.clinical_info
                : "N / A"}
            </p>
          </div>
        </InfoCard>

        <InfoCard
          title="Ethics & Compliance"
          icon={CheckCircle}
          sectionKey="ethics"
        >
          <div className="space-y-2">
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Conflict of Interest
              </label>
              <p className="text-gray-700 text-xs mt-1">
                {articleSummary && articleSummary.data.isConflictInterest
                  ? articleSummary.data.conflict
                  : "No"}
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Ethics Approval
              </label>
              <p className="text-gray-700 text-xs mt-1">
                {articleSummary && articleSummary.data.isEthical
                  ? articleSummary.data.ethical_info
                  : "No"}
              </p>
            </div>
          </div>
        </InfoCard>
      </div>

      <div className="mt-6">
        <InfoCard title="Copyright" icon={FileText} sectionKey="data">
          <p className="text-gray-700 text-sm leading-relaxed">
            {articleSummary && articleSummary.data.copyright
              ? articleSummary.data.copyright
              : "N / A"}
          </p>
        </InfoCard>
      </div>

      {/* Action Buttons */}
      {articleSummary &&
        ["incomplete", "revise"].includes(
          articleSummary?.data.article_status
        ) && (
          <div className="mt-8 flex justify-between items-center">
            <button className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium">
              Back
            </button>
            <button
              onClick={confirmAndSubmit}
              className="px-8 py-2.5 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Confirm & Submit</span>
            </button>
          </div>
        )}
    </div>
  );
};

export default SummaryForm;
