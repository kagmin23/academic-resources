import { apiRequest } from 'services/apiService';

export const createCategory = async (name: string, description: string) => {
  const token = localStorage.getItem('token');

  return apiRequest('/api/category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    data: {
      name,
      description,
    },
  });
};

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

  export const getCategoryDetail = async (categoryId: string) => {
    const token = localStorage.getItem('token');
  
    return apiRequest(`/api/category/${categoryId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  };

  export const deleteCategory = async (categoryId: string) => {
    const token = localStorage.getItem('token');
  
    return apiRequest(`/api/category/${categoryId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  };
  