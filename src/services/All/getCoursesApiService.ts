import { apiRequest } from 'services/apiService';

  export const getCourses = async (keyword: string, pageNum: number, pageSize: number) => {
    const token = localStorage.getItem('token');
  
    return apiRequest('/api/course/search', {
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