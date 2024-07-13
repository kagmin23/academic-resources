import axios from 'axios';
import { HOST_MAIN } from './apiService';

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
  image: string;
  status: boolean;
  phone_number: string

}

export const registerUser = async (userData: RegisterData) => {
  try {
    const response = await axios.post(`${HOST_MAIN}/api/users`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log('Registration response:', response);

      if (userData) {
        console.log("userData", userData)

        localStorage.setItem('user', JSON.stringify(userData));
        return userData; // Trả về dữ liệu người dùng nếu cần thiết
      } else {
        console.error('Failed to get user data');
        throw new Error('Failed to get user data');
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

        throw error;
  }
};