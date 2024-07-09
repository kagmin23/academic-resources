import { apiRequest } from 'services/apiService';

export const getCategories = async (keyword: string, pageNum: number, pageSize: number) => {
  const token = localStorage.getItem('token');

  return apiRequest('/api/category/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
// export const getCategory = async (categoryId: string) => {
//     const token = localStorage.getItem('token');
  
//     return apiRequest(`/api/category/${categoryId}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//     });
//   };