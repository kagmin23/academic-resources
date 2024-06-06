import React, { useState } from 'react';
import { Button, Modal, Tabs, Badge, Avatar, Tooltip } from 'antd';
import {
    PlayCircleOutlined,
    HeartOutlined,
    ExclamationCircleOutlined,
    StarOutlined,
    CommentOutlined,
    EyeOutlined,
    LikeOutlined,
    DislikeOutlined,
    ShareAltOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;

const CourseDetail: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [introOpen, setIntroOpen] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleIntroClick = () => {
        setIntroOpen(!introOpen);
    };

    return (
        <div className="wrapper bg-gray-100">
            <div className="py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-center">
                        <div className="w-full lg:w-1/3">
                            <div className="relative">
                                <a onClick={showModal} className="block">
                                    <img src="images/courses/img-2.jpg" alt="" className="w-full" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                        <div className="badge_seller">Bestseller</div>
                                        <PlayCircleOutlined className="text-white text-4xl" />
                                        <span className="text-white">Preview this course</span>
                                    </div>
                                </a>
                                <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
                                    <video width="100%" controls>
                                        <source src="your-video-url.mp4" type="video/mp4" />
                                    </video>
                                </Modal>
                            </div>
                            <div className="flex justify-between mt-4">
                                <Button type="link" icon={<HeartOutlined />}>Save</Button>
                                <Button type="link" icon={<ExclamationCircleOutlined />}>Report abuse</Button>
                            </div>
                        </div>
                        <div className="w-full lg:w-2/3 lg:ml-8 mt-8 lg:mt-0">
                            <h2 className="text-2xl font-bold">The Web Developer Bootcamp</h2>
                            <p className="text-gray-700">The only course you need to learn web development - HTML, CSS, JS, Node, and More!</p>
                            <div className="flex items-center mt-4">
                                <StarOutlined className="text-yellow-500" />
                                <span className="ml-2">5.3.2</span>
                                <span className="ml-2">(81,665 ratings)</span>
                            </div>
                            <p className="mt-2">114,521 students enrolled</p>
                            <div className="flex items-center mt-4">
                                <CommentOutlined className="text-gray-700" />
                                <span className="ml-2">English</span>
                                <div className="ml-4 flex items-center">
                                    <CheckCircleOutlined className="text-gray-700" />
                                    <Tooltip
                                        title={
                                            <>
                                                <p>French</p>
                                                <p>Hindi</p>
                                                <p>German [Auto-generated]</p>
                                                <p>Indonesian [Auto-generated]</p>
                                                <p>Italian [Auto-generated]</p>
                                                <p>Japanese [Auto-generated]</p>
                                                <p>Korean</p>
                                                <p>Polish</p>
                                                <p>Portuguese [Auto-generated]</p>
                                                <p>Spanish [Auto-generated]</p>
                                                <p>Traditional Chinese</p>
                                                <p>Turkish [Auto-generated]</p>
                                            </>
                                        }
                                    >
                                        <span className="ml-2">English, Dutch</span>
                                    </Tooltip>
                                </div>
                            </div>
                            <p className="mt-2">Last updated 1/2024</p>
                            <div className="flex mt-4">
                                <Button type="primary" className="mr-2">Add to Cart</Button>
                                <Button type="default">Buy Now</Button>
                            </div>
                            <p className="mt-2">30-Day Money-Back Guarantee</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white py-4 shadow-md">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Avatar src="images/left-imgs/img-1.jpg" size="large" />
                            <div className="ml-4">
                                <a href="#" className="text-lg font-semibold">Johnson Smith</a>
                                <Button type="default" className="ml-2">Subscribe</Button>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Badge count={1452} showZero>
                                <EyeOutlined className="text-xl" />
                            </Badge>
                            <Badge count={100} showZero className="ml-4">
                                <LikeOutlined className="text-xl" />
                            </Badge>
                            <Badge count={20} showZero className="ml-4">
                                <DislikeOutlined className="text-xl" />
                            </Badge>
                            <Badge count={9} showZero className="ml-4">
                                <ShareAltOutlined className="text-xl" />
                            </Badge>
                        </div>
                    </div>
                    <Tabs defaultActiveKey="1" className="mt-4">
                        <TabPane tab="About" key="1">
                            <div>
                                <h3 className='text-2xl font-semibold mb-2'>Requirements</h3>
                                <ul className="list-disc ml-6 text-xl text-gray-600">
                                    <li>Have a computer with Internet</li>
                                    <li>Be ready to learn an insane amount of awesome stuff</li>
                                    <li>Prepare to build real web apps!</li>
                                </ul>
                            </div>
                            <div className="mt-4 text-xl text-gray-600">
                                <h3 className='text-2xl font-semibold mb-2'>Description</h3>
                                <p>Just updated to include Bootstrap 4.1.3!</p>
                                <p>Hi! Welcome to the Web Developer Bootcamp, the <strong>only course you need to learn web development</strong>. There are a lot of options for online developer training, but this course is without a doubt the most comprehensive and effective on the market. Here's why:</p>
                                <ul className="list-disc ml-6 mb-5 mt-5">
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
                                <ul className="list-disc ml-6 text-gray-500 font-bold mb-5">
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
                                <ul className='list-disc ml-6 mb-5'>
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
                        <TabPane tab="Courses Content" key="2">
                            <div className="crse_content flex flex-row">
                                <h3 className="mb-4">Course content</h3>
                                <div className="flex items-center mb-4">
                                    <span className="mr-4 hover:text-red-700">Expand all</span>
                                    <span className="mr-4">402 lectures</span>
                                    <span className="mr-4">47:06:29</span>
                                </div>
                            </div>
                            <div className='text-xl'>
                                <h2 className="mb-2 font-semibold" onClick={handleIntroClick}>Introduction to this Course</h2>
                                {introOpen && (
                                    <div className="intro-content mb-4 ">
                                        <ul className="mb-4">
                                            <li className="flex items-center">
                                                A Note On Asking For Help
                                                <span className="ml-auto">8 lectures</span>
                                                <span>22:08</span>
                                            </li>
                                        </ul>
                                        <ul className="mb-4">
                                            <li className="flex items-center">
                                                Introducing Our TA
                                                <span className="ml-auto">8 lectures</span>
                                                <span>00:12</span>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>


                        </TabPane>
                        <TabPane tab="Reviews" key="3">
                            <p>Reviews content goes here...</p>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
