import { ContainerOutlined, CopyrightOutlined, FlagOutlined, LineChartOutlined, LogoutOutlined, MenuUnfoldOutlined, PieChartOutlined, SwapOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
import 'antd/dist/reset.css';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface SidebarDataType {
  icon: React.ElementType;
  heading: string;
  href: string;
}

const SidebarAdmin: React.FC = () => {
  const [selected, setSelected] = useState<number>(0);
  const [expanded, setExpanded] = useState<boolean>(true);
  const navigate = useNavigate();

  const SidebarData: SidebarDataType[] = [
    {
      icon: PieChartOutlined,
      heading: "Dashboard",
      href: '/admin/dashboard'
    },
    {
      icon: UserSwitchOutlined,
      heading: "Users",
      href: '/admin/user'
    },
    {
      icon: ContainerOutlined,
      heading: "Course",
      href: "/admin/course"
    },
    {
      icon: MenuUnfoldOutlined,
      heading: 'Category',
      href: "/admin/category"
    },
    {
      icon: FlagOutlined,
      heading: 'Report',
      href: "/admin/report"
    },
    {
      icon: LineChartOutlined,
      heading: 'Transaction History',
      href: "/admin/transaction-history"
    },
    {
      icon: LogoutOutlined,
      heading: 'Logout',
      href: "/"
    },
  ];

  return (
    <div className={`transition-all duration-300 ${expanded ? 'w-60' : 'w-20'} h-screen bg-[#1F2937] shadow-lg`}>
      <div className="flex items-center justify-between p-4">
        <Link to="/admin-page"><span className={`text-lg font-bold text-white transition-all duration-300 ${expanded ? 'block' : 'hidden'}`}>
          ADMINI<span className="text-blue-500">STRATOR</span>
        </span></Link>
        <Button className="text-white" type="text" icon={<SwapOutlined />} onClick={() => setExpanded(!expanded)} />
      </div>

      <Menu mode="inline" selectedKeys={[selected.toString()]} className="h-full py-3 bg-[#D6E0FF]">
        {SidebarData.map((item, index) => (
          <Menu.Item
            key={index}
            icon={<item.icon />}
            className={selected === index ? "active bg-blue-500 text-white" : ""}
            onClick={() => {
              setSelected(index);
              navigate(item.href);
            }}
          >
            {expanded && item.heading}
          </Menu.Item>
        ))}
        <Menu.Item icon={<CopyrightOutlined />}>
          {expanded && 'By Academic'}
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SidebarAdmin;
