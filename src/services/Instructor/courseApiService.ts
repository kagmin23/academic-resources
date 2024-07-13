import { apiRequest } from 'services/apiService';

export const createCourse = async (courseData: {
  name: string,
  category_id: string,
  description: string,
  content: string,
  video_url: string,
  image_url: string,
  price: number,
  discount: number
}) => {
  const token = localStorage.getItem('token');

  return apiRequest('/api/course', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: courseData,
  });
};

export const getCourse = async (courseId: string) => {
  const token = localStorage.getItem('token');

  return apiRequest(`/api/course/${courseId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const updateCourse = async (courseId: string, courseData: {
  name: string,
  category_id: string,
  description: string,
  content: string,
  video_url: string,
  image_url: string,
  price: number,
  discount: number
}) => {
  const token = localStorage.getItem('token');

  return apiRequest(`/api/course/${courseId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: courseData,
  });
};


  export const deleteCourse = async (courseId: string) => {
    const token = localStorage.getItem('token');
  
    return apiRequest(`/api/course/${courseId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };


export const changeStatus = async (course_id: string, status: boolean) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No token found');
  }

  return apiRequest('/api/course/change-status', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: { course_id, status },
  });
};

  