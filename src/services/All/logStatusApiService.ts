import axios from "axios";
import { HOST_MAIN } from "services/apiService";

export const logStatus = async(course_id: string, keyword: string, pageNum: number, pageSize: number) => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await axios.post(`${HOST_MAIN}/api/course/log/search`, {
                "searchCondition": {
                    "course_id": course_id,
                    "keyword": keyword,
                    "category_id": "",
                    "old_status": "",
                    "new_status": "",
                    "is_deleted": false,
                },
                "pageInfo": {
                    "pageNum": pageNum,
                    "pageSize": pageSize
                }
        }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
    return response.data;

    } catch (error: any){
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
          }
    }
};