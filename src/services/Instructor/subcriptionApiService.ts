import axiosInstance from 'hook/config';

export const getItemsByInstructor = async (pageNum: number, pageSize: number, keyword: string) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axiosInstance.post(
      '/api/subscription/search-for-instructor',
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
    console.error('Error fetching items by instructor:', error);
    throw error;
  }
};
