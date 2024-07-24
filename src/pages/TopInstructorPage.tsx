import {
  CheckCircleOutlined,
  HeartOutlined,
  PicLeftOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button, Image, Input, Menu } from "antd";
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
    description: "Word press and plugin tutor asjfjx jasj asj jsafn safhsak jfkak sakfa ",
  },
  {
    key: "6",
    image:
      "https://www.shutterstock.com/image-vector/standing-business-man-teacher-wearing-260nw-510075547.jpg",
    name: "Jonh Doe",
    description: "Word press and plugin tutor sakhfash",
  }
];

const InstructorPage: React.FC = () => {
  return (
    <div className="flex h-fit ">
        <div className="pb-5 ">
          <Menu   mode="inline" theme="dark" className=" p-2 h-full overflow-hidden lg:text-base xl:text-lg w-[223px]">
            <Menu.Item key="1" icon={<UsergroupAddOutlined />}>
            <Link to={`/all-instructor`}>
             All Instructor
             </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<PicLeftOutlined />}>
              Categories
            </Menu.Item>
            <Menu.Item key="3" icon={<HeartOutlined />}>
            <Link to={`/save`}>
              Saved
            </Link>
            </Menu.Item>
          </Menu>
        </div>
        
      <div className="items-center ml-3 sm:mx-20">
        <div className="text-center mb-8 ">
          <h1 className="w-full sm:text-4xl text-xl font-bold">Top Rakings</h1>
        </div>
        <div className="flex flex-wrap justify-center  gap-2">
          {dataSource.map((data) => (
            
            <div className="py-2 sm:m-5  text-center border-black rounded-2xl  bg-slate-200 border md:w-1/2 lg:w-2/5 xl:w-1/4 shadow-sm hover:scale-[1.02] hover:shadow-xl">
              <Link to={`/instructor-detail`}>
            <Image
                preview = {false}
                width="80px"
                height="80px"
                className="object-fill rounded-full"
                src={data.image}
              ></Image>
              <h1 className="sm:text-3xl font-bold">
                {data.name} <CheckCircleOutlined className="text-blue-600" />
              </h1>
              <h4 className="my-5 h-fit">{data.description}</h4>
              <div className="flex justify-center space-x-10 mb-3">
                <p>1M students</p>
                <p> 3 courses</p>
              </div>
              </Link>
              <div><Button className="text-white bg-red-500">Subcribe</Button></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorPage;

