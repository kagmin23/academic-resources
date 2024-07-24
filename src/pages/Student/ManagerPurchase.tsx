import { Alert, Card, Layout, Spin, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { getItemsbyStudent } from 'services/Student/getpurchaseApiService';

const { Content } = Layout;
const { Title } = Typography;

const columns = [
  // Columns definition as provided
  {
    title: 'Course Name',
    dataIndex: 'course_name',
    key: 'course_name',
  },
  {
    title: 'Purchase No',
    dataIndex: 'purchase_no',
    key: 'purchase_no',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Price Paid',
    dataIndex: 'price_paid',
    key: 'price_paid',
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    key: 'discount',
  },
  {
    title: 'Instructor Name',
    dataIndex: 'instructor_name',
    key: 'instructor_name',
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
    key: 'created_at',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => {
      let color = '';
      let text = '';
      switch (status) {
        case 'new':
          color = 'blue';
          text = 'New';
          break;
        case 'request_paid':
          color = 'orange';
          text = 'Request Paid';
          break;
        case 'completed':
          color = 'green';
          text = 'Completed';
          break;
        default:
          text = 'Unknown';
      }
      return <span style={{ color }}>{text}</span>;
    },
  },
];

const ManagerStudentPurchase = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getItemsbyStudent(1, 10);
        console.log('API Response:', result);
        if (Array.isArray(result)) {
          setData(result);
        } else {
          console.error("Unexpected data format:", result);
          setError("Unexpected data format");
        }
      } catch (error) {
        setError("Failed to load purchase data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message={error} type="error" />;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Card style={{ margin: 20 }}>
              <Title level={4}>Purchase Manager</Title>
              <Table dataSource={data} columns={columns} />
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManagerStudentPurchase;
