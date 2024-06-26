import {
  ArrowRightOutlined,
  DotNetOutlined,
  DownOutlined,
  FlagOutlined,
  HeartOutlined,
  JavaOutlined,
  LeftOutlined,
  LinuxOutlined,
  OpenAIOutlined,
  RightOutlined,
  SketchOutlined
} from '@ant-design/icons';
import { Button, Card, Carousel, Col, Row, message } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Import the custom CSS file

const Courses = [
  {
    title: "Course 1",
    img: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
    price:100,
  },
  {
    title: "Course 2",
    img: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
    price:100,
  },
  {
    title: "Course 3",
    img: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
    price:100,
  },
  {
    title: "Course 4",
    img: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
    price:100,
  },
  {
    title: "Course 5",
    img: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
    price:100,
  },
  {
    title: "Course 6",
    img: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
    price:100,
  },
];

const NewCourses = [
  {
    title: "Course 1",
    img: "https://cursa.app/img/catimgs/information-technology.webp",
    price:100,
  },
  {
    title: "Course 2",
    img: "https://cursa.app/img/catimgs/information-technology.webp",
    price:100,
  },
  {
    title: "Course 3",
    img: "https://cursa.app/img/catimgs/information-technology.webp",
    price:100,
  },
  {
    title: "Course 4",
    img: 'https://cursa.app/img/catimgs/information-technology.webp',
    price:100,
  },
  {
    title: "Course 5",
    img: 'https://cursa.app/img/catimgs/information-technology.webp',
    price:100,
  },
];

const Categories = [
  {
    title: "HTML",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRKrMluJOagc_Q-_PTfTYahHFFtgCsGsCDo_Qna-EQurzJ3l4yQsc0hdpz9d_5pFzKUSY&usqp=CAU",
  },
  {
    title: "Javascript",
    img: "https://play-lh.googleusercontent.com/rfWOJQVBHoAZ_B43v0ySFlLmJBLtksVGAxGaFRh2ex4nOmNQ86qzG4sYWV63IKrXlvI",
  },
  {
    title: "Tailwind CSS",
    img: "https://ahmedkhald.com/static/media/tailwind.bf288b24c40bf937884e.png",
  },
  {
    title: "React",
    img: "https://cdn1.iconfinder.com/data/icons/education-set-3-3/74/15-512.png",
  },
  {
    title: "NextJS",
    img: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/nextjs-icon.png",
  },
  {
    title: "Typescripts",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2_979C0CYjHp3QH53N8pLqEI2Ku6g5fLTwA&s",
  },
  {
    title: "Ant Design",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbK58xrNN4qN90eMgx4KAkgz53IWUAqfNsGA&s",
  },
  {
    title: "GitHub",
    img: "https://cdn-icons-png.flaticon.com/512/2111/2111425.png",
  }
];

