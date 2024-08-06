import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Input, Layout, Modal, Select, Table, message, notification } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment, { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import { getUsers } from 'services/AdminsApi/getUserApiService';
import { reviewProfileInstructor } from 'services/AdminsApi/rvProfileInstructorApiService';

const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;

interface ApproveIns {
  _id: string;
  name: string;
  dob: Moment;
  email: string;
  password: string;
  phone_number: string;
  status: boolean;
  role: string;
  description: string;
  avatar: string;
  video: string;
  isRejected?: boolean;
  isApproved?: boolean;
  rejectComment?: string;
}

const ApproveInstructor: React.FC = () => {
  const [data, setData] = useState<ApproveIns[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
  const [confirmItemId, setConfirmItemId] = useState<string | undefined>(undefined);
  const [confirmAction, setConfirmAction] = useState<string>("");
  const [rejectComment, setRejectComment] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers({
          searchCondition: { keyword: "", role: "instructor", status: true, is_delete: false, is_verified: false },
          pageInfo: { pageNum: 1, pageSize: 10, totalItems: 6, totalPages: 1 },
        });
        if (response.success) {
          const storedRejected = JSON.parse(localStorage.getItem('rejectedInstructors') || '[]');
          const storedApproved = JSON.parse(localStorage.getItem('approvedInstructors') || '[]');
          const updatedData = response.data.pageData.map((instructor: ApproveIns) => {
            const rejectedInstructor = storedRejected.find((rej: ApproveIns) => rej._id === instructor._id);
            const approvedInstructor = storedApproved.find((app: ApproveIns) => app._id === instructor._id);
            return rejectedInstructor ? { ...instructor, ...rejectedInstructor } : approvedInstructor ? { ...instructor, ...approvedInstructor } : instructor;
          });
          setData(updatedData);
        } else {
          message.error("Failed to fetch Users");
        }
      } catch (error: any) {
        notification.error({
          message: "Failed to fetch Users!",
          description:
            error.message || "Failed to fetch Users. Please try again.",
        })
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleApproveInstructor = async (item: ApproveIns) => {
    try {
      await reviewProfileInstructor(item._id, "approve");
      message.success("Instructor profile approved successfully");
      const updatedData = data.map((dataItem) =>
        dataItem._id === item._id ? { ...dataItem, isApproved: true } : dataItem
      );
      setData(updatedData);
      localStorage.setItem('approvedInstructors', JSON.stringify(updatedData.filter(instructor => instructor.isApproved)));
    } catch (error: any) {
      notification.error({
        message: "Failed to Approve Instructor!",
        description:
          error.message || "Failed to Approve Instructor. Please try again.",
      })
    }
  };

  const handleRejectInstructor = async (item: ApproveIns, comment: string) => {
    try {
      await reviewProfileInstructor(item._id, "reject", comment);
      message.success("Instructor profile rejected successfully");
      const updatedData = data.map((dataItem) =>
        dataItem._id === item._id ? { ...dataItem, isRejected: true, rejectComment: comment } : dataItem
      );
      setData(updatedData);
      localStorage.setItem('rejectedInstructors', JSON.stringify(updatedData.filter(instructor => instructor.isRejected)));
    } catch (error: any) {
      notification.error({
        message: "Failed to Reject Instructor!",
        description:
          error.message || "Failed to Reject Instructor. Please try again.",
      })
    }
  };

  const handleConfirmAction = async () => {
    if (confirmItemId) {
      const item = data.find((dataItem) => dataItem._id === confirmItemId);
      if (!item) return;
      
      if (confirmAction === "approve") {
        await handleApproveInstructor(item);
      } else if (confirmAction === "reject") {
        await handleRejectInstructor(item, rejectComment);
      }
      setConfirmVisible(false);
      setConfirmItemId(undefined);
      setConfirmAction("");
      setRejectComment("");
    }
  };

  const handleConfirm = (action: string, itemId: string) => {
    setConfirmItemId(itemId);
    setConfirmAction(action);
    setConfirmVisible(true);
  };

  const handleFilterChange = (value: string) => {
    setFilterStatus(value);
  };

  const filteredData = data.filter((item) => {
    const matchesRole = filterStatus === "all" ||
      (filterStatus === "approved" && item.isApproved) ||
      (filterStatus === "rejected" && item.isRejected);
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const columns: ColumnsType<ApproveIns> = [
    { title: 'ID', dataIndex: '_id', key: '_id' },
    { title: 'Username', dataIndex: 'name', key: 'name' },
    {
      title: 'Date Of Birth',
      dataIndex: 'dob',
      key: 'dob',
      render: (dob: Moment) => moment(dob).format("YYYY-MM-DD"),
    },
    { title: 'Phone', dataIndex: 'phone_number', key: 'phone_number' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Video', dataIndex: 'video', key: 'video', width: 30 },
    { title: 'Description', dataIndex: 'description', key: 'description', width: 200 },
    {
      title: 'Action',
      key: 'action',
      render: (_, item: ApproveIns) => (
        <div className="flex flex-row gap-1">
          {!item.isRejected && !item.isApproved && (
            <>
              <Button
                className="text-white bg-blue-600"
                size="small"
                icon={<CheckOutlined />}
                onClick={() => handleConfirm("approve", item._id)}
              />
              <Button
                className="text-white bg-red-600"
                size="small"
                icon={<CloseOutlined />}
                onClick={() => handleConfirm("reject", item._id)}
              />
            </>
          )}
          {item.isRejected && (
            <span className="text-red-500">Rejected</span>
          )}
          {item.isApproved && (
            <span className="text-green-500">Approved</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <Content className="p-4">
        <h2 className="mb-4 text-xl font-bold">Approve Instructor</h2>
        <div className="flex items-center mb-4 space-x-2">
          <Input.Search
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full sm:w-1/3"
            onSearch={(value) => setSearchTerm(value)}
          />
          <Select
            value={filterStatus}
            onChange={handleFilterChange}
            className="w-full sm:w-1/3"
          >
            <Option value="all">All</Option>
            <Option value="approved">Approved</Option>
            <Option value="rejected">Rejected</Option>
          </Select>
        </div>

        <Table<ApproveIns>
          columns={columns}
          scroll={{x: 'max-content'}}
          dataSource={filteredData}
          rowKey={(record) => record._id}
          pagination={false}
        />

        <Modal
          title={confirmAction === "approve" ? "Approve Instructor" : "Reject Instructor"}
          visible={confirmVisible}
          onOk={handleConfirmAction}
          onCancel={() => setConfirmVisible(false)}
        >
          {confirmAction === "reject" && (
            <TextArea
              value={rejectComment}
              onChange={(e) => setRejectComment(e.target.value)}
              placeholder="Enter rejection comment"
              rows={4}
            />
          )}
          <p>
            Are you sure you want to {confirmAction === "approve" ? "approve" : "reject"} this instructor?
          </p>
        </Modal>
      </Content>
    </Layout>
  );
};

export default ApproveInstructor;
