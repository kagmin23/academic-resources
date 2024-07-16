import {
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Button, Col, Input, Layout, Modal, Row, Select, Switch, Table, Typography } from 'antd';
import { AlignType } from 'rc-table/lib/interface';
import React, { useState } from 'react';
// import debounce from 'lodash/debounce';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

interface DataType {
  key: string;
  image: string;
  title: string;
  status: boolean;
  description: string;
  price: number;
  created_at: string;
  instructor: string;
}

const CourseAdmin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const handleSave = (record: DataType) => {
    console.log('Saved:', record);
  };

  const [logModalVisible, setLogModalVisible] = useState(false);

  const showLogModal = () => {
    setLogModalVisible(true);
  };

  const hideLogModal = () => {
    setLogModalVisible(false);
  };

  const handleViewMore = (key: string) => {
    setExpandedKeys(prevKeys =>
      prevKeys.includes(key) ? prevKeys.filter(k => k !== key) : [...prevKeys, key]
    );
  };

  const handleStatusChange = (checked: boolean, record: DataType) => {
    const updatedDataSource = dataSource.map(item =>
      item.key === record.key ? { ...item, status: checked } : item
    );
    setDataSource(updatedDataSource);
  };

  // const debouncedSearch = debounce((value: string) => {
  //   setSearchTerm(value);
  // }, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredDataSource = dataSource.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: 'Course',
      dataIndex: 'image',
      key: 'image',
      render: (text: string) => <img src={text} alt="item" className="w-12 h-12" />,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean, record: DataType) => (
        <Switch
          checked={status}
          onChange={(checked: boolean) => handleStatusChange(checked, record)}
        />
      ),
    },
    {
      title: 'Approval status',
      dataIndex: 'approval status',
      key: 'approval_status',
      render: (status: boolean, record: DataType) => (
          <div>
            <Button className="px-4 py-2 mr-2 font-bold text-white bg-green-500 rounded hover:bg-green-700">
              <CheckOutlined />
            </Button>
            <Button className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">
              <CloseOutlined />
            </Button>
          </div>
        )
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center' as AlignType,
      render: (text: string, record: DataType) => (
        <div style={{ textAlign: 'center' }}>
          <Button icon={<EyeOutlined />} onClick={() => handleViewMore(record.key)}></Button>
        </div>
      ),
    },
  ];

  return (
    <div>
        <div className="flex flex-col items-start justify-between mb-4 space-y-4 md:flex-row md:items-center md:space-y-0  pl-4">
          <div className="w-full md:w-1/3">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={handleSearchChange}
              className="items-center w-full h-8 text-lg border-2 border-gray-300 border-solid rounded"
              value={searchTerm}
            />
          </div>
          </div>
        <Content className="m-4">
          <div className="p-4 bg-white">
            <Table
              dataSource={filteredDataSource}
              columns={columns}
              expandable={{
                expandedRowKeys: expandedKeys,
                onExpand: (expanded, record) => handleViewMore(record.key),
                expandedRowRender: (record: DataType) => (
                  <div style={{ padding: '10px 20px', backgroundColor: '#f9f9f9', borderRadius: '4px', marginLeft: '25px' }}>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Title level={5} className='text-2xl'>Course Details</Title>
                      </Col>
                      
                    </Row>
                    <Row gutter={16} align="middle" style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Col span={8}>
                        <Text strong>Description:</Text>
                        <p>{record.description}</p>
                      </Col>
                      <Col span={8} style={{ textAlign: 'center' }}>
                        <Text strong>Instructor:</Text>
                        <p>{record.instructor}</p>
                      </Col>
                      <Col span={7} style={{ textAlign: 'center'}}>
                        <Text strong>Price:</Text>
                        <p>${record.price}</p>
                      </Col>
                      <Button className='mt-5' onClick={showLogModal}>View Log</Button>
                    </Row>
                  </div>
                ),
                expandIcon: () => null,
              }}
              rowKey="key"
            />
          </div>
          <Modal
        visible={logModalVisible}
        onCancel={hideLogModal}
        footer={null}
        width={800}
      >
        <h1 className="mb-5">Log Status</h1>
        <div className="flex mb-5 space-x-5">
          <Button className='bg-teal-600'>All log</Button>
          <Select className="w-40">
          <Select.Option value="New">New</Select.Option>
          <Select.Option value="Waiting_approve">Waiting approve</Select.Option>
          <Select.Option value="Approve">Approve</Select.Option>
          <Select.Option value="Reject">Reject</Select.Option>
          <Select.Option value="Active">Active</Select.Option>
          <Select.Option value="Inactive">Inactive</Select.Option>
          
          </Select>

          <Select className="w-40">
          <Select.Option value="New">New</Select.Option>
          <Select.Option value="Waiting_approve">Waiting approve</Select.Option>
          <Select.Option value="Approve">Approve</Select.Option>
          <Select.Option value="Reject">Reject</Select.Option>
          <Select.Option value="Active">Active</Select.Option>
          <Select.Option value="Inactive">Inactive</Select.Option>
          
          </Select>
        </div>

        <h1>Course Name: ...</h1>
        <h1>Old status: ...</h1>
        <h1>New status: ... </h1>
        <h1>Comment: ...</h1>
      </Modal>
        </Content>
        <Footer style={{ textAlign: 'center', backgroundColor:"white" }}>Academic_Resources ©2024 Created by Group 4</Footer>
      </div>
  );
};

export default CourseAdmin;
