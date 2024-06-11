import {
    CommentOutlined,
    DislikeOutlined,
    ExclamationCircleOutlined,
    EyeOutlined,
    HeartOutlined,
    LikeOutlined,
    PlayCircleOutlined,
    ShareAltOutlined,
    StarOutlined, FileOutlined, LockOutlined
} from '@ant-design/icons';
import { Avatar, Badge, Button, Modal, Radio, Tabs, Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;
const { TabPane } = Tabs;
const { Group } = Radio;

const CourseDetail: React.FC = () => {
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

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleClick = (e: any) => {
        const lesson = lessons.find(lesson => lesson.key === e.key);
        if (lesson) {
            setSelectedLesson(lesson.title);
        }
    };


    const [selectedLesson, setSelectedLesson] = useState(lessons[0]?.title);

    const renderStars = (starCount: number) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < starCount) {
                stars.push(<span key={i} role="img" aria-label="star" className="text-yellow-600">⭐️</span>);
            } else {
                stars.push(<span key={i} role="img" aria-label="star" className="text-3xl text-yellow-600">☆</span>);
            }
        }
        return stars;
    };

    const ratings = [
        { stars: 5, percentage: 70 },
        { stars: 4, percentage: 40 },
        { stars: 3, percentage: 5 },
        { stars: 2, percentage: 2 },
        { stars: 1, percentage: 0 },
    ];

    return (
        <div className="text-white bg-gray-900 wrapper">
            <div className="py-8">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-col items-center justify-center lg:flex-row lg:space-x-8">
                        <div className="relative w-full mb-4 lg:w-1/3 lg:mb-0">
                            <div className="relative">
                                <a onClick={showModal} className="block">
                                    <img src="https://img.youtube.com/vi/hqBjda_bf3I/maxresdefault.jpg" alt="" className="w-full p-2 bg-white" />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
                                        <div className="absolute top-0 right-0 p-1 m-2 mt-3 text-lg font-semibold text-white bg-orange-500 rounded">Bestseller</div>
                                        <PlayCircleOutlined className="text-4xl text-white" />
                                        <span className="absolute bottom-0 w-full py-2 text-xl font-semibold text-center text-white bg-black bg-opacity-75">Preview this course</span>
                                    </div>
                                </a>
                                <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
                                    <video width="100%" controls>
                                        <source src="your-video-url.mp4" type="video/mp4" />
                                    </video>
                                </Modal>
                            </div>
                            <div className="mt-4 mr-5">
                                <Button type="link" className="text-lg text-white" icon={<HeartOutlined />}>Save</Button>
                                <Button type="link" className="text-lg text-white" icon={<ExclamationCircleOutlined />}>Report abuse</Button>
                            </div>
                        </div>

                        <div className="w-full mt-8 lg:w-2/3 lg:ml-8 lg:mt-0">
                            <h2 className="text-2xl font-bold">The Web Developer Bootcamp</h2>
                            <p className="mt-3 text-lg">The only course you need to learn web development - HTML, CSS, JS, Node, and More!</p>
                            <div className="flex items-center mt-4 text-lg ">
                                <div className='p-1 bg-yellow-500 rounded-lg'>
                                    <StarOutlined className="font-semibold text-white " />
                                    <span className="ml-2 ">5.3.2</span>
                                </div>
                                <span className="ml-2">(81,665 ratings)</span>
                            </div>
                            <p className="mt-3 text-lg">114,521 students enrolled</p>
                            <div className="flex items-center mt-4 mb-3 text-lg">
                                <CommentOutlined className="" />
                                <span className="ml-2">English</span>
                            </div>
                            <p className="mt-2 text-lg">Last updated 1/2024</p>
                            <div className="mt-4 ">
                                <Button type="primary" className="p-5 mr-2 text-lg font-semibold bg-red-600">Add to Cart</Button>
                                <Link to="/course-order"><Button type="default" className='p-5 text-lg font-semibold text-white bg-gray-800'>Buy Now</Button></Link>
                            </div>
                            <p className="mt-2 text-lg">30-Day Money-Back Guarantee</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4 bg-white shadow-md">
                <div className="container px-3 mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Avatar src="images/left-imgs/img-1.jpg" size="large" />
                            <div className="flex flex-col ml-4">
                                <a href="#" className="mb-3 text-lg font-semibold text-black">Johnson Smith</a>
                                <Button type="default" className="p-5 ml-2 text-lg font-semibold text-white bg-red-600">Subscribe</Button>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center p-2">
                            <div className="flex justify-center w-full sm:w-auto sm:justify-start">
                                <Badge showZero className="flex flex-col items-center p-4 border border-gray-300 rounded-lg">
                                    <EyeOutlined className="mb-2 mr-1 text-2xl" />
                                    <span>1452</span>
                                </Badge>
                            </div>
                            <div className="flex justify-center w-full mt-2 sm:w-auto sm:justify-start sm:mt-0">
                                <Badge showZero className="flex flex-col items-center p-4 ml-0 border border-gray-300 rounded-lg sm:ml-2">
                                    <LikeOutlined className="mb-2 mr-1 text-2xl" />
                                    <span>100</span>
                                </Badge>
                            </div>
                            <div className="flex justify-center w-full mt-2 sm:w-auto sm:justify-start sm:mt-0">
                                <Badge showZero className="flex flex-col items-center p-4 ml-0 border border-gray-300 rounded-lg sm:ml-2">
                                    <DislikeOutlined className="mb-2 mr-1 text-2xl" />
                                    <span>20</span>
                                </Badge>
                            </div>
                            <div className="flex justify-center w-full mt-2 sm:w-auto sm:justify-start sm:mt-0">
                                <Badge showZero className="flex flex-col items-center p-4 ml-0 border border-gray-300 rounded-lg sm:ml-2">
                                    <ShareAltOutlined className="mb-2 text-2xl" />
                                    <span>9</span>
                                </Badge>
                            </div>
                        </div>

                    </div>
                    <Tabs defaultActiveKey="1" className="mt-4">
                        <TabPane tab={<span className='text-xl font-semibold'>About</span>} key="1">
                            <div>
                                <h3 className='mb-2 text-2xl font-semibold'>Requirements</h3>
                                <ul className="ml-6 text-xl text-gray-600 list-disc">
                                    <li>Have a computer with Internet</li>
                                    <li>Be ready to learn an insane amount of awesome stuff</li>
                                    <li>Prepare to build real web apps!</li>
                                </ul>
                            </div>
                            <div className="mt-4 text-xl text-gray-600">
                                <h3 className='mb-2 text-2xl font-semibold'>Description</h3>
                                <p>Just updated to include Bootstrap 4.1.3!</p>
                                <p>Hi! Welcome to the Web Developer Bootcamp, the <strong>only course you need to learn web development</strong>. There are a lot of options for online developer training, but this course is without a doubt the most comprehensive and effective on the market. Here's why:</p>
                                <ul className="mt-5 mb-5 ml-6 list-disc">
                                    <li>This is the only online course taught by a professional bootcamp instructor.</li>
                                    <li>94% of my in-person bootcamp students go on to get full-time developer jobs. Most of them are complete beginners when I start working with them.</li>
                                    <li>The previous 2 bootcamp programs that I taught cost $14,000 and $21,000. This course is just as comprehensive but with brand new content for a fraction of the price.</li>
                                    <li>Everything I cover is up-to-date and relevant to today's developer industry. No PHP or other dated technologies. This course does not cut any corners.</li>
                                    <li>This is the only complete beginner full-stack developer course that covers NodeJS.</li>
                                    <li>We build 13+ projects, including a gigantic production application called YelpCamp. No other course walks you through the creation of such a substantial application.</li>
                                    <li>The course is constantly updated with new content, projects, and modules. Think of it as a subscription to a never-ending supply of developer training.</li>
                                </ul>
                                <p>When you're learning to program you often have to sacrifice learning the exciting and current technologies in favor of the "beginner friendly" classes. With this course, you get the best of both worlds. This is a course designed for the complete beginner, yet it covers some of the most exciting and relevant topics in the industry.</p>
                                <p className='mt-4 mb-4'>Throughout the course we cover tons of tools and technologies including:</p>
                                <ul className="mb-5 ml-6 font-bold text-gray-500 list-disc">
                                    <li>HTML5</li>
                                    <li>CSS3</li>
                                    <li>JavaScript</li>
                                    <li>Bootstrap 4</li>
                                    <li>SemanticUI</li>
                                    <li>DOM Manipulation</li>
                                    <li>jQuery</li>
                                    <li>Unix (Command Line) Commands</li>
                                    <li>NodeJS</li>
                                    <li>NPM</li>
                                    <li>ExpressJS</li>
                                    <li>REST</li>
                                    <li>MongoDB</li>
                                    <li>Database Associations</li>
                                    <li>Authentication</li>
                                    <li>PassportJS</li>
                                    <li>Authorization</li>
                                </ul>
                                <p className='mb-5'>This course is also unique in the way that it is structured and presented. Many online courses are just a long series of "watch as I code" videos. This course is different. I've incorporated everything I learned in my years of teaching to make this course not only more effective but more engaging. The course includes:</p>
                                <ul className='mb-5 ml-6 list-disc'>
                                    <li>Lectures</li>
                                    <li>Code-Alongs</li>
                                    <li>Projects</li>
                                    <li>Exercises</li>
                                    <li>Research Assignments</li>
                                    <li>Slides</li>
                                    <li>Downloads</li>
                                    <li>Readings</li>
                                </ul>
                                <p>If you have any questions, please don't hesitate to contact me. I got into this industry because I love working with people and helping students learn. Sign up today and see how fun, exciting, and rewarding web development can be!</p>
                            </div>
                        </TabPane>
                        <TabPane tab={<span className='text-xl font-semibold'>Course Content</span>} key="2">
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={[lessons[0].key]}
                                onClick={handleClick}
                                className="h-full"
                            >
                                <SubMenu key="sub1" title="Lesson" icon={<FileOutlined />}>
                                    {lessons.map(lesson => (
                                        <Menu.Item key={lesson.key} icon={lesson.preview ? <FileOutlined /> : <LockOutlined />} className="flex items-center h-24">
                                            <div className="w-full">
                                                <div className="text-base">{lesson.title}</div>
                                                <div className="text-sm text-gray-500">{lesson.duration}</div>
                                            </div>
                                        </Menu.Item>
                                    ))}
                                </SubMenu>

                                <SubMenu key="sub2" title="Assignment" icon={<FileOutlined />}>
                                    {assignments.map(assignment => (
                                        <Menu.Item key={assignment.key} icon={assignment.preview ? <FileOutlined /> : <LockOutlined />} className="flex items-center h-24">
                                            <div className="w-full">
                                                <div className="text-base">{assignment.title}</div>
                                                <div className="text-sm text-gray-500">{assignment.duration}</div>
                                            </div>
                                        </Menu.Item>
                                    ))}
                                </SubMenu>
                            </Menu>
                        </TabPane>

                        <TabPane tab={<span className='text-xl font-semibold '>Reviews</span>} key="3">
                            <div className="flex flex-col md:flex-row">
                                <div className="p-4 md:w-1/2">
                                    <h1 className="mb-2 text-2xl font-semibold">Student Feedback</h1>
                                    <div className="flex items-center p-4 mb-4 bg-gray-100 rounded-lg">
                                        <h2 className='ml-4 mr-2 text-xl font-semibold'>4.6</h2>
                                        <div className="mr-4 text-2xl">
                                            {renderStars(4)}
                                        </div>
                                        <div>
                                            <div className="mt-2 text-lg font-semibold">Course Rating</div>
                                        </div>
                                    </div>
                                    <div className="w-full pl-4 md:w-1/2 md:pl-0">
                                        <div className="space-y-2">
                                            {ratings.map((rating) => (
                                                <div key={rating.stars} className="flex items-center">
                                                    <div className="w-full h-4 mx-2 bg-gray-200 rounded-full">
                                                        <div className="h-4 bg-red-500 rounded-full" style={{ width: `${rating.percentage}%` }}></div>
                                                    </div>
                                                    <div className="flex items-center ml-2">
                                                        <div className="flex text-xl">
                                                            {renderStars(rating.stars)}
                                                        </div>
                                                        <span className="ml-2">{rating.percentage}%</span>
                                                    </div>

                                                </div>
                                            ))}
                                        </div>
                                    </div>


                                </div>
                                <div className="w-1/2 p-4">
                                    <div className="space-y-8">
                                        <div className="flex space-x-4">
                                            <div className="flex-shrink-0">
                                                <Avatar src="images/left-imgs/img-1.jpg" />
                                            </div>
                                            <div>
                                                <div className="flex flex-col mb-2">
                                                    <h4 className="text-lg font-semibold">John Doe</h4>
                                                    <span className="text-sm">2 hours ago</span>
                                                </div>
                                                <div className="mr-4 text-2xl">
                                                    {renderStars(4)}
                                                </div>
                                                <div className="flex items-center mb-2">
                                                </div>
                                                <p className="mb-2 text-lg text-gray-600">Nam gravida elit a velit rutrum, eget dapibus ex elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce lacinia, nunc sit amet tincidunt venenatis.</p>
                                                <div className="flex items-center space-x-4 text-lg text-gray-600">
                                                    <h4>Was this review helpful?</h4>
                                                    <Group>
                                                        <Radio className='text-lg' value={1}>Yes</Radio>
                                                        <Radio className='text-lg' value={2}>No</Radio>
                                                    </Group>
                                                    <a href="#" className="text-lg">Report</a>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="flex space-x-4">
                                            <div className="flex-shrink-0">
                                                <Avatar src="images/left-imgs/img-1.jpg" />
                                            </div>
                                            <div>
                                                <div className="flex flex-col mb-2">
                                                    <h4 className="text-lg font-semibold">John Doe</h4>
                                                    <span className="text-sm">2 hours ago</span>
                                                </div>
                                                <div className="mr-4 text-2xl">
                                                    {renderStars(3)}
                                                </div>
                                                <div className="flex items-center mb-2">
                                                </div>
                                                <p className="mb-2 text-lg text-gray-600">Nam gravida elit a velit rutrum, eget dapibus ex elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce lacinia, nunc sit amet tincidunt venenatis.</p>
                                                <div className="flex items-center space-x-4 text-lg text-gray-600">
                                                    <h4>Was this review helpful?</h4>
                                                    <Group>
                                                        <Radio className='text-lg' value={1}>Yes</Radio>
                                                        <Radio className='text-lg' value={2}>No</Radio>
                                                    </Group>
                                                    <a href="#" className="text-lg">Report</a>
                                                </div>

                                            </div>
                                        </div><div className="flex space-x-4">
                                            <div className="flex-shrink-0">
                                                <Avatar src="images/left-imgs/img-1.jpg" />
                                            </div>
                                            <div>
                                                <div className="flex flex-col mb-2">
                                                    <h4 className="text-lg font-semibold">John Doe</h4>
                                                    <span className="text-sm">2 hours ago</span>
                                                </div>
                                                <div className="mr-4 text-2xl">
                                                    {renderStars(4)}
                                                </div>
                                                <div className="flex items-center mb-2">
                                                </div>
                                                <p className="mb-2 text-lg text-gray-600">Nam gravida elit a velit rutrum, eget dapibus ex elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce lacinia, nunc sit amet tincidunt venenatis.</p>
                                                <div className="flex items-center space-x-4 text-lg text-gray-600">
                                                    <h4>Was this review helpful?</h4>
                                                    <Group>
                                                        <Radio className='text-lg' value={1}>Yes</Radio>
                                                        <Radio className='text-lg' value={2}>No</Radio>
                                                    </Group>
                                                    <a href="#" className="">Report</a>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>

            </div>


        </div>

    );
};

export default CourseDetail;
