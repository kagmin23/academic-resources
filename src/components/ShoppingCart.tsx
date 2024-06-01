import React from 'react'
import { Card } from 'antd';
import sp from '../assets/sp.jpg';
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, Space } from 'antd';

const colors1 = ['#6253E1', '#04BEFE'];
const getHoverColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).darken(5).toString())
const courses = [
    {
      name: 'React for Beginners',
      price: '100.000',
      author: 'John Doe',
      image: sp
    },
    {
      name: 'Advanced React',
      price: '200.000',
      author: 'Jane Smith',
      image: sp
    },
    {
      name: 'Advanced React',
      price: '200.000',
      author: 'Jane Smith',
      image: sp
    }
  ];
const gridStyle: React.CSSProperties = {
  width: '100%',
  
};
const cardTitleStyle: React.CSSProperties = {
    fontSize: '24px', 
    fontWeight: 'bold', 
  };

export default function ShoppingCart() {
  const totalPrice: number = courses.reduce((total: number, course) => total + parseFloat(course.price.replace('.', '')), 0);
  // Mua trên 2 khóa được giảm 10%
  const discount: number = courses.length >= 2 ? 0.1 : 0;
  const finalPrice: number = (totalPrice * (1 - discount));
  return (
    <div className="  mx-auto w-full min-h-screen  bg-stone-200">
        <div className='md:text-2xl sm:text-lg p-3 font-bold mb-4 bg-stone-50 px-32'> Shopping Cart</div>
        
        <div className="flex flex-col md:flex-row flex-grow pt-5 w-5/6 mx-auto pb-20">
            
            <div className="item p-4 w-full mr-3 md:w-2/3">
              
                    
            <Card title={<div style={cardTitleStyle}>Your Courses</div>}>
            {courses.map((course, index) => (
                <Card.Grid key={index} style={gridStyle} className='flex '>
                <img src={course.image} alt="Product" className='w-1/3 h-36' /> 
                <div className='ml-4 flex-grow'>
                  <p className='font-bold text-lg'>{course.name}</p>
                  <p className='font-medium text-base text-slate-500'>By: {course.author}</p>
                </div>
                <div className='w-1/6 text-lg text-center font-semibold'><p>{course.price} VNĐ</p></div>
            
                </Card.Grid>))}
                
    
            </Card>
                
            </div>
            <div className="item p-4 w-full md:w-1/3 ">
                
                
            <Card >
              <div className='text-2xl font-medium text-center pb-3 border-b border-gray-500'>Total:</div>
              <div className='flex justify-between my-4 text-base font-medium'>
                    <div>Orignal Price</div>
                    <div>{(totalPrice).toLocaleString('vi-VN')}</div>
              </div>
              <div className='flex justify-between my-4 text-base font-medium'>
                    <div>Discount Price</div>
                    <div>{(totalPrice * discount).toLocaleString('vi-VN')}</div>
                    </div>
              
              
              <div className='flex justify-between py-5 text-xl font-bold border-t border-gray-500'>
                    <div>Total:</div>
                    <div>{(finalPrice).toLocaleString('vi-VN')} VNĐ</div>
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
  )
}
