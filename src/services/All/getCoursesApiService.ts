import axiosInstance from 'hook/config';

export const getCourses = async (keyword: string, pageNum: number, pageSize: number) => {
  try {
    const response = await axiosInstance.post(
      '/api/course/search',
      {
        searchCondition: {
          keyword,
          is_delete: false,
        },
        pageInfo: {
          pageNum,
          pageSize,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};
