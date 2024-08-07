import {
  BellOutlined,
  ContainerOutlined,
  MoneyCollectOutlined,
  PieChartOutlined,
  ShoppingOutlined,
  StarOutlined,
  UserSwitchOutlined
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SidebarDataType {
  icon: React.ElementType;
  heading: string;
  href: string;
  children?: SidebarDataType[];
}

const SidebarAdmin: React.FC = () => {
  const [selected, setSelected] = useState<string | number>(0);
  const [expanded, setExpanded] = useState<boolean>(true);
  const navigate = useNavigate();

  const SidebarData: SidebarDataType[] = [
    {
      icon: PieChartOutlined,
      heading: "My Profile",
      href: "/instructor/profile-instructor",
    },
    {
      icon: ContainerOutlined,
      heading: "Manager Courses",
      href: "/instructor/profile-instructor/manager-instructor-course",
    },
    {
      icon: ContainerOutlined,
      heading: "Manager Sessions",
      href: "/instructor/profile-instructor/manager-instructor-session",
    },
    {
      icon: ContainerOutlined,
      heading: "Manager Lessons",
      href: "/instructor/profile-instructor/manager-instructor-lesson",
    },
    {
      icon: ShoppingOutlined,
      heading: "Manager Purchase",
      href: "/instructor/profile-instructor/manager-instructor-purchase",
    },
    {
      icon: MoneyCollectOutlined,
      heading: "Manager Payout",
      href: "/instructor/profile-instructor/manager-instructor-payout",
    },
    {
      icon: BellOutlined,
      heading: "Manager Subcription",
      href: "/instructor/profile-instructor/manager-subcription-instructor",
    },
    {
      icon: StarOutlined,
      heading: "Manager Review",
      href: "/instructor/profile-instructor/manager-review-instructor",
    },
  ];

  const toggleDrawer = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`transition-all duration-300 ${expanded ? 'w-60' : 'w-20'} h-full bg-[#1F2937] shadow-lg`}>
      <div className="flex items-center justify-between p-4">
        {/* <UserSwitchOutlined className="text-white" /> */}
        <span className={`text-lg font-bold text-white transition-all duration-300 ${expanded ? 'block' : 'hidden'}`}>
          YOUR<span className="text-blue-500">&nbsp;&nbsp;P R O F I L E</span>
        </span>
        <Button className="text-white" type="text" icon={<UserSwitchOutlined />} onClick={toggleDrawer} />
      </div>

      <Menu mode="inline" selectedKeys={[selected.toString()]} className="h-full py-3 bg-[#D6E0FF]">
        {SidebarData.map((item, index) => (
          item.children && item.children.length > 0 ? (
            <Menu.SubMenu key={index} icon={<item.icon />} title={item.heading}>
              {item.children.map((child, childIndex) => (
                <Menu.Item
                  key={`${index}-${childIndex}`}
                  icon={<child.icon />}
                  className={selected === `${index}-${childIndex}` ? "active bg-blue-500 text-white" : ""}
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
              className={selected === index ? "active bg-blue-500 text-white" : ""}
              onClick={() => {
                setSelected(index);
                navigate(item.href);
              }}
              style={{ marginTop: '0px' }}
            >
              {expanded && item.heading}
            </Menu.Item>
          )
        ))}
      </Menu>
    </div>
  );
};

export default SidebarAdmin;
