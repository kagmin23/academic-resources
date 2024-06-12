import { FlagOutlined } from "@ant-design/icons";
import { Layout, Table } from "antd";
import React from "react";
import "tailwindcss/tailwind.css";

const { Content } = Layout;

const ReportAdmin: React.FC = () => {
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

  return (
    <Layout>
      <Content className="p-4">
        <h1 className="mb-4 text-2xl">Report Management <FlagOutlined /></h1>
        <Table columns={columns} dataSource={data} />
      </Content>
    </Layout>
  );
};

export default ReportAdmin;