import { apiRequest } from 'services/apiService';

interface SearchCondition {
  keyword: string;
  role: string;
  status: boolean;
  is_verified: boolean;
  is_delete: boolean;
}

interface PageInfo {
  pageNum: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

interface GetUsersParams {
  searchCondition: SearchCondition;
  pageInfo: PageInfo;
}

export const getUsers = async (params: GetUsersParams) => {
  const token = localStorage.getItem('token');
  
  return apiRequest('/api/users/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    data: params,
  });
};
