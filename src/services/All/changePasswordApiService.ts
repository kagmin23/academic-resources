import axiosInstance from 'hook/config';

export const changeUserPassword = async (user_id: string, old_password: string, new_password: string) => {
  try {
    const response = await axiosInstance.put(
      '/api/users/change-password',
      {
        user_id,
        old_password,
        new_password,
      },
    )
    return response.data;
  } catch (error) {
    console.error('Error changing user password:', error);
    throw error;
  }
};
