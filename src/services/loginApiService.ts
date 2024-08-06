import axiosInstance from "hook/config";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/api/auth',
      { email, password },
    );

    const token =
        response.data.token ||
        response.data.accessToken ||
        response.data.data?.token;

    if (token) {
      localStorage.setItem("token", token);
      const userResponse = await axiosInstance.get('/api/auth', {
      });

      const userData = userResponse.data;
      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        return userData;
      } else {
        console.error("Failed to get user data");
        throw new Error("Failed to get user data");
      }
    } else {
      console.error("Error: Token not received");
      throw new Error("Error: Token not received");
    }
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  }
};
