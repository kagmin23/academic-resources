import React from 'react';
import { Card, Button, ConfigProvider } from 'antd';
import { TinyColor } from '@ctrl/tinycolor';
import { DeleteFilled } from '@ant-design/icons';
import sp from '../assets/sp.jpg';

// Một mục dữ liệu giả
const course = {
    name: 'React for Beginners',
    price: '100.000',
    author: 'John Doe',
    image: sp
};

// Các màu cho button
const colors1 = ['#6253E1', '#04BEFE'];
const getHoverColors = (colors: string[]) => colors.map(color => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) => colors.map(color => new TinyColor(color).darken(5).toString());

export default function BuyNow() {
    const totalPrice = parseFloat(course.price.replace('.', ''));

    return (
        <div className="mx-auto w-full min-h-screen bg-gray-200">
            <div className="md:text-2xl sm:text-lg p-3 font-bold mb-4 bg-stone-50 md:px-32">Checkout</div>

            <div className="flex flex-col lg:flex-row flex-grow pt-5 w-5/6 mx-auto pb-20">
                <div className="item p-4 w-full mr-3 lg:w-2/3">
                    <Card title={<div style={{ fontSize: '24px', fontWeight: 'bold' }}>Your Course</div>}>
                        <Card.Grid style={{ width: '100%' }} className='md:flex'>
                            <img src={course.image} alt="Product" className='md:w-1/3 md:h-36 h-24 w-4/5 mx-auto' />
                            <div className='md:flex md:w-2/3 w-full items-center'>
                                <div className='mx-4 flex-grow'>
                                    <div className='font-bold md:text-lg sm:text-sm text-center md:text-left w-full'>{course.name}</div>
                                    <div className='font-medium md:text-base sm:text-xs text-slate-500 text-center md:text-left w-full'>By: {course.author}</div>
                                </div>
                                <div className='md:text-lg sm:text-sm text-center md:w-1/4 font-semibold'>
                                    <p>{course.price} VNĐ</p>
                                </div>
                            </div>
                        </Card.Grid>
                    </Card>
                </div>
                <div className="item p-4 w-full lg:w-1/3">
                    <Card>
                        <div className='text-2xl font-medium text-center pb-3 border-b border-gray-500'>Total:</div>
                        <div className='flex justify-between my-4 text-base font-medium'>
                            <div>Orignal Price</div>
                            <div>{totalPrice.toLocaleString('vi-VN')}</div>
                        </div>
                        <div className='flex justify-between my-4 text-base font-medium'>
                            <div>Discount Price</div>
                            <div>0</div>
                        </div>
                        <div className='flex justify-between py-5 text-xl font-bold border-t border-gray-500'>
                            <div>Total:</div>
                            <div>{totalPrice.toLocaleString('vi-VN')} VNĐ</div>
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
                            <Button type="primary" size="large" className='w-full'>
                                Checkout Now
                            </Button>
                        </ConfigProvider>
                    </Card>
                </div>
            </div>
        </div>
    );
}
