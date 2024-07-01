import axios from 'axios';

const API_URL = 'https://api-ojt-hcm24-react06-group04.vercel.app/';

export const getItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/items`);
    return response.data;
  } catch (error) {
    console.error('Error fetching items', error);
    throw error;
  }
};

export const addItem = async (item: { name: string; description: string }) => {
  try {
    const response = await axios.post(`${API_URL}/items`, item);
    return response.data;
  } catch (error) {
    console.error('Error adding item', error);
    throw error;
  }
};