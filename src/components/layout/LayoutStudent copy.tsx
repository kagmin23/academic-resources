import { BookOutlined, MenuOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Layout, Menu } from 'antd';
import Footer from 'components/Footer';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';


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
        <Link to="/"><h1 className="text-xl text-white"><BookOutlined />&nbsp;&nbsp;&nbsp;Academic - Resources</h1></Link>
        <div className="flex items-center gap-5">
          <Search
            placeholder="Search courses"
            onSearch={onSearch}
            className="w-64 md:w-96"
          />
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={selectedKeys}
            onClick={handleMenuClick}
            className="flex-grow md:flex md:justify-end"
          >
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">Courses</Menu.Item>
            <Link to='/shoppingCard'> <Menu.Item key="3" icon={<ShoppingCartOutlined />}>About</Menu.Item> </Link>
          </Menu>
          <Link to="/login"><Button onClick={() => ({})} className="p-4 text-lg">Log in</Button></Link>
          <MenuOutlined className="ml-2 text-white md:hidden" />
          <Link to="/profile-student"><UserOutlined className="text-3xl text-white" /></Link>
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
