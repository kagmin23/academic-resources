import React, { useState } from "react";
import { Button, Input, Layout, Modal, Table, message, Form, Select, Switch, DatePicker } from "antd";
import { Content } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import moment, { Moment } from "moment";

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
  { id: 1, name: "Phan", gender: "Male", dateofbirth: moment("1990-01-01"), email: "phan@gmail.com", phone: "0111", status: true, role: "Admin" },
  { id: 2, name: "Kang", gender: "Male", dateofbirth: moment("1995-05-05"), email: "kang@gmail.com", phone: "0222", status: true, role: "Student" },
  { id: 3, name: "Min", gender: "Male", dateofbirth: moment("1988-12-25"), email: "min@gmail.com", phone: "0333", status: true, role: "Instructor" },
];

const UsersAdmin: React.FC = () => {
  const [data, setData] = useState<Item[]>(initialData);
  const [editingItem, setEditingItem] = useState<Partial<Item>>({});
  const [newItem, setNewItem] = useState<Partial<Item>>({});
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredRole, setFilteredRole] = useState<string | undefined>(undefined);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number | undefined>();

  const handleAdd = () => {
    if (
      newItem.name &&
      newItem.gender &&
      newItem.dateofbirth &&
      newItem.email &&
      newItem.phone &&
      newItem.role
    ) {
      const newData = [...data, { id: data.length + 1, status: true, ...newItem } as Item];
      setData(newData);
      setNewItem({});
      setModalOpen(false);
      message.success("User added successfully");
    } else {
      message.error("Please fill in all fields");
    }
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleUpdate = () => {
    const updatedData = data.map((item) =>
      item.id === editingItem.id ? { ...item, ...editingItem } as Item : item
    );
    setData(updatedData);
    setEditingItem({});
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteItemId) {
      const updatedData = data.filter((item) => item.id !== deleteItemId);
      setData(updatedData);
      setDeleteItemId(undefined);
      setDeleteConfirmVisible(false);
      message.success("User deleted successfully");
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRoleFilterChange = (value: string) => {
    setFilteredRole(value);
  };

  const handleStatusChange = (checked: boolean, item: Item) => {
    const updatedData = data.map((dataItem) =>
      dataItem.id === item.id ? { ...dataItem, status: checked } : dataItem
    );
    setData(updatedData);
  };

  const filteredData = data.filter((item) => {
    if (filteredRole === undefined) return true;
    return item.role.toLowerCase() === filteredRole.toLowerCase();
  });

  const canAddUser = () => {
    return filteredRole === "admin";
  };

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
          <Button type="primary" onClick={() => handleEdit(item)} className="mr-2">Edit</Button>
          <Button type="primary" danger onClick={() => { setDeleteItemId(item.id); setDeleteConfirmVisible(true); }}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <Layout>
      <Content className="p-4">
        <h2 className="mb-4 text-xl font-bold">Manage Accounts</h2>
        <div className="mb-4 flex items-center space-x-2">
          <Input.Search
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-1/2"
          />
          <Select
            placeholder="Filter by Role"
            style={{ width: 200 }}
            onChange={handleRoleFilterChange}
            allowClear
          >
            <Option value="admin">Admin</Option>
            <Option value="student">Student</Option>
            <Option value="instructor">Instructor</Option>
          </Select>
        </div>
        <div className="mb-4">
          {canAddUser() && (
            <Button type="primary" onClick={() => {
              setNewItem({
                name: 'Your login value here', 
                gender: '', 
                dateofbirth: moment(), 
                email: '', 
                phone: '', 
                role: 'admin', 
                status: true
              });
              setModalOpen(true);
            }}>Add New User</Button>
          )}
        </div>
        <Table dataSource={filteredData} columns={columns} rowKey="id" />

        <Modal title="Edit User" visible={isModalOpen} onOk={handleUpdate} onCancel={() => setModalOpen(false)}>
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
              <Input
                value={editingItem.role}
                onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                disabled
              />
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
          title="Confirm Delete"
          visible={deleteConfirmVisible}
          onOk={handleDelete}
          onCancel={() => setDeleteConfirmVisible(false)}
          >
            <p>Are you sure you want to delete this user?</p>
          </Modal>
          
          <Modal
            title="Add New User"
            visible={isModalOpen}
            onOk={handleAdd}
            onCancel={() => {
              setModalOpen(false);
              setNewItem({}); 
            }}
          >
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              <Form.Item label="Name">
                <Input
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="Gender">
                <Input
                  value={newItem.gender}
                  onChange={(e) => setNewItem({ ...newItem, gender: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="Date Of Birth">
                <DatePicker
                  value={moment(newItem.dateofbirth)}
                  onChange={(date) => setNewItem({ ...newItem, dateofbirth: date })}
                />
              </Form.Item>
              <Form.Item label="Phone">
                <Input
                  value={newItem.phone}
                  onChange={(e) => setNewItem({ ...newItem, phone: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="Email">
                <Input
                  value={newItem.email}
                  onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="Role">
                <Select
                  value={newItem.role}
                  onChange={(value) => setNewItem({ ...newItem, role: value })}
                >
                  <Option value="admin">Admin</Option>
                  <Option value="student">Student</Option>
                  <Option value="instructor">Instructor</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Status">
                <Switch
                  checked={newItem.status}
                  onChange={(checked) => setNewItem({ ...newItem, status: checked })}
                />
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    );
  };
  
  export default UsersAdmin;
  
