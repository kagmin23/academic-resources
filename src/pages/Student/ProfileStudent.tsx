import React, { useState } from 'react';
import {
  FileDoneOutlined,
  FileTextOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Image, Layout, Menu, Table, Tabs, Typography, Button, Card } from 'antd';
import Setting from 'pages/Setting';
import { MailOutlined, CalendarOutlined, ManOutlined, WomanOutlined , FacebookOutlined, LinkedinOutlined} from '@ant-design/icons';

const { Content, Sider } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

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

const aboutData = {
  avatarSrc: 'https://cdn3d.iconscout.com/3d/premium/thumb/student-male-7267574-5914564.png?f=webp',
  name: 'David Doe',
  email: 'davidd09@gmail.com',
  dob: 'January 1, 2003',
  gender: 'Female',
  courseCreatedDate: 'January 15, 2023',
  facebook: 'https://www.facebook.com/vu.hanthien.545',
  linkedin: 'https://linkedin.com/in/david34',
};

const ProfileStudent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showAbout, setShowAbout] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  const displayAboutInfo = () => {
    setShowAbout(true);
    setShowSettings(false);
  };

  const displaySettings = () => {
    setShowAbout(false);
    setShowSettings(true);
  };

  const displayMyCourses = () => {
    setShowAbout(false);
    setShowSettings(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="flex items-center justify-center my-6">
          <Avatar size={70} src="https://cdn3d.iconscout.com/3d/premium/thumb/student-male-7267574-5914564.png?f=webp" icon={<UserOutlined />} />
        </div>
        <Menu theme='dark' defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<FileTextOutlined />} onClick={displayAboutInfo}>
            About
          </Menu.Item>
          <Menu.Item key="2" icon={<FileTextOutlined />} onClick={displayMyCourses}>
            My Courses
          </Menu.Item>
          <Menu.Item key="3" icon={<FileDoneOutlined />}>
            Certificates
          </Menu.Item>
          <Menu.Item key="4" icon={<ShoppingCartOutlined />}>
            Orders
          </Menu.Item>
          <Menu.Item key="5" icon={<FileDoneOutlined />}>
            Assignments
          </Menu.Item>
          <Menu.Item key="6" icon={<SettingOutlined />} onClick={displaySettings}>
            Settings
          </Menu.Item>
          <Menu.Item key="7" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
      <Content >
  {showAbout ? (
    <Card style={{ maxWidth: 500, maxHeight: 350, overflow: 'auto', margin: 20}}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <Avatar size={64} src={aboutData.avatarSrc} />
          <Title level={4} style={{ marginLeft: 16 }}>{aboutData.name}</Title>
        </div>
        <div style={{ marginBottom: 8 }}>
          <MailOutlined style={{ marginRight: 8 }} />
          <Text>Email: {aboutData.email}</Text>
        </div>
        <div style={{ marginBottom: 8 }}>
          <CalendarOutlined style={{ marginRight: 8 }} />
          <Text>Date Of Birth: {aboutData.dob}</Text>
        </div>
        <div style={{ marginBottom: 8 }}>
          {aboutData.gender === 'Male' ? <ManOutlined style={{ marginRight: 8 }} /> : <WomanOutlined style={{ marginRight: 8 }} />}
          <Text>Gender: {aboutData.gender}</Text>
        </div>
        <div style={{ marginBottom: 8 }}>
          <Text>Course Created Date: {aboutData.courseCreatedDate}</Text>
        </div>
        <div style={{ marginBottom: 8 }}>
  <a href={aboutData.facebook} target="_blank" rel="noopener noreferrer">
    <FacebookOutlined style={{ marginRight: 8 }} />
    Facebook
  </a>
</div>
<div>
  <a href={aboutData.linkedin} target="_blank" rel="noopener noreferrer">
    <LinkedinOutlined style={{ marginRight: 8 }} />
    LinkedIn
  </a>
</div>
      </div>
    </Card>
  ) : showSettings ? (
    <Setting /> // Render Settings component
  ) : (
    <div style={{ margin: 40 }}>
    <Tabs defaultActiveKey="1">
      <TabPane tab="All" key="1">
        <Table columns={columns} dataSource={coursesData} pagination={false} />
      </TabPane>
      <TabPane tab="In Progress" key="2">
        <Table columns={columns} dataSource={coursesData.filter(course => course.result !== '100%')} pagination={false} />
      </TabPane>
      <TabPane tab="Finished" key="3">
        <Table columns={columns} dataSource={coursesData.filter(course => course.result === '100%')} pagination={false} />
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

