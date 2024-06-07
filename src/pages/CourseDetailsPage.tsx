import React, { useState } from 'react';
import { Button, Modal, Tabs, Badge, Avatar, Collapse, Progress, Radio } from 'antd';
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
} from '@ant-design/icons';

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Group } = Radio;

const CourseDetail: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [openSection, setOpenSection] = useState<string | string[]>([]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleToggle = (key: string | string[]) => {
        setOpenSection(key);
    };

    const renderStars = (starCount: number) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < starCount) {
                stars.push(<span key={i} role="img" aria-label="star" className="text-yellow-600">⭐️</span>);
            } else {
                stars.push(<span key={i} role="img" aria-label="star" className="text-yellow-600 text-3xl">☆</span>);
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
        <div className="wrapper bg-gray-900 text-white">
            <div className="py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-center">
                        <div className="w-full lg:w-1/3 relative">
                            <div className="relative">
                                <a onClick={showModal} className="block">
                                    <img src="https://img.youtube.com/vi/hqBjda_bf3I/maxresdefault.jpg" alt="" className="w-full p-2 bg-white" />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
                                        <div className="absolute top-0 right-0 m-2 bg-orange-500 text-white p-1 rounded mt-3 text-lg font-semibold">Bestseller</div>
                                        <PlayCircleOutlined className="text-white text-4xl" />
                                        <span className="text-white absolute bottom-0 text-center w-full bg-black bg-opacity-75 py-2 text-xl font-semibold">Preview this course</span>
                                    </div>
                                </a>
                                <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
                                    <video width="100%" controls>
                                        <source src="your-video-url.mp4" type="video/mp4" />
                                    </video>
                                </Modal>
                            </div>
                            <div className="mr-5 mt-4">
                                <Button type="link" className="text-white text-lg" icon={<HeartOutlined />}>Save</Button>
                                <Button type="link" className="text-white text-lg" icon={<ExclamationCircleOutlined />}>Report abuse</Button>
                            </div>
                        </div>

                        <div className="w-full lg:w-2/3 lg:ml-8 mt-8 lg:mt-0">
                            <h2 className="text-2xl font-bold">The Web Developer Bootcamp</h2>
                            <p className="text-lg mt-3">The only course you need to learn web development - HTML, CSS, JS, Node, and More!</p>
                            <div className="flex items-center mt-4 text-lg ">
                                <div className='bg-yellow-500 p-1 rounded-lg'>
                                    <StarOutlined className="text-white font-semibold " />
                                    <span className="ml-2 ">5.3.2</span>
                                </div>
                                <span className="ml-2">(81,665 ratings)</span>
                            </div>
                            <p className="mt-3 text-lg">114,521 students enrolled</p>
                            <div className="flex items-center mt-4 text-lg mb-3">
                                <CommentOutlined className="" />
                                <span className="ml-2">English</span>
                            </div>
                            <p className="mt-2 text-lg">Last updated 1/2024</p>
                            <div className=" mt-4">
                                <Button type="primary" className="mr-2 bg-red-600 text-lg font-semibold p-5">Add to Cart</Button>
                                <Button type="default" className='text-lg font-semibold bg-gray-800 text-white p-5'>Buy Now</Button>
                            </div>
                            <p className="mt-2 text-lg">30-Day Money-Back Guarantee</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white py-4 shadow-md">
                <div className="container mx-auto px-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Avatar src="images/left-imgs/img-1.jpg" size="large" />
                            <div className="ml-4 flex flex-col">
                                <a href="#" className="text-lg font-semibold text-black mb-3">Johnson Smith</a>
                                <Button type="default" className="ml-2 p-5 text-lg bg-red-600 text-white font-semibold">Subscribe</Button>
                            </div>
                        </div>
                        <div className="flex items-center p-2">
                            <Badge showZero className=" flex flex-col items-center rounded-lg border border-gray-300 p-4">
                                <EyeOutlined className="text-2xl mr-1 mb-2" />
                                <span>1452</span>
                            </Badge>
                            <Badge showZero className="ml-2 flex flex-col items-center rounded-lg border border-gray-300 p-4">
                                <LikeOutlined className="text-2xl mr-1 mb-2" />
                                <span>100</span>
                            </Badge>
                            <Badge showZero className="ml-2 flex flex-col items-center rounded-lg border border-gray-300 p-4">
                                <DislikeOutlined className="text-2xl mr-1 mb-2" />
                                <span>20</span>
                            </Badge>
                            <Badge showZero className="ml-2 flex flex-col items-center rounded-lg border border-gray-300 p-4">
                                <ShareAltOutlined className="text-2xl mb-2" />
                                <span>9</span>
                            </Badge>
                        </div>
                    </div>
                    <Tabs defaultActiveKey="1" className="mt-4">
                        <TabPane tab={<span className='text-xl font-semibold'>About</span>} key="1">
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
                        <TabPane tab={<span className='text-xl font-semibold'>Course Content</span>} key="2">
                            <div className="p-4">
                                <div className="flex items-center mb-4 font-semibold">
                                    <h3 className="mr-auto text-2xl">Course content</h3>
                                    <span className="hover:text-red-700 cursor-pointer text-xl">Expand all</span>
                                    <span className="ml-4 text-xl">402 lectures</span>
                                    <span className="ml-4 text-xl">47:06:29</span>
                                </div>
                                <Collapse activeKey={openSection} onChange={handleToggle}>
                                    <Panel header={<span className="font-semibold text-xl">Introduction to this Course</span>} key="introCourse">
                                        <div className="text-lg">
                                            <ul className="list-none p-0">
                                                <li className="flex justify-between mb-2">
                                                    <span>A Note On Asking For Help</span>
                                                    <span>00:12</span>
                                                </li>
                                                <li className="flex justify-between mb-2">
                                                    <span>Introducing Our TA</span>
                                                    <span>01:42</span>
                                                </li>
                                                <li className="flex justify-between mb-2">
                                                    <span>Join the Online Community</span>
                                                    <span>00:51</span>
                                                </li>
                                                <li className="flex justify-between mb-2">
                                                    <span>Why This Course?</span>
                                                    <span>07:48</span>
                                                </li>
                                                <li className="flex justify-between mb-2">
                                                    <span>Syllabus Download</span>
                                                    <span>01:42</span>
                                                </li>
                                                <li className="flex justify-between mb-2">
                                                    <span>Lecture Slides</span>
                                                    <span>00:11</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </Panel>
                                    <Panel header={<span className="font-semibold text-xl">Introduction to Front End Development</span>} key="introFrontEnd">
                                        <div className="text-lg">
                                            <div className="flex justify-between mb-2">
                                                <span>8 lectures</span>
                                                <span>22:08</span>
                                            </div>
                                            <ul className="list-none p-0">
                                                <li className="flex justify-between mb-2">
                                                    <span>Unit Objectives</span>
                                                    <span>00:12</span>
                                                </li>
                                                <li className="flex justify-between mb-2">
                                                    <span>Note about Setting Up Front-End Developer Environment</span>
                                                    <span>01:42</span>
                                                </li>
                                                <li className="flex justify-between mb-2">
                                                    <span>Setting Up Front-End Developer Environment</span>
                                                    <span>00:51</span>
                                                </li>
                                                <li className="flex justify-between mb-2">
                                                    <span>Note about Introduction to the Web</span>
                                                    <span>07:48</span>
                                                </li>
                                                <li className="flex justify-between mb-2">
                                                    <span>Introduction to the Web</span>
                                                    <span>01:42</span>
                                                </li>
                                                <li className="flex justify-between mb-2">
                                                    <span>The Front End Holy Trinity</span>
                                                    <span>00:11</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </Panel>
                                </Collapse>
                            </div>
                        </TabPane>
                        <TabPane tab={<span className='text-xl font-semibold '>Reviews</span>} key="3">
                            <div className="flex ">
                                <div className="w-1/2 p-4 ">
                                    <h1 className="text-2xl font-semibold mb-2">Student Feedback</h1>
                                    <div className="flex items-center mb-4 bg-gray-100 rounded-lg p-4">
                                        <h2 className='text-xl font-semibold mr-2 ml-4'>4.6</h2>
                                        <div className="mr-4 text-2xl">
                                            {renderStars(4)}
                                        </div>
                                        <div>
                                            <div className="mt-2 text-lg font-semibold">Course Rating</div>
                                        </div>
                                    </div>
                                    <div className="w-full pl-4 md:w-1/2 md:pl-0 ">
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
                                                    <h4 className="font-semibold text-lg">John Doe</h4>
                                                    <span className="text-sm">2 hours ago</span>
                                                </div>
                                                <div className="mr-4 text-2xl">
                                                    {renderStars(4)}
                                                </div>
                                                <div className="flex items-center mb-2">
                                                </div>
                                                <p className="text-gray-600 text-lg mb-2">Nam gravida elit a velit rutrum, eget dapibus ex elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce lacinia, nunc sit amet tincidunt venenatis.</p>
                                                <div className="flex items-center space-x-4 text-gray-600 text-lg">
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
                                                    <h4 className="font-semibold text-lg">John Doe</h4>
                                                    <span className="text-sm">2 hours ago</span>
                                                </div>
                                                <div className="mr-4 text-2xl">
                                                    {renderStars(3)}
                                                </div>
                                                <div className="flex items-center mb-2">
                                                </div>
                                                <p className="text-gray-600 text-lg mb-2">Nam gravida elit a velit rutrum, eget dapibus ex elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce lacinia, nunc sit amet tincidunt venenatis.</p>
                                                <div className="flex items-center space-x-4 text-gray-600 text-lg">
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
                                                    <h4 className="font-semibold text-lg">John Doe</h4>
                                                    <span className="text-sm">2 hours ago</span>
                                                </div>
                                                <div className="mr-4 text-2xl">
                                                    {renderStars(4)}
                                                </div>
                                                <div className="flex items-center mb-2">
                                                </div>
                                                <p className="text-gray-600 text-lg mb-2">Nam gravida elit a velit rutrum, eget dapibus ex elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce lacinia, nunc sit amet tincidunt venenatis.</p>
                                                <div className="flex items-center space-x-4 text-gray-600 text-lg">
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
