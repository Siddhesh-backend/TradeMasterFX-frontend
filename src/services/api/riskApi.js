import { apiClient } from './apiClient';

export const getRiskMetrics = (backtestId) => {
  return apiClient(`/api/risk/${backtestId}`);
};