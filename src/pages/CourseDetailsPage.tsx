import React, { useEffect, useState } from 'react';
import { Button, Modal, Tabs, Avatar, message } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { createCart } from 'services/All/CartApiService';
import { getCourseDetail } from 'services/User/clientApiService';
import { createOrUpdate } from 'services/All/SubcriptionApiService';
import { CommentOutlined, ExclamationCircleOutlined, PlayCircleOutlined, HeartOutlined, StarOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

interface Lesson {
    _id: string;
    name: string;
    lession_type: string;
    position_order: number;
    full_time: number;
}

interface Session {
    _id: string;
    name: string;
    position_order: number;
    lession_list: Lesson[];
}

interface CourseDetailType {
    _id: string;
    name: string;
    description: string;
    category_id: string;
    category_name: string;
    status: string;
    video_url: string;
    image_url: string;
    price_paid: number;
    price: number;
    discount: number;
    average_rating: number;
    review_count: number;
    instructor_id: string;
    instructor_name: string;
    full_time: number;
    session_list: Session[];
    is_in_cart: boolean;
    is_purchased: boolean;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean;
}

const CourseDetail: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const [courseDetail, setCourseDetail] = useState<CourseDetailType | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null);

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
            const response = await createCart({ course_id: courseId });
            console.log('Cart item added successfully:', response.data);
            message.success('Course added to cart successfully!');
        } catch (error) {
            console.error('Failed to add course to cart:', error);
            message.error('Failed to add course to cart');
        }
    };

    const handleSubscribe = async () => {
        if (!courseDetail) return;
        try {
            await createOrUpdate(courseDetail.instructor_id);
            setIsSubscribed(true);
            message.success('Subscription successful!');
        } catch (error) {
            console.error('Failed to subscribe:', error);
            message.error('Failed to subscribe');
        }
    };

    const toggleSession = (sessionId: string) => {
        // If the clicked session is already expanded, collapse it; otherwise, expand it
        setExpandedSessionId(expandedSessionId === sessionId ? null : sessionId);
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
                                <Button onClick={handleSubscribe} type="primary" className="mr-2">
                                    {isSubscribed ? 'Subscribed' : 'Subscribe'}
                                </Button>
                                <span className="text-gray-600">69,025 students</span>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <Button type="link" icon={<PlayCircleOutlined />}>Preview this course</Button>
                            <Button type="link" icon={<HeartOutlined />}>Add to Wishlist</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4 bg-gray-100">
                <div className="container px-4 mx-auto">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Curriculum" key="1">
                            {courseDetail.session_list && courseDetail.session_list.length > 0 ? (
                                courseDetail.session_list.map((session) => (
                                    <div key={session._id} className="p-4 mb-4 bg-white rounded shadow-md">
                                        <h3 className="text-xl font-semibold cursor-pointer" onClick={() => toggleSession(session._id)}>
                                            {session.name}
                                        </h3>
                                        {expandedSessionId === session._id && (
                                            <ul>
                                                {session.lession_list && session.lession_list.length > 0 ? (
                                                    session.lession_list.map((lesson) => (
                                                        <li key={lesson._id} className="flex items-center py-2">
                                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200"></div>
                                                            <div className="ml-4">
                                                                <div className="text-lg font-medium">{lesson.name}</div>
                                                                <div className="text-gray-600">{lesson.lession_type} - {lesson.full_time} mins</div>
                                                            </div>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li>No lessons available</li>
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div>No sessions available</div>
                            )}
                        </TabPane>
                        <TabPane tab="Reviews" key="2">
                            <div className="p-4">
                                {/* Review content goes here */}
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
