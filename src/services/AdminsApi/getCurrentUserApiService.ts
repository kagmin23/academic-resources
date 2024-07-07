import { apiRequest } from 'services/apiService';

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');

  return apiRequest('/api/auth', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};
