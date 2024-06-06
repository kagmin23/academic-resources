import { CameraOutlined, EyeOutlined, FileOutlined, LaptopOutlined, PieChartOutlined, SaveOutlined, UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, Table } from 'antd';
import { AlignType } from 'rc-table/lib/interface'; // Import AlignType
import React, { useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;

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
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
        {!collapsed && (
          <div className="flex items-center justify-center mt-4 mb-4">
            <p className="text-lg text-3xl font-semibold text-white">Category</p>
          </div>
        )}
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Development
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Business
          </Menu.Item>
          <Menu.Item key="3" icon={<LaptopOutlined />}>
            IT & Software
          </Menu.Item>
          <Menu.Item key="4" icon={<UsergroupAddOutlined />}>
            Marketing
          </Menu.Item>
          <Menu.Item key="5" icon={<FileOutlined />}>
            Music
          </Menu.Item>
          <Menu.Item key="6" icon={<CameraOutlined />}>
            Photography
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header className="p-0 bg-white" />
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