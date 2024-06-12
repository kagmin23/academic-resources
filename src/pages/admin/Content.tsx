import { CameraOutlined, EyeOutlined, FileOutlined, LaptopOutlined, PieChartOutlined, SaveOutlined, UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Button, Layout, Table } from 'antd';
import { AlignType } from 'rc-table/lib/interface';
import React, { useState } from 'react';

const { Header, Content, Footer } = Layout;

interface DataType {
  key: string;
  image: string;
  title: string;
}

const dataSource: DataType[] = [
  {
    key: '1',
    image: 'https://via.placeholder.com/50',
    title: 'Item 1',
  },
  {
    key: '2',
    image: 'https://via.placeholder.com/50',
    title: 'Item 2',
  },
  {
    key: '3',
    image: 'https://via.placeholder.com/50',
    title: 'Item 3',
  },
  {
    key: '4',
    image: 'https://via.placeholder.com/50',
    title: 'Item 4',
  },
  {
    key: '5',
    image: 'https://via.placeholder.com/50',
    title: 'Item 5',
  },
  {
    key: '6',
    image: 'https://via.placeholder.com/50',
    title: 'Item 6',
  },
];

const columns = [
  {
    title: 'Category',
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
    title: 'Actions',
    key: 'actions',
    align: 'center' as AlignType,
    render: (text: string, record: DataType) => (
      <div style={{ textAlign: 'center' }}>
        <Button icon={<SaveOutlined />} className="mr-2" onClick={() => {}}></Button>
        <Button icon={<EyeOutlined />} onClick={() => {}}></Button>
      </div>
    ),
  },
];

const CategoryPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleSave = (record: DataType) => {
    // Add your save logic here
  };

  const handleViewMore = (record: DataType) => {
    // Add your view more logic here
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Header className="p-0 bg-white">
          <div className="flex flex-wrap items-center justify-center gap-4 p-4 bg-[#939fb1]">
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
            <Button icon={<FileOutlined />} className="flex items-center">
              Music
            </Button>
            <Button icon={<CameraOutlined />} className="flex items-center">
              Photography
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

export default CategoryPage;
