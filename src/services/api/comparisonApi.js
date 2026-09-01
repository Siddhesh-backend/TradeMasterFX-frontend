import { apiClient } from './apiClient';

export const compareBacktests = (comparisonData) => {
  return apiClient('/api/comparison', {
    method: 'POST',
    body: JSON.stringify(comparisonData),
  });
};