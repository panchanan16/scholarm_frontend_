
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
/**
 * Global POST hook with optional payload
 * @param {Object} options
 * @param {string | string[]} options.queryKey - Unique key for caching
 * @param {string} options.url - API endpoint
 * @param {Object} [options.payload={}] - Optional POST body
 * @param {boolean} [options.enabled=true] - Conditional fetching
 * @param {Function} [options.select] - Optional data selector
 */
export function usePostData({
  queryKey,
  url,
  payload = {},
  enabled = true,
  select,
}) {
  return useQuery({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: async () => {
      const response = await axios.post(url, payload);
      return response.data;
    },
    enabled,
    select,
  });
}
