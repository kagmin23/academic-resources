import axios from "axios";
import { HOST_MAIN } from "services/apiService";

export const getReview = async (reviewId: string) => {

  try {
    const token = localStorage.getItem('token');
    
    const response = await axios.get(`${HOST_MAIN}/api/review/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  console.log("getReview API", response)
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  }
};
