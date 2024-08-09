import { BookOutlined, LogoutOutlined, SafetyOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Menu, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'services/AdminsApi/UserService';
import 'tailwindcss/tailwind.css';

const { Header, Content } = Layout;

interface MainLayoutProps {
  children?: React.ReactNode;
}

const LayoutStudent: React.FC<MainLayoutProps> = () => {
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
      } catch (error: any) {
        notification.error({
          message: "Failed to fetch User information!",
          description:
            error.message || "Failed to fetch User information. Please try again.",
        })
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("exp token");
    navigate("/")
  };

  const settingsMenu = (
    <Menu style={{ width: 200 }}>
      <Menu.SubMenu key="setting" title="Setting" icon={<SettingOutlined />} className="hover:cursor-pointer">
        <Menu.Item key="1" icon={<UserOutlined />} className="hover:cursor-pointer">
          <Link to="/admin/info-admin">Personal Infomation</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<SafetyOutlined />} className="hover:cursor-pointer">
          <Link to="/admin/admin-changepassword">Change Password</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout} className="hover:cursor-pointer">
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gray-800">
        <Link to={``} className="flex items-center mr-20 hover:cursor-pointer">
          <BookOutlined className="text-xl text-white" />
          <h1 className="hidden ml-3 text-xl text-white md:block">
            Academic - Resources
          </h1>
        </Link>
        <div className="flex items-center gap-8">
          {currentUser && (
            <Dropdown overlay={settingsMenu} trigger={['hover']}>
              <Avatar
                src={currentUser.avatar}
                className="text-4xl text-white hover:cursor-pointer"
                style={{ width: 35, height: 35 }}
              />
            </Dropdown>
          )}
        </div>
      </Header>
      <Content style={{ marginTop: 64 }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default LayoutStudent;
