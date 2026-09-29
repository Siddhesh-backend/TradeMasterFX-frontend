import { getToken } from '../../utils/tokenUtils';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = async (endpoint, options = {}) => {
  try {
    const token = getToken();

    const headers = {
      ...options.headers,
    };

    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorData = null;

      try {
        errorData = await response.json();
      } catch {
        errorData = null;
      }

      const error = new Error(
        errorData?.message || `API Error: ${response.status}`
      );

      error.status = response.status;
      error.data = errorData?.data || null;

      throw error;
    }

    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
};