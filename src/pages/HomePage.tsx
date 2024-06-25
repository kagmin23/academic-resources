import { ArrowRightOutlined, DownOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Card, Carousel, Col, Input, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Import the custom CSS file

const Courses = [
  {
    title: "Course 1",
    img: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
  },
  {
    title: "Course 2",
    img: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
  },
  {
    title: "Course 3",
    img: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
  },
  {
    title: "Course 4",
    img: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
  },
  {
    title: "Course 5",
    img: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
  },
  {
    title: "Course 6",
    img: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
  },
];

const NewCourses = [
  {
    title: "Course 1",
    img: "https://cursa.app/img/catimgs/information-technology.webp",
  },
  {
    title: "Course 2",
    img: "https://cursa.app/img/catimgs/information-technology.webp",
  },
  {
    title: "Course 3",
    img: "https://cursa.app/img/catimgs/information-technology.webp",
  },
  {
    title: "Course 4",
    img: 'https://cursa.app/img/catimgs/information-technology.webp',
  },
  {
    title: "Course 5",
    img: 'https://cursa.app/img/catimgs/information-technology.webp',
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

  const CustomPrevArrow = (props: any) => (
    <Button
      {...props}
      className="absolute left-0 z-10 p-0 bg-transparent border-none opacity-50 hover:opacity-100"
    >
      <LeftOutlined className="text-xl text-black" />
    </Button>
  );

  const CustomNextArrow = (props: any) => (
    <Button
      {...props}
      className="absolute right-0 z-10 p-0 bg-transparent border-none opacity-50 hover:opacity-100"
    >
      <RightOutlined className="text-xl text-black" />
    </Button>
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
          <div className="box-header" style={{ position: 'absolute', bottom: '70px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', color: 'black' }}>
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
        <div className='flex items-center justify-center w-full '>
          <div className='w-full text-center'>
            <ul className="sm:mt-20 ml-4 text-2xl sm:text-4xl font-bold">Popular Courses</ul>
           <Carousel className=''
             slidesToShow={3}
              autoplay
              dotPosition='bottom'>
                 {Courses.map((course,index) =>(
                  <div className='my-5 p-2 sm:my-10'>
                     <Link to={`course-details`}>
                  <img className="rounded-xl " src={course.img} alt="no image" />
                  </Link>
                  <div className='flex space-x-8 sm:space-x-72'>
                  <h1 className='ml-2 text-xl font-bold truncate  '>{course.title}</h1>
                  </div>
                </div>
                 ))}
                 
           </Carousel>
            
          </div>
        </div>

        <Link to="/course">
          <p className="text-center pt-2.5 sm:text-xl">View More&nbsp;<ArrowRightOutlined /></p>
        </Link>

        <div className="body-homebox">
          <div className="box image-box">
            <img src="https://students.ubc.ca/sites/students.ubc.ca/files/styles/large_image_mobile_1_5x/public/17_07_14_StudyTips_1.jpg?itok=RdmR9DZr&timestamp=1505404484" alt="Image" className="" />
          </div>
          <div className="text-sm box text-box">
            <p className="pt-10 mb-5">Limitless Learning,More</p>
            <p className="mb-10">Possibilities</p>
            <ul className="mb-10  sm:text-lg underline">Answer A Few Questions For Your Top Picks</ul>
          </div>
        </div>

        <div className="box body-button">
          <button className="text-white text-2xl ">Join for free <ArrowRightOutlined /></button>
        </div>

        <div className='flex items-center justify-center w-full'>
          <div className='w-full text-center'>
            <ul className="mt-10 ml-4 text-2xl sm:text-4xl font-bold">New Courses</ul>
            <Carousel
              slidesToShow={3}
              autoplay
              dotPosition='bottom'
              
            >
              {NewCourses.map((course, index) => (
                <div className='my-5 p-2 sm:my-10'>
                <Link to={`course-details`}>
             <img className="rounded-xl " src={course.img} alt="no image" />
             </Link>
             <div className='flex'>
             <h1 className='ml-2 text-sm sm:text-xl sm:font-bold truncate'>{course.title}</h1>
             </div>
           </div>
              ))}
            </Carousel>
          </div>
        </div>

        <div className="flex items-center justify-center h-24 mt-8 text-2xl font-bold">
          Top Categories
        </div>

        <Row gutter={[16, 16]} className="justify-center">
          {Categories.map((category, index) => (
            <Col xs={24} sm={12} md={6} key={index} className="flex justify-center">
              <Card
                bordered={false}
                className="w-32 sm:w-48 h-32 sm:h-48 transition duration-300 ease-in-out hover:shadow-md"
                cover={<img alt={category.title} src={category.img} className="object-contain h-20 sm:h-32 p-3" />}
              >
                <div className="text-center">{category.title}</div>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="p-8 bg-gray-100 contact-home">
          <h1 className="text-2xl font-bold">Subscriber</h1>
          <p>Receive weekly newsletter with educational materials, new courses, interesting posts, popular books and much more!</p>
          <div className="flex flex-col mt-4 md:flex-row md:items-center">
            <Input className="w-full mb-4 md:mb-0 md:mr-4" placeholder="Enter your email" />
            <Button className="w-full md:w-auto" type="primary">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
