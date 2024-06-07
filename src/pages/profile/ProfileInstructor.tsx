import {
  CaretRightOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  HeartOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Avatar, Button, Card, Col, Image, Layout, Menu, Row, Tabs, Typography } from 'antd';
import Setting from 'pages/Setting';
import React, { useState } from 'react';

const { Content, Sider } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
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
    status: '0',
  },
  {
    key: '5',
    image: 'https://i.ytimg.com/vi/wGdNAFWe2c8/maxresdefault.jpg',
    name: 'Design',
    instructor: 'F8',
    lessons: '9 Lessons',
    price: 'Free',
    status: '1',
  },
  {
    key: '6',
    image: 'https://accountlp.thimpress.com/wp-content/uploads/2023/11/Gregor_an_image_of_a_womans_head_in_a_virtual_field_with_a_devi_c1ac4ecb-0c36-464c-b282-06798fc663af-800x600.png',
    name: 'AI',
    instructor: 'HieuTQ10',
    lessons: '9 Lessons',
    price: '13$',
    status: '0',
  },
  {
    key: '7',
    image: 'https://accountlp.thimpress.com/wp-content/uploads/2023/06/about-us-new-1-800x600.jpg',
    name: 'Softskill',
    instructor: 'TrungTM',
    lessons: '3 Lessons',
    price: '10$',
    status: '0',
  },
  {
    key: '8',
    image: 'https://i.ytimg.com/vi/wGdNAFWe2c8/maxresdefault.jpg',
    name: 'Design',
    instructor: 'F8',
    lessons: '9 Lessons',
    price: 'Free',
    status: '1',
  },
  {
    key: '9',
    image: 'https://i.ytimg.com/vi/wGdNAFWe2c8/maxresdefault.jpg',
    name: 'Design',
    instructor: 'F8',
    lessons: '9 Lessons',
    price: 'Free',
    status: '1',
  },
  {
    key: '10',
    image: 'https://i.ytimg.com/vi/wGdNAFWe2c8/maxresdefault.jpg',
    name: 'Design',
    instructor: 'F8',
    lessons: '9 Lessons',
    price: 'Free',
    status: '1',
  },
];

const aboutData = {
  avatarSrc: 'https://scontent.fsgn2-11.fna.fbcdn.net/v/t1.6435-9/104658671_897847847393418_5352404516257749893_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGUgtsdH1x6vQbbqnErk1SxR7lr7k5dPtpHuWvuTl0-2r6Xr_X6XfF0uExI1CK6UE3BDbeLgnLryq8J5oHoBPMg&_nc_ohc=iEvrApXw3JAQ7kNvgFGQPeU&_nc_ht=scontent.fsgn2-11.fna&oh=00_AYCFbiTtCWBz3IK8e1vQqJ3a3clnb0JU3pcmJjTFAqt3Yw&oe=6688AB83',
  name: 'David Heb',
  email: 'mrdavid@gmail.com',
  dob: '01/01/1990',
  gender: 'Male',
  courseCreatedDate: '01/01/2020',
  facebook: 'https://www.facebook.com/vu.hanthien.545',
  linkedin: 'https://linkedin.com/in/david',
};

