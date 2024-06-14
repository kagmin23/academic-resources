import {
    CalendarOutlined,
    CaretRightOutlined,
    DislikeOutlined,
    EyeOutlined,
    FacebookOutlined,
    LikeOutlined,
    LinkedinOutlined,
    MailOutlined,
    ManOutlined,
    ShareAltOutlined,
    WomanOutlined,
    YoutubeOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Button, Card, Col, Row, Tabs, Typography } from 'antd';
import React, { useState } from 'react';

const { TabPane } = Tabs;
const { Title, Text } = Typography;

const DashboardInstructor: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const lessons = [
        { key: 'lesson1', title: 'Getting Started', duration: '30 minutes', preview: true },
        { key: 'lesson2', title: 'Content Management', duration: '30 minutes' },
        { key: 'lesson3', title: 'Course Download', duration: '30 minutes' },
        { key: 'lesson4', title: 'Course Download 02', duration: '30 minutes' },
        { key: 'lesson5', title: 'Contextualising Sustainability for a Changing World', duration: '10 minutes' },
    ];

    const assignments = [
        { key: 'assignment1', title: 'Certificate On Theme Development 01', duration: '10 minutes', preview: true },
        { key: 'assignment2', title: 'Certificate On Theme Development 02', duration: '30 minutes' },
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
        youtube: 'https://www.youtube.com/user/yourchannel',
    };

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
        // Additional course data...
    ];

    const [filteredCourses, setFilteredCourses] = useState(coursesData);

    const filterCoursesByStatus = (key: string) => {
        if (key === 'all') {
            setFilteredCourses(coursesData);
        } else {
            setFilteredCourses(coursesData.filter(course => course.status === key));
        }
    };

    return (
        <div className="text-white bg-gray-900 wrapper">
            <div className="py-8">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-col items-center justify-center lg:flex-row lg:space-x-8">
                        <div className="py-4 bg-white shadow-md w-full">
                            <div className="container px-3 mx-auto">
                                <div className="flex flex-col lg:flex-row items-start lg:items-center">
                                    <Avatar size={128} src={aboutData.avatarSrc} className="lg:mr-4 mb-4 lg:mb-0" />
                                    <div className="flex-grow">
                                        <Title level={4}>{aboutData.name}</Title>
                                        <div className="mb-2">
                                            <MailOutlined style={{ marginRight: 8 }} />
                                            <Text>Email: {aboutData.email}</Text>
                                        </div>
                                        <div className="mb-2">
                                            <CalendarOutlined style={{ marginRight: 8 }} />
                                            <Text>Date Of Birth: {aboutData.dob}</Text>
                                        </div>
                                        <div className="mb-2">
                                            {aboutData.gender === 'Male' ? <ManOutlined style={{ marginRight: 8 }} /> : <WomanOutlined style={{ marginRight: 8 }} />}
                                            <Text>Gender: {aboutData.gender}</Text>
                                        </div>
                                        <div className="mb-2">
                                            <Text>Course Created Date: {aboutData.courseCreatedDate}</Text>
                                        </div>
                                    </div>
                                    <div className="flex flex-col lg:ml-4 mt-4 lg:mt-0">
                                        <Button type="primary" className="mb-4">Subscribe</Button>
                                        <a href={aboutData.facebook} target="_blank" rel="noopener noreferrer" className="mb-2">
                                            <FacebookOutlined style={{ fontSize: '24px' }} />
                                        </a>
                                        <a href={aboutData.linkedin} target="_blank" rel="noopener noreferrer" className="mb-2">
                                            <LinkedinOutlined style={{ fontSize: '24px' }} />
                                        </a>
                                        <a href={aboutData.youtube} target="_blank" rel="noopener noreferrer" className="mb-2">
                                            <YoutubeOutlined style={{ fontSize: '24px' }} />
                                        </a>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center mt-4">
                                    <Badge showZero className="flex flex-col items-center text-white p-4 border border-gray-300 rounded-lg">
                                        <EyeOutlined className="mb-2 mr-1 text-2xl text-white" />
                                        <span>1452</span>
                                    </Badge>
                                    <Badge showZero className="flex flex-col items-center text-white p-4 ml-2 border border-gray-300 rounded-lg">
                                        <LikeOutlined className="mb-2 mr-1 text-2xl text-white" />
                                        <span>100</span>
                                    </Badge>
                                    <Badge showZero className="flex flex-col items-center text-white p-4 ml-2 border border-gray-300 rounded-lg">
                                        <DislikeOutlined className="mb-2 mr-1 text-2xl text-white" />
                                        <span>20</span>
                                    </Badge>
                                    <Badge showZero className="flex flex-col items-center text-white p-4 ml-2 border border-gray-300 rounded-lg">
                                        <ShareAltOutlined className="mb-2 text-2xl text-white" />
                                        <span>9</span>
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4 bg-white shadow-md">
                <div className="container px-3 mx-auto">
                    <Tabs defaultActiveKey="1" className="mt-4">
                        <TabPane tab={<span className='text-xl font-semibold'>About</span>} key="1">
                            <Tabs defaultActiveKey="all" onChange={filterCoursesByStatus}>
                                <TabPane tab="All" key="all">
                                    <Row gutter={[16, 16]}>
                                        {filteredCourses.map(course => (
                                            <Col xs={24} sm={12} md={8} lg={6} key={course.key}>
                                                <Card
                                                    cover={<img src={course.image} style={{ height: '100%', objectFit: 'cover' }} />}
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
                                                        cover={<img src={course.image} style={{ height: '100%', objectFit: 'cover' }} />}
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
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default DashboardInstructor;
