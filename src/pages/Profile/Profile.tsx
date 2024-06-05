import React from 'react';
import { Layout, Menu, Card, Avatar, Row, Col, Typography, Tabs, Table, Image } from 'antd';
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

const about = (
  <div style={{ padding: 24 }}>
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Avatar size={100} src="https://accountlp.thimpress.com/wp-content/uploads/learn-press-profile/2/e2bc048fc9256225f644d7ff40cb755f.jpeg" />
        </Col>
        <Col span={16}>
          <Title level={4}>Student Name</Title>
          <Text>Email: student@example.com</Text>
          <br />
          <Text>Date of Birth: January 1, 2000</Text>
          <br />
          <Text>Gender: Male</Text>
          <br />
          <Text>Course Created Date: January 15, 2023</Text>
        </Col>
      </Row>
    </Card>
  </div>
);


const Profile: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Sider width={250} className="site-layout-background" style={{ backgroundColor: 'white' }}>
          <div className="flex items-center justify-center my-6">
            <Avatar size={100} src="https://accountlp.thimpress.com/wp-content/uploads/learn-press-profile/2/e2bc048fc9256225f644d7ff40cb755f.jpeg" icon={<UserOutlined />} />
          </div>
          <Title level={4} className="text-center">Student</Title>
          <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item key="1" icon={<FileTextOutlined />}>
              My Courses
            </Menu.Item>
            <Menu.Item key="about" icon={<FileTextOutlined />}>
             About
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
                    <Text>Enrolled Course</Text>
                    <Title level={5} style={{ color: 'orange' }}>5</Title>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={4}>
                  <Card style={{ height: '100%' }}>
                    <Text>Inprogress Course</Text>
                    <Title level={5} style={{ color: 'orange' }}>1</Title>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={4}>
                  <Card style={{ height: '100%' }}>
                    <Text>Finished Course</Text>
                    <Title level={5} style={{ color: 'orange' }}>4</Title>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={4}>
                  <Card style={{ height: '100%' }}>
                    <Text>Passed Course</Text>
                    <Title level={5} style={{ color: 'orange' }}>4</Title>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={4}>
                  <Card style={{ height: '100%' }}>
                    <Text>Failed Course</Text>
                    <Title level={5} style={{ color: 'orange' }}>0</Title>
                  </Card>
                </Col>
              </Row>
              <Tabs defaultActiveKey="2">
                <TabPane tab="All" key="1">
                  <Table columns={columns} dataSource={coursesData} pagination={false} />
                </TabPane>
                <TabPane tab="In Progress" key="2">
                  <Table columns={columns} dataSource={coursesData.filter(course => course.result == '0%')} pagination={false} />
                </TabPane>
                <TabPane tab="Finished" key="3">
                  <Table columns={columns} dataSource={coursesData.filter(course => course.result !== '0%')} pagination={false} />
                </TabPane>
                <TabPane tab="Passed" key="4">
                  <Table columns={columns} dataSource={coursesData.filter(course => course.result !== '0%')} pagination={false} />
                </TabPane>
                <TabPane tab="Failed" key="5">
                </TabPane>
              </Tabs>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Profile;
