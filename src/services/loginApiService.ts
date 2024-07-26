import axios from "axios";
import { HOST_MAIN } from "services/apiService";

export const loginUser = async (email: string, password: string) => {
  try {
    console.log("Attempting to log in with email:", email);

    const response = await axios.post(
      `${HOST_MAIN}/api/auth`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Login response:", response);

    const token =
        response.data.token ||
        response.data.accessToken ||
        response.data.data?.token;
    console.log(token);

    if (token) {
      // console.log("Login Success. Token received:", token);
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
