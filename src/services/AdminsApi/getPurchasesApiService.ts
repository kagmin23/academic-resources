import axios from 'axios';
import { HOST_MAIN } from 'services/apiService';

export const getPurchasesAll = async (
    pageNum: number,
    pageSize: number
  ) => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await axios.post(
      `${HOST_MAIN}/api/purchase/search`,
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
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  }
};
