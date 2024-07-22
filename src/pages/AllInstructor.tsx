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
import { Pages } from "@mui/icons-material";
import { Button, Image, Input, Menu, Select, Space, Pagination } from "antd";
import React, { useEffect, useState } from "react";
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
  {
    key: "6",
    image: "https://via.placeholder.com/50",
    name: "Jonh Doe",
    description: "Word press and plugin tutor",
  },
  {
    key: "7",
    image: "https://via.placeholder.com/50",
    name: "Jonh Doe",
    description: "Word press and plugin tutor",
  },
  {
    key: "8",
    image: "https://via.placeholder.com/50",
    name: "Jonh Doe",
    description: "Word press and plugin tutor",
  },
  {
    key: "9",
    image: "https://via.placeholder.com/50",
    name: "Jonh Doe",
    description: "Word press and plugin tutor",
  },
  {
    key: "10",
    image: "https://via.placeholder.com/50",
    name: "Jonh Doe",
    description: "Word press and plugin tutor",
  },
  {
    key: "11",
    image: "https://via.placeholder.com/50",
    name: "Jonh Doe",
    description: "Word press and plugin tutor",
  },
  {
    key: "12",
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
  const mediumScreen = viewPort.width <= 750 && viewPort.width >= 641;
  const mediumLargeScreen = viewPort.width <= 830 && viewPort.width >= 751;
  const largeScreen = viewPort.width >= 916;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (viewPort.width <= 640) {
      setPageSize(2);
    } else if (viewPort.width <= 750 && viewPort.width >= 641) {
      setPageSize(4);
    } else if (viewPort.width <= 830 && viewPort.width >= 1300) {
      setPageSize(6);
    } else if (viewPort.width >= 1) {
      setPageSize(8);
    }
  });
  return (
    <div className="flex h-fit ">
      <div className="pb-5 w-72 ">
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          theme="dark"
          className="p-2 h-full overflow-hidden lg:text-base xl:text-lg w-[223px]"
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

      <div className="items-center ml-3 ">
        <div className="flex flex-row gap-10 mb-8 ">
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
          <Select
            style={{ width: 145 }}
            defaultValue={"Most Reviewed"}
            options={[
              { value: "most reviewed", label: "Most Reviewed" },
              { value: "most relevant", label: "Most Relevant" },
              { value: "highest rate", label: "Highest Rate" },
            ]}
          ></Select>
          <Button className="text-white bg-blue-600"> Apply</Button>
          <Button className="text-white bg-blue-600">
            <RedoOutlined />
          </Button>
        </Space>
        <div className="grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-center ">
          {dataSource
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((data) => (
              <div className="py-2 mb-3 sm:m-3 text-center   md:w-[230px] border-black rounded-2xl shadow-sm hover:shadow-2xl  bg-slate-200 border   hover:scale-[1.02]">
                <Link to={`/instructor-detail`}>
                  <Image
                    preview={false}
                    width="80px"
                    height="80px"
                    className="object-fill rounded-full"
                    src={data.image}
                  ></Image>
                  <h1 className="sm:text-3xl font-bold">
                    {data.name}{" "}
                    <CheckCircleOutlined className="text-blue-600" />
                  </h1>
                  <h4 className="mb-2 h-fit ">{data.description}</h4>
                  <div className="flex space-x-4 justify-center mb-3">
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
        simple
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
