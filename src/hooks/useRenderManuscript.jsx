import {
  useLazyGetManuscriptByStatusQuery,
  useLazyGetManuscriptForEditorQuery,
  useLazyGetManuscriptForReviewerQuery,
} from "@/services/features/manuscript/slice";
import { useEffect } from "react";

function useRenderManuscript({
  role,
  status,
  editorStatus,
  reviewerStatus,
  completed,
  userId,
}) {
  const [fetchForAdmin, adminData] = useLazyGetManuscriptByStatusQuery();
  const [fetchForEditor, editorData] = useLazyGetManuscriptForEditorQuery();
  const [fetchForReviewer, reviewerData] =
    useLazyGetManuscriptForReviewerQuery();

  useEffect(() => {
    if (role == "admin") {
      fetchForAdmin({ status });
    } else if (role == "reviewer") {
      fetchForReviewer({ userId, status, reviewerStatus, completed });
    } else {
      fetchForEditor({ userId, status, editorStatus, completed });
    }
  }, [role]);

  if (role == "admin") {
    return {
      manuscriptsData: adminData && adminData.data,
    };
  } else if (role == "reviewer") {
    return {
      manuscriptsData: reviewerData && reviewerData.data,
    };
  } else {
    return {
      manuscriptsData: editorData && editorData.data,
    };
  }
}

export default useRenderManuscript;
