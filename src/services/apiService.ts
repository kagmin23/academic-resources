// src/services/apiServices.ts
export const HOST_MAIN = "https://api-ojt-hcm24-react06-group04.vercel.app/";

export const apiRequest = async (url: string, options: RequestInit) => {
  try {
    const response = await fetch(`${HOST_MAIN}${url}`, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   , error);
    throw error;
  }
};


// export const addItem = async (item: { name: string; description: string }) => {
//   try {
//     const response = await axios.post(`${API_URL}/items`, item);
//     return response.data;
//   } catch (error) {
//     console.error('Error adding item', error);
//     throw error;
//   }
// };
// export const getUserDetail = async (id: string | number) => {
//   try {
//     const response = await axios.get(`${API_URL}/api/users/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user detail', error);
//     throw error;
//   }
// };



