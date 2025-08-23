import { useSearchParams } from "react-router-dom";

export const useSearchParamIfExist = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setQueryParamsIfTruthy = (paramsObj) => {
    const params = new URLSearchParams({});

    Object.entries(paramsObj).forEach(([key, value]) => {
      if (value) {
        // Only set keys with truthy values
        params.set(key, value);
      } else {
        // Remove key if value is falsy
        params.delete(key);
      }
    });

    setSearchParams(params);
  };

  return [searchParams, setQueryParamsIfTruthy];
};

