import React, { useState } from 'react';
import { Button, Modal, Tabs, Avatar, Badge, message } from 'antd';
import { Link } from 'react-router-dom';
import { createCart } from 'services/All/CartApiService';
import {
    CommentOutlined,
    DislikeOutlined,
    ExclamationCircleOutlined,
    EyeOutlined,
    HeartOutlined,
    LikeOutlined,
    PlayCircleOutlined,
    ShareAltOutlined,
    StarOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;

const CourseDetail: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleAddToCart = async () => {
        try {
            const response = await createCart({
                course_id: 'courseId',
            });
            console.log('Cart item added successfully:', response.data);
            message.success('Course added to cart successfully!');
        } catch (error) {
            console.error('Failed to add course to cart:', error);
            message.error('Failed to add course to cart');
        }
    };

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
                                <Button type="primary" className="p-5 mr-2 text-lg font-semibold bg-red-600" onClick={handleAddToCart}>Add to Cart</Button>
                                <Link to={`/student/buy-now`}><Button type="default" className='p-5 text-lg font-semibold text-white bg-gray-800'>Buy Now</Button></Link>
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
                        </TabPane>
                        <TabPane tab={<span className='text-xl font-semibold'>Instructor</span>} key="2">
                            <div>
                                <h3 className='mb-2 text-2xl font-semibold'>Johnson Smith</h3>
                                <p className="text-xl text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. At maiores quam doloribus ullam quasi. Expedita sapiente aut sit natus autem et voluptates labore, ipsa molestias tempora reiciendis illo nostrum magnam!</p>
                            </div>
                        </TabPane>
                        <TabPane tab={<span className='text-xl font-semibold'>Reviews</span>} key="3">
                            <div>
                                <h3 className='mb-2 text-2xl font-semibold'>Reviews</h3>
                                {ratings.map((rating, index) => (
                                    <div key={index} className="flex items-center mb-2">
                                        <div className="flex-shrink-0 w-1/5">{renderStars(rating.stars)}</div>
                                        <div className="flex-grow w-4/5 bg-gray-200">
                                            <div className="h-4 bg-yellow-500" style={{ width: `${rating.percentage}%` }}></div>
                                        </div>
                                        <div className="ml-2">{rating.percentage}%</div>
                                    </div>
                                ))}
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
