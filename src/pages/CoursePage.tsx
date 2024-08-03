import { Button, Card, Col, Input, Pagination, Row, Spin, message } from 'antd';
import { ClientCourses } from 'models/types';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCourses } from 'services/UserClient/clientApiService';

interface ApiResponse {
  success: boolean;
  data: {
    pageData: any[];
  };
}

const CoursePage: React.FC = () => {
  const [courses, setCourses] = useState<ClientCourses[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');
  const [pageSize] = useState(15); // Number of courses per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response: ApiResponse = await getCourses('', '', currentPage, pageSize);
        if (response.success) {
          setCourses(response.data.pageData);
        } else {
          message.error('Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        message.error('An error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [currentPage, pageSize]);

  const handleSearch = (value: string) => {
    setKeyword(value);
    const filteredCourses = courses.filter(course =>
      course.name.toLowerCase().includes(value.toLowerCase())
    );
    setCourses(filteredCourses);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNavigateToCourseDetails = (courseId: string) => {
    navigate(`course-details/${courseId}`);
  };

  return (
    <div className="relative mx-auto h-fit">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white opacity-80">
          <Spin size="large" />
        </div>
      )}
      <div className="flex justify-end my-5">
        <Input.Search
          placeholder="Search..."
          enterButton
          size="small"
          onSearch={handleSearch}
          className="w-full md:w-1/3"
        />
      </div>

      <Row gutter={[15,15]}>
        {error ? (
          <div>{error}</div>
        ) : (
          <>
            {courses.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((course) => (
              <Col
                key={course._id}
                xs={24} // Full width on extra-small screens
                sm={12} // Half width on small screens
                md={8}  // One-third width on medium screens
                lg={6}  // One-fourth width on large screens
                xl={4}  // One-fifth width on extra-large screens
              >
                <Card
                  hoverable
                  cover={
                    <img
                      className="object-cover w-full h-full"
                      alt={course.name}
                      src={course.image_url}
                      style={{ aspectRatio: '1 / 1' }} // Makes the card square
                    />
                  }
                  onClick={() => handleNavigateToCourseDetails(course._id)}
                  className="w-full h-full"
                >
                  <Card.Meta
                    title={course.name}
                    description={<div className="truncate">{course.description}</div>}
                  />
                  <div className="flex items-center justify-between mt-4 text-lg">
                    <span className="text-sm" style={{ textDecoration: 'line-through' }}>
                      {course.price.toLocaleString('vi-VN')} đ
                    </span>
                    <span>({course.discount * 100}%)</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-lg text-orange-600">
                      {(course.price * (1 - course.discount)).toLocaleString('vi-VN')} đ
                    </div>
                    <Button className="text-xs text-white bg-red-500">Add to Cart</Button>
                  </div>
                </Card>
              </Col>
            ))}
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={courses.length}
              onChange={handlePageChange}
              className="flex justify-center mt-8"
            />
          </>
        )}
      </Row>
    </div>
  );
};

export default CoursePage;
