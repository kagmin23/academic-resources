import { Button, Card, Col, Divider, Radio, Row } from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Paypal from '../assets/Paypal2.png';
import VNPay from '../assets/VNPay2.jpg';
import sp from '../assets/sp.jpg';

interface Checkout {
  _id: string;
  course_name: string;
  price: number;
  discount: number;
  image?: string;
  instructor_name: string;
}

export default function Checkout() {
  const location = useLocation();
  const { courses } = location.state as { courses: Checkout[] };

  const totalPrice = courses.reduce((total: number, course: Checkout) =>
    total + course.price * (1 - course.discount), 0
  );

  return (
    <div className="w-full min-h-screen pb-5 bg-gray-200">
      <div className="p-3 mb-4 font-bold md:text-2xl sm:text-lg bg-stone-50 md:px-32">Checkout</div>
      <div className='w-4/5 pt-5 mx-auto'>
        <Card>
          <Row>
            <Col span={16} className='text-lg font-bold'>Products</Col>
            <Col span={8} className='text-lg font-bold'>Price</Col>
          </Row>
          <Divider />
          {courses.map(course => (
            <React.Fragment key={course._id}>
              <Row>
                <Col span={16} className=''>
                  <div className='flex'>
                    <div>
                      <img src={course.image || sp} alt={course.course_name} className='w-40 h-24'/>
                    </div>
                    <div className='ml-4'>
                      <div className='text-lg font-medium'>{course.course_name}</div>
                      <div className='font-medium text-gray-700'>By: {course.instructor_name}</div>
                    </div>
                  </div>
                </Col>
                <Col span={8} className='flex items-center font-medium'>
                  {(course.price * (1 - course.discount)).toLocaleString('vi-VN')} VNĐ
                </Col>
              </Row>
              <Divider />
            </React.Fragment>
          ))}
          <Row>
            <Col span={16} className='text-lg font-medium'>Total products: {courses.length}</Col>
            <Col span={8} className='text-lg font-medium'>Total Price: {totalPrice.toLocaleString('vi-VN')} VNĐ</Col>
          </Row>
        </Card>
      </div>
      <div className='w-4/5 m-10 mx-auto'>
        <Card>
          <div className='text-lg font-bold'>
            <div>Payment methods:</div>
            <Divider />
            <div>
              <Radio.Group name="radiogroup" defaultValue={1}>
                <Radio value={1}><img src={VNPay} alt={VNPay} className='w-32 h-32 mr-10'/></Radio>
                <Radio value={2}><img src={Paypal} alt={Paypal} className='w-32 h-32'/></Radio>
              </Radio.Group>
            </div>
            <Divider />
            <div className='flex justify-end'>
              <Button className='mr-10 font-medium text-white bg-red-600'>Cancel Orders</Button>
              <Button className='font-medium text-white bg-blue-600'>Complete Orders</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
