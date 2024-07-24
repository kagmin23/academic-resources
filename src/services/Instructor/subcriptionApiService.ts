import { apiRequest } from 'services/apiService';

export const getItemsByInstructor = async (pageNum: number, pageSize: number,keyword:string) => {
  const token = localStorage.getItem('token');

  return apiRequest('/api/subscription/search-for-instructor', {
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
