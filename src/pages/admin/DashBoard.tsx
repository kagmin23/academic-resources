import {
  AppstoreOutlined,
  BookOutlined,
  FilterOutlined,
  FlagOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Card, Col, DatePicker, Row, Space, Typography, Progress, message } from 'antd';
import 'dayjs/locale/vi';
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import dayjs from 'dayjs';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const Dashboard: React.FC = () => {
  const initialData = [
    { name: '2023-01-01', users: 400, courses: 240, categories: 240, reports: 50, revenue: 1000 },
    { name: '2023-02-01', users: 300, courses: 138, categories: 221, reports: 80, revenue: 1200 },
    { name: '2023-03-01', users: 200, courses: 980, categories: 229, reports: 100, revenue: 1400 },
    { name: '2023-04-01', users: 278, courses: 390, categories: 200, reports: 150, revenue: 1600 },
    { name: '2023-05-01', users: 189, courses: 480, categories: 218, reports: 200, revenue: 1800 },
    { name: '2023-06-01', users: 239, courses: 380, categories: 250, reports: 250, revenue: 2000 },
    { name: '2023-07-01', users: 349, courses: 430, categories: 210, reports: 300, revenue: 2200 },
  ];

  const [selectedDates, setSelectedDates] = useState<any[]>([]);
  const [data, setData] = useState(initialData);

  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    if (dates && dates.length === 2 && dates[0].isAfter(dates[1])) {
      message.error('Start date must be before end date.');
      return;
    }
    setSelectedDates(dates);
    console.log('Đang lọc dữ liệu từ ngày:', dateStrings[0], 'đến ngày:', dateStrings[1]);
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
    <div className="p-4">
      <Title level={2} className="mb-8 text-center">Academic Dashboard</Title>

      <Space className="mb-4">
        <FilterOutlined /> Filter:
        <RangePicker onChange={handleDateChange} />
      </Space>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="transition-shadow duration-300 shadow-lg hover:shadow-xl rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between">
              <BookOutlined className="text-4xl text-blue-500" />
              <div className="text-right">
                <p className="text-gray-500">Total Courses</p>
                <p className="text-2xl font-bold">150</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="transition-shadow duration-300 shadow-lg hover:shadow-xl rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between">
              <UserOutlined className="text-4xl text-green-500" />
              <div className="text-right">
                <p className="text-gray-500">Total Users</p>
                <p className="text-2xl font-bold">4500</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="transition-shadow duration-300 shadow-lg hover:shadow-xl rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between">
              <AppstoreOutlined className="text-4xl text-red-500" />
              <div className="text-right">
                <p className="text-gray-500">Total Categories</p>
                <p className="text-2xl font-bold">35</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="transition-shadow duration-300 shadow-lg hover:shadow-xl rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between">
              <FlagOutlined className="text-4xl text-yellow-500" />
              <div className="text-right">
                <p className="text-gray-500">Total Reports</p>
                <p className="text-2xl font-bold">120</p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="mt-8" gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card className="transition-shadow duration-300 shadow-lg hover:shadow-xl rounded-lg p-4 bg-white" style={{ height: '600px' }}>
            <Title level={3} className="mb-4 text-center">User and Course Statistics</Title>
            <ResponsiveContainer width="100%" height="100%">
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
              <Card className="transition-shadow duration-300 shadow-lg hover:shadow-xl rounded-lg p-4 bg-white" style={{ height: '295px' }}>
                <Title level={3} className="mb-4 text-center">Ratings</Title>
                <div className="flex justify-center items-center" style={{ height: '100%' }}>
                  <Progress type="circle" percent={90} format={() => '4.5/5'} />
                </div>
              </Card>
            </Col>
            <Col span={24}>
              <Card className="transition-shadow duration-300 shadow-lg hover:shadow-xl rounded-lg p-4 bg-white" style={{ height: '295px' }}>
                <Title level={3} className="mb-4 text-center">Total Revenue</Title>
                <ResponsiveContainer width="100%" height="100%">
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
  );
};

export default Dashboard;
