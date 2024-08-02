import axiosInstance from "hook/config";

export const getReview = async (reviewId: string) => {
  try {
    const response = await axiosInstance.get(`/api/review/${reviewId}`, {
    });
    
    console.log("getReview: ", response);
    return response.data;
  } catch (error) {
    console.error("Error in getReview API call!", error);
    throw error;
  }
};
