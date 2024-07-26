import {
  BellOutlined,
  ContainerOutlined,
  DeploymentUnitOutlined,
  PieChartOutlined,
  ShoppingCartOutlined
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
      icon: ShoppingCartOutlined,
      heading: 'Orders',
      href: "/student/profile-student/manager-student-purchase",
    },

    {
      icon: BellOutlined,
      heading: "Manager Subcription",
      href: "/student/profile-student/student-subscription",
    },
  ];

  const toggleDrawer = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`transition-all duration-300 ${expanded ? 'w-60' : 'w-20'} h-full min-h-screen bg-[#475a75] shadow-lg`}>
      <div className="flex flex-col items-center justify-between p-4">
        <Avatar size={64} src={aboutData.avatarSrc} />
        {/* <Title level={4} style={{ marginLeft: 16, color: "white" }}>{aboutData.name}</Title> */}
      </div>
    </div>
  );
};

export default SidebarStudent;
