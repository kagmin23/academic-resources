import { DeleteOutlined, SearchOutlined, StarOutlined } from '@ant-design/icons';
import { Button, Input, Layout, Modal, Spin, Table, Tabs, notification } from 'antd';
import { Review } from 'models/types';
import moment from 'moment';
import { AlignType } from 'rc-table/lib/interface';
import React, { useEffect, useState } from 'react';
import { deleteReview } from 'services/AdminsApi/reviewApiService';
import { getReviews } from 'services/All/reviewApiService';

const { TabPane } = Tabs;

const AdminReview: React.FC = () => {
  const [originalData, setOriginalData] = useState<Review[]>([]);
  const [filteredData, setFilteredData] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [deleteItemId, setDeleteItemId] = useState<string | undefined>();

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await getReviews('', 1, 10);
      setOriginalData(response);
      setFilteredData(response);
    } catch (error: any) {
      notification.error({
        message: "Failed to get Reviews!",
        description:
          error.message || "Failed to get Reviews. Please try again.",
      });
      setOriginalData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async () => {
    if (!deleteItemId) return;
    setLoading(true);
    try {
      await deleteReview(deleteItemId);
      const updatedData = originalData.filter(review => review._id !== deleteItemId);
      setOriginalData(updatedData);
      setFilteredData(updatedData);
      setDeleteItemId(undefined);
      setDeleteConfirmVisible(false);
    } catch (error: any) {
      notification.error({
        message: "Failed to get delete Review!",
        description:
          error.message || "Failed to get delete Review. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getTotalReview = (): number => {
    return filteredData.length;
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    if (value) {
      const filtered = originalData.filter(review =>
        review.course_name?.toLowerCase().includes(value.toLowerCase()) ||
        review.reviewer_name?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(originalData);
    }
  }

  const columns1 = [
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'no',
      width: 50,
      align: 'center' as AlignType,
      render: (text: any, record: Review, index: number) => index + 1,
    },
    {
      title: 'Course',
      dataIndex: 'course_name',
      width: 150,
      key: 'course_name',
    },
    {
      title: 'Reviewer',
      dataIndex: 'reviewer_name',
      width: 150,
      key: 'reviewer_name',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      width: 180,
      key: 'comment',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      width: 100,
      key: 'created_at',
      align: 'center' as AlignType,
      render: (created_at: string) => moment(created_at).format('YYYY-MM-DD')
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      width: 100,
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
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      align: 'center' as AlignType,
      render: (text: any, record: Review) => (
        <Button
          size="small"
          type="primary"
          icon={<DeleteOutlined />}
          danger
          onClick={() => { setDeleteItemId(record._id); setDeleteConfirmVisible(true); }}
        />
      ),
    },
  ];

  return (
    <Layout style={{ height: 'fit-content', minHeight: '100vh' }}>
      <div className='px-5'>
        <Modal
          title="Confirm Delete"
          visible={deleteConfirmVisible}
          onOk={handleDelete}
          onCancel={() => {
            setDeleteItemId(undefined);
            setDeleteConfirmVisible(false);
          }}
          okButtonProps={{ danger: true }}
        >
          <p>Are you sure you want to delete this review?</p>
        </Modal>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Reviews" key="1">
            <div className='flex justify-between'>
              <div className='w-1/2'>
                <span className='text-lg font-semibold'>Total Reviews: {getTotalReview()}</span>
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
