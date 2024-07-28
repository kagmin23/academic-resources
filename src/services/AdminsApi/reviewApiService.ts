import axios from "axios";
import { HOST_MAIN } from "services/apiService";

export const deleteReview = async(reviewId: string) => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await axios.delete(`${HOST_MAIN}/api/review/${reviewId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log("deleteReivew: ", response)
    return response.data;

    } catch (error){
        console.error("Error to Log Api deleteReivew!",error);
        throw error;
    }
};