import { apiRequest } from 'services/apiService';

export const createUser = async (name: string, password: string, email: string, role: string, phone_number: string) => {
  const token = localStorage.getItem('token');
  
  return apiRequest('/api/users/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    data: { name, password, email, role,phone_number },
  });
};
