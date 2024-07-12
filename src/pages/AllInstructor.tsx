import {
  CheckCircleOutlined,
  CheckOutlined,
  FacebookOutlined,
  FilterOutlined,
  HeartOutlined,
  PicLeftOutlined,
  RedoOutlined,
  SearchOutlined,
  TwitterOutlined,
  UsergroupAddOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Pagination } from "@mui/material";
import { Button, Image, Input, Menu, Select, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";

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
    description: "Word press and plugin tutor ",
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

const AllInstructor: React.FC = () => {
  return (
    <div className="flex">
      <div className="pb-5 mb-10 w-72 ">
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          theme="dark"
          className="h-svh p-2 lg:text-base xl:text-lg w-full"
        >
          <Menu.Item key="1" icon={<UsergroupAddOutlined />}>
            All Instructor
          </Menu.Item>
          <Menu.Item key="2" icon={<PicLeftOutlined />}>
            Categories
          </Menu.Item>
          <Menu.Item key="3" icon={<HeartOutlined />}>
            Saved
          </Menu.Item>
        </Menu>
      </div>

      <div className="items-center ml-3 sm:mx-20">
        <div className="flex flex-row gap-5 mb-8 ">
          <h1 className="w-full sm:text-4xl text-xl font-bold">
            Instructors List
          </h1>
          <div className="md:w-1/3">
            <Search
              placeholder="Search..."
              enterButton={<SearchOutlined></SearchOutlined>}
              size="middle"
            />
          </div>
        </div>
        <Space
          className="space-x-1 sm:space-x-5 mb-3"
          direction="horizontal"
          size={12}
        >
          <FilterOutlined /> Filter:
          <Select style={{width:145}} defaultValue={"Most Reviewed"} options={[
            {value:"most reviewed", label:"Most Reviewed"},
            {value:"most relevant", label:"Most Relevant"},
            {value:"highest rate", label:"Highest Rate"}
          ]}>
          </Select>
          <Button className="text-white bg-blue-600"> Apply</Button>
          <Button className="text-white bg-blue-600" >
          
            <RedoOutlined />
          </Button>
        </Space>
        <div className="flex flex-wrap justify-center md:justify-normal  gap-2">
          {dataSource.map((data) => (
            <div className="py-2 sm:m-5 text-center border-black rounded-sm  bg-slate-200 border md:w-1/2 lg:w-2/5 xl:w-1/4  hover:scale-105">
              <Link to={`/instructor-detail`}>
                <Image
                  preview={false}
                  width="80px"
                  height="80px"
                  className="object-fill rounded-full"
                  src={data.image}
                ></Image>
                <h1 className="sm:text-3xl font-bold">
                  {data.name} <CheckCircleOutlined className="text-blue-600" />
                </h1>
                <h4 className="mb-2">{data.description}</h4>
                <div>
                  <p>1M students</p>
                  <p> 3 courses</p>
                </div>
              </Link>
              <div>
                <Button className="text-white bg-red-500">Subcribe</Button>
              </div>
            </div>
          ))}
          
        </div>
        <Pagination defaultPage={1}
        className="flex justify-center mt-8"/>

      </div>
    </div>
  );
};

export default AllInstructor;
