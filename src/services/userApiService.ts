import { apiRequest } from "services/apiService";

interface SearchCondition {
  keyword: string;
  role: string;
  status: boolean;
  is_delete: boolean;
}

interface PageInfo {
  pageNum: number;
  pageSize: number;
}
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
export const getUser = async (userId: string) => {
  try {
    const response = await apiRequest(`api/users/${userId}`, {
      method: 'GET',
    });

    return response; // Assuming the API returns the user data
  } catch (error) {
    console.error('Failed to get user:', error);
    throw error;
  }
};
export const searchUsers = async (searchCondition: SearchCondition, pageInfo: PageInfo) => {
  const payload = {
    searchCondition,
    pageInfo
  };

  try {
    const response = await apiRequest('api/users/search', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response; // Assuming the API returns the search results
  } catch (error) {
    console.error('Failed to search users:', error);
    throw error;
  }
};
