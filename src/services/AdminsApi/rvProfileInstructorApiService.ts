import { message } from 'antd';
import axios from 'axios';
import { HOST_MAIN } from 'services/apiService';

export const reviewProfileInstructor = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("token", token);
    const response = await axios.put(`${HOST_MAIN}/api/users/review-profile-instructor`, {
        "user_id": "",
        "status": "approve",
        "comment": "",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response", response)
    return response.data;
  } catch (error: any) {
    message.error("Error fetching API purchases")
    throw new Error(`Error searching purchases: ${error.message}`);
  }
};