const ProfileInstructor: React.FC = () => {
  const [filteredCourses, setFilteredCourses] = useState(coursesData);
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

  const filterCoursesByStatus = (status: string) => {
    setShowAbout(false);
    setShowSettings(false);
    if (status === 'all') {
      setFilteredCourses(coursesData);
    } else {
      const filtered = coursesData.filter(course => course.status === status);
      setFilteredCourses(filtered);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} className="site-layout-background" style={{ backgroundColor: 'white' }}>
        <div className="flex items-center justify-center my-6">
          <Avatar size={100} src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.6435-9/186556739_1150264392151761_8313708048043301527_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHXsXaD_LXdCCQoT27K49QqsybeY3n4YzGzJt5jefhjMe-LvbYoDtWlBcSBNxVRmHZfIZuh7RHur-kdbSDnpZJQ&_nc_ohc=0BmXcTKsr64Q7kNvgH-rsgU&_nc_ht=scontent.fsgn2-3.fna&oh=00_AYD7JAjZaEOuZLxHAtxYW_9yIdDjrFT7baEYLIWwRHvJTA&oe=6688B321" icon={<UserOutlined />} />
        </div>
        <Title level={4} className="text-center">David Heb</Title>
        <Menu mode="inline" defaultSelectedKeys={['1']} style={{borderRight: 0 }}>
          <Menu.Item key="1" icon={<FileTextOutlined />} onClick={displayAboutInfo}>
            About
          </Menu.Item>
          <Menu.Item key="2" icon={<FileTextOutlined />} onClick={() => filterCoursesByStatus('all')}>
            My Courses
          </Menu.Item>
          <Menu.Item key="3" icon={<FileDoneOutlined />} onClick={() => filterCoursesByStatus('1')}>
            Students
          </Menu.Item>
          <Menu.Item key="4" icon={<FileDoneOutlined />} onClick={() => filterCoursesByStatus('1')}>
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
              <Row gutter={[5, 5]} className="mb-4" justify="space-between">
                {[
                  { text: 'Total Course', value: 80 },
                  { text: 'Published Course', value: 1 },
                  { text: 'Pending Course', value: 60 },
                  { text: 'Total Students', value: 3 },
                  { text: 'Students Completed', value: 3 },
                  { text: 'Students In-progress', value: 0 },
                ].map((item, index) => (
                  <Col xs={24} sm={12} md={4} lg={4} xl={4} key={index}>
                    <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '5px 0' }}>
                      <Text>{item.text}</Text>
                      <Title level={5} style={{ color: 'orange', margin: 0 }}>{item.value}</Title>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Tabs defaultActiveKey="all" onChange={filterCoursesByStatus}>
                <TabPane tab="All" key="all">
                  <Row gutter={[16, 16]}>
                    {filteredCourses.map(course => (
                      <Col span={8} key={course.key}>
                        <Card
                          cover={<Image src={course.image} style={{ height: 200, objectFit: 'cover' }} />}
                          actions={[
                            <Button type="primary" key="start-learning" icon={<CaretRightOutlined />}>Start Learning</Button>
                          ]}
                        >
                          <Card.Meta
                            title={course.name}
                            description={`Instructor: ${course.instructor}`}
                          />
                          <Text>{course.lessons}</Text>
                          <br />
                          <Text style={{ color: 'blue' }}>{course.price}</Text>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </TabPane>
                <TabPane tab="Published" key="1">
                  <Row gutter={[16, 16]}>
                    {filteredCourses.filter(course => course.status === '1').map(course => (
                      <Col span={8} key={course.key}>
                        <Card
                          cover={<Image src={course.image} style={{ height: 200, objectFit: 'cover' }} />}
                          actions={[
                            <Button type="primary" key="start-learning" icon={<CaretRightOutlined />}>Start Learning</Button>
                          ]}
                        >
                          <Card.Meta
                            title={course.name}
                            description={`Instructor: ${course.instructor}`}
                          />
                          <Text>{course.lessons}</Text>
                          <br />
                          <Text style={{ color: 'blue' }}>{course.price}</Text>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </TabPane>
                <TabPane tab="Pending" key="0">
                  <Row gutter={[16, 16]}>
                    {filteredCourses.filter(course => course.status === '0').map(course => (
                      <Col span={8} key={course.key}>
                        <Card
                          cover={<Image src={course.image} style={{ height: 200, objectFit: 'cover' }} />}
                          actions={[
                            <Button type="primary" key="start-learning" icon={<CaretRightOutlined />}>Start Learning</Button>
                          ]}
                        >
                          <Card.Meta
                            title={course.name}
                            description={`Instructor: ${course.instructor}`}
                          />
                          <Text>{course.lessons}</Text>
                          <br />
                          <Text style={{ color: 'blue' }}>{course.price}</Text>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </TabPane>
              </Tabs>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProfileInstructor;