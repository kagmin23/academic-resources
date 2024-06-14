import React, { useState } from 'react';
import { Layout, Menu, Avatar, Card, Typography, Row, Col, Image, Tabs, Button } from 'antd';
import { UserOutlined, FileTextOutlined, FileDoneOutlined, ShoppingCartOutlined, SettingOutlined, LogoutOutlined, MailOutlined, CalendarOutlined, ManOutlined, WomanOutlined, FacebookOutlined, LinkedinOutlined, CaretRightOutlined } from '@ant-design/icons';
import Setting from '../Setting';

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
  avatarSrc: 'https://cdn3d.iconscout.com/3d/premium/thumb/student-male-7267574-5914564.png?f=webp',
  name: 'David Doe',
  email: 'davidd09@gmail.com',
  dob: 'January 1, 2003',
  gender: 'Female',
  courseCreatedDate: 'January 15, 2023',
  facebook: 'https://www.facebook.com/vu.hanthien.545',
  linkedin: 'https://linkedin.com/in/david34',
};

const ProfileInstructor: React.FC = () => {
  const [filteredCourses, setFilteredCourses] = useState(coursesData);
  const [showAbout, setShowAbout] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

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

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Content>
          {showAbout ? (
            <Card style={{ maxWidth: 500, maxHeight: 350, overflow: 'auto', margin: 20 }}>
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
            <Setting />
          ) : (
            <div style={{ padding: 20 }}>
              <Tabs defaultActiveKey="all" onChange={filterCoursesByStatus}>
                <TabPane tab="All" key="all">
                  <Row gutter={[16, 16]}>
                    {filteredCourses.map(course => (
                      <Col xs={24} sm={12} md={8} lg={6} key={course.key}>
                        <Card
                          cover={<Image src={course.image} style={{ height: '100%', objectFit: 'cover' }} />}
                          actions={[
                            <Button type="primary" key="start-learning" icon={<CaretRightOutlined />}>
                              Start Learning
                            </Button>,
                          ]}
                        >
                          <Card.Meta title={course.name} description={`Instructor: ${course.instructor}`} />
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
                    {filteredCourses
                      .filter(course => course.status === '1')
                      .map(course => (
                        <Col xs={24} sm={12} md={8} lg={6} key={course.key}>
                          <Card
                            cover={<Image src={course.image} style={{ height: '100%', objectFit: 'cover' }} />}
                            actions={[
                              <Button type="primary" key="start-learning" icon={<CaretRightOutlined />}>
                                Start Learning
                              </Button>,
                            ]}
                          >
                            <Card.Meta title={course.name} description={`Instructor: ${course.instructor}`} />
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
                    {filteredCourses
                      .filter(course => course.status === '0')
                      .map(course => (
                        <Col xs={24} sm={12} md={8} lg={6} key={course.key}>
                          <Card
                            cover={<Image src={course.image} style={{ height: '100%', objectFit: 'cover' }} />}
                            actions={[
                              <Button type="primary" key="start-learning" icon={<CaretRightOutlined />}>
                                Start Learning
                              </Button>,
                            ]}
                          >
                            <Card.Meta title={course.name} description={`Instructor: ${course.instructor}`} />
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
  