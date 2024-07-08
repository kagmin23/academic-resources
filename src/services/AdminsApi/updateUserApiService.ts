import { apiRequest } from 'services/apiService';

export const updateUser = async (userId: string, userData: { name: string; email: string; role: string; status: boolean; description: string; phone_number: string; avatar: string; video: string; dob: string }) => {
  const token = localStorage.getItem('token');
  
  return apiRequest(`/api/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    data: userData,
  });
};
