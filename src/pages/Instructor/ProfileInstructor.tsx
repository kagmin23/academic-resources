import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Image, Layout, Menu, Row, Typography } from 'antd';
import React, { useState } from 'react';

const { Content, Sider } = Layout;
const { Text } = Typography;

const coursesData = [
  {
    key: '1',
    image: 'https://accountlp.thimpress.com/wp-content/uploads/2022/11/course-8-400x300.jpg',
    name: 'How To Teach Online Course Effectively',
    instructor: 'F8',
    lessons: '9 Lessons',
    price: 'Free',
    status: '1',
  },
  {
    key: '2',
    image: 'https://accountlp.thimpress.com/wp-content/uploads/2023/08/new-hEADWAY.png',
    name: 'New Headway',
    instructor: 'DTD',
    lessons: '3 Lessons',
    price: 'Free',
    status: '1',
  },
  {
    key: '3',
    image: 'https://accountlp.thimpress.com/wp-content/uploads/2024/03/f7aad5d3f7e5c9cf37b0c24a9d075887-800x600.png',
    name: 'Database',
    instructor: 'VanTTN',
    lessons: '19 Lessons',
    price: 'Free',
    status: '0',
  },
  {
    key: '4',
    image: 'https://accountlp.thimpress.com/wp-content/uploads/2023/08/home-banner-top-800x600.jpg',
    name: 'Testing',
    instructor: 'ChiLTQ',
    lessons: '20 Lessons',
    price: 'Free',
    status: '1',
  },
];

const ProfileInstructor = () => {
  const [selectedMenu, setSelectedMenu] = useState('1');

  const handleMenuClick = (e: { key: string }) => {
    setSelectedMenu(e.key);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case '1':
        return (
          <div>
            <Row gutter={[16, 16]}>
              {coursesData.map(course => (
                <Col key={course.key} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    cover={<Image alt="example" src={course.image} />}
                  >
                    <Card.Meta title={course.name} description={`Instructor: ${course.instructor}`} />
                    <Text>{course.lessons}</Text>
                    <br />
                    <Text>{course.price}</Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout className="min-h-screen">
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            selectedKeys={[selectedMenu]}
            onClick={handleMenuClick}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="1" icon={<UserOutlined />}>
              Profile
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ProfileInstructor;
