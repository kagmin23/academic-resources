import { FlagOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Layout, Table } from "antd";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const { Content } = Layout;

const ReportAdmin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const columns = [
    {
      title: "Report ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      render: (content: string) => <img src={content} alt="Report" className="max-w-xs" />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <div>
          <button className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            Approve
          </button>
          <button className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">
            Unapprove
          </button>
        </div>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      id: "RPT001",
      content: "https://example.com/image1.jpg",
      reason: "Incorrect data",
      title: "Monthly Sales Report",
      status: "Completed",
    },
    {
      key: "2",
      id: "RPT002",
      content: "https://example.com/image2.jpg",
      title: "Quarterly Financial Report",
      reason: "Pending review",
      status: "Pending",
    },
  ];

  const filteredData = data.filter(item =>
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Layout>
      <Content className="p-4">
        <div className="flex flex-col items-start justify-between mb-4 space-y-4 md:flex-row md:items-center md:space-y-0">
          <h1 className="text-2xl font-bold">
            Report Management <FlagOutlined />
          </h1>
          <div className="w-full md:w-1/3">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={handleSearchChange}
              className="h-10 text-lg border-2 border-gray-300 border-solid rounded"
              value={searchTerm}
            />
          </div>
        </div>
        <Table columns={columns} dataSource={filteredData} />
      </Content>
    </Layout>
  );
};

export default ReportAdmin;
