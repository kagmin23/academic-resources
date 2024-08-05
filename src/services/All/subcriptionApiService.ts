import axios from 'axios';
import axiosInstance from 'hook/config';
import { HOST_MAIN } from 'services/apiService';

export const createOrUpdate = async (instructor_id: string) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.post(`${HOST_MAIN}/api/subscription`,
      { instructor_id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error('Error in Subcriber!', error);
    throw error;
  }
};

export const getItemBySubscriberStudent = async (pageNum: number, pageSize: number) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.post(
      `${HOST_MAIN}/api/subscription/search-for-subscriber`,
      {
        "searchCondition": {
            "keyword": "",
            "is_delete": false,
        },
        "pageInfo": {
            "pageNum": pageNum,
            "pageSize": pageSize,
        }
    },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (response) {
      return response.data.data.pageData;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getItemBySubscriber = async (pageNum: number, pageSize: number) => {

  try {
    const response = await axiosInstance.post(
      '/api/subscription/search-for-subscriber',
      {
        "searchCondition": {
            "keyword": "",
            "is_delete": false,
        },
        "pageInfo": {
            "pageNum": pageNum,
            "pageSize": pageSize,
        }
      },
    );
    if (response) {
      return response.data.data.pageData;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getItemBySubscriberInstructor = async (pageNum: number, pageSize: number) => {

  try {
    const response = await axiosInstance.post(
      '/api/subscription/search-for-subscriber',
      {
        "searchCondition": {
            "keyword": "",
            "is_delete": false,
        },
        "pageInfo": {
            "pageNum": pageNum,
            "pageSize": pageSize,
        }
      },
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getItemByInstructorSubcription = async (keyword: string, pageNum: number, pageSize: number) => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await axios.post(
      `${HOST_MAIN}/api/subscription/search-for-instructor`,
      {
        "searchCondition": {
            "keyword": keyword,
            "is_delete": false,
        },
        "pageInfo": {
            "pageNum": pageNum,
            "pageSize": pageSize,
        }
    },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error fetching items by instructor:', error);
    throw error;
  }
};