import { apiClient } from './apiClient';

export const loginUser = (credentials) => {
    return apiClient('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
};

export const registerUser = (userData) => {
    return apiClient('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
};