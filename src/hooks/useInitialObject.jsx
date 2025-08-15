import { useEffect } from "react";

function useInitialObject({ article_id, useLazyQueryHook }) {
  const [getIntialObject, InitialData] = useLazyQueryHook();

  useEffect(() => {
    getIntialObject(article_id);
  }, [article_id]);
  return [InitialData];
}

export default useInitialObject;
