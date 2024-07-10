import { apiRequest } from 'services/apiService';

export const getCourse = async (courseId: string) => {
    const token = localStorage.getItem('token');
  
    return apiRequest(`/api/course/${courseId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  };