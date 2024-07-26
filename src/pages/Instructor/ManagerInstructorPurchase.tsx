import React from 'react';
import { Card, Table, Typography, Layout } from 'antd';
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
  },
];

const columns = [
  {
    title: 'Course Name',
    dataIndex: 'course_name',
    key: 'course_name',
    ellipsis: true, // Cắt bớt nội dung khi quá dài
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
    <Content style={{overflow: 'initial' }}>
      <div style={{ paddingRight: 12, background: '#fff', minHeight: 360 }}>
        <p className="text-xl font-bold" style={{ marginLeft: 20 }}>Purchase Manager</p>
        <Card style={{ margin: 20 }}>
          <div style={{ overflowX: 'auto' }}>
            <Table
              dataSource={purchaseData}
              columns={columns}
              scroll={{ x: true }} // Cho phép cuộn ngang nếu bảng quá rộng
            />
          </div>
        </Card>
      </div>
    </Content>
  );
};

export default ManagerInstructorPurchase;
