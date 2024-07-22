import { Card, Layout, Table, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;

const purchaseData = [
  {
    key: '1',
    purchase_no: '1001',
    status: 'completed',
    price_paid: '$200',
    price: '$250',
    discount: '$50',
    created_at: 'April 20, 2023 10:04 pm',
    course_name: 'How To Teach Online Course Effectively',
    // student_name: 'John Doe',
    // instructor_name: 'Jane Smith',
  },
  {
    key: '2',
    purchase_no: '1002',
    status: 'request_paid',
    price_paid: '$150',
    price: '$200',
    discount: '$50',
    created_at: 'March 3, 2023 7:15 am',
    course_name: 'Create an LMS Website with LearnPress',
    // student_name: 'Alice Johnson',
    // instructor_name: 'Bob Brown',
  
  },
  {
    key: '3',
    purchase_no: '1003',
    status: 'new',
    price_paid: '$0',
    price: '$100',
    discount: '$0',
    created_at: 'June 24, 2023 11:12 am',
    course_name: 'Introduction LearnPress - LMS plugin',
    // student_name: 'Charlie Davis',
    // instructor_name: 'Eve White',
   
  },
  {
    key: '4',
    purchase_no: '1004',
    status: 'completed',
    price_paid: '$100',
    price: '$100',
    discount: '$0',
    created_at: 'November 27, 2023 5:46 am',
    course_name: 'New Headway',
    // student_name: 'Michael Scott',
    // instructor_name: 'Dwight Schrute',
    
  },
];

const columns = [
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
    title: 'Price Paid',
    dataIndex: 'price_paid',
    key: 'price_paid',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    key: 'discount',
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
    key: 'created_at',
  },

  // {
  //   title: 'Student Name',
  //   dataIndex: 'student_name',
  //   key: 'student_name',
  // },
  // {
  //   title: 'Instructor Name',
  //   dataIndex: 'instructor_name',
  //   key: 'instructor_name',
  // },
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

const ManagerInstructorPurchase = () => {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Card style={{ margin: 20 }}>
              <Title level={4}>Purchase Manager</Title>
              <Table dataSource={purchaseData} columns={columns} />
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManagerInstructorPurchase;
