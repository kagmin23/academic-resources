import axiosInstance from "hook/config";

export const verifyEmailAPI = async (token: string): Promise<boolean> => {
    try {
      const res = await axiosInstance.post('/api/auth/verify-token', { token });
      return res.data.success;
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message);
    }
  };