import {
  CalendarOutlined,
  ClockCircleOutlined,
  ContactsOutlined,
  FacebookOutlined,
  FileDoneOutlined,
  FileImageOutlined,
  FileTextOutlined,
  LinkedinOutlined,
  LogoutOutlined,
  ManOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UploadOutlined,
  UserOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, DatePicker, Form, Image, Input, Layout, Menu, Select, Table, Tabs, Typography, Upload } from 'antd';
import { Option } from 'antd/es/mentions';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;
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

const aboutDataKey = 'aboutData'; // Key for storing data in localStorage

const ProfileStudent = () => {
  const [avatarSrc, setAvatarSrc] = useState("https://cdn3d.iconscout.com/3d/premium/thumb/student-male-7267574-5914564.png?f=webp");

  const [collapsed, setCollapsed] = useState(false);
  const [showAbout, setShowAbout] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showMyCourses, setShowMyCourses] = useState(false); // State to control visibility of My Courses section
  const [aboutData, setAboutData] = useState({
    avatarSrc: 'https://cdn3d.iconscout.com/3d/premium/thumb/student-male-7267574-5914564.png?f=webp',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    dob: '1990-01-01',
    gender: 'Male',
    courseCreatedDate: '2022-01-01',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  });
  const navigate = useNavigate();

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  const handleImageChange = (info: any) => {
    if (info.file.status === 'done') {
      const imageUrl = info.file.response.imageUrl;
      setAvatarSrc(imageUrl);
    }
  };

  const displayAboutInfo = () => {
    setShowAbout(true);
    setShowSettings(false);
    setShowMyCourses(false); // Ensure My Courses section is hidden when displaying About info
  };

  const displaySettings = () => {
    setShowAbout(false);
    setShowSettings(true);
    setShowMyCourses(false); // Ensure My Courses section is hidden when displaying Settings
  };

  const displayMyCourses = () => {
    setShowAbout(false);
    setShowSettings(false);
    setShowMyCourses(true); // Show My Courses section when this tab is selected
  };

  const navigateToAssignments = () => {
    navigate('/lesson-student');
  };

  const navigateToOrders = () => {
    navigate('/save');
  };

  const onFinish = (values: any) => {
    const updatedAboutData = {
      ...aboutData,
      email: values.email,
      info: values.info,
      facebook: values.facebook,
      linkedin: values.linkedin,
    };
    localStorage.setItem(aboutDataKey, JSON.stringify(updatedAboutData));
    setAboutData(updatedAboutData);
    setShowAbout(true);
    setShowMyCourses(false);
    setShowSettings(false);
    console.log('Form submitted:', values);
  };

  const handleTabChange = (key: any) => {
    setShowAbout(key === 'about');
    setShowMyCourses(key === 'mycourses');
    setShowSettings(key === 'settings');
  };

  const handlePasswordChange = () => {
    console.log('Redirecting to password change page...');
  };

  useEffect(() => {
    const storedAboutData = localStorage.getItem(aboutDataKey);
    if (storedAboutData) {
      setAboutData(JSON.parse(storedAboutData));
    }
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} width={250}>
        <div className="text-center">
          <div className="flex items-center justify-center mt-6">
            <Avatar size={70} src={avatarSrc} icon={<UserOutlined />} />
          </div>
          <Upload
            name="avatar"
            showUploadList={false}
            action="/api/upload"
            onChange={handleImageChange}
          >
            <button className=" hover:text-blue-700 text-white font-semibold py-2 px-4 rounded">
              <UploadOutlined /> Change Avatar
            </button>
          </Upload>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<FileImageOutlined />} onClick={displayAboutInfo}>
            About
          </Menu.Item>
          <Menu.Item key="2" icon={<FileTextOutlined />} onClick={displayMyCourses}>
            My Courses
          </Menu.Item>
          <Menu.Item key="3" icon={<FileDoneOutlined />}>
            Certificates
          </Menu.Item>
          <Menu.Item key="4" icon={<ShoppingCartOutlined />} onClick={navigateToOrders}>
            Orders
          </Menu.Item>
          <Menu.Item key="5" icon={<FileDoneOutlined />} onClick={navigateToAssignments}>
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
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {showAbout && (
              <Card style={{ maxWidth: 500, maxHeight: 350, overflow: 'auto', margin: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                    <Avatar size={64} src={aboutData.avatarSrc} />
                    <Title level={4} style={{ marginLeft: 16 }}>
                      {aboutData.name}
                    </Title>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <FileImageOutlined style={{ marginRight: 8 }} />
                    <Text>Email: {aboutData.email}</Text>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <CalendarOutlined style={{ marginRight: 8 }} />
                    <Text>Date Of Birth: {aboutData.dob}</Text>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    {aboutData.gender === 'Male' ? (
                      <ManOutlined style={{ marginRight: 8 }} />
                    ) : (
                      <WomanOutlined style={{ marginRight: 8 }} />
                    )}
                    <Text>Gender: {aboutData.gender}</Text>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <ClockCircleOutlined style={{ marginRight: 8 }} />
                    <Text>Course Created Date: {aboutData.courseCreatedDate}</Text>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <ContactsOutlined style={{ marginRight: 8 }} />
                    <Text>{aboutData.info}</Text>
                  </div>
                </div>
              </Card>
            )}
            {showSettings && (
              <div>
              <Form
                name="settingsForm"
                initialValues={{
                  email: aboutData.email,
                  info: aboutData.info,
                  dob: moment(aboutData.dob, 'YYYY-MM-DD'),
                  gender: aboutData.gender,
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email address!' },
                    { pattern: /^[\w-\.]+@gmail\.com$/, message: 'Email must be @gmail.com' },
                  ]}
                >
                  <Input />
                </Form.Item>
                <div className='flex flex-row'>
                <Form.Item
                  name="dob"
                  label="Date of Birth"
                  rules={[{ required: true, message: 'Please select your date of birth!' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                className='ml-80'
                  name="gender"
                  label="Gender"
                  rules={[{ required: true, message: 'Please select your gender!' }]}
                >
                  <Select>
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                </Form.Item>
                </div>
                <Form.Item name="information" label="Information" rules={[{ required: true, message: 'Please input your info!' }]}>
                  <TextArea rows={4} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Save Changes
                  </Button>
                </Form.Item>
              </Form>
              </div>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProfileStudent;