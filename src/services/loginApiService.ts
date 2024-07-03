import { apiRequest } from "services/apiService";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await apiRequest('api/auth', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
                'Content-Type': 'application/json'
      }
    });

    return response; // Assuming the API returns a success message or data with a token
  } catch (error) {
    console.error('Failed to login:', error);
    throw error;
  }
};


export const getCurrentUser = async () => {
    try {
      const response = await apiRequest('api/auth', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
        }
      });
  
      if (response.success) {
        return response.data; // Return user data if API call is successful
      } else {
        throw new Error('Failed to fetch current user');
      }
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      throw error;
    }
  };