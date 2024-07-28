import { TinyColor } from '@ctrl/tinycolor';
import { Button, Card, ConfigProvider, Image, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { createCart } from 'services/All/cartApiService';
import { getCourseDetail } from 'services/UserClient/clientApiService';


const colors1 = ['#6253E1', '#04BEFE'];
const getHoverColors = (colors: string[]) => colors.map(color => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) => colors.map(color => new TinyColor(color).darken(5).toString());

const BuyNow: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const courseId = searchParams.get('courseId');
    const [courseDetail, setCourseDetail] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!courseId) return;
        const fetchCourseDetail = async () => {
            setLoading(true);
            try {
                const response = await getCourseDetail(courseId);
                setCourseDetail(response.data);
            } catch (error) {
                console.error('Failed to fetch course details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourseDetail();
    }, [courseId]);

    const handleAddToCart = async () => {
        if (!courseDetail) {
            message.error('Course details are not available');
            return;
        }
        try {
            const response = await createCart({ course_id: courseDetail._id });
            console.log('Course added to cart successfully:', response.data);
            message.success('Course added to cart successfully!');
        } catch (error) {
            console.error('Failed to add course to cart:', error);
            message.error('Failed to add course to cart');
        }
    };

    if (loading) return <div>Loading...</div>;

    if (!courseDetail) return <div>No course details available</div>;

    const formattedPrice = courseDetail.price.toLocaleString('vi-VN');
    const discountedPrice = (courseDetail.price * (1 - courseDetail.discount / 100)).toLocaleString('vi-VN');

    return (
        <div className="w-full min-h-screen mx-auto bg-gray-200">
            <div className="p-3 mb-4 font-bold md:text-2xl sm:text-lg bg-stone-50 md:px-32">Checkout</div>
            <div className="flex flex-col w-5/6 mx-auto lg:flex-row lg:space-x-8 lg:pt-5 lg:pb-20">
                <div className="w-full p-4 mr-3 item lg:w-2/3">
                    <Card title={<div style={{ fontSize: '24px', fontWeight: 'bold' }}>Your Course</div>}>
                        <Card.Grid style={{ width: '100%' }} className='md:flex'>
                            <Image className='w-4/5 h-24 mx-auto md:w-1/3 md:h-36'
                                src={courseDetail.image_url}
                            />
                            <div className="flex flex-col flex-grow w-5/6 pt-5 pb-20 mx-auto lg:flex-row">
                                <div className='items-center w-full md:flex md:w-2/3'>
                                    <div className='flex-grow mx-4'>
                                        <div className='w-full font-bold text-center md:text-lg sm:text-sm md:text-left'>{courseDetail.name}</div>
                                        <div className='w-full font-medium text-center md:text-base sm:text-xs text-slate-500 md:text-left'>By: {courseDetail.price}</div>
                                    </div>
                                    <div className='font-semibold text-center md:text-lg sm:text-sm md:w-1/4'>
                                        <p className="mt-4 text-lg font-semibold">Price: {formattedPrice} đ</p>
                                        {courseDetail.discount > 0 && (
                                            <p className="mt-2 text-lg font-semibold text-red-600">
                                                Discounted Price: {discountedPrice} %
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </Card.Grid>
                    </Card>
                </div>
                <div className="w-full p-4 item lg:w-1/3">
                <Card>
                    <div className='pb-3 text-2xl font-medium text-center border-b border-gray-500'>Total</div>
                    <div className='flex justify-between my-4 text-base font-medium'>
                        <div>Orignal Price:</div>
                        <div className='ml-10'>{formattedPrice} đ</div>
                    </div>
                    <div className='flex justify-between my-4 text-base font-medium'>
                        <div>Discount Price</div>
                        <div>0</div>
                    </div>
                    <div className='flex justify-between py-5 text-xl font-bold border-t border-gray-500'>
                        <div>Total:</div>
                        <div className='ml-10'>{formattedPrice} đ</div>
                    </div>
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
                                    colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
                                    colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
                                    lineWidth: 0,
                                },
                            },
                        }}
                    >   
                        <div className="mt-4">
                            <Button type="primary" size="large" className='w-full'>
                                Checkout Now
                            </Button>
                            <Link to={`/checkout/${courseId}`}>
                                <Button type="default">Buy Now</Button>
                            </Link>
                        </div>
                        </ConfigProvider>
                </Card>
                </div>
            </div>
        </div>
    );
};

export default BuyNow;
