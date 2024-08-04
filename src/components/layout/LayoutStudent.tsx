import { BookOutlined, LogoutOutlined, MenuOutlined, SettingOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Drawer, Dropdown, Input, Layout, Menu } from 'antd';
import Footer from 'components/Footer';
import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { getCarts } from 'services/All/CartApiService';
import { getCourses } from 'services/UserClient/clientApiService';
import 'tailwindcss/tailwind.css';
import { getCurrentUser } from '../../services/AdminsApi/UserService';

const { Header, Content } = Layout;
const { Search } = Input;
const { SubMenu } = Menu;

const LayoutStudent: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['1']);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [notificationCountCart, setNotificationCountCart] = useState<number>(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  const fetchCurrentUser = async () => {
    try {
      const response = await getCurrentUser();
      if (response.success) {
        setCurrentUser(response.data);
      } else {
        console.error('Failed to fetch current user:', response.error);
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const fetchCartData = async () => {
    try {
      const response = await getCarts('', 1, 100);
      if (response.success) {
        setNotificationCountCart(response.data.length);
        setLastFetched(new Date());
      } else {
        console.error('Failed to fetch cart data:', response.error);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchCartData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastFetched && (new Date().getTime() - lastFetched.getTime() > 300000)) { // 5 minutes
        fetchCartData();
      }
    }, 60000); // 1 minute
    return () => clearInterval(interval);
  }, [lastFetched]);

  const handleMenuClick = (e: { key: string }) => {
    setSelectedKeys([e.key]);
  };

  const onSearch = async (value: string) => {
    try {
      const response = await getCourses(value, '', 1, 10);
      navigate(`search?query=${value}`, { state: { courses: response } });
      if (searchInputRef.current) {
        searchInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error searching courses:', error);
    }
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const handleLogout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("exp token");
    navigate("/")
  };

  const profileMenu = (
    <Menu style={{ width: 200 }}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/student/profile-student">Profile</Link>
      </Menu.Item>
      <SubMenu key="2" icon={<SettingOutlined />} title="Settings">
        <Menu.Item key="setting:1">
          <Link to={`/student/profile-student/info-student/${currentUser ? currentUser._id : ''}`}>Personal Info</Link>
        </Menu.Item>
        <Menu.Item key="setting:2">
          <Link to="/student/profile-student/student-changepassword">Change Password</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="min-h-screen">
      <Header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gray-800">
        <Link to={``} className="flex items-center mr-20">
          <BookOutlined className="text-xl text-white" />
          <h1 className="hidden ml-3 text-xl text-white md:block">
            Academic - Resources
          </h1>
        </Link>
        <div className="flex items-center gap-14">
          <Search
            placeholder="Search courses"
            onSearch={onSearch}
            className="hidden ml-4 w-72 md:block md:w-96"
          />

          <Badge count={notificationCountCart} offset={[5, 5]}>
            <div className="flex items-center space-x-4 text-xl text-white">
              <Link to={`shopping-cart`}>
                <ShoppingCartOutlined className="text-xl" />
              </Link>
            </div>
          </Badge>
          {currentUser && (
            <Dropdown overlay={profileMenu} trigger={['hover']}>
              <Avatar
                src={currentUser.avatar}
                className="text-4xl text-white"
                style={{ width: 35, height: 35 }}
              />
            </Dropdown>
          )}
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
            className="flex-grow gap-5 md:flex md:justify-end"
          >
            <Menu.Item key="1" className="mx-2">
              <Link to={``}>Home</Link>
            </Menu.Item>
            <Menu.Item key="2" className="mx-2">
              <Link to={`course`}>Courses</Link>
            </Menu.Item>
            <Menu.Item key="3" className="mx-2">
              <Link to={`blog`}>Blog</Link>
            </Menu.Item>
            <Menu.Item key="6" className="mx-2">
              <Link to={`about`}>About</Link>
            </Menu.Item>
            <Menu.Item key="7" className="mx-2">
              <Link to={`contact`}>Contact</Link>
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
            <Link to={``}>Home</Link>
          </Menu.Item>
          <Menu.Item key="2" className="my-2">
            <Link to={`course`}>Courses</Link>
          </Menu.Item>
          <Menu.Item key="3" className="my-2">
            <Link to={`blog`}>Blog</Link>
          </Menu.Item>
          <Menu.Item key="4" className="my-2">
            <Link to={`category`}>Category</Link>
          </Menu.Item>
          <Menu.Item key="5" className="my-2">
            <Link to={`about`}>About</Link>
          </Menu.Item>
          <Menu.Item key="6" className="my-2" icon={<ShoppingCartOutlined className="text-2xl" />}>
            <Link to={`shopping-cart`}></Link>
          </Menu.Item>
        </Menu>
      </Drawer>
      <Content className="pt-10 pb-3">
        <div className="p-4 m-0">
          <Outlet />
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default LayoutStudent;
