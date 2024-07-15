import { apiRequest } from "./apiService";

export const forgotPassword = async (email: string) => {
    const token = localStorage.getItem('token');
  
    return apiRequest(`/api/auth/forgot-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: {
        email
      },
    });
  };