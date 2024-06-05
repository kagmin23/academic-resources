import { BookOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Input, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import Footer from './Footer';

const { Header, Content } = Layout;
const { Search } = Input;

const MainLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['1']);
  const navigate = useNavigate();

  const handleMenuClick = (e: any) => {
    setSelectedKeys([e.key]);
  };

  const onSearch = (value: string) => {
    navigate(`/search?query=${value}`);
  };

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center justify-between p-4 bg-gray-800">
        <Link to="/"><h1 className="text-lg text-white"><BookOutlined />&nbsp;&nbsp;&nbsp;Academic - Resources</h1></Link>
        <div className="flex items-center">
          <Search
            placeholder="Search courses"
            onSearch={onSearch}
            className="hidden w-48 md:block"
          />
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={selectedKeys}
            onClick={handleMenuClick}
            className="hidden md:flex"
          >
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">Courses</Menu.Item>
            <Menu.Item key="3">About</Menu.Item>
          </Menu>
          <Button onClick={() => ({})} className="ml-2">Log in</Button>
          <MenuOutlined className="ml-2 text-white md:hidden" />
        </div>
      </Header>
      <Content className="p-4">
        <div className="p-4 bg-white rounded shadow">
          {children}
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainLayout;
