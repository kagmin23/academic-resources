
import { BellOutlined, EditOutlined, PlayCircleOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Form, Input, Modal, Rate, Spin, Tabs, Typography, message, notification } from 'antd';
import { Review } from 'models/types';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCart } from 'services/All/cartApiService';
import { createReview, getReviews, updateReview } from 'services/All/reviewApiService';
import { createOrUpdate, getItemBySubscriber } from 'services/All/subcriptionApiService';
import { getCourseDetail } from 'services/UserClient/clientApiService';

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
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [button, setButton] = useState<string>('Add to cart');
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [isPurchased, setIsPurchased] = useState<boolean>(false);

    useEffect(() => {
        if (courseDetail) {
            if (courseDetail.is_in_cart) {
                if (courseDetail.is_purchased) {
                    setButton("Learn Now")
                } else {
                    setButton("Go to cart")
                }
            } else {
                setButton("Add to cart")
            }
        }
    },
        [courseDetail])

    useEffect(() => {
        if (courseId) {
            setLoading(true);
            const fetchCourseDetail = async () => {
                try {
                    const response = await getCourseDetail(courseId);
                    setCourseDetail(response);
                    setIsPurchased(response.is_purchased);
                } catch (error: any) {
                    notification.error({
                        message: "Failed to fetch Courses details!",
                        description:
                            error.message || "Failed to fetch Courses details. Please try again.",
                    });
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
                } catch (error: any) {
                    notification.error({
                        message: "Failed to fetch Reviews!",
                        description:
                            error.message || "Failed to fetch Reviews. Please try again.",
                    });
                } finally {
                    setLoading(false);
                }
            };
            fetchReviews();
        }
    }, [courseId]);

    const handleInstructorProfile = (userId: string) => {
        navigate(`instructor-detail/${userId}`)
    };
    const handleEditReview = (review: Review) => {
        setEditingReviewId(review._id);
        setUpdatedReviewRating(review.rating);
        setUpdatedReviewComment(review.comment);
        form.setFieldsValue({
            rating: review.rating,
            comment: review.comment,
        });
    };

    const handleSubmitReview = async () => {
        if (!courseId) return;
        setLoadingReview(true);

        try {
            if (editingReviewId) {
                // If editingReviewId is set, update the review
                await updateReview(editingReviewId, reviewComment, reviewRating);
                notification.success({
                    message: 'Review Updated',
                    description: 'Your review has been successfully updated.',
                });

                // Update the reviews array with the updated review
                setReviews(reviews.map(review =>
                    review._id === editingReviewId
                        ? { ...review, comment: reviewComment, rating: reviewRating }
                        : review
                ));
                setEditingReviewId(null); // Reset the editing state
            } else {
                // If editingReviewId is not set, create a new review
                const response = await createReview(courseId, reviewComment, reviewRating);
                notification.success({
                    message: 'Review Submitted',
                    description: 'Your review has been successfully submitted.',
                });
                setReviews([...reviews, response]);
            }
            form.resetFields();
        } catch (error: any) {
            notification.error({
                message: editingReviewId ? 'Failed to update Review!' : 'Failed to create Review!',
                description:
                    error.message || 'Failed to submit the review. Please try again.',
            });
        } finally {
            setLoadingReview(false);
        }
    };

    const handleSubscribe = async () => {
        if (!courseDetail) return;
        setLoading(true);
        try {
            await createOrUpdate(courseDetail.instructor_id);
            // Update the isSubscribed state immediately
            setIsSubscribed(!isSubscribed);
            message.success(isSubscribed ? 'Unsubscribed Successfully!' : 'Subscribed Successfully!');
        } catch (error: any) {
            notification.error({
                message: "Failed to Subscribe!",
                description:
                    error.message || "Failed to Subscribe. Please try again.",
            });
            message.error(isSubscribed ? 'Failed to unsubscribe' : 'Failed to subscribe');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscriptionStatus();
    }, []);

    const fetchSubscriptionStatus = async () => {
        try {
            const response = await getItemBySubscriber(1, 10);
            console.log('Subscription Response:', response);

            if (response && response.length > 0 && response[0] && 'is_subscribed' in response[0]) {
                setIsSubscribed(response[0].is_subscribed);
            } else {
                console.error('Subscription status not found in response');
                setIsSubscribed(false);
            }
        } catch (error: any) {
            notification.error({
                message: "Failed to fetch Subscription Status!",
                description:
                    error.message || "Failed to fetch Subscription Status. Please try again.",
            });
            setIsSubscribed(false);
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
            message.success('Course added to cart successfully!');
        } catch (error: any) {
            notification.error({
                message: "Failed to Add to Cart!",
                description:
                    error.message || "Failed to Add to Cart. Please try again.",
            });
        }
    };

    const handleSetButton = () => {
        if (button === "Learn Now") {
            navigate(`/student/student-learning/${courseId}/lesson`);
        } else if (button === "Go to cart") {
            navigate(`/student/shopping-cart`);
        } else if (button === "Add to cart") {
            handleAddToCart();
        }
    }

    const toggleSession = (sessionId: string) => {
        setExpandedSessionId(expandedSessionId === sessionId ? null : sessionId);
    };

    if (!courseDetail) {
        return <div className="text-center text-white">Loading...</div>;
    }

    return (
        <div className="relative min-h-screen">
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <Spin size="large" />
                </div>
            ) : (
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
                                        <Button type="primary" className="p-5 text-lg font-semibold bg-red-600" onClick={handleSetButton}>{button}</Button>                            </div>
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
                                    <div>
                                        {reviews.length > 0 ? (
                                            reviews.map((review) => (
                                                <Card key={review._id} className="mb-3">
                                                    <Card.Meta
                                                        avatar={<Avatar>{review.reviewer_name.charAt(0)}</Avatar>}
                                                        title={
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex flex-col">
                                                                    <div className="flex items-center gap-4">
                                                                        <span>{review.reviewer_name}</span>
                                                                        <span className="text-xs text-gray-400">{moment(review.created_at).format('LL')}</span>
                                                                    </div>
                                                                    <Rate className="text-sm" value={review.rating} disabled />
                                                                </div>
                                                                <div className="mt-5">
                                                                    <Button size="small" type="text" icon={<EditOutlined />} onClick={() => handleEditReview(review)} />
                                                                </div>
                                                            </div>
                                                        }
                                                        description={<p className="text-sm text-black">{review.comment}</p>}
                                                    />
                                                </Card>
                                            ))
                                        ) : (
                                            <div>No reviews available</div>
                                        )}
                                        {isPurchased && (
                                            <Form form={form} onFinish={handleSubmitReview} className="mt-4">
                                                <Form.Item name="rating" rules={[{ required: true, message: 'Please provide a rating' }]}>
                                                    <Rate onChange={(value) => setReviewRating(value)} value={reviewRating} />
                                                </Form.Item>
                                                <Form.Item name="comment" rules={[{ required: true, message: 'Please provide a comment' }]}>
                                                    <TextArea rows={4} onChange={(e) => setReviewComment(e.target.value)} value={reviewComment} />
                                                </Form.Item>
                                                <Form.Item>
                                                    <Button type="primary" htmlType="submit" loading={loadingReview}>
                                                        {editingReviewId ? 'Update Review' : 'Submit Review'}
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
            )}
        </div>
    );
};

export default CourseDetail;
