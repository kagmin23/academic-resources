import axios from 'axios';
import { HOST_MAIN } from './apiService';

export const registerViaGoogle = async (credential: string, role: string): Promise<string> => {
  try {
    const { data } = await axios.post(
      `${HOST_MAIN}/api/users/google`,
      { google_id: credential,
        role: role,
        description: "",
        video: "",
        phone_number: ""
       },
      { headers: {
        "Content-Type": "application/json"
      } }
    );
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Registration failed.");
  }
};
