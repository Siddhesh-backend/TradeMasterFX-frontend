import { apiClient } from './apiClient';

export const getAllStrategies = () => {
    return apiClient('/api/v1/strategies', {
        method: 'GET',
    });
};

export const getStrategyById = (id) => {
    return apiClient(`/api/v1/strategies/${id}`, {
        method: 'GET',
    });
};

export const createStrategy = (strategyData) => {
    return apiClient('/api/v1/strategies', {
        method: 'POST',
        body: JSON.stringify(strategyData),
    });
};

export const updateStrategy = (id, strategyData) => {
    return apiClient(`/api/v1/strategies/${id}`, {
        method: 'PUT',
        body: JSON.stringify(strategyData),
    });
};

export const deleteStrategy = (id) => {
    return apiClient(`/api/v1/strategies/${id}`, {
        method: 'DELETE',
    });
};