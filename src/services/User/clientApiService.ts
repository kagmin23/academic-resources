import { apiRequest } from 'services/apiService';

export const getCourses = async (keyword: string, category_id: string, pageNum: number, pageSize: number) => {
  const token = localStorage.getItem('');

  return apiRequest('/api/client/course/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
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
  });
};

export const getCourseDetail = async (courseId: string) => {
  const token = localStorage.getItem(''); 

  return apiRequest(`/api/client/course/${courseId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getCategories = async (keyword: string, pageNum: number, pageSize: number) => {
  const token = localStorage.getItem('');

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
