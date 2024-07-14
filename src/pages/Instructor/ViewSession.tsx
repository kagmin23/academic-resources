
import React, { useEffect, useState } from 'react';
import {
  DeleteOutlined,
  DownCircleOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  ReadOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Button, Divider, Form, Input, Layout, List, Modal, Table, Tabs, Typography, message } from "antd";
  // import debounce from 'lodash/debounce';
  import { useParams } from 'react-router-dom';
import { getCourse } from 'services/Instructor/courseApiService';

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
    <Layout style={{ height: '100vh' }}>
       <Layout className="site-layout">
         <Header className="p-0 bg-white">
           <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#939fb1]">
           <div className='text-lg font-bold my-auto text-white'>
             Name Course: {course.name}
           </div>
             <Input
               placeholder="Search..."
               prefix={<SearchOutlined />}
              //  onChange={e => handleSearch(e.target.value)}
               style={{ width: 300 }}
             />
           </div>
         </Header>
         <Content>
      
      <Table columns={columns} />
      </Content>
     </Layout>
      </Layout>

    
  );
};

export default ViewSession



