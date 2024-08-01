import { BookOutlined, LoginOutlined, LogoutOutlined, MenuOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Drawer, Input, Layout, Menu } from 'antd';
import Footer from 'components/Footer';
import React, { useRef, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { getCourses } from 'services/UserClient/clientApiService';
import 'tailwindcss/tailwind.css';

const { Header, Content } = Layout;
const { Search } = Input;

interface MainLayoutProps {
  children?: React.ReactNode;
}

const LayoutGuest: React.FC<MainLayoutProps> = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['1']);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null); // Create a ref for the Input element
  const navigate = useNavigate();

  const handleMenuClick = (e: { key: string }) => {
    setSelectedKeys([e.key]);
  };

  const onSearch = async (value: string) => {
    try {
      const response = await getCourses(value, '', 1, 10);
      navigate(`/search?query=${value}`, { state: { courses: response } });
      if (searchInputRef.current) {
        // Clear the search input
        searchInputRef.current.value = ''; 
      }
    } catch (error) {
      console.error('Error searching courses:', error);
    }
  };
  
  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <Layout className="min-h-screen ">
      <Header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gray-800 ">
        <Link to="/" className="flex items-center mr-20">
          <BookOutlined className="text-xl text-white" />
          <h1 className="hidden ml-3 text-xl text-white md:block">
            Academic - Resources
          </h1>
        </Link>

        <div className="flex items-center gap-12">
          <Search
            placeholder="Search courses..."
            onSearch={onSearch}
            className="hidden ml-4 w-72 md:block md:w-96"
          />
          
          <div className="flex items-center space-x-4 text-xl text-white">
            <Link to="/log-in">
              <ShoppingCartOutlined className="text-xl" />
            </Link>
          </div>
          <div className="flex gap-2">
            <Link to="/log-in">
              <Button className="w-full mt-4 text-xs bg-green-300">
                Sign in<LoginOutlined />
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button className="w-full mt-4 text-xs text-white bg-red-500">
                Sign up<LogoutOutlined />
              </Button>
            </Link>
          </div>
          <MenuOutlined className="ml-2 text-white md:hidden" onClick={toggleDrawer} />
        </div>
      </Header>

      <div className="pt-16">
        <div className="fixed left-0 right-0 z-50 hidden top-18 md:flex md:items-center md:gap-5">
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={selectedKeys}
            onClick={handleMenuClick}
            className="flex-grow gap-5 md:flex md:justify-end shadow-custom-gray"
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
              <Link to="/about">About</Link>
            </Menu.Item>
            <Menu.Item key="5" className="mx-2">
              <Link to="/contact">Contact</Link>
            </Menu.Item>
          </Menu>
        </div>
      </div>
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
            <Link to="/about">About</Link>
          </Menu.Item>
          <Menu.Item key="5" className="my-2" icon={<ShoppingCartOutlined className="text-2xl" />}>
            <Link to="/log-in"></Link>
          </Menu.Item>
        </Menu>
      </Drawer>
      <Content className="p-4 pt-16">
        <div className="p-4 bg-white rounded shadow">
          <Outlet />
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default LayoutGuest;