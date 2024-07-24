import axios from "axios";
import { HOST_MAIN } from "services/apiService";

export const getItemsbyStudent = async (pageNum: number, pageSize: number) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.post(`${HOST_MAIN}/api/purchase/search-for-student`, {
                "searchCondition": {
                    "purchase_no": "",
                    "cart_no": "",
                    "course_id": "",
                    "status": "",
                    "is_delete": false,
                },
                "pageInfo": {
                    "pageNum": pageNum,
                    "pageSize": pageSize,
                }
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return response.data
    } catch (error){
        console.error("Error to fetch API Get Items by Student!")
        throw error;
    }
}