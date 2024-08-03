import { apiRequest } from 'services/apiService';

export const getUserDetail = async (userId: string) => {
  
  return apiRequest(`/api/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
     
    },
  });
};