import axios from 'axios';
import { ClientCourses } from 'models/types';
import { HOST_MAIN } from './apiService';

interface ApiResponse {
  success: boolean;
  data: ClientCourses[];
  message?: string;
}

const clientCoursesApiService = {
  fetchCourses: async (): Promise<ApiResponse> => {
    try {
      const response = await axios.post(`${HOST_MAIN}/api/client/course/search`);
      return response.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  }
};

export default clientCoursesApiService;
