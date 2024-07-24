import { Button, Card, Col, Divider, Radio, Row } from 'antd';
import { Cart } from 'models/types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCarts } from 'services/All/cartApiService';
import Paypal from '../assets/Paypal2.png';
import VNPay from '../assets/VNPay2.jpg';

const Checkout: React.FC = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await getCarts('', 1, 10);
        console.log(response.data); // Check the structure of the response data
        if (Array.isArray(response.data)) {
          setCarts(response.data);
        } else {
          console.error('Expected an array but received:', response.data);
        }
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);

  const totalPrice = Array.isArray(carts) ? 
    carts.reduce((total, product) => total + parseFloat(product.price), 0) 
    : 0;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
          {carts.map(product => (
            <React.Fragment key={product.id}>
              <Row>
                <Col span={16}>
                  <div className='flex'>
                    <div>
                      <img src={product.image_url} alt={product.name} className='w-40 h-24'/>
                    </div>
                    <div className='ml-4'>
                      <div className='text-lg font-medium'>{product.name}</div>
                      <div className='mt-4 font-medium text-gray-700'>By: {product.instructor_name}</div>
                      <div className='font-medium text-gray-700'>Category: {product.category_name}</div>
                    </div>
                  </div>
                </Col>
                <Col span={8} className='flex items-center font-medium'>{product.price} VNĐ</Col>
              </Row>
              <Divider />
            </React.Fragment>
          ))}
          <Row>
            <Col span={16} className='text-lg font-medium'>Total products: {carts.length}</Col>
            <Col span={8} className='text-lg font-medium'>Total Price: {totalPrice} VNĐ</Col>
          </Row>
        </Card>
      </div>
      <div className='w-4/5 m-10 mx-auto'>
        <Card>
          <div className='text-lg font-bold'>
            <div>
              Payment methods:
            </div>
            <Divider />
            <div>
              <Radio.Group name="radiogroup" defaultValue={1}>
                <Radio value={1}><img src={VNPay} alt="VNPay" className='w-32 h-32 mr-10'/></Radio>
                <Radio value={2}><img src={Paypal} alt="Paypal" className='w-32 h-32'/></Radio>
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
  );
};

export default Checkout;
