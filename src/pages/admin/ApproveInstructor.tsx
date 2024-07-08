import { DatePicker, Form, Input, Layout, Modal, Select, Switch, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment, { Moment } from 'moment';
import React, { useState } from 'react';
import { deleteUsers } from 'services/AdminsApi/deleteUsersApiService'; // Adjusted import
import { addUser } from '../../services/AdminsApi/addUserApiService';

const { Content } = Layout;
const { Option } = Select;

interface Item {
  id: number;
  name: string;
  gender: string;
  dateofbirth: Moment;
  email: string;
  phone: string;
  status: boolean;
  role: string;
}

const initialData: Item[] = [
  { id: 1, name: "Phan", gender: "Male", dateofbirth: moment("1990-01-01"), email: "phan@gmail.com", phone: "0111", status: false, role: "Admin" },
  { id: 2, name: "Kang", gender: "Male", dateofbirth: moment("1995-05-05"), email: "kang@gmail.com", phone: "0222", status: false, role: "Student" },
  { id: 3, name: "Min", gender: "Male", dateofbirth: moment("1988-12-25"), email: "min@gmail.com", phone: "0333", status: false, role: "Instructor" },
];

const ApproveInstructor: React.FC = () => {
  const [data, setData] = useState<Item[]>(initialData);
  const [editingItem, setEditingItem] = useState<Partial<Item>>({});
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredRole, setFilteredRole] = useState<string | undefined>(undefined);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number | undefined>();
  const [lockConfirmVisible, setLockConfirmVisible] = useState<boolean>(false);
  const [lockItemId, setLockItemId] = useState<number | undefined>();
  const [statusChangeItem, setStatusChangeItem] = useState<Item | undefined>(undefined);
  const [confirmMessage, setConfirmMessage] = useState<string>("");

  const handleAdd = async () => {
    if (
      editingItem.name &&
      editingItem.gender &&
      editingItem.dateofbirth &&
      editingItem.email &&
      editingItem.phone &&
      editingItem.role
    ) {
      if (editingItem.id) {
        const updatedData = data.map((item) =>
          item.id === editingItem.id ? { ...item, ...editingItem } as Item : item
        );
        setData(updatedData);
        message.success("User updated successfully");
      } else {
        try {
          const response = await addUser(editingItem);
          const newUser = response.data; // Assuming the API returns the newly created user
          const newData = [...data, newUser];
          setData(newData);
          message.success('User added successfully');
        } catch (error) {
          message.error('Failed to add user');
        } finally {
          setEditingItem({});
          setModalOpen(false);
        }
      }
    } else {
      message.error('Please fill in all fields');
    }
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (deleteItemId) {
      try {
        await deleteUsers(deleteItemId); // Use the deleteUsers function here
        const updatedData = data.filter((item) => item.id !== deleteItemId);
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

  const handleStatusChange = (checked: boolean, item: Item) => {
    if (!checked) {
      setLockItemId(item.id);
      setStatusChangeItem(item);
      setConfirmMessage("Are you sure you want to LOCK this Instructor account?");
      setLockConfirmVisible(true);
    } else {
      setLockItemId(item.id);
      setStatusChangeItem(item);
      setConfirmMessage("Are you sure you want to APPROVE this Instructor account?");
      setLockConfirmVisible(true);
    }
  };

  const handleLockStatus = () => {
    if (statusChangeItem) {
      const updatedData = data.map((item) =>
        item.id === statusChangeItem.id ? { ...item, status: !item.status } : item
      );
      setData(updatedData);
      setStatusChangeItem(undefined);
      setLockConfirmVisible(false);
      message.success(`User status ${statusChangeItem.status ? 'deactivated' : 'activated'} successfully!`);
    }
  };

  const filteredData = data.filter((item) => {
    const matchesRole = filteredRole ? item.role.toLowerCase() === filteredRole.toLowerCase() : true;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const columns: ColumnsType<Item> = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Username', dataIndex: 'name', key: 'name' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    { 
      title: 'Date Of Birth', 
      dataIndex: 'dateofbirth', 
      key: 'dateofbirth', 
      render: (dateofbirth: Moment) => dateofbirth.format("YYYY-MM-DD"),
    },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean, item: Item) => (
        <Switch
          checked={status}
          onChange={(checked) => handleStatusChange(checked, item)}
        />
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
            className="w-1/2"
            onSearch={value => setSearchTerm(value)}
          />
          {/* <Select
            placeholder="Filter by Role"
            style={{ width: 200 }}
            onChange={handleRoleFilterChange}
            allowClear
          >
            <Option value="admin">Admin</Option>
            <Option value="student">Student</Option>
            <Option value="instructor">Instructor</Option>
          </Select> */}
        </div>
        {/* <div className="mb-4">
          <Button type="primary" onClick={() => {
            setEditingItem({
              name: '',
              gender: '',
              dateofbirth: moment(),
              email: '',
              phone: '',
              role: '',
              status: false
            });
            setModalOpen(true);
          }}>
            <PlusCircleOutlined /> Add New User
          </Button>
        </div> */}
        <Table dataSource={filteredData} columns={columns} rowKey="id" />

        <Modal
          title={editingItem.id ? "Edit User" : "Add New User"}
          visible={isModalOpen}
          onOk={handleAdd}
          onCancel={() => setModalOpen(false)}
        >
          <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item label="Name">
              <Input
                value={editingItem.name}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Gender">
              <Input
                value={editingItem.gender}
                onChange={(e) => setEditingItem({ ...editingItem, gender: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Date Of Birth">
              <DatePicker
                value={moment(editingItem.dateofbirth)}
                onChange={(date) => setEditingItem({ ...editingItem, dateofbirth: date })}
              />
            </Form.Item>
            <Form.Item label="Phone">
              <Input
                value={editingItem.phone}
                onChange={(e) => setEditingItem({ ...editingItem, phone: e.target.value })}
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
                disabled={!!editingItem.id}  // Disable the role field if editing an existing user
              >
                <Option value="admin">Admin</Option>
                <Option value="student">Student</Option>
                <Option value="instructor">Instructor</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Status">
              <Switch
                checked={editingItem.status}
                onChange={(checked) => setEditingItem({ ...editingItem, status: checked })}
              />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="CONFIRM INSTRUCTOR ACCOUNT VALID"
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
