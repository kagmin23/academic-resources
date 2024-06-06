import React from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  XOutlined,
  PlayCircleOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";

import "../index.css";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "sub1",
    label: "Bai 1",
    icon: < XOutlined/>,
    children: [
      {
        key: "g1",
        label: "Phan 1",
        type: "group",
        children: [
          { key: "1", label: "Option 1" },
          { key: "2", label: "Option 2" },
        ],
      },
      {
        key: "g2",
        label: "Phan 2",
        type: "group",
        children: [
          { key: "3", label: "Option 3" },
          { key: "4", label: "Option 4" },
        ],
      },
    ],
  },
  {
    key: "sub2",
    label: "Bai 2",
    icon: <AppstoreOutlined />,
    children: [
      { key: "5", label: "Option 5" },
      { key: "6", label: "Option 6" },
      {
        key: "sub3",
        label: "Submenu",
        children: [
          { key: "7", label: "Option 7" },
          { key: "8", label: "Option 8" },
        ],
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "sub4",
    label: "Bai 3",
    icon: <SettingOutlined />,
    children: [
      { key: "9", label: "Option 9" },
      { key: "10", label: "Option 10" },
      { key: "11", label: "Option 11" },
      { key: "12", label: "Option 12" },
    ],
  },
 
];

const Lesson: React.FC = () => {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);

  };
  return (
    <div className="flex h-screen">
      <div className="w-4/6 border m-8 border-solid bg-slate-200">
        <div className=" text-bold text-3xl pt-4 pl-10">
          <strong >Khoa hoc lap trinh </strong>
        </div>
             
    <h4 className="pl-10 pt-5 pb-5">Day la 1 khoa hoc ve lap trinh Day la 1 khoa hoc ve lap trinh</h4>

  <div className=" text-bold text-3xl pt-4 pl-10">
          <strong className="text-2xl">Gioi thieu khoa hoc</strong>
        </div>
        <h4 className="pl-10 pt-5 pb-5">Qua khoa hoc nay ban se hoc duoc cac ki nang: </h4>

        <div className="flex justify-center w-full h-2/4">
            <img src="https://static.unica.vn/upload/images/2019/06/lap-trinh-web-css3_1561534375.jpg" 
               className="w-4/5 h-full rounded" ></img>
               <div className="icon-overlay absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 w-15 h-15 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-white">
               <PlayCircleOutlined  />
               </div>
        </div>
      </div>

      <div className="w-2/6 border m-8 border-solid bg-slate-200 h-3/6">
        <div className="text-center text-bold text-2xl pt-4">
          <strong>Bai hoc </strong>
        </div>
        <Menu className="bg-slate-200"
          onClick={onClick}
          defaultSelectedKeys={[""]}
          defaultOpenKeys={[""]}
          mode="inline"
          items={items}
        ></Menu>
<div className="flex justify-center mt-10">
<Button className="bg-blue-400"> Dang ki hoc  </Button>
</div>
        
      </div>
    </div>
  );
};

export default Lesson;