import { apiRequest } from "services/apiService";

export const changeUserPassword = async (user_id: string, old_password: string, new_password: string) => {
  const token = localStorage.getItem('token'); // Retrieve token from local storage or wherever it is stored

  return apiRequest('/api/users/change-password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    data: {
      user_id,
      old_password,
      new_password,
    },
  });
};
