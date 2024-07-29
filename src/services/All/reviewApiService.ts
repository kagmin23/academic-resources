import axios from "axios";
import { HOST_MAIN } from "services/apiService";

export const getReviews = async(course_id: string, pageNum: number, pageSize: number) => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await axios.post(`${HOST_MAIN}/api/review/search`, {
              "searchCondition": {
                  "course_id": course_id,
                  "rating": 0,
                  "is_instructor": false,
                  "is_rating_order": false,
                  "is_deleted": false
              },
              "pageInfo": {
                  "pageNum": pageNum,
                  "pageSize": pageSize
                }
        }, {
            headers: {
            //   Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            }
          });
          console.log("getReviews", response);
    return response.data.data.pageData;

    } catch (error){
        console.error("Error to Log Api getReviews!",error);
        throw error;
    }
};

export const createReview = async (course_id: string, comment: string, rating: number) => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await axios.post(`${HOST_MAIN}/api/review`, {
            course_id,
            comment,
            rating
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        
        console.log("createReview: ", response);
        return response.data;

    } catch (error) {
        console.error("Error to Log Api createReview!", error);
        throw error;
    }
};

export const updateReview = async (reviewId: string, comment: string, rating: number) => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await axios.put(`${HOST_MAIN}/api/review/${reviewId}`, {
            comment,
            rating
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        console.log("updateReview: ", response);
        return response.data; // Ensure this matches the output data structure

    } catch (error) {
        console.error("Error in updateReview API call!", error);
        throw error;
    }
};