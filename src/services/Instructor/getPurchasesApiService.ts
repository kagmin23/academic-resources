import { message } from 'antd';
import axios from 'axios';
import { HOST_MAIN } from 'services/apiService';

export const getItemsbyInstructor = async (
    pageNum: number,
    pageSize: number
  ) => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await axios.post(
      `${HOST_MAIN}/api/purchase/search-for-instructor`,
      {
        searchCondition: {
          purchase_no: "",
          cart_no: "",
          course_id: "",
          status: "",
          is_delete: false
        },
        pageInfo: {
          pageNum,
          pageSize
        }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    
    return response.data.data.pageData;
  } catch (error: any) {
    message.error("Error fetching API purchases");
    throw new Error(`Error searching purchases: ${error.message}`);
  }
};
