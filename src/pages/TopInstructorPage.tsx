import {
    CheckCircleOutlined,
    CheckOutlined,
    DesktopOutlined,
    FacebookOutlined,
    FormOutlined,
    HeartOutlined,
    HistoryOutlined,
    HomeOutlined,
    PicLeftOutlined,
    QuestionCircleFilled,
    SearchOutlined,
    SettingOutlined,
    TwitterOutlined,
    YoutubeOutlined,
} from "@ant-design/icons";
import { Image, Input, Menu } from "antd";
import React from "react";

interface DataType {
  key: string;
  image: string;
  name: string;
  description: string;
}

const { Search } = Input;

const dataSource: DataType[] = [
  {
    key: "1",
    image:
      "https://www.shutterstock.com/image-vector/standing-business-man-teacher-wearing-260nw-510075547.jpg",
    name: "Jonh Doe",
    description: "Word press and plugin tutor",
  },
  {
    key: "2",
    image:
      "https://www.foodallergy.org/sites/default/files/styles/635x460/public/2020-06/shutterstock_1375976735.jpg?h=45a22253&itok=6rPqSQOO",
    name: "Jonh Doe",
    description: "Word press and plugin tutor",
  },
  {
    key: "3",
    image: "https://via.placeholder.com/50",
    name: "Jonh Doe",
    description: "Word press and plugin tutor",
  },
  {
    key: "4",
    image: "https://via.placeholder.com/50",
    name: "Jonh Doe",
    description: "Word press and plugin tutor",
  },
  {
    key: "5",
    image: "https://via.placeholder.com/50",
    name: "Jonh Doe",
    description: "Word press and plugin tutor",
  },
];

const InstructorPage: React.FC = () => {
  return (
    <div className="flex bg-zinc-300">
      <div className="w-3/12 h-auto bg-white ">
        <div className="pb-5 mb-10 border-b-2">
          <Menu defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />}>
              Home
            </Menu.Item>
            <Menu.Item key="1" icon={<DesktopOutlined />}>
              Live Streams
            </Menu.Item>
            <Menu.Item key="1" icon={<PicLeftOutlined />}>
              Categories
            </Menu.Item>
            <Menu.Item key="1" icon={<HeartOutlined />}>
              Saved Courses
            </Menu.Item>
          </Menu>
        </div>
        <div>
          <p className="mb-5 font-thin text-center"> SUPCRIPTIONS </p>
          <div className="pb-5">
          <div className="flex py-1 space-x-10 border hover:bg-slate-600 border-y-1">
            <Image width="30px" height="30px" preview={false} className="object-fill ml-3 rounded-full " src="https://www.foodallergy.org/sites/default/files/styles/635x460/public/2020-06/shutterstock_1375976735.jpg?h=45a22253&itok=6rPqSQOO"> </Image>
            <h4 className="font-bold"> John Doe </h4>
            <CheckOutlined className="text-red-500"/>
          </div>
          <div className="flex py-1 space-x-10 border hover:bg-slate-600 border-y-1">
            <Image width="30px" height="30px" preview={false} className="object-fill ml-3 rounded-full " src="https://www.foodallergy.org/sites/default/files/styles/635x460/public/2020-06/shutterstock_1375976735.jpg?h=45a22253&itok=6rPqSQOO"> </Image>
            <h4 className="font-bold"> John Doe </h4>
            <CheckOutlined className="text-red-500"/>
          </div>
          <div className="flex py-1 space-x-10 border hover:bg-slate-600 border-y-1">
            <Image width="30px" height="30px" preview={false} className="object-fill ml-3 rounded-full " src="https://www.foodallergy.org/sites/default/files/styles/635x460/public/2020-06/shutterstock_1375976735.jpg?h=45a22253&itok=6rPqSQOO"> </Image>
            <h4 className="font-bold"> John Doe </h4>
            <CheckOutlined className="text-red-500"/>
          </div>

           </div>
          <Menu  defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<SettingOutlined />}>
             Setting
            </Menu.Item>
            <Menu.Item key="1" icon={<QuestionCircleFilled />}>
              Help
            </Menu.Item>
            <Menu.Item key="1" icon={<HistoryOutlined/>}>
              Report History
            </Menu.Item>
            <Menu.Item key="1" icon={<FormOutlined/>}>
              Send Feedback
            </Menu.Item>
          </Menu>
        </div>
      </div>
      <div className="p-10">
        <div className="mb-8">
          <Search
            placeholder="Search instructor..."
            enterButton={<SearchOutlined></SearchOutlined>}
            size="middle"
          />
        </div>
        <div className="flex flex-wrap ">
          {dataSource.map((data) => (
            <div className="p-5 mb-12 mr-10 text-center bg-white border w-80 h-80 hover:scale-105">
              <Image
                width="80px"
                height="80px"
                className="object-fill rounded-full"
                src={data.image}
              ></Image>
              <h1 className="text-3xl font-bold">
                {data.name} <CheckCircleOutlined className="text-blue-600" />
              </h1>
              <h4 className="mb-2">{data.description}</h4>
              <div className="mb-2">
                <button className="hover:scale-110 hover:text-red-600 ">
                  {" "}
                  <YoutubeOutlined className="mr-2 text-3xl " />
                </button>
                <button className="hover:scale-110 hover:text-blue-600">
                  {" "}
                  <FacebookOutlined className="mr-2 text-3xl " />
                </button>
                <button className="hover:scale-110 hover:text-blue-400">
                  {" "}
                  <TwitterOutlined className="mr-2 text-3xl " />
                </button>
              </div>
              <div>
                <p>1M students</p>
                <p> 3 courses</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorPage;