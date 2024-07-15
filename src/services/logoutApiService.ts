import axios from 'axios';
import { HOST_MAIN } from './apiService';

export const logoutApiService = async (): Promise<{ success: boolean; data: null }> => {
  try {
    const response = await axios.get(`${HOST_MAIN}/api/auth/log-out`);
    return {
      success: response.data.success,
      data: null,
    };
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};
