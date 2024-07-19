import { message } from 'antd';
import axios from 'axios';
import { HOST_MAIN } from 'services/apiService';

export const searchPurchase = async (course_id: string, pageNum: number, pageSize: number) => {
  try {
    const token = localStorage.getItem("token");
    console.log("token", token);
    const response = await axios.post(`${HOST_MAIN}/api/purchase/search`, {
      searchCondition: {
        purchase_no: '',
        cart_no: '',
        course_id: '',
        status: '',
        is_deleted: false,
      },
      pageInfo: {
        pageNum,
        pageSize,
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log("Response", response)
    return response.data;
  } catch (error: any) {
    message.error("Error fetching API purchases")
    throw new Error(`Error searching purchases: ${error.message}`);
  }
};
