import axios from 'axios';
import axiosInstance from 'hook/config';
import { HOST_MAIN } from './apiService';

export type User = {
  data: {
    _id: string;
    email: string;
    google_id: string;
    password: string;
    role: string;
    name: string;
    dob: string;
    phone_number: string;
    address: string;
    avatar: string;
    video: string;
    status: boolean;
    created_at: string;
    updated_at: string;
    balance_total: number;
    balance_account: string;
    balance_name: string;
    transactions: {
      _id: string;
      payout_id: string;
      payout_no: string;
      payout_amount: string;
      created_at: string;
    };
  };
};

export const loginViaGoogle = async (
  credential: string,
): Promise<string> => {
  try {
    const res = await axiosInstance.post(
      '/api/auth/google',
      { google_id: credential },
    );

    const token =
      res.data.token || res.data.accessToken || res.data.data?.token;
    if (token) {
      localStorage.setItem("token", token);
      return token;
    } else {
      throw new Error("Invalid Google login response!");
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