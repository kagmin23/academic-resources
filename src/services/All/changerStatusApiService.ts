import axios from 'axios';
import { HOST_MAIN } from 'services/apiService';

export const changeCourseStatus = async (courseId: string, newStatus: string, comment: string) => {
  try {
    const token = localStorage.getItem('token');
    console.log("Token", token);

    const response = await axios.put(`${HOST_MAIN}/api/course/change-status`, {
        "course_id": courseId,
        "new_status": newStatus,
        "comment": comment
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("Response api change status", response);

    return response.data;
  } catch (error) {
    console.error('Error Changing Course Status:', error);
    throw error;
  }
};
