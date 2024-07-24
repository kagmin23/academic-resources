import { message } from 'antd';
import axios from 'axios';
import { HOST_MAIN } from 'services/apiService';

export const reviewProfileInstructor = async (userId: string, status: "approve" | "reject", comment: string = "") => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${HOST_MAIN}/api/users/review-profile-instructor`, 
      {
        user_id: userId,
        status,
        comment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    message.error(`Error ${status === "approve" ? "approving" : "rejecting"} instructor profile`);
    throw new Error(`Error ${status === "approve" ? "approving" : "rejecting"} instructor profile: ${error.message}`);
  }
};
