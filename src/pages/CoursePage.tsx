import { Button, Card, Col, Drawer, Input, Menu, Pagination, Row, message } from 'antd';
import { ClientCourses } from 'models/types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [categoryId, setCategoryId] = useState('');
  const pageSize = 6;

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
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
      }finally {
      setLoading(false);
    }
    };

    fetchCourses();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onClick = (e: any) => {
    console.log('click ', e);
  };

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="mx-auto h-fit">
      <Row gutter={[16, 16]}>
        <Col xs={0} sm={0} md={6} lg={6} xl={6}>
          <div className="flex flex-col h-full">
            <div className='h-[90vh] w-full flex-grow'>
              <Menu
                onClick={onClick}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="light"
                className='w-2/3 h-full p-2 overflow-y-auto lg:text-base xl:text-lg bg-slate-500'
              />
            </div>
          </div>
        </Col>

        <Col xs={24} sm={24} md={18} lg={18} xl={18} className='my-auto -mx-10'>
          {/* Menu for smaller screens */}
          <Button type="primary" onClick={showDrawer} className='mb-4 md:hidden'>
            Menu
          </Button>
          <Drawer
            placement={'left'}
            closable={false}
            onClose={onClose}
            open={open}
            bodyStyle={{ padding: 0, margin: 0 }}
          >
            <Menu
              onClick={onClick}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="dark"
              className='w-full h-full p-2 overflow-y-auto lg:text-base xl:text-lg'
            />
          </Drawer>

          <div className="mb-10 md:w-1/3">
            <Input.Search
              placeholder="Search..."
              enterButton="Search"
              size="middle"
              onSearch={(value) => setKeyword(value)}
            />
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <>
              <Link to={`course-details`}>
                <Row gutter={[15, 15]} className='xl:px-1'>
                  {courses.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((course) => (
                    <Col key={course._id} xs={24} sm={12} md={12} lg={8} xl={8}>
                      <Card
                        hoverable
                        cover={<img alt={course.name} src={course.image_url} />}
                      >
                        <Card.Meta title={course.name} description={course.description} />
                        <div className="flex items-center justify-between mt-4 text-lg font-bold">
                          <span>{course.price}</span>
                          <div className='flex'>
                            <Button className='p-3 mr-2 text-white bg-red-500'>Favorite</Button>
                            <Button className='p-3 text-white bg-blue-500'>Add to Cart</Button>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Link>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={courses.length}
                onChange={handlePageChange}
                className="flex justify-center mt-8"
              />
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CoursePage;
