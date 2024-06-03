import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Row } from 'antd';
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
        <header className="hero-image">
            <img src="assets/academicdemo.jpg" alt="Academic-Resource" />
            <div className="box-header">
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
    <ul className="mt-8 ml-4 text-2xl font-bold">Popular Courses</ul>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Course 1"
            bordered={false}
            cover={<img alt="Course 1" src="assets/demo.webp" />}
          >
            Course description here
            <Button type="primary">Buy Now</Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Course 2"
            bordered={false}
            cover={<img alt="Course 2" src="assets/academicdemo.jpg" />}
          >
            Course description here
            <Button type="primary">Buy Now</Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Course 3"
            bordered={false}
            cover={<img alt="Course 3" src="academicdemo.jpg" />}
          >
            Course description here
            <Button type="primary">Buy Now</Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Course 4"
            bordered={false}
            cover={<img alt="Course 4" src="academicdemo.jpg" />}
          >
            Course description here
            <Button type="primary">Buy Now</Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Course 5"
            bordered={false}
            cover={<img alt="Course 5" src="academicdemo.jpg" />}
          >
            Course description here
            <Button type="primary">Buy Now</Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Course 6"
            bordered={false}
            cover={<img alt="Course 6" src="academicdemo.jpg" />}
          >
            Course description here
            <Button type="primary">Buy Now</Button>
          </Card>
        </Col>
      </Row>
      
      <div className="body-homebox">
        <div className="box image-box">
            <img src="academicdemo.jpg" alt="Image" className="body-image"/>
        </div>
        <div className="box text-box">
            <p className="pt-4">Limitless Learning, More</p>
            <p>Possibilities</p>
            <p className="text-lg">Answer A Few Questions For Your Top Picks</p>
        </div>
        </div>
        <div className="box body-button">
                <button className="text-white">Join for free <ArrowRightOutlined /></button>
            </div>

      <ul className="mt-8 ml-4 text-2xl font-bold">New Courses</ul>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Course 1"
            bordered={false}
            cover={<img alt="Course 1" src="assets/demo.webp" />}
          >
            Course description here
            <Button type="primary">Buy Now</Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Course 2"
            bordered={false}
            cover={<img alt="Course 2" src="assets/academicdemo.jpg" />}
          >
            Course description here
            <Button type="primary">Buy Now</Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Course 3"
            bordered={false}
            cover={<img alt="Course 3" src="academicdemo.jpg" />}
          >
            Course description here
            <Button type="primary">Buy Now</Button>
          </Card>
        </Col>
        </Row>

        <div className="flex items-center justify-center h-24 mt-8 text-2xl font-bold">
                Top Categories
            </div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            cover={<img alt="Course 1" src="assets/demo.webp" />}
          >
            Course description here
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            cover={<img alt="Course 2" src="assets/academicdemo.jpg" />}
          >
            Course description here
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            cover={<img alt="Course 3" src="academicdemo.jpg" />}
          >
            Course description here
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            cover={<img alt="Course 4" src="academicdemo.jpg" />}
          >
            Course description here
          </Card>
        </Col>
        </Row>

        <div className="p-8 bg-gray-100 contact-home">
            <h1 className="text-2xl font-bold">Subscriber</h1>
            <p>Rveceive weekly newsletter with educational materials, new courses, interesting posts, popular books and much more!</p>
            <div className="flex flex-col mt-4 md:flex-row">
                <Input className="w-full mb-4 md:w-80 md:mr-4" placeholder="Enter your email" />
                <Button className="w-full md:w-auto" type="primary">Subscribe</Button>
            </div>
        </div>
    </div>
  );
};

export default HomePage;
