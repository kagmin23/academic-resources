import { apiRequest } from 'services/apiService';

export const createOrUpdate = async (instructor_id: string) => {
  const token = localStorage.getItem('token');

  return apiRequest('/api/subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: {
        instructor_id,
      },
  });
};

export const getItemBySubcriber = async ( keyword: string, pageNum: number, pageSize: number ) => {
  const token = localStorage.getItem('token');

  return apiRequest('/api/subscription/search-for-subscriber', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
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

export const getItemByInstructor = async ( keyword: string, pageNum: number, pageSize: number ) => {
    const token = localStorage.getItem('token');
  
    return apiRequest('/api/subscription/search-for-instructor', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
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