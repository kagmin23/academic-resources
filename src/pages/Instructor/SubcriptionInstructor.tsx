import React, { useState } from 'react';
import { Card, Table, Typography, Button } from 'antd';

const { Title } = Typography;

const subscriptionData = [
  {
    key: '1',
    instructor_name: 'Jane Smith',
    subscription_date: 'April 20, 2023 10:04 pm',
  },
  {
    key: '2',
    instructor_name: 'Bob Brown',
    subscription_date: 'March 3, 2023 7:15 am',
  },
  {
    key: '3',
    instructor_name: 'Eve White',
    subscription_date: 'June 24, 2023 11:12 am',
  },
  {
    key: '4',
    instructor_name: 'Dwight Schrute',
    subscription_date: 'November 27, 2023 5:46 am',
  },
];

const InstructorSubscription = () => {
  const [title, setTitle] = useState('Subscribed');

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const studentColumns = [
    {
      title: 'Instructor Name',
      dataIndex: 'instructor_name',
      key: 'instructor_name',
    },
    {
      title: 'Subscription Date',
      dataIndex: 'subscription_date',
      key: 'subscription_date',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => <Button type="primary" danger>Unsubscribe</Button>,
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#ffffff] p-4">
      <div className="flex-1 overflow-y-auto">
        <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
          <Button
            type={title === 'Subscribed' ? 'primary' : 'default'}
            onClick={() => handleTitleChange('Subscribed')}
            style={{ marginRight: 10 }}
          >
            Subscribed
          </Button>
          <Button
            type={title === 'Subscriber' ? 'primary' : 'default'}
            onClick={() => handleTitleChange('Subscriber')}
          >
            Subscriber
          </Button>
        </div>
        <Title level={4}>{title}</Title>
        <Card>
          <Table
            dataSource={subscriptionData}
            columns={studentColumns}
            pagination={false} // Disable pagination if needed
          />
        </Card>
      </div>
    </div>
  );
};

export default InstructorSubscription;
