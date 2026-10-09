import { apiClient } from './apiClient';

export const calculateRisk = (riskData) => {
  return apiClient('/api/v1/risk/calculate', {
    method: 'POST',
    body: JSON.stringify(riskData),
  });
};
