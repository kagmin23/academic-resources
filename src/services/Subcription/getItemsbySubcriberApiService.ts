import axios from "axios";
import { Subcription } from "models/types";
import { HOST_MAIN } from "services/apiService";

export const getItemsbySubcriber = async (pageNum: number, pageSize: number): Promise<{ data: Subcription[] }> => {
    const token = localStorage.getItem("token");
    
    try {
        const response = await axios.post(
            `${HOST_MAIN}/api/subscription/search-for-subscriber`,
            {
                searchCondition: {
                    keyword: "",
                    is_deleted: false
                },
                pageInfo: {
                    pageNum,
                    pageSize,
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data.pageData;

    } catch (error) {
        console.error('Error fetching subscribers:', error);
        throw error;
    }
};
