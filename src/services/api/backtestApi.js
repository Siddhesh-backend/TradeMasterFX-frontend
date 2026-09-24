import { apiClient } from './apiClient';

export const runBacktest = (backtestData) => {
  return apiClient('/api/backtests/run', {
    method: 'POST',
    body: JSON.stringify(backtestData),
  });
};

export const getAllBacktestRuns = () => {
  return apiClient('/api/v1/backtest-runs', {
    method: 'GET',
  });
};