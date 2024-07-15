import { Course } from 'models/types';
import { apiRequest } from 'services/apiService';

interface AddSession {
_id:string,
name:string,
user_id:string,
course_id:string,
description:string,
position_order:number,
created_at:Date,
updated_at:Date,
is_deleted:boolean,
}
export const createSession = async (sessionData: {

  name: string,
  course_id: string,
  description: string,
  position_order: number,
}) => {
  const token = localStorage.getItem('token');

  return apiRequest('/api/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: sessionData,
  });
};

export const getSessions = async (keyword: string, pageNum: number, pageSize: number,course_id:string) => {
  const token = localStorage.getItem('token');

  return apiRequest('/api/session/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: {
      searchCondition: {
        keyword,
        course_id,
        is_delete: false,
      },
      pageInfo: {
        pageNum,
        pageSize,
      },
    },
  });
};

export const getSession = async (sessionId: string) => {
  const token = localStorage.getItem('token');

  return apiRequest(`/api/session/${sessionId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateSession = async (sessionId: string, sessionData: {
  name: string,
  course_id: string,
  description: string,
  position_order: number,
}) => {
  const token = localStorage.getItem('token');

  return apiRequest(`/api/session/${sessionId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: sessionData,
  });
};

export const deleteSession = async (sessionId: string) => {
  const token = localStorage.getItem('token');

  return apiRequest(`/api/session/${sessionId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
