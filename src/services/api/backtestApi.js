import { apiClient } from './apiClient';

export const createBacktestRun = (backtestData) => {
  return apiClient('/api/v1/backtest-runs', {
    method: 'POST',
    body: JSON.stringify(backtestData),
  });
};

export const getAllBacktestRuns = () => {
  return apiClient('/api/v1/backtest-runs', {
    method: 'GET',
  });
};

export const getBacktestRunById = (id) => {
  return apiClient(`/api/v1/backtest-runs/${id}`, {
    method: 'GET',
  });
};

export const executeBacktest = (id) => {
  return apiClient(`/api/v1/backtest-runs/${id}/execute`, {
    method: 'POST',
  });
};

export const deleteBacktestRun = (id) => {
  return apiClient(`/api/v1/backtest-runs/${id}`, {
    method: 'DELETE',
  });
};