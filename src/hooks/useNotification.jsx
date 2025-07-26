import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";

// Hook for mutations (POST, PUT, DELETE)
export const useToastMutation = (mutation, options = {}) => {
  const [mutationFn, mutationResult] = mutation;
  const [isCustomLoading, setIsCustomLoading] = useState(false);

  const wrappedMutation = async (data) => {
    setIsCustomLoading(true);

    const loadingToast =
      options.showLoading !== false
        ? toast.loading(options.loadingMessage || "Wait for Whiile...")
        : null;

    try {
      const result = await mutationFn(data).unwrap();

      if (loadingToast) toast.dismiss(loadingToast);
      setIsCustomLoading(false);

      if (options.showSuccess !== false) {
        toast.success(options.successMessage || "Success!");
      }

      if (options.onSuccess) {
        options.onSuccess(result);
      }

      return result;
    } catch (error) {
      if (loadingToast) toast.dismiss(loadingToast);
      setIsCustomLoading(false);

      if (options.showError !== false) {
        const errorMessage =
          options.errorMessage ||
          error?.data?.message ||
          "Something went wrong!";
        toast.error(errorMessage);
      }

      if (options.onError) {
        options.onError(error);
      }

      throw error;
    }
  };

  return [
    wrappedMutation,
    {
      ...mutationResult,
      isLoading: mutationResult.isLoading || isCustomLoading,
    },
  ];
};

// Hook for queries (GET requests)
export const useToastQuery = (query, options = {}) => {
  const queryResult = query;
  const [hasShownError, setHasShownError] = useState(false);
  const [hasShownSuccess, setHasShownSuccess] = useState(false);

  // Show loading toast for queries (optional)
  useEffect(() => {
    let loadingToast = null;

    if (queryResult.isLoading && options.showLoading) {
      loadingToast = toast.loading(options.loadingMessage ||  "Wait for Whiile...");
    }

    return () => {
      if (loadingToast) {
        toast.dismiss(loadingToast);
      }
    };
  }, [queryResult.isLoading, options.showLoading, options.loadingMessage]);

  // Show error toast if query fails
  useEffect(() => {
    if (queryResult.isError && options.showError !== false && !hasShownError) {
      const errorMessage =
        options.errorMessage ||
        queryResult.error?.data?.message ||
        "Failed to load data!";
      toast.error(errorMessage);
      setHasShownError(true);
    }

    // Reset error flag when query is refetched
    if (!queryResult.isError) {
      setHasShownError(false);
    }
  }, [
    queryResult.isError,
    queryResult.error,
    options.showError,
    options.errorMessage,
    hasShownError,
  ]);

  // Show success toast when data loads successfully (optional)
  useEffect(() => {
    if (
      queryResult.isSuccess &&
      queryResult.data &&
      options.showSuccess &&
      !hasShownSuccess
    ) {
      toast.success(options.successMessage || "Data fetched successfully!");
      setHasShownSuccess(true);
    }

    // Reset success flag when query is refetched
    if (queryResult.isLoading) {
      setHasShownSuccess(false);
    }
  }, [
    queryResult.isSuccess,
    queryResult.data,
    options.showSuccess,
    options.successMessage,
    hasShownSuccess,
    queryResult.isLoading,
  ]);

  return queryResult;
};

// Hooks for lazy query ---
export const useToastLazyQuery = (lazyQuery, options = {}) => {
  const [trigger, queryResult] = lazyQuery;
  const [isCustomLoading, setIsCustomLoading] = useState(false);

  const wrappedTrigger = useCallback(
    async (params) => {
      setIsCustomLoading(true);

      const loadingToast =
        options.showLoading !== false
          ? toast.loading(options.loadingMessage || "Wait for Whiile...")
          : null;

      try {
        const result = await trigger(params).unwrap();

        if (loadingToast) toast.dismiss(loadingToast);
        setIsCustomLoading(false);

        if (options.showSuccess !== false) {
          toast.success(options.successMessage || "Data fetched successfully!");
        }

        if (options.onSuccess) {
          options.onSuccess(result);
        }

        return result;
      } catch (error) {
        if (loadingToast) toast.dismiss(loadingToast);
          setIsCustomLoading(false)

        if (options.showError !== false) {
          const errorMessage =
            options.errorMessage ||
            error?.data?.message ||
            "Failed to load data!";
          toast.error(errorMessage);
        }

        if (options.onError) {
          options.onError(error);
        }

        throw error;
      }
    },
    [trigger, options]
  );

  return [
    wrappedTrigger,
    {
      ...queryResult,
      isLoading: queryResult.isLoading || isCustomLoading
    },
  ];
};
