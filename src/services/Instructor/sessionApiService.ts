import { apiRequest } from 'services/apiService';

export const createSession = async (SessionData: {
 name: string,
 position_order:number,
 description:string,
 course_id:string,
}) => {
  const token = localStorage.getItem('token');

  return apiRequest('/api/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: SessionData,
  });
};


