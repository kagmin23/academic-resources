import React, { useEffect, useState } from 'react';
import { Button, Card, ConfigProvider } from 'antd';
import sp from '../assets/sp.jpg';
import { getCarts, deleteCart } from 'services/All/CartApiService';
import { TinyColor } from '@ctrl/tinycolor';

// Color Button
const colors1 = ['#6253E1', '#04BEFE'];
const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

// Style Card
const gridStyle: React.CSSProperties = {
  width: '100%',
};

// Style Card Total
const cardTitleStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
};

export default function ShoppingCart() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCarts() {
      setLoading(true);
      try {
        const response = await getCarts('', 1, 10);
        // Ensure response.data is an array
        if (Array.isArray(response.data)) {
          setCourses(response.data); // Update with actual data path
        } else {
          console.error('Response data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCarts();
  }, []);

  const handleDelete = async (courseId: string) => {
    try {
      await deleteCart(courseId);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseId)
      );
    } catch (error) {
      console.error('Failed to delete cart item:', error);
    }
  };

  // Check if courses is an array before using reduce
  const totalPrice: number = Array.isArray(courses) ? courses.reduce((total, course) => total + parseFloat(course.price.replace('.', '')), 0) : 0;
  const discount: number = Array.isArray(courses) && courses.length >= 2 ? 0.1 : 0;
  const finalPrice: number = (totalPrice * (1 - discount));

  return (
    <div className="w-full min-h-screen mx-auto bg-gray-200">
      <div className="p-3 mb-4 font-bold md:text-2xl sm:text-lg bg-stone-50 md:px-32">
        Shopping Cart
      </div>
      <div className="flex flex-col flex-grow w-5/6 pt-5 pb-20 mx-auto lg:flex-row">
        <div className="w-full p-4 mr-3 item lg:w-2/3">
          <Card title={<div style={cardTitleStyle}>Your Courses</div>}>
            {loading ? (
              <div>Loading...</div>
            ) : (
              courses.map((course, index) => (
                <Card.Grid key={index} style={gridStyle} className="md:flex">
                  <img
                    src={course.image || sp}
                    alt="Product"
                    className="w-4/5 h-24 mx-auto md:w-1/3 md:h-36"
                  />
                  <div className="w-full md:flex md:w-2/3">
                    <div className="flex-grow mx-4">
                      <div className="w-full font-bold text-center md:text-lg sm:text-sm md:text-left">
                        {course.name}
                      </div>
                      <div className="w-full font-medium text-center md:text-base sm:text-xs text-slate-500 md:text-left">
                        By: {course.author}
                      </div>
                    </div>
                    <div className="md:w-1/5">
                      <div className="font-semibold text-center md:text-lg sm:text-sm">
                        <p>{course.price} VNĐ</p>
                      </div>
                      <Button
                        danger
                        className="w-full mt-5 font-bold text-center md:mt-16"
                        onClick={() => handleDelete(course.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card.Grid>
              ))
            )}
          </Card>
        </div>
        <div className="w-full p-4 item lg:w-1/3">
          <Card>
            <div className="pb-3 text-2xl font-medium text-center border-b border-gray-500">
              Total:
            </div>
            <div className="flex justify-between my-4 text-base font-medium">
              <div>Original Price</div>
              <div>{totalPrice.toLocaleString('vi-VN')}</div>
            </div>
            <div className="flex justify-between my-4 text-base font-medium">
              <div>Discount Price</div>
              <div>{(totalPrice * discount).toLocaleString('vi-VN')}</div>
            </div>
            <div className="flex justify-between py-5 text-xl font-bold border-t border-gray-500">
              <div>Total:</div>
              <div>{finalPrice.toLocaleString('vi-VN')} VNĐ</div>
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
              <a href="">
                <Button type="primary" size="large" className="w-full">
                  Checkout Now
                </Button>
              </a>
            </ConfigProvider>
          </Card>
        </div>
      </div>
    </div>
  );
}