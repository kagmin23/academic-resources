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
    return response.data;

    } catch (error){
        console.error("Error to Log Api getReviews!",error);
        throw error;
    }
};

export const createReview = async(course_id : string, comment : string, rating : number) => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await axios.post(`${HOST_MAIN}/api/review`, {
                "course_id": course_id,
                "comment": comment,
                "rating": rating
        }, {
            headers: {
              Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            }
          });
    console.log("createReview: ", response)
    return response.data;

    } catch (error){
        console.error("Error to Log Api createReview!",error);
        throw error;
    }
};

