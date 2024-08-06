import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Layout, Modal, Select, Switch, Table, message, notification } from "antd";
import { Content } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import moment, { Moment } from "moment";
import { AlignType } from 'rc-table/lib/interface';
import React, { useEffect, useState } from "react";
import { createUser, deleteUser } from "services/AdminsApi/UserService";
import { changeUserRole } from "services/AdminsApi/changeRoleApiService";
import { changeStatus } from "services/AdminsApi/changeStatusApiService";
import { getUsers } from "services/AdminsApi/getUserApiService";
import { getUserDetail } from "services/All/getUserDetailApiService";
import { updateUser } from "services/All/updateUserApiService";

const { Option } = Select;
const { confirm } = Modal;

interface Item {
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

const UsersAdmin: React.FC = () => {
  const [data, setData] = useState<Item[]>([]);
  const [editingItem, setEditingItem] = useState<Partial<Item>>({});
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredRole, setFilteredRole] = useState<string>("all");
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<string | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers({
          searchCondition: { keyword: "", role: "all", status: true, is_delete: false, is_verified: true },
          pageInfo: { pageNum: 1, pageSize: 10, totalItems: 6, totalPages: 1 },
        });
        if (response.success) {
          setData(response.data.pageData);
        } else {
          message.error("Failed to fetch users");
        }
      } catch (error: any) {
        notification.error({
          message: "Failed to get Users!",
          description:
            error.message || "Failed to get Users. Please try again.",
        });
      }
    };

    fetchData();
  }, []); 

  const handleAdd = async () => { 
    if (
      editingItem.name &&
      editingItem.dob &&
      editingItem.email &&
      editingItem.phone_number &&
      editingItem.role
    ) {
      if (editingItem._id) {
        try {
          const response = await updateUser(editingItem._id, {
            name: editingItem.name,
            dob: editingItem.dob.toISOString(),
            email: editingItem.email,
            phone_number: editingItem.phone_number,
            role: editingItem.role,
            status: editingItem.status || false,
            description: editingItem.description || "",
            avatar: editingItem.avatar || "",
            video: editingItem.video || "",
          });
          if (response.success) {
            const updatedData = data.map((item) =>
              item._id === editingItem._id ? { ...item, ...editingItem } as Item : item
            );
            setData(updatedData);
            message.success("User updated successfully");
          } else {
            message.error("Failed to update user");
          }
        } catch (error: any) {
          notification.error({
            message: "Failed to update User!",
            description:
              error.message || "Failed to update User. Please try again.",
          });
        }
      } else {
        if (editingItem.password) {
          try {
            const response = await createUser(
              editingItem.name,
              editingItem.password,
              editingItem.email,
              editingItem.role,
              editingItem.phone_number,
            );
            if (response.success) {
              const newData = [...data, { _id: data.length + 1, status: true, ...editingItem } as Item];
              setData(newData);
              message.success("User added successfully");
            } else {
              message.error("Failed to add user");
            }
          } catch (error: any) {
            notification.error({
              message: "Failed to create User!",
              description:
                error.message || "Failed to create User. Please try again.",
            });
          }
        } else {
          message.error("Please fill in the password field");
        }
      }
      setEditingItem({});
      setModalOpen(false);
    } else {
      message.error("Please fill in all fields");
    }
  };

  const handleEdit = async (item: Item) => {
    try {
      const response = await getUserDetail(item._id);
      if (response.success) {
        setEditingItem({
          ...response.data,
          dob: moment(response.data.dob),
        });
        setModalOpen(true);
      } else {
        message.error("Failed to fetch user details");
      }
    } catch (error: any) {
      notification.error({
        message: "Failed to fetch user details!",
        description:
          error.message || "Failed to fetch user details. Please try again.",
      });
    }
  };

  const handleDelete = async () => {
    if (deleteItemId) {
      try {
        await deleteUser(deleteItemId);
        const updatedData = data.filter((item) => item._id !== deleteItemId);
        setData(updatedData);
        message.success("User deleted successfully");
      } catch (error: any) {
        notification.error({
          message: "Failed to delete User!",
          description:
            error.message || "Failed to delete User. Please try again.",
        });
      } finally {
        setDeleteItemId(undefined);
        setDeleteConfirmVisible(false);
      }
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRoleFilterChange = (value: string) => {
    setFilteredRole(value);
  };

  const handleStatusChange = (checked: boolean, item: Item) => {
    Modal.confirm({
      title: 'Confirm Status Change',
      content: `Are you sure you want to ${checked ? 'activate' : 'deactivate'} this user status?`,
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await changeStatus(item._id, checked);
          const updatedData = data.map((dataItem) =>
            dataItem._id === item._id ? { ...dataItem, status: checked } : dataItem
          );
          setData(updatedData);
          message.success(`User status has been ${checked ? 'activated' : 'deactivated'} successfully`);
        } catch (error) {
          message.error('Error changing user status');
        }
      },
      onCancel() {},
    });
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    confirm({
      title: 'Are you sure want to change Role for this user?',
      content: `New Role: ${newRole}`,
      okText: 'Change',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await changeUserRole(userId, newRole);
          const updatedData = data.map((item) =>
            item._id === userId ? { ...item, role: newRole } : item
          );
          setData(updatedData);
          message.success('Changed Role Successfully');
        } catch (error: any) {
          notification.error({
            message: "Failed to change Role!",
            description:
              error.message || "Failed to change Role. Please try again.",
          });
        }
      },
      onCancel: () => {}
    });
  };

  const filteredData = data.filter((item) => {
    const matchesRole = filteredRole === "all" || item.role.toLowerCase() === filteredRole.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const columns: ColumnsType<Item> = [
    { title: 'ID', dataIndex: '_id', key: '_id' },
    { title: 'Username', dataIndex: 'name', key: 'name' },
    { 
      title: 'Date Of Birth', 
      dataIndex: 'dob', 
      key: 'dob', 
      render: (dob: string) => moment(dob).format("YYYY-MM-DD"),
    },
    { title: 'Phone', dataIndex: 'phone_number', key: 'phone_number' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { 
      title: 'Role', 
      dataIndex: 'role', 
      key: 'role',
      align: "center" as AlignType,
      render: (role, item) => (
        <Select
          size="small"
          value={role}
          onChange={(value) => handleRoleChange(item._id, value)}
          style={{ width: 100 }}
        >
          <Option value="admin">Admin</Option>
          <Option value="student">Student</Option>
          <Option value="instructor">Instructor</Option>
        </Select>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: "center" as AlignType,
      render: (status, item) => (
        <Switch
          size="small"
          checked={status}
          onChange={(checked) => handleStatusChange(checked, item)}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, item) => (
        <div className="flex space-x-2">
          <Button size="small" type="primary" icon={<EditOutlined />} onClick={() => handleEdit(item)} />
          <Button size="small" type="primary" icon={<DeleteOutlined />} danger onClick={() => { setDeleteItemId(item._id); setDeleteConfirmVisible(true); }} />
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <Content className="p-4">
        <h2 className="mb-4 text-xl font-bold">Manage Accounts</h2>
        <div className="flex flex-col justify-between mb-4 md:flex-row md:items-center md:space-x-2">
          <Input.Search
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full md:w-1/3"
            onSearch={value => setSearchTerm(value)}
          />
          <Select
            placeholder="Filter by Role"
            value={filteredRole}
            onChange={handleRoleFilterChange}
            className="w-full mt-2 md:w-1/6 md:mt-0"
          >
            <Option value="all">All</Option>
            <Option value="admin">Admin</Option>
            <Option value="student">Student</Option>
            <Option value="instructor">Instructor</Option>
          </Select>
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => setModalOpen(true)}
            className="mt-2 md:mt-0"
          >
            Add New User
          </Button>
        </div>

        <Table<Item>
          columns={columns}
          dataSource={filteredData}
          rowKey={(record) => record._id}
          pagination={false}
        />

        <Modal
          title={`${editingItem._id ? 'Edit' : 'Add'} User`}
          visible={isModalOpen}
          onOk={handleAdd}
          onCancel={() => {
            setEditingItem({});
            setModalOpen(false);
          }}
        >
          <Form layout="vertical">
            <Form.Item label="Username">
              <Input
                placeholder= "Please enter the name of user!"
                value={editingItem.name}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Date of Birth">
              <DatePicker
                value={editingItem.dob ? moment(editingItem.dob) : undefined}
                onChange={(date) => setEditingItem({ ...editingItem, dob: date })}
              />
            </Form.Item>
            <Form.Item label="Phone">
              <Input
                placeholder= "Please enter the phone of user!"
                value={editingItem.phone_number}
                onChange={(e) => setEditingItem({ ...editingItem, phone_number: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Email">
              <Input
                placeholder= "Please enter the email of user!"
                value={editingItem.email}
                onChange={(e) => setEditingItem({ ...editingItem, email: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Role">
              <Select
                placeholder= "Please select the Role of user!"
                value={editingItem.role}
                onChange={(value) => setEditingItem({ ...editingItem, role: value })}
              >
                <Option value="admin">Admin</Option>
                <Option value="student">Student</Option>
                <Option value="instructor">Instructor</Option>
              </Select>
            </Form.Item>
            {!editingItem._id && (
              <Form.Item label="Password">
                <Input.Password
                  placeholder= "Please enter password of user!"
                  value={editingItem.password}
                  onChange={(e) => setEditingItem({ ...editingItem, password: e.target.value })}
                />
              </Form.Item>
            )}
          </Form>
        </Modal>

        <Modal
          title="Confirm Delete"
          visible={deleteConfirmVisible}
          onOk={handleDelete}
          onCancel={() => {
            setDeleteItemId(undefined);
            setDeleteConfirmVisible(false);
          }}
          okButtonProps={{ danger: true }}
        >
          <p>Are you sure you want to delete this user?</p>
        </Modal>
      </Content>
    </Layout>
  );
};

export default UsersAdmin;
