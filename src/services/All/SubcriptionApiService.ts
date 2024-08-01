import axiosInstance from 'hook/config';

export const createOrUpdate = async (instructor_id: string) => {
  try {
    const response = await axiosInstance.post('/api/subscription',
      { instructor_id },
    );
    return response;
  } catch (error) {
    console.error('Error in Subcriber!', error);
    throw error;
  }
};

export const getItemBySubscriber = async (keyword: string, pageNum: number, pageSize: number) => {
  try {
    const response = await axiosInstance.post(
      '/api/subscription/search-for-subscriber',
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
    );
    if (response) {
      return response.data.data.pageData;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getItemByInstructorSubcription = async (keyword: string, pageNum: number, pageSize: number) => {
  try {
    const response = await axiosInstance.post(
      '/api/subscription/search-for-instructor',
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
    );
    
    return response.data;
  } catch (error) {
    console.error('Error fetching items by instructor:', error);
    throw error;
  }
};
