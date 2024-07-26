import { message } from "antd";
import axios from "axios";
import { Payout } from "models/types";
import { HOST_MAIN } from "services/apiService";

export const createPayout = async (instructor_id: string, purchase_id: string): Promise<Payout | void> => {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.post<Payout>(`${HOST_MAIN}/api/payout`, {
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
