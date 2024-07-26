
import { BellOutlined, ExclamationCircleOutlined, PlayCircleOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Button, Modal, Tabs, message,notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCourseDetail } from 'services/UserClient/clientApiService';
import { createCart } from '../services/All/CartApiService';
import { createOrUpdate } from '../services/All/subcriptionApiService';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/AdminsApi/UserService'

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

interface SubscriptionResponse {
    success: boolean;
    data: {
        subscriber_id: string;
        instructor_id: string;
        is_subscribed: boolean;
        is_deleted: boolean;
        _id: string;
        created_at: Date;
        updated_at: Date;
        __v: number;
    }
}

const CourseDetail: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const [courseDetail, setCourseDetail] = useState<CourseDetailType | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null);

    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<any>(null);
    useEffect(() => {
        const fetchCurrentUser = async () => {
          try {
            const response = await getCurrentUser();
            if (response.success) {
              setCurrentUser(response.data);
            } else {
              notification.error({
                message: 'Error',
                description: 'Failed to fetch current user information',
              });
            }
          } catch (error) {
            // notification.error({
            //   message: 'Error',
            //   description: 'Failed to fetch current user information',
            // });
          }
        };
    
        fetchCurrentUser();
      }, []);


    const handleInstructorProfile = (userId: string) => {
        if (!currentUser) {
          navigate(`/instructor-detail/${userId}`);
        } else if (currentUser.role === 'student') {
          navigate(`/student/instructor-detail/${userId}`);
        } else if (currentUser.role === 'instructor') {
          navigate(`/instructor/instructor-detail/${userId}`);
        } else {
          navigate(`/instructor-detail/${courseId}`);
        }
      };
    

    const [loading, setLoading] = useState(false);
    const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionResponse | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await fetch('/api/check-login-status');
                const data = await response.json();
                setIsLoggedIn(data.isLoggedIn);
            } catch (error) {
                console.error('Failed to check login status:', error);
            }
        };

        checkLoginStatus();
    }, []);


    useEffect(() => {
        if (!courseId) {
            console.error('Course ID is not available');
            return;
        }
        const fetchCourseDetail = async () => {
            try {
                const response = await getCourseDetail(courseId);
                setCourseDetail(response.data);
                // Nếu đã đăng nhập, kiểm tra xem người dùng đã đăng ký khóa học chưa
                if (isLoggedIn) {
                    // Tạm thời cho là `subscriptionInfo` sẽ chứa thông tin đăng ký từ API
                    const response = await fetch(`/api/subscription-status/${courseId}`);
                    const data = await response.json();
                    setIsSubscribed(data.is_subscribed);
                }
            } catch (error) {
                console.error('Failed to fetch course details:', error);
            }
        };
        fetchCourseDetail();
    }, [courseId, isLoggedIn]);

    const handleSubscribe = async () => {
        if (!courseDetail) return;

        if (!isLoggedIn) {
            message.warning('Please log in to subscribe.');
            return;
        }

        setLoading(true);

        try {
            const response = await createOrUpdate(courseDetail.instructor_id);
            setSubscriptionInfo(response.data);
            const wasSubscribed = isSubscribed;
            setIsSubscribed(response.data.is_subscribed);

            // Hiển thị thông báo tương ứng với hành động
            if (wasSubscribed && !response.data.is_subscribed) {
                message.success('Unsubscribed Successfully!');
            } else if (!wasSubscribed && response.data.is_subscribed) {
                message.success('Subscribed Successfully!');
            }
        } catch (error) {
            console.error('Failed to subscribe:', error);
            message.error(isSubscribed ? 'Failed to unsubscribe' : 'Failed to subscribe');
        } finally {
            setLoading(false);
        }
    };

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

    const toggleSession = (sessionId: string) => {
        setExpandedSessionId(expandedSessionId === sessionId ? null : sessionId);
    };

    const renderStars = (starCount: number) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < starCount) {
                stars.push(<span key={i} role="img" aria-label="star" className="text-yellow-600">⭐️</span>);
            } else {
                stars.push(<span key={i} role="img" aria-label="star" className="text-gray-300">⭐️</span>);
            }
        }
        return stars;
    };

    if (!courseDetail) {
        return <div className="text-center text-white">Loading...</div>;
    }

    return (
        <div className="text-white bg-gray-900">
            <div className="py-8">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-col lg:flex-row lg:space-x-8">
                        <div className="w-full mb-4 lg:w-1/3 lg:mb-0">
                            <div className="relative">
                                <a onClick={showModal} className="block cursor-pointer">
                                    <img src={courseDetail.image_url} alt={courseDetail.name} className="w-full rounded-lg" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                        <PlayCircleOutlined className="text-4xl text-white" />
                                        <span className="absolute bottom-0 w-full py-2 text-xl font-semibold text-center text-white bg-black bg-opacity-75">Preview this course</span>
                                    </div>
                                </a>
                                <Modal
                                    visible={isModalVisible}
                                    onCancel={handleCancel}
                                    footer={null}
                                    centered
                                >
                                    <iframe
                                        width="100%"
                                        height="400px"
                                        src={courseDetail.video_url}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </Modal>
                            </div>
                            <div className="mt-4">
                                <Button type="link" className="text-lg text-white" icon={<ExclamationCircleOutlined />}>Report abuse</Button>
                            </div>
                        </div>

                        <div className="w-full lg:w-2/3">
                            <h2 className="text-2xl font-bold">{courseDetail.name}</h2>
                            <p className="mt-3 text-lg">{courseDetail.description}</p>
                            <div className="flex items-center mt-4 text-lg">
                                <div className="p-1 bg-yellow-500 rounded-lg">
                                    <StarOutlined className="font-semibold text-white" />
                                    <span className="ml-2">{courseDetail.average_rating}</span>
                                </div>
                                <span className="ml-2">({courseDetail.review_count} Ratings)</span>
                            </div>
                            <p className="mt-3 text-lg">{courseDetail.review_count} students enrolled</p>
                            <div className="flex items-center mt-4 mb-3 text-lg">
                                {courseDetail.category_name}
                            </div>
                            <p className="mt-2 text-lg">Last updated: {new Date(courseDetail.updated_at).toLocaleDateString()}</p>
                            <div className="flex mt-4 space-x-4">
                                <Button type="primary" className="p-5 text-lg font-semibold bg-red-600" onClick={handleAddToCart}>Add to Cart</Button>
                                <Link to={`/student/buy-now?courseId=${courseDetail._id}`}>
                                    <Button type="default" className="p-5 text-lg font-semibold text-white bg-gray-800">Buy Now</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4 bg-white shadow-md">
                <div className="container px-4 mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Avatar src={courseDetail.instructor_id} size="large" />

                            <div className="ml-4 flex flex-col">
                                <div  onClick={() => handleInstructorProfile(courseDetail.instructor_id)}>
                                <a href="#" className="text-lg font-semibold text-black" >{courseDetail.instructor_name}</a></div>

                                <Button
                                    onClick={handleSubscribe}
                                    type="primary"
                                    loading={loading}
                                    className={`mr-2 mt-2 p-1 text-sm font-semibold w-full ${isSubscribed ? 'bg-gray-200 text-black' : 'bg-red-500 text-white'}`}
                                >
                                    {isSubscribed ? (
                                        <>
                                            <BellOutlined /> Unsubscribe
                                        </>
                                    ) : (
                                        'Subscribe'
                                    )}
                                </Button>
                            </div>
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
                                                            <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full"></div>
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
                                {/* Render reviews here */}
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