const HomePage: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleScroll = (e: React.MouseEvent) => {
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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
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
    <button
      {...props}
      className="absolute left-0 z-10 border-2 rounded-md -inset-1 bg-slate-600"
    >
      <LeftOutlined className="text-lg text-white" />
    </button>
  );

  const CustomNextArrow = (props: any) => (
    <button
      {...props}
      className="absolute right-0 z-10 border-2 rounded-md -inset-1 bg-slate-600"
    >
      <RightOutlined className="text-xl text-white" />
    </button>
  );

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
              color: 'black'
            }}
          >
            <ol className="text-black">100,000 Online Courses
              <li>Explore a variety of fresh topics</li>
            </ol>
            <ol className="text-black">Expert Instruction
              <li>Find the right instructor for you</li>
            </ol>
            <ol className="text-black">Unlimited Lifetime Access
              <li>Learn on your schedule</li>
            </ol>
          </div>
        </div>
      </header>

      <div id="content">
        <div className='flex items-center justify-center w-full'>
          <div className='w-full text-center'>
            <ul className="ml-4 text-2xl font-bold sm:mt-20 sm:text-4xl">Popular Courses</ul>
            <Carousel
              arrows
              autoplay
              dotPosition='bottom'
              className='px-6'
              slidesToShow={4}
              prevArrow={<div><CustomPrevArrow /></div>}
              nextArrow={<div><CustomNextArrow /></div>}
              responsive={[
                {
                  breakpoint: 1280,
                  settings: {
                    slidesToShow: 4,
                  }
                },
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2,
                  }
                }
              ]}
            >
              {Courses.map((course, index) => (
                <div className='p-2 my-5 sm:my-10' key={index}>
                  <Link to={`course-details`}>
                    <img className="rounded-xl" src={course.img} alt="no image" />
                  </Link>
                  <div className='flex'>
                    <h1 className='text-xl font-bold truncate lg:text-2xl'>{course.title}</h1>
                  </div>
                  <div className='flex space-x-9 sm:space-x-24 md:space-x-32 lg:space-x-36'>
                    <p className='lg:text-lg'>{course.price}.000 VND</p>
                    <div className='flex'>
                      <Button size='small' title='Save this course' className='p-2 text-white bg-red-500'><HeartOutlined /></Button>
                      <Button size='small' title='Report this course' className='p-2 text-white bg-blue-500'><FlagOutlined /></Button>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>

        <Link to="/course-details">
          <p className="text-center pt-2.5 sm:text-sm">View More&nbsp;<ArrowRightOutlined /></p>
        </Link>

        <div className="body-homebox">
          <div className="box image-box">
            <img className='sm:-ml-7' src="https://students.ubc.ca/sites/students.ubc.ca/files/styles/large_image_mobile_1_5x/public/17_07_14_StudyTips_1.jpg?itok=RdmR9DZr&timestamp=1505404484" alt="Image" />
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

        <div className='flex items-center justify-center w-full'>
          <div className='w-full text-center'>
            <ul className="mt-10 ml-4 text-2xl font-bold sm:text-4xl">New Courses</ul>
            <Carousel
              arrows
              slidesToShow={4}
              autoplay
              className='px-6'
              dotPosition='bottom'
              prevArrow={<div className='flex flex-row'><CustomPrevArrow /></div>}
              nextArrow={<div className='flex flex-row'><CustomNextArrow /></div>}
              responsive={[
                {
                  breakpoint: 1280,
                  settings: {
                    slidesToShow: 4,
                  }
                },
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2,
                  }
                }
              ]}
            >
              {NewCourses.map((course, index) => (
                <div className='p-2 my-5 sm:my-10' key={index}>
                  <Link to={`course-details`}>
                    <img className="rounded-xl" src={course.img} alt="no image" />
                  </Link>
                  <div className='flex'>
                    <h1 className='text-xl font-bold truncate lg:text-2xl'>{course.title}</h1>
                  </div>
                  <div className='flex space-x-9 sm:space-x-24 md:space-x-32 lg:space-x-36'>
                    <p className='lg:text-lg'>{course.price}.000 VND</p>
                    <div className='flex'>
                      <Button size='small' title='Save this course' className='p-2 text-white bg-red-500'><HeartOutlined /></Button>
                      <Button size='small' title='Report this course' className='p-2 text-white bg-blue-500'><FlagOutlined /></Button>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <Link to="/course-details">
          <p className="text-center pt-2.5 sm:text-sm">View More&nbsp;<ArrowRightOutlined /></p>
        </Link>

        <div className="flex items-center justify-center h-24 mt-8 text-2xl font-bold">
          Top Categories
        </div>

        <Row gutter={[16, 16]} className="justify-center">
          {Categories.map((category, index) => (
            <Col xs={24} sm={12} md={6} key={index} className="flex justify-center">
              <Card
                bordered={false}
                className="w-32 h-32 transition duration-300 ease-in-out sm:w-48 sm:h-48 hover:shadow-md"
                cover={<img alt={category.title} src={category.img} className="object-contain h-20 p-3 sm:h-32" />}
              >
                <div className="text-center">{category.title}</div>
              </Card>
            </Col>
          ))}
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
