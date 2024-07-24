import { TinyColor } from '@ctrl/tinycolor';
import { Button, Card, Checkbox, ConfigProvider, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteCart, getCarts } from 'services/All/CartApiService';
import sp from '../assets/sp.jpg';

const colors1 = ['#6253E1', '#04BEFE'];
const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());


const gridStyle: React.CSSProperties = {
  width: '100%',
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
};

const statusColors: { [key: string]: string } = {
  new: 'blue',
  waiting_paid: 'orange',
  cancel: 'red',
  completed: 'green',
};

export default function ShoppingCart() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchCarts() {
      setLoading(true);
      try {
        const response = await getCarts('', 1, 10);
        if (response.data && Array.isArray(response.data.pageData)) {
          setCourses(response.data.pageData);
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

  const showDeleteModal = (courseId: string) => {
    setCourseToDelete(courseId);
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    if (courseToDelete) {
      try {
        await deleteCart(courseToDelete);
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course._id !== courseToDelete)
        );
        setSelectedCourses((prevSelected) =>
          prevSelected.filter((id) => id !== courseToDelete)
        );
        setIsModalVisible(false);
        setCourseToDelete(null);
      } catch (error) {
        console.error('Failed to delete cart item:', error);
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCourseToDelete(null);
  };

  const handleCheckboxChange = (courseId: string) => {
    setSelectedCourses((prevSelected) =>
      prevSelected.includes(courseId)
        ? prevSelected.filter((id) => id !== courseId)
        : [...prevSelected, courseId]
    );
  };

  // const handleCheckout = () => {
  //   navigate('/checkout', { state: { courses: selectedCourses } });
  // };

  const selectedTotalPrice = courses
    .filter((course) => selectedCourses.includes(course._id))
    .reduce((total, course) => total + course.price * (1 - course.discount), 0);

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
              courses.map((course) => (
                <Card.Grid key={course._id} style={gridStyle} className="md:flex">
                  <Checkbox className='mr-4'
                    checked={selectedCourses.includes(course._id)}
                    onChange={() => handleCheckboxChange(course._id)}
                  />
                  <img
                    src={course.image_url || sp}
                    alt="Product"
                    className="w-4/5 h-24 mx-auto md:w-1/3 md:h-36"
                  />

                  <div className="w-full md:flex md:w-2/3">
                    <div className="flex-grow mx-4">
                      <div className="w-full font-bold text-center md:text-lg sm:text-sm md:text-left">
                        {course.course_name}
                      </div>
                      <div className="w-full font-medium text-center md:text-base sm:text-xs text-slate-500 md:text-left">
                        By: {course.instructor_name}
                      </div>
                      <div className='flex flex-row font-medium text-slate-500'>
                      <div className='ml-1' style={{ color: statusColors[course.status] }}>
                         {course.status.replace('_', ' ')}
                      </div>
                      </div>
                    </div>
                    <div className="md:w-1/5">
                      <div className="font-semibold text-center md:text-lg sm:text-sm">
                        <div>
                          <span className="text-sm" style={{ textDecoration: 'line-through' }}>{course.price.toLocaleString('vi-VN')} VNĐ</span> <span>({course.discount * 100}%)</span>
                        </div>
                        <div className="text-red-500">{(course.price * (1 - course.discount)).toLocaleString('vi-VN')} VNĐ</div>
                      </div>
                      <Button
                        danger
                        className="w-full mt-5 text-xs font-bold text-center md:mt-16"
                        onClick={() => showDeleteModal(course._id)}
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
              <div>Price</div>
              <div>{selectedTotalPrice.toLocaleString('vi-VN')} VNĐ</div>
            </div>
            <div className="flex justify-between py-5 text-xl font-bold border-t border-gray-500">
              <div>Total:</div>
              <div>{selectedTotalPrice.toLocaleString('vi-VN')} VNĐ</div>
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
            <Link to={`check-out`}>
                <Button
                    type="primary"
                    size="large"
                    className="w-full"
                    // onClick={handleCheckout}
                  >
                    Proceed to Checkout
                </Button>
            </Link>
            </ConfigProvider>
          </Card>
        </div>
      </div>

      <Modal
        title="Confirm Delete"
        visible={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this course?</p>
      </Modal>
    </div>
  );
}
