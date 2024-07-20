import { apiRequest } from 'services/apiService';

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

  export const getCarts = async (keyword: string, pageNum: number, pageSize: number) => {
    const token = localStorage.getItem('token');
  
    return apiRequest('/api/cart/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        searchCondition: {
          keyword,
          is_delete: false,
        },
        pageInfo: {
          pageNum,
          pageSize,
        },
      },
    });
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

  