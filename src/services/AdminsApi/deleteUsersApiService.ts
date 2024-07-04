import { apiRequest } from 'services/apiService';

export const deleteUsers = async (id: number): Promise<void> => {
  try {
    const response = await apiRequest(`/api/users/${id}`, {
      method: 'DELETE',
    });
    return response;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
