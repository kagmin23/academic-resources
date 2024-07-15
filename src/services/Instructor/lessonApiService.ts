import { apiRequest } from 'services/apiService';

export const createLesson = async (lessonData: {
  name: string,
  course_id: string,
  session_id: string,
  lesson_type: string,
  video_url: string,
  image_url: string,
  description: string,
  full_time: number,
  position_order: number,
}) => {
  const token = localStorage.getItem('token');

  return apiRequest('/api/lesson', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: lessonData,
  });
};

export const getLessons = async (session_id: string, pageNum: number, pageSize: number) => {
  const token = localStorage.getItem('token');

  return apiRequest('/api/lesson/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: {
      searchCondition: {
        session_id,
        is_delete: false,
      },
      pageInfo: {
        pageNum,
        pageSize,
      },
    },
  });
};

export const getLesson = async (lessonId: string) => {
  const token = localStorage.getItem('token');

  return apiRequest(`/api/lesson/${lessonId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateLesson = async (lessonId: string, lessonData: {
    name: string,
    course_id: string,
    session_id: string,
    lesson_type: string,
    video_url: string,
    image_url: string,
    description: string,
    full_time: number,
    position_order: number,
}) => {
  const token = localStorage.getItem('token');

  return apiRequest(`/api/lesson/${lessonId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: lessonData,
  });
};

export const deleteLesson = async (lessonId: string) => {
  const token = localStorage.getItem('token');

  return apiRequest(`/api/lesson/${lessonId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
