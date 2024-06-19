import React, { useState } from 'react';
import {  Card, Layout, Table, Typography, Image } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Content, Sider } = Layout;
const { Title } = Typography;

const coursesData = [
  {
    key: '1',
    image: 'https://accountlp.thimpress.com/wp-content/uploads/2022/11/course-8-400x300.jpg',
    name: 'How To Teach Online Course Effectively',
    result: '100%',
    expiration: 'April 20, 2023 10:04 pm',
    endTime: 'February 9, 2023 10:04 pm',
  },
  {
    key: '2',
    image: 'https://accountlp.thimpress.com/wp-content/uploads/2022/12/create-an-lms-website-with-learnpress-3-400x300.jpg',
    name: 'Create an LMS Website with LeanPress',
    result: '85.71%',
    expiration: 'March 3, 2023 7:15 am',
    endTime: 'January 3, 2023 3:15 pm',
  },
  {
    key: '3',
    image: 'https://accountlp.thimpress.com/wp-content/uploads/2022/12/create-an-lms-website-with-learnpress-3-400x300.jpg',
    name: 'Introduction LearnPress - LMS plugin',
    result: '80%',
    expiration: 'June 24, 2023 11:12 am',
    endTime: 'April 21, 2023 9:16 am',
  },
  {
    key: '4',
    image: 'https://accountlp.thimpress.com/wp-content/uploads/2022/12/create-an-lms-website-with-learnpress-3-400x300.jpg',
    name: 'Introduction LearnPress - LMS plugin',
    result: '0%',
    expiration: 'November 27, 2023 5:46 am',
    endTime: '-',
  },
  {
    key: '5',
    image: 'https://accountlp.thimpress.com/wp-content/uploads/2023/08/new-hEADWAY.png',
    name: 'New Headway',
    result: '100%',
    expiration: 'July 3, 2024 1:43 pm',
    endTime: 'April 11, 2024 8:22 am',
  },
];

const columns = [
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    render: (text: string) => <Image src={text} width={100} />,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Result',
    dataIndex: 'result',
    key: 'result',
  },
  {
    title: 'Expiration time',
    dataIndex: 'expiration',
    key: 'expiration',
  },
  {
    title: 'End time',
    dataIndex: 'endTime',
    key: 'endTime',
  },
];

const ProfileStudent = () => {
  const [showMyCourses, setShowMyCourses] = useState(true); // Show My Courses section initially

  const navigate = useNavigate();

  const navigateToAssignments = () => {
    navigate('/lesson-student');
  };

  const navigateToOrders = () => {
    navigate('/save');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {showMyCourses && (
              <Card style={{ margin: 20 }}>
                <Title level={4}>My Courses</Title>
                <Table dataSource={coursesData} columns={columns} />
              </Card>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProfileStudent;
