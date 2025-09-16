 export const typeSubtypes = {
    article: {
      subclass: [
        { value: "news", label: "News Article" },
        { value: "opinion", label: "Opinion Article" },
        { value: "feature", label: "Feature Article" },
        { value: "editorial", label: "Editorial" },
      ],
      section: ["introduction", "body", "conclusion"],
    },
    research: {
      subclass: [
        { value: "quantitative", label: "Quantitative Research" },
        { value: "qualitative", label: "Qualitative Research" },
        { value: "mixed", label: "Mixed Methods" },
        { value: "experimental", label: "Experimental" },
      ],
      section: ["abstract", "methodology", "result", "discussion", "conclusion"],
    },
    // Original research 
    orginalResearch: {
      subclass: [
        { value: "experimentalStudies", label: "Experimental Studies" },
        { value: "observationalStudies", label: "Observational Studies" },
        { value: "surveyResearch", label: "Survey Research" },
        { value: "qualitativeStudies", label: "Qualitative Studies" },
      ],
      section: ["abstract", "methodology", "result", "discussion", "conclusion"],
    },
    review: {
      subclass: [
        { value: "systematic", label: "Systematic Review" },
        { value: "literature", label: "Literature Review" },
        { value: "meta", label: "Meta-analysis" },
        { value: "narrative", label: "Narrative Review" },
      ],
      section: ["overview", "criteria", "analysis", "conclusion"],
    },
    report: {
      subclass: [
        { value: "technical", label: "Technical Report" },
        { value: "financial", label: "Financial Report" },
        { value: "progress", label: "Progress Report" },
        { value: "annual", label: "Annual Report" },
      ],
      section: ["executive Summary", "details", "results", "recommendations"],
    },
  };