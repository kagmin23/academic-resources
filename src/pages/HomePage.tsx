import {
  ArrowRightOutlined,
  DotNetOutlined,
  DownOutlined,
  JavaOutlined,
  LeftOutlined,
  LinuxOutlined,
  OpenAIOutlined,
  RightOutlined,
  SketchOutlined
} from '@ant-design/icons';
import { Button, Card, Carousel, Col, Row, message, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCategories, getCourses } from 'services/User/clientApiService';
import { getCurrentUser } from '../services/AdminsApi/UserService';
import './styles.css';

interface Course {
  _id: string;
  name: string;
  category_id: string;
  category_name: string;
  status: string;
  description: string;
  video_url: string;
  image_url: string;
  price_paid: number;
  price: number;
  discount: number;
  full_time: number;
  average_rating?: number;
  review_count?: number;
  instructor_id: string;
  instructor_name: string;
  is_in_cart: boolean;
  is_purchased: boolean;
  session_count: number;
  lesson_count: number;
  created_at: Date;
  updated_at: Date;
  is_deleted?: boolean;
}

interface Category {
  _id: string;
  name: string;
  img: string;
}

interface ApiResponse {
  success: boolean;
  data: {
    pageData: any[];
  };
}

const HomePage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);


  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await getCurrentUser();
        if (response.success) {
          setCurrentUser(response.data);
        } else {
          notification.error({
            message: 'Error',
            description: 'Failed to fetch current user information',
          });
        }
      } catch (error) {
        // notification.error({
        //   message: 'Error',
        //   description: 'Failed to fetch current user information',
        // });
      }
    };

    fetchCurrentUser();
  }, []);



  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response: ApiResponse = await getCourses('', '', 1, 10);
        if (response.success) {
          setCourses(response.data.pageData);
        } else {
          message.error('Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        message.error('An error occurred. Please try again later.');
      }
    };

    const fetchCategories = async () => {
      try {
        const response: ApiResponse = await getCategories('', 1, 10);
        if (response.success) {
          setCategories(response.data.pageData);
        } else {
          message.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        message.error('An error occurred. Please try again later.');
      }
    };

    fetchCourses();
    fetchCategories();
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    if (targetId) {
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleSubscribe = async () => {
    if (!email) {
      message.error('Please enter your email address');
      return;
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        message.success('Subscription successful');
        setEmail('');
      } else {
        message.error('Subscription failed');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      message.error('An error occurred. Please try again later.');
    }
  };

  const CustomPrevArrow = (props: any) => (
    <button {...props} className="absolute left-0 z-10 border-2 rounded-md -inset-1 bg-slate-600">
      <LeftOutlined className="text-lg text-white" />
    </button>
  );

  const CustomNextArrow = (props: any) => (
    <button {...props} className="absolute right-0 z-10 border-2 rounded-md -inset-1 bg-slate-600">
      <RightOutlined className="text-xl text-white" />
    </button>
  );

  const handleNavigateToCourseDetails = (courseId: string) => {
    if (!currentUser) {
      navigate(`/course-details/${courseId}`);
    } else if (currentUser.role === 'student') {
      navigate(`/student/course-details/${courseId}`);
    } else if (currentUser.role === 'instructor') {
      navigate(`/instructor/course-details/${courseId}`);
    } else {
      navigate(`/course-details/${courseId}`);
    }
  };



  return (
    <div className="bg-gray-100 homepage">
      <header className="hero-image">
        <div className="overlay">
          <Button
            type="primary"
            shape="circle"
            icon={<DownOutlined />}
            size="large"
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
            href="#content"
            onClick={handleScroll}
          />
          <div
            className="box-header"
            style={{
              position: 'absolute',
              bottom: '70px',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              color: 'black',
            }}
          >
            <ol className="text-black">
              100,000 Online Courses
              <li>Explore a variety of fresh topics</li>
            </ol>
            <ol className="text-black">
              Expert Instruction
              <li>Find the right instructor for you</li>
            </ol>
            <ol className="text-black">
              Unlimited Lifetime Access
              <li>Learn on your schedule</li>
            </ol>
          </div>
        </div>
      </header>

      <div id="content">
        <div className="w-full text-center">
          <h2 className="ml-4 text-2xl font-bold sm:mt-20 sm:text-4xl">Popular Courses</h2>
          <Carousel
            arrows
            autoplay
            dotPosition="bottom"

            className="px-6"
            slidesToShow={4}
            prevArrow={<div><CustomPrevArrow /></div>}
            nextArrow={<div><CustomNextArrow /></div>}
            responsive={[
              {
                breakpoint: 1280,
                settings: {
                  slidesToShow: 4,
                },
              },
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                },
              },
            ]}
          >
            {courses.map((course, index) => (
              <div className="px-3 py-2 my-5 sm:my-10" key={index}>
                {/* <Link to={`course-details/${course._id}`}>
                  <img className="rounded-xl" src={course.image_url} alt={course.name} />
                </Link> */}
                <div onClick={() => handleNavigateToCourseDetails(course._id)}>
                  <img className="object-fill w-full h-40 rounded-xl lg:h-48" src={course.image_url} alt={course.name} />
                </div>
                <div className="">
                  <h1 className="flex justify-start p-3 text-lg font-bold truncate lg:text-xl">{course.name}</h1>

                </div>
                <div className='flex justify-between ml-3'>
                  <div className="flex flex-row font-semibold md:text-lg sm:text-sm ">
                    <span className="text-sm" style={{ textDecoration: 'line-through' }}>{course.price.toLocaleString('vi-VN')} đ</span> <span>({course.discount * 100}%)</span>
                    <div className='ml-3 text-orange-600'>{(course.price * (1 - course.discount)).toLocaleString('vi-VN')} đ</div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        <Link to="/course">
          <p className="text-center pt-2.5 sm:text-sm">View More <ArrowRightOutlined /></p>
        </Link>

        <div className="body-homebox">
          <div className="box image-box">
            <img className="sm:-ml-7" src="https://students.ubc.ca/sites/students.ubc.ca/files/styles/large_image_mobile_1_5x/public/17_07_14_StudyTips_1.jpg?itok=RdmR9DZr&timestamp=1505404484" alt="Image" />
          </div>
          <div className="sm:pt-10 sm:mr-20">
            <div className="flex flex-col items-center pt-20 sm:pt-10">
              <p className="text-xl font-bold text-center sm:text-3xl">Limitless Learning, More</p>
              <p className="text-xl font-bold text-center sm:text-3xl">Possibilities</p>
              <ul className="mt-5 mb-10 text-xl italic text-center text-blue-900 underline sm:text-2xl">
                Answer A Few Questions For Your Top Picks
              </ul>
              <div className="flex flex-wrap justify-center gap-10 pb-5 text-2xl text-blue-900">
                <SketchOutlined />
                <OpenAIOutlined />
                <LinuxOutlined />
                <JavaOutlined />
                <DotNetOutlined />
                ...
              </div>
            </div>
          </div>
        </div>

        <div className="box body-button sm:mb-2">
          <button className="text-2xl text-white">Join for free <ArrowRightOutlined /></button>
        </div>

        {/* <div className="w-full text-center">
          <h2 className="mt-10 ml-4 text-2xl font-bold sm:text-4xl">New Courses</h2>
          <Carousel
            arrows
            slidesToShow={4}
            autoplay
            className="px-6"
            dotPosition="bottom"
            prevArrow={<div className="flex flex-row"><CustomPrevArrow /></div>}
            nextArrow={<div className="flex flex-row"><CustomNextArrow /></div>}
            responsive={[
              {
                breakpoint: 1280,
                settings: {
                  slidesToShow: 4,
                },
              },
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                },
              },
            ]}
          >
          </Carousel>
        </div> */}
{/* 
        <Link to="/course-details">
          <p className="text-center pt-2.5 sm:text-sm">View More <ArrowRightOutlined /></p>
        </Link> */}

        <div className="flex items-center justify-center h-24 mt-8 font-bold sm:text-4xl">
          Top Categories
        </div>

        <Row gutter={[16, 16]} className="justify-center">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <Col key={index} xs={12} sm={8} md={6} lg={4}>
                <Card
                  bordered={false}
                  className="w-full h-48 transition duration-300 ease-in-out hover:shadow-md"
                  cover={<img alt={category.name} src={category.img} className="object-cover h-32 p-3" />}
                >
                  <div className="text-center">{category.name}</div>
                </Card>
              </Col>
            ))
          ) : (
            <div className="text-xl text-center">Loading categories...</div>
          )}
        </Row>

        <div className="bg-gray-100 contact-home">
          <h1 className="text-xl font-bold sm:text-2xl">Subscribe</h1>
          <p className="text-sm sm:text-base">Receive weekly newsletter with educational materials, new courses, interesting posts, popular books and much more!</p>
          <div className="flex flex-col mt-4 md:flex-row md:items-center">
            <input
              className="w-full p-2 mb-4 border border-gray-300 rounded md:mb-0 md:mr-4"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              className="w-full p-2 text-sm text-white bg-blue-600 rounded md:w-auto md:px-6 sm:text-base"
              type="primary"
              onClick={handleSubscribe}
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;