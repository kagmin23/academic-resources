import { FlagOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Layout, Modal, Table } from "antd";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const { Content } = Layout;

interface Report {
  key: string;
  id: string;
  content: string;
  reason: string;
  title: string;
  status: string;
}

const ReportAdmin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [data, setData] = useState<Report[]>([
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
    {
      key: "3",
      id: "RPT003",
      content: "https://example.com/video1.mp4", // Thêm video link vào dữ liệu
      title: "Video Report",
      reason: "Pending review",
      status: "Pending",
    },
    {
      key: "4",
      id: "RPT004",
      content: "https://example.com/video2.mp4", // Thêm video link vào dữ liệu
      title: "Video Report 2",
      reason: "Pending review",
      status: "Pending",
    },
  ]);
  const [unapproveItemId, setUnapproveItemId] = useState<string | undefined>();
  const [unapproveConfirmVisible, setUnapproveConfirmVisible] = useState<boolean>(false);
  const [videoModalVisible, setVideoModalVisible] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string>("");

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
      render: (content: string) => (
        <img
          src={content}
          alt="Report"
          className="max-w-xs cursor-pointer"
          onClick={() => handleContentClick(content)}
        />
      ),
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
      render: (text: any, record: Report) => (
        <div>
          {record.status === "Pending" && (
            <>
              <Button
                type="primary"
                className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                onClick={() => handleApprove(record.id)}
              >
                Approve
              </Button>
              <Button
                type="primary"
                danger
                className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                onClick={() => showUnapproveConfirm(record.id)}
              >
                Unapprove
              </Button>
            </>
          )}
          {record.status === "Completed" && (
            <span className="font-bold text-green-600">Completed</span>
          )}
        </div>
      ),
    },
  ];

  const filteredData = data.filter(
    (item) =>
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleApprove = (id: string) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, status: "Completed" } : item
    );

    setData(updatedData);
    console.log(`Approving report with ID: ${id}`);
  };

  const showUnapproveConfirm = (id: string) => {
    setUnapproveItemId(id);
    setUnapproveConfirmVisible(true);
  };

  const handleUnapprove = () => {
    if (unapproveItemId) {
      const updatedData = data.map((item) =>
        item.id === unapproveItemId ? { ...item, status: "Pending" } : item
      );

      setData(updatedData);
      setUnapproveConfirmVisible(false);
    }
  };

  const handleContentClick = (content: string) => {
    setVideoUrl(content);
    setVideoModalVisible(true);
  };

  const handleVideoModalClose = () => {
    setVideoModalVisible(false);
    setVideoUrl("");
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
              className="items-center w-full h-8 text-sm border-2 border-gray-300 border-solid rounded"
              value={searchTerm}
            />
          </div>
        </div>
        <Table columns={columns} dataSource={filteredData} />

        <Modal
          title="Video Content"
          visible={videoModalVisible}
          onCancel={handleVideoModalClose}
          footer={null}
          width={800}
        >
          <video controls style={{ width: "100%" }}>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Modal>

        <Modal
          title="Confirm Unapprove"
          visible={unapproveConfirmVisible}
          onOk={handleUnapprove}
          onCancel={() => setUnapproveConfirmVisible(false)}
        >
          <p>Are you sure you want to unapprove this report?</p>
        </Modal>
      </Content>
    </Layout>
  );
};

export default ReportAdmin;
