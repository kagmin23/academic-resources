
import { BellOutlined, PlayCircleOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Form, Input, Modal, Rate, Spin, Tabs, Typography, message, notification } from 'antd';
import { Review } from 'models/types';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createReview, getReviews, updateReview } from 'services/All/reviewApiService';
import { getCourseDetail } from 'services/UserClient/clientApiService';
import { getCurrentUser } from '../services/AdminsApi/UserService';
import { createCart } from '../services/All/CartApiService';
import { createOrUpdate, getItemBySubscriber } from '../services/All/subcriptionApiService';

const { TabPane } = Tabs;
const { Title, Paragraph } = Typography;
const { TextArea } = Input;

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
    lesson_list: Lesson[];
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
    const [reviewRating, setReviewRating] = useState<number>(0);
    const [reviewComment, setReviewComment] = useState<string>('');
    const [loadingReview, setLoadingReview] = useState<boolean>(false);
    const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
    const [updatedReviewRating, setUpdatedReviewRating] = useState<number>(0);
    const [updatedReviewComment, setUpdatedReviewComment] = useState<string>('');
    const [loadingUpdateReview, setLoadingUpdateReview] = useState<boolean>(false);
    const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionResponse | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
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
                message.error("Failed to fetch current user!")
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

    useEffect(() => {
        if (courseId) {
            setLoading(true);
            const fetchCourseDetail = async () => {
                try {
                    const response = await getCourseDetail(courseId);
                    setCourseDetail(response);
                } catch (error) {
                    console.error('Failed to fetch course detail:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchCourseDetail();
        }
    }, [courseId]);

    useEffect(() => {
        if (courseId) {
            const fetchReviews = async () => {
                setLoading(true);
                try {
                    const response = await getReviews(courseId, 1, 10);
                    setReviews(response);
                } catch (error) {
                    console.error('Failed to fetch reviews:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchReviews();
        }
    }, [courseId]);

    const handleSubmitReview = async () => {
        if (!courseId) return;

        setLoadingReview(true);

        try {
            const response = await createReview(courseId, reviewComment, reviewRating);
            notification.success({
                message: 'Review Submitted',
                description: 'Your review has been successfully submitted.',
            });
            setReviews([...reviews, response]); // Update the reviews list
            form.resetFields(); // Reset the form fields
        } catch (error) {
            notification.error({
                message: 'Error Submitting Review',
                description: 'There was an error submitting your review. Please try again.',
            });
        } finally {
            setLoadingReview(false);
        }
    };

    const handleSubscribe = async () => {
        if (!courseDetail) return;
        try {
            await createOrUpdate(courseDetail.instructor_id);
            fetchSubscriptionStatus();
            message.success(isSubscribed ? 'Unsubscribed Successfully!' : 'Subscribed Successfully!');
        } catch (error) {
            console.error('Failed to subscribe:', error);
            message.error(isSubscribed ? 'Failed to unsubscribe' : 'Failed to subscribe');
        } finally {
            setLoading(false);
        }
    };
    
    const fetchSubscriptionStatus = async () => {
        const response = await getItemBySubscriber("", 1, 10);
        setIsSubscribed(response[0].is_subscribed);
    };
    useEffect(() => {
        fetchSubscriptionStatus();
    },
        []);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleUpdateReview = async () => {
        if (!editingReviewId) return;

        setLoadingUpdateReview(true);

        try {
            const response = await updateReview(editingReviewId, updatedReviewComment, updatedReviewRating);
            notification.success({
                message: 'Review Updated',
                description: 'Your review has been successfully updated.',
            });
            setReviews(reviews.map((review) =>
                review._id === editingReviewId ? { ...review, comment: updatedReviewComment, rating: updatedReviewRating } : review
            ));
            setEditingReviewId(null);
            form.resetFields();
        } catch (error) {
            notification.error({
                message: 'Error Updating Review',
                description: 'There was an error updating your review. Please try again.',
            });
        } finally {
            setLoadingUpdateReview(false);
        }
    };


    const handleAddToCart = async () => {
        if (!courseId) {
            message.error('Course ID is not available');
            return;
        }
        try {
            const response = await createCart({ course_id: courseId });
            message.success('Course added to cart successfully!');
        } catch (error) {
            console.error('Failed to add course to cart:', error);
            message.error('Failed to add course to cart');
        }
    };

    const toggleSession = (sessionId: string) => {
        setExpandedSessionId(expandedSessionId === sessionId ? null : sessionId);
    };

    if (!courseDetail) {
        return <div className="text-center text-white">Loading...</div>;
    }

    return (
        <Spin spinning={loading} tip="Loading...">
        <div className="text-white bg-gray-900">
            <div className="py-8">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-col lg:flex-row lg:space-x-8">
                        <div className="w-full mb-4 lg:w-1/3 lg:mb-0">
                            <div className="relative">
                                <a onClick={showModal} className="cursor-pointer">
                                    <img src={courseDetail.image_url} alt={courseDetail.name} className="w-full rounded-lg h-80" />
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
                        </div>

                        <div className="w-full lg:w-2/3">
                            <h2 className="text-2xl font-bold">{courseDetail.name}</h2>
                            <p className="mt-3 text-lg">{courseDetail.description}</p>
                            <div className="flex items-center mt-4 text-lg">
                                <div className="p-1">
                                    <StarOutlined className="font-semibold text-white" />
                                    <StarOutlined className="font-semibold text-white" />
                                    <StarOutlined className="font-semibold text-white" />
                                    <StarOutlined className="font-semibold text-white" />
                                    <StarOutlined className="font-semibold text-white" />
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
                                {/* <Link to={`/student/buy-now?courseId=${courseDetail._id}`}>
                                    <Button type="default" className="p-5 text-lg font-semibold text-white bg-gray-800">Buy Now</Button>
                                </Link> */}
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

                            <div className="flex flex-col ml-4">
                                <div onClick={() => handleInstructorProfile(courseDetail.instructor_id)}>
                                    <a href="" className="text-lg font-semibold text-black" >{courseDetail.instructor_name}</a></div>

                                <Button
                                    onClick={handleSubscribe}
                                    type="primary"
                                    loading={loading}
                                    className={`mr-2 mt-2 p-1 text-sm font-semibold w-full ${isSubscribed ? 'bg-gray-300 text-black' : 'bg-red-500 text-white'}`}
                                >
                                    {isSubscribed ? (
                                        <>
                                            <BellOutlined /> Subscribed
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
                                                {session.lesson_list && session.lesson_list.length > 0 ? (
                                                    session.lesson_list.map((lesson) => (
                                                        <li key={lesson._id} className="flex items-center py-2">
                                                            <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full"></div>
                                                            <div className="ml-4">
                                                                <div className="text-lg font-medium">{lesson.name}</div>
                                                                <div className="text-gray-600">{lesson.lession_type} {lesson.full_time} mins</div>
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
                                <Form form={form} layout="vertical" onFinish={handleSubmitReview}>
                                    <Form.Item
                                        name="rating"
                                        label="Rating"
                                        rules={[{ required: true, message: 'Please select a rating!' }]}
                                    >
                                        <Rate
                                            allowHalf
                                            onChange={(value) => setReviewRating(value)}
                                            value={reviewRating}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="comment"
                                        label="Comment"
                                        rules={[{ required: true, message: 'Please enter your comment!' }]}
                                    >
                                        <TextArea
                                            rows={4}
                                            onChange={(e) => setReviewComment(e.target.value)}
                                            value={reviewComment}
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={loadingReview}
                                        >
                                            Submit Review
                                        </Button>
                                    </Form.Item>
                                </Form>

                                {Array.isArray(reviews) && reviews.length > 0 ? (
                                    reviews.map((review) => (
                                        <Card
                                            key={review._id}
                                            className="mb-4"
                                            title={<Title level={4}>{courseDetail?.name}</Title>}
                                            extra={
                                                <div>
                                                    <Rate disabled value={review.rating} />
                                                    <div className="text-sm text-gray-500">
                                                        {moment(review.created_at).format('YYYY-MM-DD')} - {moment(review.updated_at).format('YYYY-MM-DD')}
                                                    </div>
                                                </div>
                                            }
                                        >
                                            <Paragraph strong>{review.reviewer_name}</Paragraph>
                                            <Paragraph>{review.comment}</Paragraph>
                                            {currentUser?._id === review.user_id && (
                                                <Button
                                                    type="link"
                                                    onClick={() => {
                                                        setEditingReviewId(review._id);
                                                        setUpdatedReviewRating(review.rating);
                                                        setUpdatedReviewComment(review.comment);
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                            )}
                                        </Card>
                                    ))
                                ) : (
                                    <p>No reviews available.</p>
                                )}

                                {editingReviewId && (
                                    <Form layout="vertical" onFinish={handleUpdateReview}>
                                        <Form.Item
                                            name="rating"
                                            label="Rating"
                                            rules={[{ required: true, message: 'Please select a rating!' }]}
                                        >
                                            <Rate
                                                allowHalf
                                                onChange={(value) => setUpdatedReviewRating(value)}
                                                value={updatedReviewRating}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="comment"
                                            label="Comment"
                                            rules={[{ required: true, message: 'Please enter your comment!' }]}
                                        >
                                            <TextArea
                                                rows={4}
                                                onChange={(e) => setUpdatedReviewComment(e.target.value)}
                                                value={updatedReviewComment}
                                            />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                loading={loadingUpdateReview}
                                            >
                                                Update Review
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                )}
                            </div>
                        </TabPane>

                    </Tabs>
                </div>
            </div>
        </div>
    </Spin>
    );
};

export default CourseDetail;
