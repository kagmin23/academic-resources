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
        <div className="text-white  ">
            <div className="py-8 text-black">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-col items-center justify-center lg:flex-row lg:space-x-8">
                        <div className="w-full py-4 shadow-md">
                            <div className="container px-3 mx-auto">
                                <div className="flex flex-col items-start lg:flex-row lg:items-center">
                                    <Avatar size={128} src={aboutData.avatarSrc} className="mb-4 lg:mr-4 lg:mb-0" />
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
                                    <div className="flex flex-col mt-4 lg:ml-4 lg:mt-0">
                                        <div className="flex flex-row gap-4 mt-4 lg:ml-4 lg:mt-0">
                                            <a href={aboutData.facebook} target="_blank" rel="noopener noreferrer" className="mb-2 text-blue-700">
                                                <FacebookOutlined style={{ fontSize: '28px' }} />
                                            </a>
                                            <a href={aboutData.linkedin} target="_blank" rel="noopener noreferrer" className="mb-2 text-pink-700">
                                                <LinkedinOutlined style={{ fontSize: '28px' }} />
                                            </a>
                                            <a href={aboutData.youtube} target="_blank" rel="noopener noreferrer" className="mb-2 text-red-600">
                                                <YoutubeOutlined style={{ fontSize: '30px' }} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center mt-4">
                                    <Badge showZero className="flex flex-col items-center p-4 border border-gray-300 rounded-lg">
                                        <EyeOutlined className="mb-2 mr-1 text-2xl " />
                                        <span>1452</span>
                                    </Badge>
                                    <Badge showZero className="flex flex-col items-center p-4 ml-2 border border-gray-300 rounded-lg">
                                        <LikeOutlined className="mb-2 mr-1 text-2xl " />
                                        <span>100</span>
                                    </Badge>
                                    <Badge showZero className="flex flex-col items-center p-4 ml-2 border border-gray-300 rounded-lg">
                                        <DislikeOutlined className="mb-2 mr-1 text-2xl " />
                                        <span>20</span>
                                    </Badge>
                                    <Badge showZero className="flex flex-col items-center p-4 ml-2 border border-gray-300 rounded-lg">
                                        <ShareAltOutlined className="mb-2 text-2xl" />
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
