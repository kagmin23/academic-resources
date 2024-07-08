import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Layout, Modal, Select, Switch, Table, message } from "antd";
import { Content } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import moment, { Moment } from "moment";
import React, { useState, useEffect } from "react";
import { changeStatus } from "services/AdminsApi/changeStatusApiService";
import { getUsers } from "services/AdminsApi/getUserApiService";
import { changeUserRole } from "services/AdminsApi/changeRoleApiService";
import { deleteUser } from "services/AdminsApi/deleteUserApiService";
import { createUser } from "services/AdminsApi/createUserApiService";
import { getUserDetail } from "services/AdminsApi/getUserDetailApiService";
import { updateUser } from "services/AdminsApi/updateUserApiService";

const { Option } = Select;

interface Item {
  _id: string;
  name: string;
  gender: string;
  dob: Moment;
  email: string;
  password:string;
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
  const [filteredRole, setFilteredRole] = useState<string | undefined>(undefined);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<string | undefined>();
  const [lockConfirmVisible, setLockConfirmVisible] = useState<boolean>(false);
  const [lockItemId, setLockItemId] = useState<string | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers({
          searchCondition: { keyword: "", role: "all", status: true, is_delete: false },
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
        } catch (error) {
          message.error("Error updating user");
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
          } catch (error) {
            message.error("Error adding user");
          }
        }
         else {
          message.error("Please fill in the password field");
        }
      }
      setEditingItem({});
      setModalOpen(false);
    } 
    else {
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
    } catch (error) {
      message.error("Error fetching user details");
    }
  };

  const handleDelete = async () => {
    if (deleteItemId) {
      try {
        await deleteUser(deleteItemId);
        const updatedData = data.filter((item) => item._id !== deleteItemId);
        setData(updatedData);
        message.success("User deleted successfully");
      } catch (error) {
        message.error("Error deleting user");
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

  const handleStatusChange = async (checked: boolean, item: Item) => {
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

  const handleRoleChange = async (userId: string, role: string) => {
    try {
      await changeUserRole(userId, role);
      const updatedData = data.map((item) =>
        item._id === userId ? { ...item, role } : item
      );
      setData(updatedData);
      message.success("User role updated successfully");
    } catch (error) {
      message.error("Error updating user role");
    }
  };

  const filteredData = data.filter((item) => {
    const matchesRole = filteredRole ? item.role.toLowerCase() === filteredRole.toLowerCase() : true;
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
      render: (role, item) => (
        <Select
          value={role}
          onChange={(value) => handleRoleChange(item._id, value)}
          style={{ width: 120 }}
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
      render: (status, item) => (
        <Switch
          checked={status}
          onChange={(checked) => handleStatusChange(checked, item)}
        />
      ),
    },
    
    {
      title: 'Actions',
      key: 'actions',
      render: (_, item) => (
        <>
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(item)} className="mr-2"></Button>
          <Button type="primary" icon={<DeleteOutlined />} danger onClick={() => { setDeleteItemId(item._id); setDeleteConfirmVisible(true); }}></Button>
        </>
      ),
    },
  ];

  return (
    <Layout>
      <Content className="p-4">
        <h2 className="mb-4 text-xl font-bold">Manage Accounts</h2>
        <div className="flex items-center mb-4 space-x-2">
          <Input.Search
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-1/2"
            onSearch={value => setSearchTerm(value)}
          />
          <Select
            placeholder="Filter by Role"
           
            value={filteredRole}
            onChange={handleRoleFilterChange}
            className="w-1/4"
          >
            <Option value="admin">Admin</Option>
            <Option value="student">Student</Option>
            <Option value="instructor">Instructor</Option>
          </Select>
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => setModalOpen(true)}
          >
            Add User
          </Button>
        </div>

        <Table<Item>
          columns={columns}
          dataSource={filteredData}
          rowKey={(record) => record._id}
          pagination={false}
        />

        {/* Modals */}
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
        value={editingItem.phone_number}
        onChange={(e) => setEditingItem({ ...editingItem, phone_number: e.target.value })}
      />
    </Form.Item>
    <Form.Item label="Email">
      <Input
        value={editingItem.email}
        onChange={(e) => setEditingItem({ ...editingItem, email: e.target.value })}
      />
    </Form.Item>
    <Form.Item label="Role">
      <Select
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

        <Modal
          title="Confirm Lock User"
          visible={lockConfirmVisible}
          onOk={handleLockStatus}
          onCancel={() => {
            setLockItemId(undefined);
            setLockConfirmVisible(false);
          }}
          okButtonProps={{ danger: true }}
        >
          <p>Are you sure you want to lock this user?</p>
        </Modal>
      </Content>
    </Layout>
  );
};

export default UsersAdmin;
