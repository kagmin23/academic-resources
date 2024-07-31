import axios from "axios";
import { HOST_MAIN } from "services/apiService";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${HOST_MAIN}/api/auth`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const token =
        response.data.token ||
        response.data.accessToken ||
        response.data.data?.token;

    if (token) {
      localStorage.setItem("token", token);
      const userResponse = await axios.get(`${HOST_MAIN}/api/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
  } catch (error) {
    console.error('Failed to login:', error);
    throw error;
  }
};
