import { apiRequest } from 'services/apiService';

export const addUser = async (userData: any) => {
  return apiRequest('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: userData,
  });
};