import { apiClient } from './apiClient';

export const getAnalytics = (backtestId) => {
  return apiClient(`/api/analytics/${backtestId}`);
};