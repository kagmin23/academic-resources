import axios from 'axios';
import { HOST_MAIN, apiRequest } from 'services/apiService';

export const createCart = async (courseData: {
  course_id: string,
}) => {
  const token = localStorage.getItem('token');

  return apiRequest('/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: courseData,
  });
};

  export const getCarts = async (status: string, pageNum: number, pageSize: number) => {
    const token = localStorage.getItem('token');
    
    try {
    return apiRequest('/api/cart/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        searchCondition: {
          status,
          is_delete: false,
        },
        pageInfo: {
          pageNum,
          pageSize,
        },
      },
    })} catch (error){
      console.error("Error!")
    }
  };

  export const deleteCart = async (courseId: string) => {
    const token = localStorage.getItem('token');
  
    return apiRequest(`/api/cart/${courseId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };


  export const updateCartStatus = async (status: string, items: { _id: string, cart_no: string }[]) => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(`${HOST_MAIN}/api/cart/update-status`,
        {
          status,
          items,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("ERROR: ", error);
      throw error;
    }
  };
  