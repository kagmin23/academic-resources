import axios, { AxiosRequestConfig } from 'axios';

export const HOST_MAIN = "https://api-ojt-hcm24-react06-group04.vercel.app";

export const apiRequest = async (url: string, options: AxiosRequestConfig) => {
  try {
    const response = await axios({
      url: `${HOST_MAIN}${url}`,
      ...options,
    });
    return response.data;
  } catch (error) {
    console.error('There was a problem with the axios operation:', error);
    throw error;
  }
};
