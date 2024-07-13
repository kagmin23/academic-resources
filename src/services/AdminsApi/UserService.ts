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
  

export const deleteUser = async (user_id: string) => {
    const token = localStorage.getItem('token');
  
    return apiRequest(`/api/users/${user_id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  };

  export const getCurrentUser = async () => {
    const token = localStorage.getItem('token');
  
    return apiRequest('/api/auth', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  };