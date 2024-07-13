import axios from "axios";
import { HOST_MAIN } from "services/apiService";

interface User {
  email: string;
  password: string;
  name: string;
  role: string;
  image: string;
  status: boolean;
  phone_number: string
}

export const loginUser = async (email: string, password: string) => {
  try {
    console.log("Attempting to log in with email:", email);
    
    // Attempt to login and retrieve token
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
      console.log("Login Success. Token received:", token);
      localStorage.setItem("token", token);
      
      // Use token to get user data
      const userResponse = await axios.get(`${HOST_MAIN}/api/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("User data response:", userResponse);

      const userData = userResponse.data;
      console.log("User data received:", userData);

      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        return userData; // Return user data for further use if needed
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
