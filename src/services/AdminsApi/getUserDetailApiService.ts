import { apiRequest } from 'services/apiService';

export const getUserDetail = async (userId: string) => {
  const token = localStorage.getItem('token');
  
  return apiRequest(`/api/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
};
