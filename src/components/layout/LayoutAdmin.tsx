import { BookOutlined } from '@ant-design/icons';
import { Input, Layout } from 'antd';
import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import '../../assets/Logoacademic.png';

const { Header, Content } = Layout;

const { Search } = Input;

interface MainLayoutProps {
  children?: React.ReactNode;  // Optional to match with default ReactNode
}

const LayoutStudent: React.FC<MainLayoutProps> = () => {
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
    <div className='mb-16'>

      <Header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gray-800">
      <Link to={``} className="flex items-center mr-20">
                <BookOutlined className="text-xl text-white" />
                <h1 className="hidden ml-3 text-xl text-white md:block">
                  Academic - Resources
                </h1>
        </Link>
        <div className="flex items-center gap-16">
          {/* <Search
            placeholder="Search courses"
            onSearch={onSearch}
            className="hidden ml-4 w-72 md:block md:w-96"
          /> */}
          {/* <Link to="/admin-page"><Button><PieChartOutlined /> Dash Board</Button></Link> */}
          {/* <Link to="/">
            <Button className="w-full mt-4 text-xs">Log out<LogoutOutlined /></Button>
          </Link> */}
          {/* <Link to="/profile-student">
            <UserOutlined className="mt-5 mr-5 text-3xl text-white" />
          </Link> */}
          {/* <MenuOutlined className="ml-2 text-white md:hidden" onClick={toggleDrawer} /> */}
        </div>
      </Header>
      {/* <div className="pt-16">
        <div className="fixed left-0 right-0 z-50 hidden top-18 md:flex md:items-center md:gap-5">
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={selectedKeys}
            onClick={handleMenuClick}
            className="flex-grow gap-2 md:flex md:justify-end"
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
              <Link to="/top-instructor">Instructor</Link>
            </Menu.Item>
            <Menu.Item key="6" className="mx-2">
              <Link to="/about">About</Link>
            </Menu.Item>
            <Menu.Item key="7" className="mx-2">
              <Link to="/save">Save</Link>
            </Menu.Item>
            <Menu.Item key="8" className="mx-2">
              <Link to="/contact">Contact</Link>
            </Menu.Item>
            <Menu.Item key="9" className="mx-2" icon={<ShoppingCartOutlined className="text-2xl" />}>
              <Link to="/shopping-cart"></Link>
            </Menu.Item>

          </Menu>
        </div>
      </div> */}
      {/* <Drawer
        title="Menu"
        placement="right"
        onClose={toggleDrawer}
        visible={drawerVisible}
      > */}
      {/* <Search
          placeholder="Search courses"
          onSearch={onSearch}
          className="w-full mb-4"
        /> */}
      {/* <Menu
          mode="vertical"
          selectedKeys={selectedKeys}
          onClick={handleMenuClick}
        >
          <Menu.Item key="1" className="my-2">
            <Link to={`/`}>Home</Link>
          </Menu.Item>
          <Menu.Item key="2" className="my-2">
            <Link to={`/course`}>Courses</Link>
          </Menu.Item>
          <Menu.Item key="3" className="my-2">
            <Link to={`/blog`}>Blog</Link>
          </Menu.Item>
          <Menu.Item key="4" className="my-2">
            <Link to={`/category`}>Category</Link>
          </Menu.Item>
          <Menu.Item key="5" className="my-2">
            <Link to={`/about`}>About</Link>
          </Menu.Item>
          <Menu.Item key="6" className="my-2" icon={<ShoppingCartOutlined className="text-2xl" />}>
            <Link to={`/shopping-cart`}></Link>
          </Menu.Item>
        </Menu>
      </Drawer> */}
      {/* <Content className="p-4 pt-16"> */}
      {/* <div className="p-4 bg-white rounded shadow"> */}
      <Outlet />
      {/* </div> */}
      {/* </Content> */}

      {/* <Footer />  */}
    </div>

  );
};

export default LayoutStudent;
