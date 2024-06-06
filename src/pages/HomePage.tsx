import { ArrowRightOutlined, DownOutlined } from '@ant-design/icons';
import { Anchor, Button, Card, Col, Input, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const { Link: AnchorLink } = Anchor;

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

  return (
    <div className="homepage">
      <header className="hero-image" style={{ position: 'relative' }}>
        <img src="https://img.emg-services.net/HtmlPages/HtmlPage12273/untitled-design-10.jpg" alt="Academic-Resource" style={{ width: '100%' }} />
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
      </header>

      <Anchor affix={false}>
        <AnchorLink href="#content" title="Scroll to content" />
      </Anchor>

      <div id="content">
        <ul className="mt-8 ml-4 text-2xl font-bold">Popular Courses</ul>
        <Row gutter={[16, 16]}>
          {[
            {
              title: "Course 1",
              img: "https://media.licdn.com/dms/image/D4D12AQFvpv0FBeM8Ew/article-cover_image-shrink_720_1280/0/1700885047727?e=2147483647&v=beta&t=gKhQO6rfZq3p58Sa-GM9zFs5CgwZJqVyqPBcZtm2Pm0",
            },
            {
              title: "Course 2",
              img: "https://media.licdn.com/dms/image/D4D12AQFc3mT14dY9hg/article-cover_image-shrink_720_1280/0/1711408267815?e=2147483647&v=beta&t=HjY5P1_eU4eY5HjbdubrEi5WC-e3CRaAUkCqCf3SNHM",
            },
            {
              title: "Course 3",
              img: "https://media.licdn.com/dms/image/D4D12AQEWzo3Jn9T45A/article-cover_image-shrink_720_1280/0/1699138098059?e=2147483647&v=beta&t=mPHE7l2LY1WF1evOaWKldsg3ilnQWtUWSTahMpWnvGg",
            },
            {
              title: "Course 4",
              img: "https://media.licdn.com/dms/image/D4D12AQEzdr9CEqQnQQ/article-cover_image-shrink_720_1280/0/1701126577885?e=2147483647&v=beta&t=IQxCJTYMact7JzHJKFdsGiIE0j-Vt-hlUMQA4_GJtpU",
            },
            {
              title: "Course 5",
              img: "https://media.licdn.com/dms/image/D4D12AQHj6wiq5tpbAA/article-inline_image-shrink_1500_2232/0/1701126774921?e=1721865600&v=beta&t=HYaCCKDctqqeekdiERqAxu9SS72nnzZNX0cD28_2Ls4",
            },
            {
              title: "Course 6",
              img: "https://media.licdn.com/dms/image/D4E12AQEw_AaFDPr3TA/article-cover_image-shrink_720_1280/0/1702893319300?e=2147483647&v=beta&t=o4sdtfjIw2j4Oc9RjZRfMJjMC2IFJLFT8e_MoMMAkMQ",
            },
          ].map((course, index) => (
            <Col xs={24} sm={12} md={8} key={index} >
              <Card
                title={course.title}
                bordered={false}
                cover={<img alt={course.title} src={course.img} />}
                className='text-xl'>
                Course description here
                <Button type="primary" className='p-5 text-lg ml-9'>$$$</Button>
              </Card>
            </Col>
          ))}
        </Row>
        <Link to="/category"><p style={{textAlign:"center", paddingTop: "10px"}}>View More&nbsp;<ArrowRightOutlined /></p></Link>

        <div className="body-homebox">
          <div className="box image-box">
            <img src="https://students.ubc.ca/sites/students.ubc.ca/files/styles/large_image_mobile_1_5x/public/17_07_14_StudyTips_1.jpg?itok=RdmR9DZr&timestamp=1505404484" alt="Image" className="body-image" />
          </div>
          <div className="text-sm box text-box">
            <p className="pt-10 mb-10">Limitless Learning, More</p>
            <p className="mb-10">Possibilities</p>
            <ul style={{textDecoration: "underline"}} className="mb-10 text-lg">Answer A Few Questions For Your Top Picks</ul>
          </div>
        </div>

        <div className="box body-button">
          <button className="text-white">Join for free <ArrowRightOutlined /></button>
        </div>

        <ul className="mt-8 ml-4 text-2xl font-bold">New Courses </ul>
        <Row gutter={[16, 16]}>
          {[
            {
              title: "Course 1",
              img: "assets/demo.webp",
            },
            {
              title: "Course 2",
              img: "assets/academicdemo.jpg",
            },
            {
              title: "Course 3",
              img: "academicdemo.jpg",
            },
          ].map((course, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                title={course.title}
                bordered={false}
                cover={<img alt={course.title} src={course.img} />}
              >
                Course description here
                <Button type="primary">$$$</Button>
              </Card>
            </Col>
          ))}
        </Row>

        <Link to="/category">
          <div className="flex items-center justify-center h-24 mt-8 text-2xl font-bold">
            Top Categories
          </div>
        </Link>

        <Row gutter={[16, 16]} className="justify-center">
          {[
            {
              title: "Tailwind",
              img: "https://www.svgrepo.com/show/374118/tailwind.svg",
            },
            {
              title: "React",
              img: "https://cdn1.iconfinder.com/data/icons/education-set-3-3/74/15-512.png",
            },
            {
              title: "NextJs",
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
          ].map((category, index) => (
            <Col xs={24} sm={12} md={6} key={index} className="flex justify-center">
              <Card
                bordered={false}
                className="w-48 transition duration-300 ease-in-out hover:shadow-md "
                cover={<img alt={category.title} src={category.img} className="object-contain h-32" />}
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
