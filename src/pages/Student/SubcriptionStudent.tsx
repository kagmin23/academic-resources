import { BellOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Layout, Table, message } from 'antd';
import { AlignType } from 'rc-table/lib/interface';
import React, { useEffect, useState } from 'react';
import { createOrUpdate, getItemBySubscriber } from 'services/All/subcriptionApiService';

const { Header, Content } = Layout;

export interface Subcription {
  _id:	string,
  subscriber_id:	string,
  subscriber_name:	string,
  instructor_id:	string,
  instructor_name:	string,
  is_subscribed:	boolean,
  created_at:	Date,
  updated_at:	Date,
  is_deleted:	boolean,
}

const SubcriptionStudent: React.FC = () => {
  const [subcriptionStudent, setSubcriptionStudent] = useState<Subcription[]>([]);
  const [filteredData, setFilteredData] = useState<Subcription[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState(true);


  const fetchSubscriptionStatus = async () => {
    setLoading(true);
    try {
      const response = await getItemBySubscriber("", 1, 10, 1, 1);
      setSubcriptionStudent(response);
      setFilteredData(response);
    } catch (error) {
      message.error('Error fetching subscription data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionStatus();
  }, []);

  const handleSearch = (value: string) => {
    const filtered = subcriptionStudent.filter((item) =>
      item.instructor_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const getTotalSubcribers = (): number => {
    return filteredData.length;
  };

  const handleSubscribe = async (instructor_id: string, isSubscribed: boolean) => {
    setLoading(true);

    try {
        await createOrUpdate(instructor_id);
        fetchSubscriptionStatus();
        message.success(isSubscribed ? 'Unsubscribed Successfully!' : 'Subscribed Successfully!');
    } catch (error) {
        console.error('Failed to subscribe:', error);
        message.error(isSubscribed ? 'Failed to unsubscribe' : 'Failed to subscribe');
    } finally {
        setLoading(false);
    }
};

  const columns1 = [
    {
      title: 'STT',
      dataIndex: 'stt',
      width: 50,
      key: 'stt',
      align: "center" as AlignType,
      render: (text: any, record: Subcription, index: number) => index + 1,
    },
    {
      title: 'Instructor Name',
      dataIndex: 'instructor_name',
      key: 'instructor_name',
    },
    {
      title: 'View',
      key: 'detail',
      width: 100,
      align: "center" as AlignType,
      render: (text: string) => (
        <div>
          <Button size="small" type="primary" className="text-sm text-white">
            <UserOutlined />
          </Button>
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      width: 250,
      align: "center" as AlignType,
      render: (text: string, record: Subcription) => (
        <div>
          <Button
            onClick={() => handleSubscribe(record.instructor_id, record.is_subscribed)}
            type="primary"
            loading={loading}
            className={`text-xs font-semibold w-1/2 ${
              record.is_subscribed ? 'bg-red-500' : 'bg-blue-500'
            }`}
          >
            {record.is_subscribed ? (
              <>
                <BellOutlined /> Subscribed
              </>
            ) : (
              'Subscribe'
            )}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ height: 'fit-content', minHeight: '100vh' }}>
      <div className='px-5'>
        <div className='flex justify-between'>
          <div className='w-1/2'>
            <span className='text-lg font-semibold'>Total Subscribers: {getTotalSubcribers()}</span>
          </div>
          <div className='w-1/4'>
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              className='mb-5'
              onChange={e => handleSearch(e.target.value)}
            />
          </div>
        </div>
        <Table
          className='custom-table'
          columns={columns1}
          dataSource={filteredData}
          rowKey="_id"
          loading={loading}
        />
      </div>
    </Layout>
  );
};

export default SubcriptionStudent;
