import axios from "axios";
import { HOST_MAIN } from "./apiService";

export
    const logoutApiService = async (): Promise<{ success: boolean }> => {
    try {
        const response = await axios.get(`${HOST_MAIN}/api/auth/log-out`);
        return response.data;
    } catch (error) {
        console.error('Logout failed:', error);
        throw error;
    }
    };
