import { message } from "antd";
import axios from "axios";
import { HOST_MAIN } from "services/apiService";

export const createPayout = async (instructor_id: string, transactions: { purchase_id: string }[]) => {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.post(`${HOST_MAIN}/api/payout`, {
            instructor_id,
            transactions
        } , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        message.success("Payout created successfully");
        return response.data;
    }catch(error){
        message.error("Failed to API create payout!");
        console.error('Failed to API create payout:', error);
    }
  };

  export const getPayouts = async (pageNum: number, pageSize: number) => {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.post(`${HOST_MAIN}/api/payout/search`, {
                "searchCondition": {
                    "payout_no": "",
                    "instructor_id": "",
                    "status": "",
                    "is_instructor": false,
                    "is_delete": false
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
        return response.data.data.pageData || [];

    } catch (error) {
        message.error("Get Payout API failed!");
        return [];
    }
}

export const updateStatusPayout = async (payoutId: string, status: string, comment: string) => {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.put(`${HOST_MAIN}/api/payout/update-status/${payoutId}`, {
            "status": status,
            "comment": comment

        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;

    } catch (error) {
        message.error("Update Status Payout failed!");
    }
}