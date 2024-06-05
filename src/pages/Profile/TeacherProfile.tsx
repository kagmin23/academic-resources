import React, { useState } from 'react';
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
  CaretRightOutlined,
} from '@ant-design/icons';


const { Content, Sider } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

const coursesData = [
  {
    key: '1',
    image: 'https://accountlp.thimpress.com/wp-content/uploads/2022/11/course-8-400x300.jpg',
    name: 'How To Teach Online Course Efectively',
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

const TeacherProfile: React.FC = () => {
  const [filteredCourses, setFilteredCourses] = useState(coursesData);

  const filterCoursesByStatus = (status: string) => {
    if (status === 'all') {
      setFilteredCourses(coursesData);
    } else {
      const filtered = coursesData.filter(course => course.status === status);
      setFilteredCourses(filtered);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Sider width={250} className="site-layout-background" style={{ backgroundColor: 'white' }}>
          <div className="flex items-center justify-center my-6">
            <Avatar size={100} src="https://cdn1.iconfinder.com/data/icons/flat-education-icons-1/512/37-512.png" icon={<UserOutlined />} />
          </div>
          <Title level={4} className="text-center">Instructor</Title>
          <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item key="1" icon={<FileTextOutlined />} onClick={() => filterCoursesByStatus('all')}>
              My Courses
            </Menu.Item>
            <Menu.Item key="2" icon={<FileDoneOutlined />} onClick={() => filterCoursesByStatus('1')}>
              Certificates
            </Menu.Item>
            <Menu.Item key="3" icon={<QuestionCircleOutlined />} onClick={() => filterCoursesByStatus('0')}>
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
            <div style={{ padding: 10, height: 80 }}>
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
                <TabPane tab="Publish" key="1">
                  <Row gutter={[16, 16]}>
                    {filteredCourses.map(course => (
                      course.status === '1' &&
                      <Col span={8} key={course.key}>
                        <Card
                          cover={<Image src={course.image} />}
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
                    {filteredCourses.map(course => (
                      course.status === '0' &&
                      <Col span={8} key={course.key}>
                        <Card
                          cover={<Image src={course.image} />}
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
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default TeacherProfile;

