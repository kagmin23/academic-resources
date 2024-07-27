import { message } from "antd";
import axios from "axios";
import { Payout } from "models/types";
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

export const getPayouts = async (instructor_id: string, purchase_id: string): Promise<Payout | void> => {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.post<Payout>(`${HOST_MAIN}/api/payout/search`, {
            instructor_id,
            transactions: [
                {
                    purchase_id,
                }
            ]
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("createPayout", response)
        return response.data;

    } catch (error) {
        message.error("Create Payout failed!");
    }
}


export const updateStatusPayout = async (status: string): Promise<Payout | void> => {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.put<Payout>(`${HOST_MAIN}/api/payout/update-status/:id`, {
            "status": status,
            "comment": ""

        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("updateStatusPayout", response)
        return response.data;

    } catch (error) {
        message.error("Update Status Payout failed!");
    }
}

