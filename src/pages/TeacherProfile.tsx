import React from 'react';
import { Layout, Menu, Card, Avatar, Row, Col, Typography, Tabs, Image, Button } from 'antd';
import {
  UserOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  FileDoneOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';


const { Content, Sider } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

const coursesData = [
  {
    key: '1',
    image: 'https://accountlp.thimpress.com/wp-content/uploads/2022/11/course-8-400x300.jpg',
    name: 'How To Teach Online COurse Efectively',
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

const TeacherProfile: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Sider width={250} className="site-layout-background" style={{ backgroundColor: 'white' }}>
          <div className="flex items-center justify-center my-6">
            <Avatar size={100} src="https://accountlp.thimpress.com/wp-content/uploads/learn-press-profile/2/e2bc048fc9256225f644d7ff40cb755f.jpeg" icon={<UserOutlined />} />
          </div>
          <Title level={4} className="text-center">Instructor</Title>
          <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item key="1" icon={<FileTextOutlined />}>
              My Courses
            </Menu.Item>
            <Menu.Item key="2" icon={<FileDoneOutlined />}>
              Certificates
            </Menu.Item>
            <Menu.Item key="3" icon={<QuestionCircleOutlined />}>
              Quizzes
            </Menu.Item>
            <Menu.Item key="4" icon={<HeartOutlined />}>
              Wishlist
            </Menu.Item>
            <Menu.Item key="5" icon={<ShoppingCartOutlined />}>
              Orders
            </Menu.Item>
            <Menu.Item key="6" icon={<FileDoneOutlined />}>
              Assignments
            </Menu.Item>
            <Menu.Item key="7" icon={<SettingOutlined />}>
              Settings
            </Menu.Item>
            <Menu.Item key="8" icon={<LogoutOutlined />}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content>
            <div style={{ padding: 24, minHeight: 140 }}>
              <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} sm={12} md={8} lg={4}>
                  <Card style={{ height: '100%' }}>
                    <Text>Total Course</Text>
                    <Title level={5} style={{ color: 'orange' }}>80</Title>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={4}>
                  <Card style={{ height: '100%' }}>
                    <Text>Published Course</Text>
                    <Title level={5} style={{ color: 'orange' }}>1</Title>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={4}>
                  <Card style={{ height: '100%' }}>
                    <Text>Pending Course</Text>
                    <Title level={5} style={{ color: 'orange' }}>60</Title>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={4}>
                  <Card style={{ height: '100%' }}>
                    <Text>Total Students</Text>
                    <Title level={5} style={{ color: 'orange' }}>3</Title>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={4}>
                  <Card style={{ height: '100%' }}>
                    <Text>Students Completed</Text>
                    <Title level={5} style={{ color: 'orange' }}>3</Title>
                  </Card>
                </Col>
              </Row>
              <Tabs defaultActiveKey="2">
                <TabPane tab="All" key="1">
                  <Row gutter={[16, 16]}>
                    {coursesData.map(course => (
                      <Col span={8} key={course.key}>
                        <Card
                          cover={<Image src={course.image} />}
                          actions={[
                            <Button type="primary" key="start-learning">Start Learning</Button>
                          ]}
                        >
                          <Card.Meta
                            title={course.name}
                            description={`Result: ${course.result}`}
                          />
                          <Text>Expiration time: {course.expiration}</Text>
                          <Text>End time: {course.endTime}</Text>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </TabPane>
                <TabPane tab="In Progress" key="2">
                  {/* Content for in progress courses */}
                </TabPane>
                <TabPane tab="Finished" key="3">
{/* Content for finished courses /}
</TabPane>
<TabPane tab="Passed" key="4">
{/ Content for passed courses /}
</TabPane>
<TabPane tab="Failed" key="5">
{/ Content for failed courses */}
</TabPane>
</Tabs>

</div>
</Content>
</Layout>
</Layout>
</Layout>
);
};
export default TeacherProfile;
