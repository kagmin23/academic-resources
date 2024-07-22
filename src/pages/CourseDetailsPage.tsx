import React, { useEffect, useState } from 'react';
import { Button, Modal, Tabs, Avatar, Badge, message } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { createCart } from 'services/All/CartApiService';
import { getCourseDetail } from 'services/User/clientApiService';
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

interface CourseDetailType {
    _id: string,
    name: string,
    description: string,
    category_id: string,
    category_name: string,
    status: string,
    video_url: string,
    image_url: string,
    price_paid: number,
    price: number,
    discount: number,
    average_rating: number,
    review_count: number,
    instructor_id: string,
    instructor_name: string,
    full_time: number,
    session_list: {
        _id: string,
        name: string,
        position_order: number,
        lession_list: {
            _id: string,
            name: string,
            lession_type: string,
            position_order: number,
            full_time: number,
        }
    }[],
    is_in_cart: boolean,
    is_purchased: boolean,
    created_at: Date,
    updated_at: Date,
    is_deleted: boolean,
}

const CourseDetail: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const [courseDetail, setCourseDetail] = useState<CourseDetailType | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        if (!courseId) {
            console.error('Course ID is not available');
            return;
        }
        const fetchCourseDetail = async () => {
            try {
                const response = await getCourseDetail(courseId);
                setCourseDetail(response.data);
            } catch (error) {
                console.error('Failed to fetch course details:', error);
            }
        };
        fetchCourseDetail();
    }, [courseId]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleAddToCart = async () => {
        if (!courseId) {
            message.error('Course ID is not available');
            return;
        }
        try {
            const response = await createCart({
                course_id: courseId,
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

    if (!courseDetail) {
        return <div>Loading...</div>;
    }

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
                            <h2 className="text-2xl font-bold">{courseDetail.name}</h2>
                            <p className="mt-3 text-lg">{courseDetail.description}</p>
                            <div className="flex items-center mt-4 text-lg ">
                                <div className='p-1 bg-yellow-500 rounded-lg'>
                                    <StarOutlined className="font-semibold text-white " />
                                    <span className="ml-2 ">{courseDetail.average_rating}</span>
                                </div>
                                <span className="ml-2">({courseDetail.average_rating} ratings)</span>
                            </div>
                            <p className="mt-3 text-lg">{courseDetail.review_count} students enrolled</p>
                            <div className="flex items-center mt-4 mb-3 text-lg">
                                <CommentOutlined className="" />
                                <span className="ml-2">English</span>
                            </div>
                            <p className="mt-2 text-lg">Last updated {new Date(courseDetail.updated_at).toLocaleDateString()}</p>
                            <div className="mt-4 ">
                                <Button type="primary" className="p-5 mr-2 text-lg font-semibold bg-red-600" onClick={handleAddToCart}>Add to Cart</Button>

                                <Link to={`/student/buy-now?courseId=${courseDetail._id}`}>
                                    <Button type="default" className='p-5 text-lg font-semibold text-white bg-gray-800'>
                                        Buy Now
                                    </Button>
                                </Link>

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
                            <Avatar src={courseDetail.instructor_id} size="large" />
                            <div className="flex flex-col ml-4">
                                <a href="#" className="mb-3 text-lg font-semibold text-black">{courseDetail.instructor_name}</a>
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
                                    <ShareAltOutlined className="mb-2 mr-1 text-2xl" />
                                    <span>75</span>
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-8 bg-white">
                <div className="container px-3 mx-auto">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<span className="text-lg font-semibold text-black">Overview</span>} key="1">
                            <div className="mt-4">
                                <h3 className="mb-2 text-2xl font-semibold text-black">Course Description</h3>
                                <p className="text-lg text-black">{courseDetail.description}</p>
                            </div>
                            <div className="mt-4">
                                <h3 className="mb-2 text-2xl font-semibold text-black">Instructor</h3>
                                <p className="text-lg text-black">{courseDetail.instructor_name}</p>
                            </div>
                        </TabPane>
                        <TabPane tab={<span className="text-lg font-semibold text-black">Reviews</span>} key="2">
                            <div className="mt-4">
                                {ratings.map((rating, index) => (
                                    <div key={index} className="flex items-center mb-4">
                                        <div className="flex-shrink-0">{renderStars(rating.stars)}</div>
                                        <div className="flex-grow h-2 ml-4 bg-gray-200">
                                            <div className="h-2 bg-yellow-500" style={{ width: `${rating.percentage}%` }}></div>
                                        </div>
                                        <div className="flex-shrink-0 ml-4">{rating.percentage}%</div>
                                    </div>
                                ))}
                            </div>
                        </TabPane>
                        <TabPane tab={<span className="text-lg font-semibold text-black">Q&A</span>} key="3">
                            <div className="mt-4">
                                <h3 className="mb-2 text-2xl font-semibold text-black">Course Description</h3>
                                <p className="text-lg text-black">{courseDetail.description}</p>
                            </div>
                            <div className="mt-4">
                                <h3 className="mb-2 text-2xl font-semibold text-black">Instructor</h3>
                                <p className="text-lg text-black">{courseDetail.instructor_name}</p>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;