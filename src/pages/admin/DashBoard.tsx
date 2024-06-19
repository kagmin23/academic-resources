import { AppstoreOutlined, BookOutlined, FilterOutlined, FlagOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Col, DatePicker, Row, Space, Typography } from 'antd';
import 'dayjs/locale/vi';
import React, { useState } from 'react';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const Dashboard: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<any[]>([]);

  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    setSelectedDates(dates);
    console.log('Đang lọc dữ liệu từ ngày:', dateStrings[0], 'đến ngày:', dateStrings[1]);
    // Gọi hàm để xử lý lọc dữ liệu theo khoảng thời gian ở đây
    filterDataByRange(dates);
  };

  const filterDataByRange = (dates: any) => {
    // Viết logic để lọc dữ liệu từ ngày đến ngày ở đây
    // Ví dụ: Nếu bạn có mảng dữ liệu courses có trường date, bạn có thể lọc như sau
    // const filteredCourses = courses.filter(course => dayjs(course.date).isBetween(dates[0], dates[1]));
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
          <Card className="transition-shadow duration-300 shadow-lg hover:shadow-xl">
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
          <Card className="transition-shadow duration-300 shadow-lg hover:shadow-xl">
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
          <Card className="transition-shadow duration-300 shadow-lg hover:shadow-xl">
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
          <Card className="transition-shadow duration-300 shadow-lg hover:shadow-xl">
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
    </div>
  );
};

export default Dashboard;
