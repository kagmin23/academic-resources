import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Layout, Spin, Table, Tabs } from 'antd';
import { Review } from 'models/types';
import { AlignType } from 'rc-table/lib/interface';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteReview } from 'services/AdminsApi/reviewApiService';
import { getReview } from 'services/Instructor/reviewApiService';

const { Header, Content } = Layout;
const { TabPane } = Tabs;

const AdminReview: React.FC = () => {
  const [filteredData, setFilteredData] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { reviewId } = useParams<{ reviewId: string }>();

  useEffect(() => {
    const fetchReviews = async () => {
      if (!reviewId) {
        console.error('No reviewId provided!');
        return;
      }
      
      setLoading(true);
      try {
        const data = await getReview(reviewId);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [reviewId]);

  const handleDelete = async (reviewId: string) => {
    setLoading(true);
    try {
      await deleteReview(reviewId);
      setFilteredData(filteredData.filter(review => review._id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalSubscribers = (): number => {
    return filteredData.length;
  };

  const getTotalReview = (): number => {
    return filteredData.length;
  };

  const columns1 = [
    {
      title: 'User',
      dataIndex: 'user_id',
      width: 100,
      key: 'user_id',
      render: (text: any, record: Review, index: number) => index + 1,
    },
    {
      title: 'Course',
      dataIndex: 'course_id',
      width: 100,
      key: 'course_id',
      render: (text: any, record: Review, index: number) => index + 1,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      width: 200,
      key: 'comment',
      render: (text: any, record: Review, index: number) => index + 1,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      width: 50,
      align: 'center' as AlignType
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 50,
      align: 'center' as AlignType,
      render: (text: any, record: Review) => (
        <div>
          <Button onClick={() => handleDelete(record._id)}>Delete</Button>
        </div>
      )
    },
  ];

  return (
    <Layout style={{ height: 'fit-content', minHeight: '100vh' }}>
      <div className='px-5'>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Reviews" key="1">
            <div className='flex justify-between'>
              <div className='w-1/2'>
                <span className='text-lg font-semibold'>Total Review: {getTotalSubscribers()}</span>
              </div>
              <div className='w-1/4'>
                <Input
                  placeholder="Search..."
                  prefix={<SearchOutlined />}
                  className='mb-5'
                //   onChange={e => handleSearch(e.target.value)}
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
                  dataSource={filteredData}
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

export default AdminReview;
