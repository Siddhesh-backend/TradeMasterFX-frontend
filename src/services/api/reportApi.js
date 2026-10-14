
import { apiClient } from './apiClient';
import { getToken } from '../../utils/tokenUtils';

export const getReports = () => {
  return apiClient('/api/v1/reports');
};

export const getReportById = (reportId) => {
  return apiClient(`/api/v1/reports/${reportId}`);
};

export const generateReport = (backtestRunId) => {
  return apiClient(`/api/v1/backtest-runs/${backtestRunId}/report`);
};

export const exportReport = async (reportId, format) => {
  const token = getToken();
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/reports/${reportId}/export/${format}`,
    {
      method: 'GET',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }
  );

  if (!response.ok) {
    let message = `Failed to export ${format.toUpperCase()} report.`;

    try {
      const data = await response.json();
      message = data?.message || message;
    } catch {
      // Response may not contain JSON.
    }

    throw new Error(message);
  }

  const blob = await response.blob();
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = downloadUrl;
  link.download = `TradeMasterFX_Report_${reportId}.${format === 'excel' ? 'xlsx' : format}`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(downloadUrl);
};
