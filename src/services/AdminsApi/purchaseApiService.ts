import { message } from 'antd';
import axios from 'axios';
import { HOST_MAIN } from 'services/apiService';

export const searchPurchase = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("token", token);
    const response = await axios.post(`${HOST_MAIN}/api/purchase/search`, {
        "searchCondition": {
            "purchase_no": "",
            "cart_no": "",
            "course_id": "",
            "status": "",
            "is_delete": false
        },
        "pageInfo": {
            "pageNum": 1,
            "pageSize": 100
        },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response", response)
    return response.data;
  } catch (error: any) {
    message.error("Error fetching API purchases")
    throw new Error(`Error searching purchases: ${error.message}`);
  }
};
