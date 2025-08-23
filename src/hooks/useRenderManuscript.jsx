import {
  useLazyGetManuscriptByStatusQuery,
  useLazyGetManuscriptForAuthorQuery,
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
  type,
  processed,
  userId,
  disposal
}) {
  const [fetchForAdmin, adminData] = useLazyGetManuscriptByStatusQuery();
  const [fetchForEditor, editorData] = useLazyGetManuscriptForEditorQuery();
  const [fetchForReviewer, reviewerData] = useLazyGetManuscriptForReviewerQuery();
  const [fetchForAuthor, authorData] = useLazyGetManuscriptForAuthorQuery();

  useEffect(() => {
    if (role == "admin") {
      fetchForAdmin({ status, type });
    } else if (role == "reviewer") {
      fetchForReviewer({ userId, status, reviewerStatus, completed });
    } else if (role == "author") {
      fetchForAuthor({ userId, status, processed });
    } else {
      fetchForEditor({ userId, status, editorStatus, completed, disposal });
    }
  }, [role, status, processed, type]);

  if (role == "admin") {
    return {
      manuscriptsData: adminData && adminData.data,
    };
  } else if (role == "reviewer") {
    return {
      manuscriptsData: reviewerData && reviewerData.data,
    };
  } else if (role == "author") {
    return {
      manuscriptsData: authorData && authorData.data,
    };
  } else {
    return {
      manuscriptsData: editorData && editorData.data,
    };
  }
}

export default useRenderManuscript;
