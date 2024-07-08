import { apiRequest } from 'services/apiService';

export const deleteCategory = async (categoryId: string) => {
  const token = localStorage.getItem('token');

  return apiRequest(`/api/category/${categoryId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};
