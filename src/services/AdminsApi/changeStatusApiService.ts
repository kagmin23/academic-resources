import { apiRequest } from 'services/apiService';

export const changeStatus = async (user_id: string, status: boolean) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No token found');
  }

  return apiRequest('/api/users/change-status', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    data: { user_id, status },
  });
};
