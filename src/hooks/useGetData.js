import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

/**
 * Global GET hook with optional query params
 * @param {Object} options  
 * @param {string | string[]} options.queryKey - Unique query key for caching
 * @param {string} options.url - Endpoint to fetch data from
 * @param {Object} [options.payload] - Optional query params
 * @param {boolean} [options.enabled=true] - To control conditional fetching
 * @param {Function} [options.select] - Optional function to transform the result
 */
export function useGetData({
  queryKey,
  url,
  payload,
  enabled = true,
  select,
}) {
  return useQuery({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: async () => {
      const response = await axios.get(url, {
        params: payload,
      });
      return response.data;
    },
    enabled,
    select,
  });
}
