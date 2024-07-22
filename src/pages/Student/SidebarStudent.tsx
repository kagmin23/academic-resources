import {
  ContainerOutlined,
  PieChartOutlined,
  ShoppingCartOutlined,
  ScheduleOutlined,
  DeploymentUnitOutlined
} from "@ant-design/icons";
import { Avatar, Menu, Typography } from "antd";
import 'antd/dist/reset.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

interface SidebarDataType {
  icon: React.ElementType;
  heading: string;
  href: string;
  children?: SidebarDataType[];
}

const aboutData = {
  avatarSrc: 'https://cdn3d.iconscout.com/3d/premium/thumb/student-male-7267574-5914564.png?f=webp',
  name: 'David Doe',
  email: 'davidd09@gmail.com',
  dob: 'January 1, 2003',
  gender: 'Female',
  courseCreatedDate: 'January 15, 2023',
  facebook: 'https://www.facebook.com/vu.hanthien.545',
  linkedin: 'https://linkedin.com/in/david34',
};

const SidebarStudent: React.FC = () => {
  const [selected, setSelected] = useState<string | number>(0);
  const [expanded, setExpanded] = useState<boolean>(true);
  const navigate = useNavigate();

  const SidebarData: SidebarDataType[] = [
    {
      icon: PieChartOutlined,
      heading: "About",
      href: '/student/profile-student'
    },
    {
      icon: ContainerOutlined,
      heading: 'My Course',
      href: "/student/profile-student/course-student",
    },
    {
      icon: ContainerOutlined,
      heading: 'Certificates',
      href: "/student/profile-student/certificate-student",
    },
    {
      icon: ShoppingCartOutlined,
      heading: 'Orders',
      href: "/student/profile-student/manager-student-purchase",
    },
    {
      icon: ScheduleOutlined,
      heading: 'Assignments',
      href: "/student/profile-student/*",
    },
  ];

  return (
    <div className={`transition-all duration-300 ${expanded ? 'w-60' : 'w-20'} h-screen bg-[#475a75] shadow-lg`}>
      <div className="flex flex-col items-center justify-between p-4">
        <Avatar size={64} src={aboutData.avatarSrc} />
        <Title level={4} style={{ marginLeft: 16, color: "white" }}>{aboutData.name}</Title>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selected.toString()]}
        style={{ backgroundColor: '#475a75', color: 'white' }}
        className="h-full py-3"
      >
        {SidebarData.map((item, index) => (
          item.children && item.children.length > 0 ? (
            <Menu.SubMenu
              key={index}
              icon={<item.icon style={{ color: 'white' }} />}
              title={<span style={{ color: 'white' }}>{item.heading}</span>}
              style={{ color: 'white' }}
            >
              {item.children.map((child, childIndex) => (
                <Menu.Item
                  key={`${index}-${childIndex}`}
                  icon={<child.icon style={{ color: 'white' }} />}
                  style={{ color: 'white' }}
                  className={selected === `${index}-${childIndex}` ? "bg-blue-900" : ""}
                  onClick={() => {
                    setSelected(`${index}-${childIndex}`);
                    navigate(child.href);
                  }}
                >
                  {expanded && child.heading}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item
              key={index}
              icon={<item.icon style={{ color: 'white' }} />}
              style={{ color: 'white' }}
              className={`${selected === index ? "bg-blue-900" : ""} ${item.heading === "Logout" ? "bg-red-600 mt-6" : "mt-0"}`}
              onClick={() => {
                setSelected(index);
                navigate(item.href);
              }}
            >
              {expanded && item.heading}
            </Menu.Item>
          )
        ))}
        <Menu.Item icon={<DeploymentUnitOutlined style={{ color: 'white' }} />} style={{ color: 'white' }}>
          {expanded && 'By Academic'}
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SidebarStudent;
