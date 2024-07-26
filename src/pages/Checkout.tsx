import { Button, Card, Col, Divider, Radio, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCarts } from 'services/All/CartApiService';
import Paypal from '../assets/Paypal2.png';
import VNPay from '../assets/VNPay2.jpg';

export interface Cart {
  _id: string;
  cart_no: string;
  status: string;
  price: number;
  discount: number;
  course_id: string;
  student_id: string;
  instructor_id: string;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}

const Checkout: React.FC = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const status = '';
    const pageNum = 1;
    const pageSize = 10;

    const fetchCarts = async () => {
      try {
        const response = await getCarts(status, pageNum, pageSize);
        console.log('API Response:', response);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);

  const totalPrice = carts.reduce((total, product) => total + product.price, 0);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full min-h-screen pb-5 bg-gray-200">
      <div className="p-3 mb-4 font-bold md:text-2xl sm:text-lg bg-stone-50 md:px-32">Checkout</div>
      <div className="flex flex-col flex-grow w-5/6 pt-5 pb-20 mx-auto lg:flex-row">
        <div className="w-full p-4 mr-3 item lg:w-2/3">
          <Card>
            <Row>
              <Col span={16} className='text-lg font-bold'>Products</Col>
              <Col span={8} className='text-lg font-bold'>Price</Col>
            </Row>
            <Divider />
            {carts.map(product => (
              <React.Fragment key={product._id}>
                <Row>
                  <Col span={16}>
                    <div className='flex'>
                      {/* <div>
                        <img src={product.image_url} alt={product.course_id} className='w-40 h-24'/>
                      </div> */}
                      <div className='ml-4'>
                        <div className='text-lg font-medium'>{product.course_id}</div>
                        <div className='mt-4 font-medium text-gray-700'>By: {product.instructor_id}</div>
                        <div className='font-medium text-gray-700'>Category: {product.course_id}</div>
                      </div>
                    </div>
                  </Col>
                  <Col span={8} className='flex items-center font-medium'>{product.price} đ</Col>
                </Row>
                <Divider />
              </React.Fragment>
            ))}
            <Row>
              <Col span={16} className='text-lg font-medium'>Total products: {carts.length}</Col>
              <Col span={8} className='text-lg font-medium'>Total Price: {totalPrice} đ</Col>
            </Row>
          </Card>
        </div>
        <div className="w-full p-4 item lg:w-1/3">
          <Card>
            <div className='text-lg font-bold'>
              <div>
                Payment methods:
              </div>
              <Divider />
              <div>
                <Radio.Group name="radiogroup" defaultValue={1}>
                  <Radio value={1}><img src={VNPay} alt="VNPay" className='mr-4 w-28 h-28'/></Radio>
                  <Radio value={2}><img src={Paypal} alt="Paypal" className='w-28 h-28'/></Radio>
                </Radio.Group>
              </div>
              <Divider />
              <div className='flex justify-end'>
                <Link to="/student/shopping-cart">
                  <Button className='mr-3 font-medium text-white bg-red-600'>Cancel</Button>
                </Link>
                <Link to="/student/payment-successfully">
                  <Button className='font-medium text-white bg-blue-600'>Complete</Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
