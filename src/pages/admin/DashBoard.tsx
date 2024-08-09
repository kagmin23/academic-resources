import {
  AppstoreOutlined,
  BookOutlined,
  FilterOutlined,
  FlagOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Card, Col, DatePicker, Layout, Progress, Row, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import React, { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import 'tailwindcss/tailwind.css';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const Dashboard: React.FC = () => {
  const initialData = [
    { name: "...", users: "...", courses: "...", categories: "...", reports: "...", revenue: "..." },
    { name: "...", users: "...", courses: "...", categories: "...", reports: "...", revenue: "..." },
    { name: "...", users: "...", courses: "...", categories: "...", reports: "...", revenue: "..." },
    { name: "...", users: "...", courses: "...", categories: "...", reports: "...", revenue: "..." },
    { name: "...", users: "...", courses: "...", categories: "...", reports: "...", revenue: "..." },
    { name: "...", users: "...", courses: "...", categories: "...", reports: "...", revenue: "..." },
    { name: "...", users: "...", courses: "...", categories: "...", reports: "...", revenue: "..." },
  ];

  const [selectedDates, setSelectedDates] = useState<any[]>([]);
  const [data, setData] = useState(initialData);

  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    setSelectedDates(dates);
    filterDataByRange(dates);
  };

  const filterDataByRange = (dates: any) => {
    if (!dates || dates.length === 0) {
      setData(initialData);
      return;
    }

    const [startDate, endDate] = dates;
    const filteredData = initialData.filter(item => {
      const itemDate = dayjs(item.name);
      return itemDate.isAfter(startDate) && itemDate.isBefore(endDate);
    });

    setData(filteredData);
  };

  return (
    <Layout>
    <div className="p-4">
      <Title level={2} className="mb-8 text-center">Academic Dashboard</Title>

      <Space className="mb-4">
        <FilterOutlined /> Filter:
        <RangePicker onChange={handleDateChange} />
      </Space>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="p-4 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
            <div className="flex items-center justify-between">
              <BookOutlined className="text-4xl text-blue-500" />
              <div className="text-right">
                <p className="text-gray-500">Total Courses</p>
                <p className="text-2xl font-bold">...</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="p-4 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
            <div className="flex items-center justify-between">
              <UserOutlined className="text-4xl text-green-500" />
              <div className="text-right">
                <p className="text-gray-500">Total Users</p>
                <p className="text-2xl font-bold">...</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="p-4 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
            <div className="flex items-center justify-between">
              <AppstoreOutlined className="text-4xl text-red-500" />
              <div className="text-right">
                <p className="text-gray-500">Total Categories</p>
                <p className="text-2xl font-bold">...</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="p-4 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
            <div className="flex items-center justify-between">
              <FlagOutlined className="text-4xl text-yellow-500" />
              <div className="text-right">
                <p className="text-gray-500">Total Reports</p>
                <p className="text-2xl font-bold">...</p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="mt-8" gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card className="p-4 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">

            <Title level={3} className="mb-4 text-center">User and Course Statistics</Title>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#8884d8" />
                <Bar dataKey="courses" fill="#82ca9d" />
                <Bar dataKey="categories" fill="#ffc658" />
                <Bar dataKey="reports" fill="#ff7300" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card className="p-4 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
                <Title level={3} className="mb-4 text-center">Ratings</Title>
                <div className="flex items-center justify-center">
                  <Progress type="circle" percent={90} format={() => '...'} />
                </div>
              </Card>
            </Col>
            <Col span={24}>
              <Card className="p-4 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
                <Title level={3} className="mb-4 text-center">Total Revenue</Title>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
    </Layout>
  );
};

export default Dashboard;