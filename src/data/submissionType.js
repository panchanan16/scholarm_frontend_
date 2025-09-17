export const typeSubtypes = {
  // Original research 
  orginalResearch: {
    subclass: [
      { value: "Experimental Studies", label: "Experimental Studies" },
      { value: "Observational Studies", label: "Observational Studies" },
      { value: "Survey Research", label: "Survey Research" },
      { value: "Qualitative Studies", label: "Qualitative Studies" },
    ],
    section: ["introduction", "methodology", "results", "discussion", "conclusion"],
  },
  reviewArticle: {
    subclass: [
      { value: "Narrative Reviews", label: "Narrative Reviews" },
      { value: "Systematic Reviews", label: "Systematic Reviews" },
      { value: "Meta Analysis", label: "Meta-analysis" },
      { value: "Scoping Reviews", label: "Scoping Reviews" },
    ],
    section: ["introduction", "methods", "results", "discussion", "conclusion"],
  },
  caseBasedArticle: {
    subclass: [
      { value: "Case Report", label: "Case Report" },
      { value: "Case Series", label: "Case Series" },
    ],
    section: ["introduction", "case presentation", "discussion", "conclusion"],
  },
  methodologicalArticle: {
    subclass: [
      { value: "Case Report", label: "Case Report" },
      { value: "Case Series", label: "Case Series" },
    ],
    section: ["introduction", "method description", "validation", "application", "conclusion"],
  },
  shortCommunication: {
    subclass: [
      { value: "Pilot Studies", label: "Pilot Studies" },
      { value: "Preliminary findings", label: "Preliminary findings" },
    ],
    section: ["introduction", "methods", "results", "discussion"],
  },
};