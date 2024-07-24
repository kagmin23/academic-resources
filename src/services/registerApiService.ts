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

// Hàm đăng ký người dùng
export const registerUser = async (userData: RegisterUser): Promise<RegisterResponseData> => {
  try {
    const response = await axios.post(`${HOST_MAIN}/api/users`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log('Registration response:', response);

    if (userData.role === 'instructor') {
      console.log("Instructor registration, pending approval");
      localStorage.setItem('user', JSON.stringify(userData));
      return { ...userData, pendingApproval: true };
    } else {
      console.log("Non-instructor registration");
      localStorage.setItem('user', JSON.stringify(userData));
      return { ...userData };
    }
  } catch (error) {
    console.error('Registration error:', error);

    let errorMessage = 'There was an error during the registration process. Please try again.';
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('Error message:', errorMessage);

    throw new Error(errorMessage);
  }
};