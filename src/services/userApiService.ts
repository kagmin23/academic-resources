import { apiRequest } from "services/apiService";


export const deleteUser = async (userId: number) => {
  try {
    const response = await apiRequest(`api/users/${userId}`, {
      method: 'DELETE',
    });

    return response; // Assuming the API returns a success message or data
  } catch (error) {
    console.error('Failed to delete user:', error);
    throw error;
  }
};

export const changeUserStatus = async (userId: string, newStatus: boolean) => {
  try {
    const response = await apiRequest('api/users/change-status', {
      method: 'PUT',
      body: JSON.stringify({ userId, newStatus }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response; // Assuming the API returns a success message or data
  } catch (error) {
    console.error('Failed to change user status:', error);
    throw error;
  }
};

