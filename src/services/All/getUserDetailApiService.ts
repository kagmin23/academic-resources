import axiosInstance from 'hook/config';
import { apiRequest } from 'services/apiService';

export const getUserDetail = async (userId: string) => {
  
  return apiRequest(`/api/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
     
    },
  });
};

export const getInstructorDetail = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/api/users/${userId}`, {
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  }
};
