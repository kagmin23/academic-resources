
import React, { useState } from 'react';
import {
  FileDoneOutlined,
  FileTextOutlined,
  HeartOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Col, Image, Layout, Menu, Row, Table, Tabs, Typography } from 'antd';

import Setting from 'pages/Setting';

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
const aboutData = {
  avatarSrc: 'https://scontent.fsgn2-11.fna.fbcdn.net/v/t1.6435-9/104658671_897847847393418_5352404516257749893_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGUgtsdH1x6vQbbqnErk1SxR7lr7k5dPtpHuWvuTl0-2r6Xr_X6XfF0uExI1CK6UE3BDbeLgnLryq8J5oHoBPMg&_nc_ohc=iEvrApXw3JAQ7kNvgFGQPeU&_nc_ht=scontent.fsgn2-11.fna&oh=00_AYCFbiTtCWBz3IK8e1vQqJ3a3clnb0JU3pcmJjTFAqt3Yw&oe=6688AB83',
  name: 'Tuyet TAT',
  email: 'anhtuyettat@gmail.com',
  dob: 'January 1, 2003',
  gender: 'Female',
  courseCreatedDate: 'January 15, 2023',
  facebook: 'https://www.facebook.com/vu.hanthien.545',
  linkedin: 'https://linkedin.com/in/tuyet',
};

const about = (
  <div style={{ padding: 24 }}>
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Avatar size={100} src="https://scontent.fsgn2-10.fna.fbcdn.net/v/t39.30808-6/294936500_1442942606217270_8077083163445073553_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFeYEgptEmQ6A6exliBZRUpaWKlbIJiyh1pYqVsgmLKHai-pSGOpMvw5g2CUaGj3ngdVOnrfGX2YneIAYZHuXtv&_nc_ohc=DSVGGwKu1KkQ7kNvgEMYq8R&_nc_ht=scontent.fsgn2-10.fna&oh=00_AYCC587Q6FZcUHP0gDN7l4X0cgFiOYTXCiRFHtqKVniwNw&oe=66671327" />
        </Col>
        <Col span={16}>
          <Title level={4}>Tuyet cao thu</Title>
          <Text>Email: tat10@gmail.com</Text>
          <br />
          <Text>Date of Birth: January 1, 2003</Text>
          <br />
          <Text>Gender: Female</Text>
          <br />
          <Text>Course Created Date: January 15, 2023</Text>
        </Col>
      </Row>
    </Card>
  </div>
);

const ProfileStudent: React.FC = () => {
 
  const [showAbout, setShowAbout] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const displayAboutInfo = () => {
    setShowAbout(true);
    setShowSettings(false);
  };

  const displaySettings = () => {
    setShowAbout(false);
    setShowSettings(true);
  };

  // Function to display My Courses information
  const displayMyCourses = () => {
    setShowAbout(false); // Hide the About section
    setShowSettings(false); // Hide the Settings section (if it's visible)
    // Add any additional logic here if needed
  };
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} className="site-layout-background" style={{ backgroundColor: 'white' }}>
        <div className="flex items-center justify-center my-6">
          <Avatar size={100} src="https://scontent.fsgn2-10.fna.fbcdn.net/v/t39.30808-6/294936500_1442942606217270_8077083163445073553_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFeYEgptEmQ6A6exliBZRUpaWKlbIJiyh1pYqVsgmLKHai-pSGOpMvw5g2CUaGj3ngdVOnrfGX2YneIAYZHuXtv&_nc_ohc=DSVGGwKu1KkQ7kNvgEMYq8R&_nc_ht=scontent.fsgn2-10.fna&oh=00_AYCC587Q6FZcUHP0gDN7l4X0cgFiOYTXCiRFHtqKVniwNw&oe=66671327" icon={<UserOutlined />} />
        </div>
        <Title level={4} className="text-center">TAT</Title>
        <Menu mode="inline" defaultSelectedKeys={['1']} style={{borderRight: 0 }}>
          <Menu.Item key="1" icon={<FileTextOutlined />} onClick={displayAboutInfo}>
            About
          </Menu.Item>
          <Menu.Item key="2" icon={<FileTextOutlined />} onClick={displayMyCourses}>
            My Courses
          </Menu.Item>
          <Menu.Item key="3" icon={<FileDoneOutlined />}>
            Students
          </Menu.Item>
          <Menu.Item key="4" icon={<FileDoneOutlined />}>
            Certificates
          </Menu.Item>
          <Menu.Item key="5" icon={<HeartOutlined />}>
            Wishlist
          </Menu.Item>
          <Menu.Item key="6" icon={<ShoppingCartOutlined />}>
            Orders
          </Menu.Item>
          <Menu.Item key="7" icon={<FileDoneOutlined />}>
            Assignments
          </Menu.Item>
          <Menu.Item key="8" icon={<SettingOutlined />} onClick={displaySettings}>
            Settings
          </Menu.Item>
          <Menu.Item key="9" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ padding: '20px' }}>
          {showAbout ? (
            <div style={{ padding: 10 }}>
              <Avatar size={100} src={aboutData.avatarSrc} />
              <Title level={4}>{aboutData.name}</Title>
              <Text>Email: {aboutData.email}</Text>
              <br />
              <Text>Date Of Birth: {aboutData.dob}</Text>
              <br />
              <Text>Gender: {aboutData.gender}</Text>
              <br />
              <Text>Course Created Date: {aboutData.courseCreatedDate}</Text>
              <br />
              <Text>Facebook: <a href={aboutData.facebook} target="_blank" rel="noopener noreferrer">{aboutData.facebook}</a></Text>
              <br />
              <Text>LinkedIn: <a href={aboutData.linkedin} target="_blank" rel="noopener noreferrer">{aboutData.linkedin}</a></Text>
            </div>
          ) : showSettings ? (
            <Setting /> // Render Settings component
          ) : (
            <div style={{ padding: 10 }}>
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
          )}
        </Content>
      </Layout>
    </Layout>
  );
};
export default ProfileStudent;