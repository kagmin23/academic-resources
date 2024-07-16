import {
  CheckCircleOutlined,
  ContainerOutlined,
  DeploymentUnitOutlined,
  FlagOutlined,
  LineChartOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  ReadOutlined,
  SafetyOutlined,
  SettingOutlined,
  SwapOutlined,
  UserOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import "antd/dist/reset.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SidebarDataType {
  icon: React.ElementType;
  heading: string;
  href: string;
  children?: SidebarDataType[];
}

const SidebarAdmin: React.FC = () => {
  const [selected, setSelected] = useState<string>("");
  const [expanded, setExpanded] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setExpanded(window.innerWidth > 640);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const SidebarData: SidebarDataType[] = [
    {
      icon: PieChartOutlined,
      heading: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      icon: UserSwitchOutlined,
      heading: "Users",
      href: "/admin/user",
      children: [
        {
          icon: UserSwitchOutlined,
          heading: "Users",
          href: "/admin/user",
        },
        {
          icon: UsergroupAddOutlined,
          heading: "Approve Instructor",
          href: "/admin/approve-instructor",
        },
      ],
    },
    {
      icon: ContainerOutlined,
      heading: "Courses",
      href: "/admin",
      children: [
        {
          icon: ReadOutlined,
          heading: "Courses",
          href: "/admin/course",
        },
        {
          icon: CheckCircleOutlined,
          heading: "Approve",
          href: "/admin/approve-courses",
        },
      ],
    },
    {
      icon: MenuUnfoldOutlined,
      heading: "Category",
      href: "/admin/category",
    },
    {
      icon: FlagOutlined,
      heading: "Report",
      href: "/admin/report",
    },
    {
      icon: LineChartOutlined,
      heading: "Transaction History",
      href: "/admin/transaction-history",
    },
  ];

  // const handleLogout = async () => {
  //   try {
  //     const resultLogout = await logoutApiService();
  //     if (resultLogout.success) {
  //       console.log("Logout Successfully");
  //     } else {
  //       console.error("Log-out failed", error);
  //     }
  //   } catch (error) {
  //       console.error("Log-out failed", error);
  //   }
  // }

  return (
    <div
      className={`transition-all duration-300 ${
        expanded ? "w-60" : "w-20"
      } h-full  bg-[#1F2937] shadow-lg`}
    >
      <div className="flex items-center justify-between p-4">
        <span
          className={`text-lg font-bold text-white transition-all duration-300 ${
            expanded ? "block" : "hidden"
          }`}
        >
          ADMINI<span className="text-blue-500">STRATOR</span>
        </span>
        <Button
          className="text-white"
          type="text"
          icon={<SwapOutlined />}
          onClick={() => setExpanded(!expanded)}
        />
      </div>

      <Menu
        mode="inline"
        selectedKeys={[selected]}
        className="h-full py-3 bg-[#D6E0FF]"
      >
        {SidebarData.map((item, index) => {
          if (item.children && item.children.length > 0) {
            return (
              <Menu.SubMenu
                key={index}
                icon={<item.icon />}
                title={item.heading}
              >
                {item.children.map((child, childIndex) => (
                  <Menu.Item
                    key={`${index}-${childIndex}`}
                    icon={<child.icon />}
                    onClick={() => {
                      setSelected(`${index}-${childIndex}`);
                      navigate(child.href);
                    }}
                  >
                    {expanded && child.heading}
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            );
          } else {
            return (
              <Menu.Item
                key={index}
                icon={<item.icon />}
                className={selected === index.toString() ? "active" : ""}
                onClick={() => {
                  setSelected(index.toString());
                  navigate(item.href);
                }}
                style={
                  item.heading === "Logout"
                    ? {
                        backgroundColor: "#FF1D1D",
                        color: "white",
                        marginTop: "30px",
                      }
                    : {}
                }
              >
                {expanded && item.heading}
              </Menu.Item>
            );
          }
        })}

        <Menu.Item icon={<DeploymentUnitOutlined />}>
          {expanded && "By Academic"}
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SidebarAdmin;
