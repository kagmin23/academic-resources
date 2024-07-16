import { BookOutlined, SettingOutlined, UserOutlined, SafetyOutlined, LogoutOutlined } from '@ant-design/icons';
import { Input, Layout, Menu, Dropdown, Avatar, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { getCurrentUser } from 'services/AdminsApi/UserService';

const { Header, Content } = Layout;

interface MainLayoutProps {
  children?: React.ReactNode;
}

const LayoutStudent: React.FC<MainLayoutProps> = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['1']);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await getCurrentUser();
        if (response.success) {
          setCurrentUser(response.data);
        } else {
          notification.error({
            message: 'Error',
            description: 'Failed to fetch current user information',
          });
        }
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to fetch current user information',
        });
      }
    };

    fetchCurrentUser();
  }, []);

  const handleMenuClick = (e: { key: string }) => {
    setSelectedKeys([e.key]);
  };

  const onSearch = (value: string) => {
    navigate(`/search?query=${value}`);
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const settingsMenu = (
    <Menu style={{ width: 200 }}>
      <Menu.SubMenu key="setting" title="Setting" icon={<SettingOutlined />}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/admin/info-admin">Personal Infomation</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<SafetyOutlined />}>
          <Link to="/admin/admin-changepassword">Change Password</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        <Link to="/">Logout</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className='pb-20'>
      <Header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gray-800">
        <Link to={``} className="flex items-center mr-20">
          <BookOutlined className="text-xl text-white" />
          <h1 className="hidden ml-3 text-xl text-white md:block">
            Academic - Resources
          </h1>
        </Link>
        <div className="flex items-center gap-8">
          {currentUser && (
            <Dropdown overlay={settingsMenu} trigger={['click']}>
              <Avatar
                src={currentUser.avatar}
                className="text-4xl text-white"
                style={{ width: 35, height: 35 }}
              />
            </Dropdown>
          )}
        </div>
      </Header>
    </Layout>
  );
};

export default LayoutStudent;
