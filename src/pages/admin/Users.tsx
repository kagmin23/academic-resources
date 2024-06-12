import { Button, Input, Modal, Table, message } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";

interface Item {
  id: number;
  name: string;
  gender: string;
  dateofbirth: string;
  email: string;
  phone: string;
  role: string;
}

const initialData: Item[] = [
  { id: 1, name: "Phan", gender: "Male", dateofbirth: "07/17", email: "phan@gma", phone: "0111", role: "" },
  { id: 2, name: "Kang", gender: "Male", dateofbirth: "07/17", email: "kang@gma", phone: "0222", role: "" },
  { id: 3, name: "Min", gender: "Male", dateofbirth: "07/17", email: "min@gma", phone: "0333", role: "" },
];

const Users: React.FC = () => {
  const [data, setData] = useState<Item[]>(initialData);
  const [editingItem, setEditingItem] = useState<Partial<Item>>({});
  const [newItem, setNewItem] = useState<Partial<Item>>({ name: "", gender: "", dateofbirth: "", email: "", phone: "", role: "" });
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleAdd = () => {
    if (
      newItem.name &&
      newItem.gender &&
      newItem.dateofbirth &&
      newItem.email &&
      newItem.phone &&
      newItem.role
    ) {
      const newData = [...data, { id: data.length + 1, ...newItem } as Item];
      setData(newData);
      setNewItem({ name: "", gender: "", dateofbirth: "", email: "", phone: "", role: "" });
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

  const handleDelete = (id: number) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const handleSearch = (value: string) => {
    if (value.trim() !== "") {
      setSearchTerm(value);
    } else {
      message.error("Please fill in all fields");
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: ColumnsType<Item> = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Username', dataIndex: 'name', key: 'name' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    { title: 'Date Of Birth', dataIndex: 'dateofbirth', key: 'dateofbirth' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, item) => (
        <>
          <Button type="primary" onClick={() => handleEdit(item)} className="mr-2">Edit</Button>
          <Button type="primary" danger onClick={() => handleDelete(item.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div className="container p-4">
      <h2 className="mb-4 text-xl font-bold">Manager Account</h2>
      <div className="mb-4 search-container">
        <Input.Search
          placeholder="Search"
          enterButton="Search"
          onSearch={handleSearch}
          className="w-full"
        />
      </div>
      <div className="flex mb-4 space-x-2 add-container">
        <Input
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <Input
          placeholder="Gender"
          value={newItem.gender}
          onChange={(e) => setNewItem({ ...newItem, gender: e.target.value })}
        />
        <Input
          placeholder="Date Of Birth"
          value={newItem.dateofbirth}
          onChange={(e) => setNewItem({ ...newItem, dateofbirth: e.target.value })}
        />
        <Input
          placeholder="Phone"
          value={newItem.phone}
          onChange={(e) => setNewItem({ ...newItem, phone: e.target.value })}
        />
        <Input
          placeholder="Email"
          value={newItem.email}
          onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}
        />
        <Input
          placeholder="Role"
          value={newItem.role}
          onChange={(e) => setNewItem({ ...newItem, role: e.target.value })}
        />
        <Button type="primary" onClick={handleAdd}>Add</Button>
      </div>
      <Table dataSource={filteredData} columns={columns} rowKey="id" />
      <Modal title="Edit Item" open={isModalOpen} onOk={handleUpdate} onCancel={() => setModalOpen(false)}>
        <Input
          placeholder="Name"
          value={editingItem.name}
          onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
        />
        <Input
          placeholder="Gender"
          value={newItem.gender}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <Input
          placeholder="Date Of Birth"
          value={newItem.dateofbirth}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <Input
          placeholder="Phone"
          value={editingItem.phone}
          onChange={(e) => setEditingItem({ ...editingItem, phone: e.target.value })}
        />
        <Input
          placeholder="Email"
          value={editingItem.email}
          onChange={(e) => setEditingItem({ ...editingItem, email: e.target.value })}
        />
        <Input
          placeholder="Role"
          value={editingItem.role}
          onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
        />
      </Modal>
    </div>
  );
};

export default Users;
