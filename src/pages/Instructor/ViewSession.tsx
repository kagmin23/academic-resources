import { Layout, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
  // import debounce from 'lodash/debounce';
  import { useParams } from 'react-router-dom';
import { getCourse } from 'services/Instructor/courseApiService';
import { message } from 'antd';
  const { Header, Content, Footer } = Layout;
  const { Title, Text } = Typography;
  

interface DataType {
    key: string;
    image: string;
    title: string;
    status: boolean;
    description: string;
    price: number;
    created_at: string;
    instructor: string;
  }

  interface Course {
    _id: string;
    name: string;
    description: string;
    price: number;
    discount: number;
    // Thêm các thuộc tính khác của Course nếu cần
  }

  const ViewSession: React.FC = () => {
    
    const { courseId } = useParams<{ courseId: string }>();
    const [course, setCourse] = useState<Course | null>(null);
  
    useEffect(() => {
      const fetchCourse = async () => {
        if (!courseId) {
          console.error("courseId is undefined");
          message.error('courseId is undefined');
          return;
        }
  
        try {
          const response = await getCourse(courseId);
          setCourse(response.data);
        } catch (error) {
          console.error("Failed to fetch course", error);
          message.error('Failed to fetch course');
        }
      };
  
      fetchCourse();
    }, [courseId]);
  
    if (!course) {
      return <div>Loading...</div>;
    }

    
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
          },
        {
            title: 'position_order',
            dataIndex: 'position_order',
            key: 'position_order',
          },
          {
            title: 'Create At',
            dataIndex: 'created_at',
            key: 'created_at',
          },
          {
            title: 'Update At',
            dataIndex: 'update_at',
            key: 'update_at',
          },
          {
            title: 'Is deleted',
            dataIndex: 'is_deleted',
            key: 'is_deleted',
          },
      ];
      


  return (
    <div>
      <div className='text-xl font-bold m-4'>
      Name Of Course: {course.name}
      </div>
      <Table columns={columns} />
     
      

    </div>
  )
}

export default ViewSession