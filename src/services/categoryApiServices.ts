

import { apiRequest } from "services/apiService";


export const createCategory = async (categoryData: any) => {
  return apiRequest('api/category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryData),
  });
};
