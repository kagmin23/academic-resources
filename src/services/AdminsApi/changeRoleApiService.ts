import { apiRequest } from 'services/apiService';

export const changeUserRole = async (user_id: string, role: string) => {
  const token = localStorage.getItem('token');
  
  return apiRequest('/api/users/change-role', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    data: { user_id, role },
  });
};
