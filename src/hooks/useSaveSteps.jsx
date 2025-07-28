import { modifyExpand, modifyHighlight, updateSteps } from "@/store/feature/submission/slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function useSaveSteps({ saveObject = {}, isExpand = false, nextHighlight = "" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function updateSaveSteps(redirectUrl) {
    dispatch(updateSteps(saveObject));
    isExpand && dispatch(modifyExpand(new Set(["content"])));
    navigate(redirectUrl);
    dispatch(modifyHighlight(nextHighlight))
  }
  return { updateSaveSteps };
}

export default useSaveSteps;
