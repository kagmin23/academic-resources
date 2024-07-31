import {
  BellOutlined,
  ContainerOutlined,
  DeploymentUnitOutlined,
  PieChartOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import { Avatar, Menu, notification, Typography } from "antd";
import 'antd/dist/reset.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from '../../services/AdminsApi/UserService';

const { Title } = Typography;

interface SidebarDataType {
  icon: React.ElementType;
  heading: string;
  href: string;
  children?: SidebarDataType[];
}

const SidebarStudent: React.FC = () => {
  const [selected, setSelected] = useState<string | number>(0);
  const [expanded, setExpanded] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const navigate = useNavigate();

  const SidebarData: SidebarDataType[] = [
    {
      icon: PieChartOutlined,
      heading: "Profile student",
      href: '/student/profile-student'
    },
    {
      icon: ContainerOutlined,
      heading: 'My Courses',
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
      href: "/student/profile-student/subcription-student",
    },
  ];

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
  


if (!currentUser) {
    return <div>Loading...</div>;
}

  return (
    <div className={`transition-all duration-300 ${expanded ? 'w-60' : 'w-20'} h-full min-h-screen bg-blue-200 shadow-lg`}>
      <div className="flex flex-col items-center justify-between p-4">
      <Avatar
                          size={100}
                          src={currentUser.avatar}
                          className="border-4 border-white"
                      />
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selected.toString()]}
        className="h-full py-3 bg-blue-200"
      >
        {SidebarData.map((item, index) => (
          item.children && item.children.length > 0 ? (
            <Menu.SubMenu
              key={index}
              icon={<item.icon />}
              title={<span >{item.heading}</span>}
            >
              {item.children.map((child, childIndex) => (
                <Menu.Item
                  key={`${index}-${childIndex}`}
                  icon={<child.icon  />}
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
              icon={<item.icon />}
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
      </Menu>
    </div>
  );
};

export default SidebarStudent;
