import axios from 'axios';
import { HOST_MAIN } from './apiService';

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: string;
  image: string;
  status: boolean;
}

export const registerUser = async (userData: RegisterData) => {
  try {
    const response = await axios.post(`${HOST_MAIN}/api/users`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log('Registration response:', response);

    const token = response.data.token || response.data.accessToken || response.data.data?.token;
    console.log('Token:', token);

    if (token) {
      console.log('Registration Success. Token received:', token);
      localStorage.setItem('token', token);
      
      // Sử dụng token để lấy dữ liệu người dùng
      const userResponse = await axios.get(`${HOST_MAIN}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('User data response:', userResponse);

      const userData = userResponse.data;
      console.log('User data received:', userData);

      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
        return userData; // Trả về dữ liệu người dùng nếu cần thiết
      } else {
        console.error('Failed to get user data');
        throw new Error('Failed to get user data');
      }
    } else {
      console.error('Error: Token not received');
      throw new Error('Error: Token not received');
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