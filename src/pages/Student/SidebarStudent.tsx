import {
  ContainerOutlined,
  PieChartOutlined,
  ShoppingCartOutlined,
  ScheduleOutlined,
  UserSwitchOutlined,
  DeploymentUnitOutlined,
  EyeOutlined
} from "@ant-design/icons";
import { Avatar, Menu, Typography, Button } from "antd";
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
      icon: ScheduleOutlined,
      heading: 'Subscription',
      href: "/student/profile-student/student-subscription",
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
    {
      icon: EyeOutlined,
      heading: "Manager Subcription",
      href: "/student/profile-student/subcription-student",
    },
  ];

  const toggleDrawer = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="flex h-screen">
      <div className={`transition-all duration-300 ${expanded ? 'w-60' : 'w-20'} h-full bg-[#1F2937] shadow-lg`}>
        <div className="flex items-center justify-between p-4">
          <span className={`text-lg font-bold text-white transition-all duration-300 ${expanded ? 'block' : 'hidden'}`}>
            YOUR<span className="text-blue-500">&nbsp;&nbsp;P R O F I L E</span>
          </span>
          <Button className="text-white" type="text" icon={<UserSwitchOutlined />} onClick={toggleDrawer} />
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
                title={<span style={{ color: selected === index ? 'black' : 'white' }}>{item.heading}</span>}
                style={{ color: 'white' }}
              >
                {item.children.map((child, childIndex) => (
                  <Menu.Item
                    key={`${index}-${childIndex}`}
                    icon={<child.icon style={{ color: 'white' }} />}
                    style={{ color: 'white' }}
                    className={selected === `${index}-${childIndex}` ? "bg-blue-900 text-black" : ""}
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
                className={`${selected === index ? "bg-blue-900 text-black" : ""} ${item.heading === "Logout" ? "bg-red-600 mt-6" : "mt-0"}`}
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
    </div>
  );
};

export default SidebarStudent;
