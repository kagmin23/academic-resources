import { apiRequest } from 'services/apiService';

export const getCategoryDetail = async (categoryId: string) => {
  const token = localStorage.getItem('token');

  return apiRequest(`/api/category/${categoryId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};
