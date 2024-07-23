import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Input, Layout, Modal, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment, { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import { changeStatus } from 'services/AdminsApi/changeStatusApiService';
import { getUsers } from 'services/AdminsApi/getUserApiService';
import { reviewProfileInstructor } from 'services/AdminsApi/rvProfileInstructorApiService';

const { Content } = Layout;

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
}

const ApproveInstructor: React.FC = () => {
  const [data, setData] = useState<ApproveIns[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [lockConfirmVisible, setLockConfirmVisible] = useState<boolean>(false);
  const [lockItemId, setLockItemId] = useState<string | undefined>(undefined);
  const [confirmMessage, setConfirmMessage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers({
          searchCondition: { keyword: "", role: "instructor", status: true, is_delete: false },
          pageInfo: { pageNum: 1, pageSize: 10 },
        });
        if (response.success) {
          setData(response.data.pageData);
        } else {
          message.error("Failed to fetch users");
        }
      } catch (error) {
        message.error("Error fetching users");
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = async (checked: boolean, item: ApproveIns) => {
    try {
      await changeStatus(item._id, checked);
      const updatedData = data.map((dataItem) =>
        dataItem._id === item._id ? { ...dataItem, status: checked } : dataItem
      );
      setData(updatedData);
      message.success(`User status ${checked ? 'activated' : 'deactivated'} successfully`);
    } catch (error) {
      message.error('Error changing user status');
    }
  };

  const handleLockStatus = async () => {
    if (lockItemId) {
      try {
        await changeStatus(lockItemId, false);
        const updatedData = data.map((item) =>
          item._id === lockItemId ? { ...item, status: false } : item
        );
        setData(updatedData);
        setLockItemId(undefined);
        setLockConfirmVisible(false);
        message.success("User status locked successfully");
      } catch (error) {
        message.error('Error locking user status');
      }
    }
  };

  const handleApproveInstructor = async (item: ApproveIns) => {
    try {
      await reviewProfileInstructor();
      message.success("Instructor profile approved successfully");
      const updatedData = data.map((dataItem) =>
        dataItem._id === item._id ? { ...dataItem, status: true } : dataItem
      );
      setData(updatedData);
    } catch (error) {
      message.error('Error approving instructor profile');
    }
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: ColumnsType<ApproveIns> = [
    { title: 'ID', dataIndex: '_id', key: '_id' },
    // {
    //   title: 'Avatar',
    //   dataIndex: 'avatar',
    //   key: 'avatar',
    //   render: (avatar: string) => <iframe src={avatar} title="Avatar"></iframe>,
    // },
    { title: 'Username', dataIndex: 'name', key: 'name' },
    {
      title: 'Date Of Birth',
      dataIndex: 'dob',
      key: 'dob',
      render: (dob: Moment) => moment(dob).format("YYYY-MM-DD"),
    },
    { title: 'Phone', dataIndex: 'phone_number', key: 'phone_number' },
    { title: 'Email', dataIndex: 'email', key: 'email',},
    { title: 'Video', dataIndex: 'video', key: 'video', width: 50 },
    { title: 'Description', dataIndex: 'description', key: 'description', width: 200 },

    {
      title: 'Action',
      key: 'action',
      render: (_, item: ApproveIns) => (
        <div className="flex flex-row gap-1">
        <Button
          className="text-white bg-blue-500"
          size="small"
          icon={<CheckOutlined />}
          onClick={() => handleApproveInstructor(item)}
        >
        </Button>

        <Button
          className="text-white bg-red-500"
          size="small"
          icon={<CloseOutlined />}
          onClick={() => handleApproveInstructor(item)}
        >
        </Button>
        
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
            className="w-1/3"
            onSearch={(value) => setSearchTerm(value)}
          />
        </div>

        <Table dataSource={filteredData} columns={columns} rowKey="_id" />

        <Modal
          title="CONFIRM INSTRUCTOR ACCOUNT VALID?"
          visible={lockConfirmVisible}
          onOk={handleLockStatus}
          onCancel={() => setLockConfirmVisible(false)}
        >
          <p>{confirmMessage}</p>
        </Modal>
      </Content>
    </Layout>
  );
};

export default ApproveInstructor;
