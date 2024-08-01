import axios from 'axios';
import { HOST_MAIN, apiRequest } from 'services/apiService';

export const createSession = async (sessionData: {
  name: string,
  course_id: string,
  description: string,
  position_order: number,
}) => {
  const token = localStorage.getItem('token');
  if (typeof sessionData.position_order === 'string') {
    sessionData.position_order = parseFloat(sessionData.position_order);
  }
  try {
    const response = await axios.post(`${HOST_MAIN}/api/session`,
      sessionData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
};

export const getSessions = async (keyword: string, course_id: string, pageNum: number, pageSize: number) => {
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
        is_position_order: false,
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
  
  if (typeof sessionData.position_order === 'string') {
    sessionData.position_order = parseFloat(sessionData.position_order);
  }

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
