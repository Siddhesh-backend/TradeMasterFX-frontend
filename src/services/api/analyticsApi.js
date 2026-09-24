import { apiClient } from './apiClient';

export const getAnalytics = (backtestId) => {
  return apiClient(`/api/v1/backtest-runs/${backtestId}/analytics`);
};