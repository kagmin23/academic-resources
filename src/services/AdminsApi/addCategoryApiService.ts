import { apiRequest } from 'services/apiService';

export const createCategory = async (name: string, description: string) => {
  const token = localStorage.getItem('token');

  return apiRequest('/api/category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    data: {
      name,
      description,
    },
  });
};
