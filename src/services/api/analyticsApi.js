import { apiClient } from './apiClient';

export const getPerformanceSummary = (backtestId) => {
    return apiClient(`/api/v1/backtest-runs/${backtestId}/analytics`, {
        method: 'GET',
    });
};