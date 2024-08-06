import { Card, Col, Input, Row, Spin, Typography, message, notification } from 'antd';
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

const { Text } = Typography;

const CoursePage: React.FC = () => {
  const [courses, setCourses] = useState<ClientCourses[]>([]);
  const [originalCourses, setOriginalCourses] = useState<ClientCourses[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');
  const [pageSize] = useState(15);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response: ApiResponse = await getCourses('', '', currentPage, pageSize);
        if (response.success) {
          setCourses(response.data.pageData);
          setOriginalCourses(response.data.pageData);
          if (response.data.pageData.length < pageSize) {
            setHasMore(false);
          }
        } else {
          message.error('Failed to fetch courses');
        }
      } catch (error: any) {
        notification.error({
          message: "Failed to fetch Courses!",
          description:
            error.message || "Failed to fetch Courses. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [currentPage, pageSize]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight - 50 && hasMore) {
        setCurrentPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore]);

  const handleSearch = (value: string) => {
    setKeyword(value);
    if (value.trim() === '') {
      setCourses(originalCourses); // Reset to original data if search is cleared
    } else {
      const filteredCourses = originalCourses.filter(course =>
        course.name.toLowerCase().includes(value.toLowerCase())
      );
      setCourses(filteredCourses);
    }
  };

  const handleNavigateToCourseDetails = (courseId: string) => {
    navigate(`course-details/${courseId}`);
  };

  const renderError = () => (
    <div className="col-span-12 text-center text-red-500">{error}</div>
  );

  const renderCourses = () => (
    courses.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((course) => (
      <Col
        key={course._id}
        xs={24} // Full width on extra-small screens
        sm={12} // Half width on small screens
        md={8}  // One-third width on medium screens
        lg={6}  // One-fourth width on large screens
        xl={6}  // One-fifth width on extra-large screens
      >
        <Card
          hoverable
          cover={
            <img
              className="object-cover w-full h-60 aspect-w-1 aspect-h-1"
              alt={course.name}
              src={course.image_url}
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
            <span className="text-sm line-through">
              {course.price.toLocaleString('vi-VN')} đ
            </span>
            <span>({course.discount * 100}%)</span>
          </div>
          <div className="flex justify-between">
            <div className="text-lg text-orange-600">
              {(course.price * (1 - course.discount)).toLocaleString('vi-VN')} đ
            </div>
            {/* <Button className="text-xs text-white bg-red-500">Add to Cart</Button> */}
          </div>
        </Card>
      </Col>
    ))
  );

  const renderNoResults = () => (
    <div className="flex flex-col items-center justify-center h-full p-4 pb-44">
      <img
        src="https://static.vecteezy.com/system/resources/previews/010/856/652/non_2x/no-result-data-document-or-file-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg"
        alt="No data illustration"
        className="w-52 h-52"
      />
      <Text className="text-xl font-semibold">No Results Found</Text>
      <Text className="mt-2 text-gray-600">Try adjusting your search criteria or filters.</Text>
    </div>
  );

  const renderContent = () => {
    if (error) return renderError();
    if (keyword.trim() !== '') return renderNoResults();
    return renderCourses();
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

      <Row gutter={[15, 15]}>
        {renderContent()}
      </Row>
    </div>
  );
};

export default CoursePage;
