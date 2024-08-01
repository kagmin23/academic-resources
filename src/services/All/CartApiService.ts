import axiosInstance from 'hook/config';
import { HOST_MAIN } from 'services/apiService';

export const createCart = async (courseData: { course_id: string }) => {
  try {
    const response = await axiosInstance.post(
      '/api/cart', {
      courseData,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error creating cart:', error);
    throw error;
  }
};

export const getCarts = async (status: string, pageNum: number, pageSize: number) => {
  try {
    const response = await axiosInstance.post(
      '/api/cart/search',
      {
        searchCondition: {
          status,
          is_delete: false,
        },
        pageInfo: {
          pageNum,
          pageSize,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching carts:', error);
    throw error;
  }
};

export const deleteCart = async (courseId: string) => {

  try {
    const response = await axiosInstance.delete(
      `/api/cart/${courseId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting cart:', error);
    throw error;
  }
};

export const updateCartStatus = async (status: string, items: { _id: string, cart_no: string }[]) => {
    try {
    const response = await axiosInstance.put(
      `${HOST_MAIN}/api/cart/update-status`,
      {
        status,
        items,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error update cart:', error);
  }
};