import { Button, Card, Col, Row } from 'antd';
// import 'antd/dist/antd.css';
import React from 'react';
// import './styles.css';

interface Course {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
}

const courses: Course[] = [
  {
    id: 1,
    image: 'course1.jpg',
    title: 'Course 1',
    description: 'Description of Course 1',
    price: 50,
  },
  // Add more courses here
];

const CoursePage: React.FC = () => {
  return (
    <div className="container mx-auto mt-4">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <Row gutter={[16, 16]}>
            {courses.map((course) => (
              <Col key={course.id} xs={24} sm={12} md={12} lg={8} xl={8}>
                <Card
                  hoverable
                  cover={<img alt={course.title} src={course.image} />}
                >
                  <Card.Meta title={course.title} description={course.description} />
                  <div className="flex items-center justify-between mt-4">
                    <span>${course.price}</span>
                    <div>
                      <Button type="primary" className="mr-2">Buy Now</Button>
                      <Button>Add to Cart</Button>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Col xs={0} sm={0} md={8} lg={8} xl={8}>
          {/* Sidebar content */}
          <div className="p-4 bg-gray-200">
            <h2 className="mb-4 text-lg font-semibold">Filters</h2>
            {/* Add filters here */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CoursePage;
