import axios from "axios";
import axiosInstance from "hook/config";
import { HOST_MAIN } from "services/apiService";

export const getReviews = async(course_id: string, pageNum: number, pageSize: number) => {
    try {
        const response = await axiosInstance.post('/api/review/search', {
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
        },
    );
    return response.data.pageData;

    } catch (error: any){
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
          }
    }
};

export const createReview = async (course_id: string, comment: string, rating: number) => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await axios.post(`${HOST_MAIN}/api/review`, {
            course_id,
            comment,
            rating,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        
        return response.data;

    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
          }
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
        return response.data;

    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
          }
    }
};