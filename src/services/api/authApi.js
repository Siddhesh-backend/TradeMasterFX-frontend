import { apiClient } from './apiClient';

export const loginUser = (credentials) => {
  return apiClient('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

export const registerUser = (userData) => {
  return apiClient('/api/v1/users/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};