import { Input, Layout, Modal, Switch, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment, { Moment } from 'moment';
import React, { useState } from 'react';

const { Content } = Layout;

interface Item {
  id: number;
  name: string;
  gender: string;
  dateofbirth: Moment;
  email: string;
  phone: string;
  status: boolean;
  image: string;
  video: string;
  des: string;
}

const initialData: Item[] = [
  { id: 1, name: "instructor123", gender: "Male", dateofbirth: moment("1990-01-01"), email: "phan@gmail.com", phone: "0111", status: false, image: "not yet", video: "not yet", des: "not yet" },
  { id: 2, name: "instructor2", gender: "Female", dateofbirth: moment("1995-05-05"), email: "kang@gmail.com", phone: "0222", status: false, image: "not yet", video: "not yet", des: "not yet" },
  { id: 3, name: "instructor18", gender: "Male", dateofbirth: moment("1988-12-25"), email: "min@gmail.com", phone: "0333", status: false, image: "not yet", video: "not yet", des: "not yet" },
];

const ApproveInstructor: React.FC = () => {
  const [data, setData] = useState<Item[]>(initialData);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [lockConfirmVisible, setLockConfirmVisible] = useState<boolean>(false);
  const [lockItemId, setLockItemId] = useState<number | undefined>();
  const [statusChangeItem, setStatusChangeItem] = useState<Item | undefined>(undefined);
  const [confirmMessage, setConfirmMessage] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: ColumnsType<Item> = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Image', dataIndex: 'image', key: 'image' },
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
    { title: 'Video', dataIndex: 'video', key: 'video' },
    { title: 'Description', dataIndex: 'des', key: 'des' },
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
    <div className=''>
      <Content className="p-4">
        <h2 className="mb-4 text-xl font-bold">Approve Instructor</h2>
        <div className="flex items-center mb-4 space-x-2">
          <Input.Search
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-1/3"
            onSearch={value => setSearchTerm(value)}
          />
        </div>
        
        <Table dataSource={filteredData} columns={columns} rowKey="id" />

        <Modal
          title="CONFIRM INSTRUCTOR ACCOUNT VALID"
          visible={lockConfirmVisible}
          onOk={handleLockStatus}
          onCancel={() => setLockConfirmVisible(false)}
        >
          <p>{confirmMessage}</p>
        </Modal>
      </Content>
    </div>
  );
};

export default ApproveInstructor;
