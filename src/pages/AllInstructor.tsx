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
import { ChangeEvent, useEffect } from "react";
import { Button, Image, Input, Menu, Select, Space,Pagination } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { maxWidth, minWidth, width } from "@mui/system";
import { setWith } from "lodash";

interface DataType {
  id: number;
  image: string;
  name: string;
  description: string;
}

const { Search } = Input;

const dataSource: DataType[] = [
  {
    id:1,
    image:
      "https://www.shutterstock.com/image-vector/standing-business-man-teacher-wearing-260nw-510075547.jpg",
    name: "Jonh Doe",
    description: "Word press and plugin tutor ",
  },
  {
    id: 2,
    image:
      "https://www.foodallergy.org/sites/default/files/styles/635x460/public/2020-06/shutterstock_1375976735.jpg?h=45a22253&itok=6rPqSQOO",
    name: "Jonh Doe",
    description: "Word press and plugin tutor",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/50",
    name: "Jonh Doe",
    description: "Word press and plugin tutor",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/50",
    name: "Jonh Doe",
    description: "Word press and plugin tutor",
  },
  {
    id: 5,
    image: "https://via.placeholder.com/50",
    name: "Jonh Doe",
    description: "Word press and plugin tutor",
  },
  {
    id: 6,
    image: "https://via.placeholder.com/50",
    name: "Jonh Doe",
    description: "Word press and plugin tutor",
  },
  {
    id: 7,
    image: "https://via.placeholder.com/50",
    name: "Jonh Doe",
    description: "Word press and plugin tutor",
  },
  {
    id: 8,
    image: "https://via.placeholder.com/50",
    name: "Jonh Doe",
    description: "Word press and plugin tutor",
  },
  {
    id: 9,
    image: "https://via.placeholder.com/50",
    name: "Jonh Doe",
    description: "Word press and plugin tutor",
  },
  {
    id: 10,
    image: "https://via.placeholder.com/50",
    name: "Jonh Doe",
    description: "Word press and plugin tutor",
  },
  {
    id: 11,
    image: "https://via.placeholder.com/50",
    name: "Jonh Doe",
    description: "Word press and plugin tutor",
  },
  {
    id: 12,
    image: "https://via.placeholder.com/50",
    name: "Jonh Doe",
    description: "Word press and plugin tutor",
  },

];



const AllInstructor: React.FC = () => {

  const useViewport = () => {
    const [width, setWidth] = React.useState(window.innerWidth);
    React.useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
  
    return { width };
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const viewPort = useViewport();
  const smallScreen = viewPort.width <= 640;
  const mediumScreen = viewPort.width <= 915 && viewPort.width >= 641 ;
  const largeScreen = viewPort.width >= 916;

const handlePageChange = (page: number) => {
  setCurrentPage(page);
}

useEffect(() => {
  if (smallScreen){
    setPageSize(3);
  } else if(mediumScreen){
    setPageSize(4);
  } else if(largeScreen){
    setPageSize(8);
  }
})
  return (
    <div className="flex h-lvh">
      <div className="pb-5 mb-10 w-72 ">
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          theme="dark"
          className="h-svh p-2 lg:text-base xl:text-lg w-full"
        >
          <Menu.Item id="1" icon={<UsergroupAddOutlined />}>
            All Instructor
          </Menu.Item>
          <Menu.Item id="2" icon={<PicLeftOutlined />}>
            Categories
          </Menu.Item>
          <Menu.Item id="3" icon={<HeartOutlined />}>
            Saved
          </Menu.Item>
        </Menu>
      </div>

      <div className="items-center ml-3 mx-0 lg:ml-20 ">
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
        <div className="grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-center   ">
          {dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((data) => (
            <div className="py-2 mb-3 sm:m-3 text-center xs:w-52 md:w-[180px]  border-black rounded-2xl shadow-md shadow-black  bg-slate-200 border hover:shadow-yellow-900 hover:scale-105">
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
                <div className="flex space-x-4 justify-center">
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
        <Pagination
  current={currentPage}
  pageSize={pageSize}
  total={dataSource.length}
  onChange={handlePageChange}
  className="flex justify-center mt-4"
/>


      </div>
    </div>
  );
};

export default AllInstructor;
