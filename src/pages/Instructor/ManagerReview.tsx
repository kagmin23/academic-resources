import { SearchOutlined, StarOutlined } from '@ant-design/icons';
import { Input, Layout, Spin, Table, Tabs, notification } from 'antd';
import { Course, Review } from 'models/types';
import moment from 'moment';
import { AlignType } from 'rc-table/lib/interface';
import React, { useEffect, useState } from 'react';
import { getCourses } from 'services/All/getCoursesApiService';
import { getReview } from 'services/Instructor/reviewApiService';

const { Header, Content } = Layout;
const { TabPane } = Tabs;

const ReviewManager: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [dataSource, setDataSource] = useState<Course[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [courseId, setCourseId] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await getCourses('', 1, 10);
      console.log("getCourses", response)
      setDataSource(response.data.pageData);
    } catch (error: any) {
      notification.error({
        message: "Failed to get Courses!",
        description:
          error.message || "Failed to get Courses. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      if (courseId) {
        console.log("fetchReviews", courseId)
        setLoading(true);
        try {
          const response = await getReview(courseId);
          setReviews(response);
          setFilteredReviews(response);
        } catch (error: any) {
          notification.error({
            message: "Failed to fetch Review!",
            description:
              error.message || "Failed to fetch Review. Please try again.",
          });
        } finally {
          setLoading(false);
        }
      }
    };
    fetchReviews();
  }, [courseId]);

  

  const handleSearch = (value: string) => {
    setSearch(value);
    if (value) {
      const filtered = reviews.filter(review =>
        review.course_name?.toLowerCase().includes(value.toLowerCase()) ||
        review.reviewer_name?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredReviews(filtered);
    } else {
      setFilteredReviews(reviews);
    }
  }

  const getTotalReviews = (): number => {
    return filteredReviews?.length;
  };

  const columns1 = [
    {
      title: 'Reviewer Name',
      dataIndex: 'reviewer_name',
      width: 100,
      key: 'reviewer_name',
    },
    {
      title: 'Course Name',
      dataIndex: 'course_name',
      width: 100,
      key: 'course_name',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      width: 150,
      key: 'comment',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      width: 90,
      key: 'created_at',
      align: 'center' as AlignType,
      render: (created_at: string) => moment(created_at).format('YYYY-MM-DD'),
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      width: 90,
      key: 'updated_at',
      align: 'center' as AlignType,
      render: (updated_at: string) => moment(updated_at).format('YYYY-MM-DD')
    },
    {
      title: <StarOutlined />,
      dataIndex: 'rating',
      key: 'rating',
      width: 50,
      align: 'center' as AlignType,
    },
  ];

  return (
    <Layout style={{ height: 'fit-content', minHeight: '100vh' }}>
      <div className='px-5'>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Reviews" key="1">
            <div className='flex justify-between'>
              <div className='w-1/2'>
                <span className='text-lg font-semibold'>Total Review: {getTotalReviews()}</span>
              </div>
              <div className='w-1/4'>
                <Input
                  placeholder="Search..."
                  prefix={<SearchOutlined />}
                  className='mb-5'
                  onChange={e => handleSearch(e.target.value)}
                  value={search}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <Spin size="large" />
                </div>
              ) : (
                <Table
                  className='custom-table'
                  columns={columns1}
                  dataSource={filteredReviews}
                  rowKey="_id"
                  loading={loading}
                />
              )}
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ReviewManager;
