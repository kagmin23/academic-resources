import { apiRequest } from 'services/apiService';

export const createCourse = async (name: string, description: string) => {
  const token = localStorage.getItem('token');

  return apiRequest('/api/course', {
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

export const getCourses = async (keyword: string, pageNum: number, pageSize: number) => {
    const token = localStorage.getItem('token');
  
    return apiRequest('/api/course/search', {
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

  export const updateCourse = async (courseId: string) => {
    const token = localStorage.getItem('token');
  
    return apiRequest(`/api/course/${courseId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  };

  export const deleteCourse = async (courseId: string) => {
    const token = localStorage.getItem('token');
  
    return apiRequest(`/api/course/${courseId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
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
      'Authorization': `Bearer ${token}`,
    },
    data: { course_id, status },
  });
};

  