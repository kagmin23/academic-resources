import {
  CameraOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FunnelPlotOutlined,
  LaptopOutlined,
  PieChartOutlined,
  PlusCircleOutlined,
  UserOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';
import { Button, Layout, Switch, Table } from 'antd';
import { AlignType } from 'rc-table/lib/interface';
import React, { useState } from 'react';

const { Header, Content, Footer } = Layout;

interface DataType {
  key: string;
  image: string;
  title: string;
  status: boolean;
}

const initialDataSource: DataType[] = [
  {
    key: '1',
    image: 'https://via.placeholder.com/50',
    title: 'Item 1',
    status: false,
  },
  {
    key: '2',
    image: 'https://via.placeholder.com/50',
    title: 'Item 2',
    status: true,
  },
  {
    key: '3',
    image: 'https://via.placeholder.com/50',
    title: 'Item 3',
    status: false,
  },
  {
    key: '4',
    image: 'https://via.placeholder.com/50',
    title: 'Item 4',
    status: true,
  },
  {
    key: '5',
    image: 'https://via.placeholder.com/50',
    title: 'Item 5',
    status: false,
  },
  {
    key: '6',
    image: 'https://via.placeholder.com/50',
    title: 'Item 6',
    status: true,
  },
];

const CourseAdmin: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>(initialDataSource);

  const handleSave = (record: DataType) => {
    // Placeholder for save logic
    console.log('Saved:', record);
  };

  const handleViewMore = (record: DataType) => {
    // Placeholder for view more logic
    console.log('View more:', record);
  };

  const handleStatusChange = (checked: boolean, record: DataType) => {
    const updatedDataSource = dataSource.map(item =>
      item.key === record.key ? { ...item, status: checked } : item
    );
    setDataSource(updatedDataSource);
  };

  const columns = [
    {
      title: 'Course',
      dataIndex: 'image',
      key: 'image',
      render: (text: string) => <img src={text} alt="item" className="w-12 h-12" />,
    },
    {
      title: 'Description',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean, record: DataType) => (
        <Switch
          checked={status}
          onChange={(checked: boolean) => handleStatusChange(checked, record)}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center' as AlignType,
      render: (text: string, record: DataType) => (
        <div style={{ textAlign: 'center' }}>
          <Button icon={<EditOutlined />} className="mr-2 text-white bg-blue-500" onClick={() => handleSave(record)}></Button>
          <Button icon={<DeleteOutlined />}  className="mr-2 text-white bg-red-600" onClick={() => handleViewMore(record)}></Button>
          <Button icon={<EyeOutlined />} onClick={() => handleViewMore(record)}></Button>

        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
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
            <Table dataSource={dataSource} columns={columns} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Academic_Resources ©2024 Created by Group 4</Footer>
      </Layout>
    </Layout>
  );
};

export default CourseAdmin;
