import React, { useState } from 'react';
import { Card, Layout, Table, Typography, Button } from 'antd';

const { Content } = Layout;
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

const StudentSubscription = () => {
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
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Card style={{ margin: 20 }}>
              <Title level={4}>{title}</Title>
              <Table
                dataSource={subscriptionData}
                columns={studentColumns}
              />
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default StudentSubscription;
