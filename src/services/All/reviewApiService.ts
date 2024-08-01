import axiosInstance from "hook/config";

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
          console.log("getReviews", response);
    return response.data.data.pageData;

    } catch (error){
        console.error("Error to Log Api getReviews!",error);
        throw error;
    }
};

export const createReview = async (course_id: string, comment: string, rating: number) => {
    try {
        const response = await axiosInstance.post('/api/review', {
            course_id,
            comment,
            rating
        },
    );
        console.log("createReview: ", response);
        return response.data;
    } catch (error) {
        console.error("Error to Log Api createReview!", error);
        throw error;
    }
};

export const updateReview = async (reviewId: string, comment: string, rating: number) => {
    try {
        const response = await axiosInstance.put('/api/review/${reviewId}', {
            comment,
            rating
        },
    );
        console.log("updateReview: ", response);
        return response.data;
    } catch (error) {
        console.error("Error in updateReview API call!", error);
        throw error;
    }
};