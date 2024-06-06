import { BookOutlined, MenuOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Drawer, Input, Layout, Menu } from 'antd';
import Footer from 'components/Footer';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const { Header, Content } = Layout;
const { Search } = Input;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['1']);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (e: { key: string }) => {
    setSelectedKeys([e.key]);
  };

  const onSearch = (value: string) => {
    navigate(`/search?query=${value}`);
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center justify-between p-4 bg-gray-800">
        <Link to="/">
          <h1 className="text-xl text-white">
            <BookOutlined />&nbsp;&nbsp;&nbsp;Academic - Resources
          </h1>
        </Link>
        <div className="flex items-center gap-16">
          <Search
            placeholder="Search courses"
            onSearch={onSearch}
            className="hidden ml-4 w-72 md:block md:w-96"
          />
          <div className="hidden md:flex md:items-center md:gap-5">
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={selectedKeys}
              onClick={handleMenuClick}
              className="flex-grow md:flex md:justify-end"
            >
              <Menu.Item key="1" className="mx-2">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2" className="mx-2">
                <Link to="/course">Courses</Link>
              </Menu.Item>
              <Menu.Item key="3" className="mx-2">
                <Link to="/blog">Blog</Link>
              </Menu.Item>
              <Menu.Item key="4" className="mx-2">
                <Link to="/category">Category</Link>
              </Menu.Item>
              <Menu.Item key="5" className="mx-2">
                <Link to="/about">About</Link>
              </Menu.Item>
              <Menu.Item key="6" className="mx-2" icon={<ShoppingCartOutlined className="text-2xl" />}>
                <Link to="/shopping-card"></Link>
              </Menu.Item>
            </Menu>
            <Link to="/login">
              <Button className="p-4 text-lg">Log in</Button>
            </Link>
            <Link to="/profile-student">
              <UserOutlined className="text-3xl text-white" />
            </Link>
          </div>
          <MenuOutlined className="ml-2 text-white md:hidden" onClick={toggleDrawer} />
        </div>
      </Header>
      <Drawer
        title="Menu"
        placement="right"
        onClose={toggleDrawer}
        visible={drawerVisible}
      >
        <Search
          placeholder="Search courses"
          onSearch={onSearch}
          className="w-full mb-4"
        />
        <Menu
          mode="vertical"
          selectedKeys={selectedKeys}
          onClick={handleMenuClick}
        >
          <Menu.Item key="1" className="my-2">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" className="my-2">
            <Link to="/course">Courses</Link>
          </Menu.Item>
          <Menu.Item key="3" className="my-2">
            <Link to="/blog">Blog</Link>
          </Menu.Item>
          <Menu.Item key="4" className="my-2">
            <Link to="/category">Category</Link>
          </Menu.Item>
          <Menu.Item key="5" className="my-2">
            <Link to="/about">About</Link>
          </Menu.Item>
          <Menu.Item key="6" className="my-2" icon={<ShoppingCartOutlined className="text-2xl" />}>
            <Link to="/shopping-card"></Link>
          </Menu.Item>
          <Link to="/login">
            <Button className="w-full mt-4 text-lg">Log in</Button>
          </Link>
          <Link to="/profile-student">
            <UserOutlined className="mt-5 text-3xl text-black" />
          </Link>
        </Menu>
      </Drawer>
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
