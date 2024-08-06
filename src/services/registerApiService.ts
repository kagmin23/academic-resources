import axios from 'axios';
import { HOST_MAIN } from './apiService';

export interface RegisterUser {
  email: string;
  password: string;
  name: string;
  role: 'student' | 'instructor';
  avatar?: string;
  video?: string;
  description?: string;
  phone_number?: string;
}

export interface RegisterResponseData extends RegisterUser {
  pendingApproval?: boolean;
}

export const registerUser = async (userData: RegisterUser): Promise<RegisterResponseData> => {
  try {
    const response = await axios.post(`${HOST_MAIN}/api/users`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (userData.role === 'instructor') {
      localStorage.setItem('user', JSON.stringify(userData));
      return { ...userData, pendingApproval: true };
    } else {
      localStorage.setItem('user', JSON.stringify(userData));
      return { ...userData };
    }
  } catch (error: any) {
    console.error('Registration error:', error);

    let errorMessage = 'There was an error during the registration process. Please try again.';
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(errorMessage);
  }
};