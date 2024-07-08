// deleteUserApiService.ts

import { apiRequest } from 'services/apiService';

export const deleteUser = async (user_id: string) => {
  const token = localStorage.getItem('token');

  return apiRequest(`/api/users/${user_id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};
