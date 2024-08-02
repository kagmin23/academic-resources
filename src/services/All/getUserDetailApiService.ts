import axiosInstance from 'hook/config';

export const getUserDetail = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/api/users/${userId}`, {
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};
