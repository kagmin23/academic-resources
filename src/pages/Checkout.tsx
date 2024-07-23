import React from 'react'
import { Card } from 'antd';
import { Col, Row} from 'antd';
import { Divider,Button } from 'antd';
import { Flex, Radio } from 'antd';
import Paypal from '../assets/Paypal2.png'
import VNPay from '../assets/VNPay2.jpg'
const products = [
  {
    id: 1,
    name: 'Product 1',
    price: '10000',
    image_url: 'https://i.pinimg.com/564x/86/de/25/86de25bf5b2b497bb8be816e43e60bc0.jpg',
    user_name: 'Annette',
  },
  {
    id: 2,
    name: 'Product 2',
    price: '20000',
    image_url: 'https://i.pinimg.com/564x/86/de/25/86de25bf5b2b497bb8be816e43e60bc0.jpg',
    user_name: 'Annette',
  },
  {
    id: 3,
    name: 'Product 2',
    price: '20000',
    image_url: 'https://i.pinimg.com/564x/86/de/25/86de25bf5b2b497bb8be816e43e60bc0.jpg',
    user_name: 'Annette',
  },
  {
    id: 4,
    name: 'Product 2',
    price: '20000',
    image_url: 'https://i.pinimg.com/564x/86/de/25/86de25bf5b2b497bb8be816e43e60bc0.jpg',
    user_name: 'Annette',
  },
];

export default function Checkout() {
  const totalPrice = products.reduce((total, product) => total + parseFloat(product.price), 0);

  return (
    <div className="w-full min-h-screen  bg-gray-200 pb-5">
      <div className="p-3 mb-4 font-bold md:text-2xl sm:text-lg bg-stone-50 md:px-32">Checkout</div>
      <div className='w-4/5 pt-5 mx-auto'>
        <Card>
          <Row>
            <Col span={16} className='font-bold text-lg'>Products</Col>
            <Col span={8} className='font-bold text-lg'>Price</Col>
          </Row>
          <Divider />
          {products.map(product => (
            <React.Fragment key={product.id}>
              <Row>
                <Col span={16} className=''>
                  <div className='flex'>
                    <div>
                      <img src={product.image_url} alt={product.name} className='w-40 h-24'/>
                    </div>
                    <div className='ml-4 '>
                      <div className='text-lg font-medium'>{product.name}</div>
                      <div className='font-medium text-gray-700'>By: {product.user_name}</div>
                    </div>
                  </div>
                </Col>
                <Col span={8} className=' flex items-center font-medium'>{product.price} VNĐ</Col>
              </Row>
              <Divider />
            </React.Fragment>
          ))}
          <Row>
            <Col span={16} className='text-lg font-medium'>Total products: {products.length}</Col>
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
          <Radio value={1}><img src={VNPay} alt={VNPay} className='w-32 h-32 mr-10'/></Radio>
          <Radio value={2}><img src={Paypal} alt={Paypal} className='w-32 h-32'/></Radio>
    
          </Radio.Group></div>
          <Divider />
          <div className='flex justify-end'>
          <Button className='bg-red-600 text-white font-medium mr-10'>Cancel Orders</Button>
          <Button className='bg-blue-600 text-white font-medium'>Complete Orders</Button></div>
          </div>
        </Card>
      </div>
    </div>
  )
}
