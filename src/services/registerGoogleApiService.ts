import axios from 'axios';
import { HOST_MAIN } from './apiService';

interface User {
  email: string;
  password: string;
  name: string;
  role: string;
  image: string;
  status: boolean;
  data: string;
}

export const registerViaGoogle = async (
  credential: string,
): Promise<string> => {
  try {
    const res = await axios.post(
      `${HOST_MAIN}/api/users/google`,
      { google_id: credential },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const token =
      res.data.token || res.data.accessToken || res.data.data?.token;
    console.log(token);
    if (token) {
      localStorage.setItem("token", token);
      return token;
    } else {
      throw new Error("Invalid Google register response!");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getCurrentLogin = async (token: string): Promise<User> => {
  try {
    const res = await axios.get(`${HOST_MAIN}/api/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = res.data;
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } else {
      throw new Error("Cannot get user data!");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
