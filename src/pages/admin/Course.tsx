import React, { useState } from "react";
import {
  CameraOutlined,
  EyeOutlined,
  FunnelPlotOutlined,
  LaptopOutlined,
  PieChartOutlined,
  PlusCircleOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button, Layout, Switch, Table, Row, Col, Typography } from "antd";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

interface DataType {
  key: string;
  image: string;
  title: string;
  status: boolean;
  description: string;
  price: number;
  created_at: string;
  instructor: string;
}

const initialDataSource: DataType[] = [
  {
    key: "1",
    image: "https://via.placeholder.com/50",
    title: "Item 1",
    status: false,
    description: "Description for Item 1",
    price: 100,
    created_at: "2024-01-01",
    instructor: "Instructor 1",
  },
  {
    key: "2",
    image: "https://via.placeholder.com/50",
    title: "Item 2",
    status: true,
    description: "Description for Item 2",
    price: 200,
    created_at: "2024-02-01",
    instructor: "Instructor 2",
  },
  {
    key: "3",
    image: "https://via.placeholder.com/50",
    title: "Item 3",
    status: false,
    description: "Description for Item 3",
    price: 300,
    created_at: "2024-03-01",
    instructor: "Instructor 3",
  },
  {
    key: "4",
    image: "https://via.placeholder.com/50",
    title: "Item 4",
    status: true,
    description: "Description for Item 4",
    price: 400,
    created_at: "2024-04-01",
    instructor: "Instructor 4",
  },
  {
    key: "5",
    image: "https://via.placeholder.com/50",
    title: "Item 5",
    status: false,
    description: "Description for Item 5",
    price: 500,
    created_at: "2024-05-01",
    instructor: "Instructor 5",
  },
  {
    key: "6",
    image: "https://via.placeholder.com/50",
    title: "Item 6",
    status: true,
    description: "Description for Item 6",
    price: 600,
    created_at: "2024-06-01",
    instructor: "Instructor 6",
  },
];

const CourseAdmin: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>(initialDataSource);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const handleSave = (record: DataType) => {
    console.log("Saved:", record);
  };

  const handleViewMore = (key: string) => {
    setExpandedKeys((prevKeys) =>
      prevKeys.includes(key)
        ? prevKeys.filter((k) => k !== key)
        : [...prevKeys, key]
    );
  };

  const handleStatusChange = (checked: boolean, record: DataType) => {
    const updatedDataSource = dataSource.map((item) =>
      item.key === record.key ? { ...item, status: checked } : item
    );
    setDataSource(updatedDataSource);
  };

  const columns = [
    {
      title: "Course",
      dataIndex: "image",
      key: "image",
      render: (text: string) => (
        <img src={text} alt="item" className="w-12 h-12" />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean, record: DataType) => (
        <Switch
          checked={status}
          onChange={(checked: boolean) => handleStatusChange(checked, record)}
        />
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center" as "center",
      render: (text: string, record: DataType) => (
        <div style={{ textAlign: "center" }}>
          <Button icon={<EyeOutlined />} onClick={() => handleViewMore(record.key)}></Button>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout className="site-layout" style={{ marginLeft: "240px" }}>
        <Header className="p-0 bg-white">
          <div className="flex flex-wrap items-center justify-center gap-4 p-4 bg-[#939fb1]">
            <Button icon={<FunnelPlotOutlined />} className="flex items-center">
              All
            </Button>
            <Button icon={<PieChartOutlined />} className="flex items-center">
              Development
            </Button>
            <Button icon={<UserOutlined />} className="flex items-center">
              Business
            </Button>
            <Button icon={<LaptopOutlined />} className="flex items-center">
              IT & Software
            </Button>
            <Button icon={<UsergroupAddOutlined />} className="flex items-center">
              Marketing
            </Button>
            <Button icon={<CameraOutlined />} className="flex items-center">
              Photography
            </Button>
            <div className="h-6 mx-4 border-r"></div>
            <Button className="font-bold text-white bg-red-500">
              <PlusCircleOutlined />
              Add New Course
            </Button>
          </div>
        </Header>
        <Content className="m-4">
          <div className="p-4 bg-white">
            <Table
              dataSource={dataSource}
              columns={columns}
              expandable={{
                expandedRowKeys: expandedKeys,
                onExpand: (expanded, record) => handleViewMore(record.key),
                expandedRowRender: (record: DataType) => (
                  <div style={{ padding: "10px 20px", backgroundColor: "#f9f9f9", borderRadius: "4px", marginLeft: "25px" }}>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Title level={5} className="text-2xl">
                          Course Details
                        </Title>
                      </Col>
                    </Row>
                    <Row gutter={16} align="middle" style={{ display: "flex", justifyContent: "space-between" }}>
                      <Col span={8}>
                        <Text strong>Description:</Text>
                        <p>{record.description}</p>
                      </Col>
                      <Col span={8} style={{ textAlign: "center" }}>
                        <Text strong>Instructor:</Text>
                        <p>{record.instructor}</p>
                      </Col>
                      <Col span={7} style={{ textAlign: "center" }}>
                        <Text strong>Price:</Text>
                        <p>${record.price}</p>
                      </Col>
                    </Row>
                  </div>
                ),
                expandIcon: () => null,
              }}
              rowKey="key"
            />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Academic_Resources ©2024 Created by Group 4
        </Footer>
      </Layout>
    </Layout>
  );
};

export default CourseAdmin;
