 export const typeSubtypes = {
    article: {
      subclass: [
        { value: "news", label: "News Article" },
        { value: "opinion", label: "Opinion Article" },
        { value: "feature", label: "Feature Article" },
        { value: "editorial", label: "Editorial" },
      ],
      section: ["Introduction", "Body", "Conclusion"],
    },
    research: {
      subclass: [
        { value: "quantitative", label: "Quantitative Research" },
        { value: "qualitative", label: "Qualitative Research" },
        { value: "mixed", label: "Mixed Methods" },
        { value: "experimental", label: "Experimental" },
      ],
      section: ["Abstract", "Methodology", "Findings", "Discussion"],
    },
    review: {
      subclass: [
        { value: "systematic", label: "Systematic Review" },
        { value: "literature", label: "Literature Review" },
        { value: "meta", label: "Meta-analysis" },
        { value: "narrative", label: "Narrative Review" },
      ],
      section: ["Overview", "Criteria", "Analysis", "Conclusion"],
    },
    report: {
      subclass: [
        { value: "technical", label: "Technical Report" },
        { value: "financial", label: "Financial Report" },
        { value: "progress", label: "Progress Report" },
        { value: "annual", label: "Annual Report" },
      ],
      section: ["Executive Summary", "Details", "Results", "Recommendations"],
    },
  };