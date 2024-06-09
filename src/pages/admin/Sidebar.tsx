// Sidebar.tsx
import {
  BarChartOutlined,
  DashboardOutlined,
  FileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  return (
    <Sider collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="/users">Users</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<FileOutlined />}>
          Content
        </Menu.Item>
        <Menu.Item key="4" icon={<BarChartOutlined />}>
          Report
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
