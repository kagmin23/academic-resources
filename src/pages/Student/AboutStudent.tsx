import { CalendarOutlined, CaretRightOutlined, FacebookOutlined, FileDoneOutlined, FileTextOutlined, LinkedinOutlined, LogoutOutlined, MailOutlined, ManOutlined, SettingOutlined, ShoppingCartOutlined, UserOutlined, WomanOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Image, Layout, Menu, Row, Tabs, Typography ,notification,} from 'antd';
import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/AdminsApi/UserService'
const { Content } = Layout;
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
  
  

];


const ProfileStudent: React.FC = () => {
  const [filteredCourses, setFilteredCourses] = useState(coursesData);
  const [currentUser, setCurrentUser] = useState<any>(null);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await getCurrentUser(); // Replace with your API call
        if (response.success) {
          setCurrentUser(response.data);
        } else {
          notification.error({
            message: 'Error',
            description: 'Failed to fetch current user information',
          });
        }
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to fetch current user information',
        });
      }
    };

    fetchCurrentUser();
  }, []);

  const filterCoursesByStatus = (status: string) => {
   
    if (status === 'all') {
      setFilteredCourses(coursesData);
    } else {
      const filtered = coursesData.filter(course => course.status === status);
      setFilteredCourses(filtered);
    }
  };
   if (!currentUser) {
    return <div>Loading...</div>;
}

  return (
    <Layout style={{ minHeight: '100vh' }}>
      
      <Layout className="site-layout">
        {/* <Content> */}
          
            <Card style={{  maxHeight: 350, overflow: 'auto'}}>
              {/* <div style={{ display: 'flex', flexDirection: 'column' }}> */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                <Avatar size={128} src={currentUser.avatar} className="mb-4 lg:mr-4 lg:mb-0" />
                  <div className="flex-grow">
                                        <Title level={4}>{currentUser.name}</Title>
                                        <div className="mb-2">
                                            <MailOutlined style={{ marginRight: 8 }} />
                                            <Text>Email: {currentUser.email}</Text>
                                        </div>
                                        <div className="mb-2">
                                        <CalendarOutlined style={{ marginRight: 8 }} />
                                        <Text>Date Of Birth: {currentUser.dob}</Text>
                                         </div>

                                        {/* <div className="mb-2">
                                            <CalendarOutlined style={{ marginRight: 8 }} />
                                            <Text>Date Of Birth: {aboutData.dob}</Text>
                                        </div> */}
                                        {/* <div className="mb-2">
                                            {aboutData.gender === 'Male' ? <ManOutlined style={{ marginRight: 8 }} /> : <WomanOutlined style={{ marginRight: 8 }} />}
                                            <Text>Gender: {aboutData.gender}</Text>
                                        </div> */}
                                        <div className="mb-2">
                                            <Text>Phone Number: {currentUser.phone_number}</Text>
                                        </div>
                                        <div className="mb-2">
                                            <Text>Course Created Date: {currentUser.created_at}</Text>
                                        </div>
                                        <div className="mb-2">
                                            <Text>Bio: {currentUser.description}</Text>
                                        </div>
                                    </div>
                </div>
              {/* </div> */}
            </Card>
          
        
         
            {/* <div className='p-5 '>
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
            </div> */}
        
        {/* </Content> */}
      </Layout>
    </Layout>
  );
};

export default ProfileStudent;
