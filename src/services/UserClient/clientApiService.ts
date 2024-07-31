import axios from 'axios';
import { HOST_MAIN, apiRequest } from 'services/apiService';

export const getCourses = async ( keyword: string, category_id: string, pageNum: number, pageSize: number) => {

  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post(
      `${HOST_MAIN}/api/client/course/search`,
      {
        searchCondition: {
          keyword,
          category_id,
          is_delete: false,
        },
        pageInfo: {
          pageNum,
          pageSize,
        },
      },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const getCourseDetail = async (courseId: string, role: string) => {
  try {
    let headers = {};
    if (role === 'student' || 'instructor') {
      const token = localStorage.getItem('token');
      if (token) {
        headers = { Authorization: `Bearer ${token}` };
      } else {
        throw new Error('Unauthorized: Token not found');
      }
    }

    const response = await axios.get(`${HOST_MAIN}/api/client/course/${courseId}`, { headers });
    console.log("getCourseDetail", response);
    return response.data;
  } catch (error) {
    console.error('Error fetching course detail:', error);
    throw error;
  }
};

export const getCategories = async (keyword: string, pageNum: number, pageSize: number) => {

  return apiRequest('/api/client/category/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      searchCondition: {
        keyword,
        is_parent: false,
        is_delete: false,
      },
      pageInfo: {
        pageNum,
        pageSize,
      },
    },
  });
};

export const getUserDetail = async (userId: string) => {
  const token = localStorage.getItem('');

  return apiRequest(`/api/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
