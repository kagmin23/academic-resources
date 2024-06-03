import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Row } from 'antd';
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
        <header className="hero-image">
            <img src="data:image/jpeg;base64,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" alt="Academic-Resource" />
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
        <div className="text-sm box text-box">
            <p className="pt-10 mb-10">Limitless Learning, More</p>
            <p className="mb-10">Possibilities</p>
            <ul className="mb-10 text-lg">Answer A Few Questions For Your Top Picks</ul>
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
