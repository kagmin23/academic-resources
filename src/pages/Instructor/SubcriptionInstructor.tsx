import { BellOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Layout, Table, Tabs, message } from 'antd';
import { AlignType } from 'rc-table/lib/interface';
import React, { useEffect, useState } from 'react';
import { createOrUpdate, getItemByInstructorSubcription, getItemBySubscriber } from 'services/All/subcriptionApiService';

const { TabPane } = Tabs;
const { Header, Content } = Layout;

export interface Subcription {
  _id: string;
  subscriber_id: string;
  subscriber_name: string;
  instructor_id: string;
  instructor_name: string;
  is_subscribed: boolean;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}

const SubcriptionStudent: React.FC = () => {
  const [subcriptionStudents, setSubcriptionStudents] = useState<Subcription[]>([]);
  const [subcriptionInstructors, setSubcriptionInstructors] = useState<Subcription[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Subcription[]>([]);
  const [filteredInstructors, setFilteredInstructors] = useState<Subcription[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchInstructorSubscribers = async () => {
    setLoading(true);
    try {
      const response = await getItemByInstructorSubcription('', 1, 10);
      if (Array.isArray(response)) {
        const subscribedStudents = response.filter(sub => sub.is_subscribed);
        setSubcriptionStudents(subscribedStudents);
        setFilteredStudents(subscribedStudents);
      } else {
        console.error('Expected an array of subscriptions', response);
      }
    } catch (error) {
      message.error('Error fetching subscribers data!');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const response = await getItemBySubscriber(1, 10);
      if (Array.isArray(response)) {
        const subscribedStudents = response.filter(sub => sub.is_subscribed);
        setSubcriptionStudents(subscribedStudents);
        setFilteredStudents(subscribedStudents);
      } else {
        console.error('Expected an array of subscriptions', response);
      }
    } catch (error) {
      message.error('Error fetching subscribers data!');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscriptionStatus = async () => {
    setLoading(true);
    try {
      const response = await getItemBySubscriber(1, 10);
      if (Array.isArray(response)) {
        setSubcriptionInstructors(response);
        setFilteredInstructors(response);
      } else {
        console.error('Expected an array of subscriptions', response);
      }
    } catch (error) {
      message.error('Error fetching subscription data!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructorSubscribers();
    fetchSubscribers();
    fetchSubscriptionStatus();
  }, []);

  const handleStudentSearch = (value: string) => {
    const filtered = subcriptionStudents.filter((item) =>
      item.subscriber_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  const handleInstructorSearch = (value: string) => {
    const filtered = subcriptionInstructors.filter((item) =>
      item.instructor_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredInstructors(filtered);
  };

  const getTotalSubscribers = (): number => filteredStudents.length;
  const getTotalInstructors = (): number => filteredInstructors.length;

  const handleSubscribe = async (instructor_id: string, isSubscribed: boolean) => {
    setLoading(true);
    try {
      await createOrUpdate(instructor_id);
      fetchSubscriptionStatus();
      message.success(isSubscribed ? 'Unsubscribed Successfully!' : 'Subscribed Successfully!');
    } catch (error) {
      message.error(isSubscribed ? 'Failed to unsubscribe' : 'Failed to subscribe');
    } finally {
      setLoading(false);
    }
  };

  const columnsStudents = [
    {
      title: 'STT',
      dataIndex: 'stt',
      width: 50,
      key: 'stt',
      render: (text: any, record: Subcription, index: number) => index + 1,
    },
    {
      title: 'Subscriber Name',
      dataIndex: 'subscriber_name',
      key: 'subscriber_name',
    },
    {
      title: 'View',
      key: 'detail',
      width: 100,
      align: 'center' as AlignType,
      render: (text: string) => (
        <div>
          <Button size="small" type="primary" className="text-sm text-white">
            <UserOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const columnsInstructors = [
    {
      title: 'STT',
      dataIndex: 'stt',
      width: 50,
      key: 'stt',
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
      align: 'center' as AlignType,
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
      align: 'center' as AlignType,
      render: (text: string, record: Subcription) => (
        <div>
          <Button
            onClick={() => handleSubscribe(record.instructor_id, record.is_subscribed)}
            type="primary"
            loading={loading}
            className={`text-xs font-semibold w-1/2 ${record.is_subscribed ? 'bg-red-500' : 'bg-blue-500'}`}
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
      <div className="px-5">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Subscribers" key="1">
            <div className="flex justify-between">
              <div className="w-1/2">
                <span className="text-lg font-semibold">
                  Total Subscribers: {getTotalSubscribers()}
                </span>
              </div>
              <div className="w-1/4">
                <Input
                  placeholder="Search..."
                  prefix={<SearchOutlined />}
                  className="mb-5"
                  onChange={(e) => handleStudentSearch(e.target.value)}
                />
              </div>
            </div>
            <Table
              className="custom-table"
              columns={columnsStudents}
              dataSource={filteredStudents}
              rowKey="_id"
              loading={loading}
            />
          </TabPane>

          <TabPane tab="Subscriber" key="2">
            <div className="flex justify-between">
              <div className="w-1/2">
                <span className="text-lg font-semibold">
                  Total Subscriptions: {getTotalInstructors()}
                </span>
              </div>
              <div className="w-1/4">
                <Input
                  placeholder="Search..."
                  prefix={<SearchOutlined />}
                  className="mb-5"
                  onChange={(e) => handleInstructorSearch(e.target.value)}
                />
              </div>
            </div>
            <Table
              className="custom-table"
              columns={columnsInstructors}
              dataSource={filteredInstructors}
              rowKey="_id"
              loading={loading}
            />
          </TabPane>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SubcriptionStudent;