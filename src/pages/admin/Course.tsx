import {
  SearchOutlined
} from '@ant-design/icons';
import { Button, Col, Input, Layout, Modal, Row, Select, Switch, Table, Typography, message } from 'antd';
import { Course } from 'models/types';
import { AlignType } from 'rc-table/lib/interface';
import React, { useEffect, useState } from 'react';
import { changeCourseStatus } from 'services/All/changerStatusApiService';
import { getCourses } from 'services/All/getCoursesApiService';
import './stylesAdmin.css';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const CourseAdmin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dataSource, setDataSource] = useState<Course[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [logModalVisible, setLogModalVisible] = useState(false);
  const [comment, setComment] = useState('');


  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await getCourses('', 1, 10);
      console.log("reponse", response)
      setDataSource(response.data.pageData);
    } catch (error) {
      message.error('Failed to fetch sessions');
      console.error('Error fetching sessions:', error);
    }
  };
  const handleSave = (record: Course) => {
    console.log('Saved:', record);
  };

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

  const handleStatusChange = (checked: boolean, record: Course) => {
    // const updatedDataSource = dataSource.map(item =>
    //   item._id === record._id ? { ...item, status: checked } : item
    // );
    // setDataSource(updatedDataSource);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const onChangeStatus = async (courseId: string, newStatus: string, comment: string) => {
    try {
      console.log(`Changed Status of ${courseId} to Status ${newStatus}`);
      const response = await changeCourseStatus(courseId, newStatus, comment);
      console.log("Response Data", response.data);
    } catch (error) {
      message.error("Changer Status Failed");
    }
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const filteredDataSource = dataSource ? dataSource.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) 
  ) : [];
  

  const columns = [
    {
      title: 'Course',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'User Name',
      dataIndex: 'user_name',
      key: 'user_id',
      align: "center" as AlignType
    },
    {
      title: 'Categrory',
      dataIndex: 'category_name',
      key: 'category_name',
      align: "center" as AlignType
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: "center" as AlignType
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      align: "center" as AlignType
    },
    /* {
      title: 'Video',
      dataIndex: 'video_url',
      key: 'video_url',
      align: "center" as AlignType,
      render: (video_url: string) => (
        <div><iframe src={video_url}></iframe></div>
      )
    },
    {
      title: 'Image',
      dataIndex: 'image_url',
      key: 'image_url',
      align: "center" as AlignType,
      render: (image_url: string) => (
        <div><iframe src={image_url}></iframe></div>
      )
    }, */
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      align: "center" as AlignType
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      align: "center" as AlignType
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean, record: Course) => (
        <Switch
          size="small"
          checked={status}
          onChange={(checked: boolean) => handleStatusChange(checked, record)}
        />
      ),
    },
    {
      title: 'Operating Status',
      dataIndex: 'approval_status',
      key: 'approval_status',
      render: (status: string, record: Course) => (
        <div>
          <Select
            size="small"
            className="text-xs"
            showSearch
            optionFilterProp="label"
            defaultValue={"new"}
            value={status}
            onChange={(newStatus) => {
              Modal.confirm({
                title: "Change Status Confirmation",
                content: (
                  <>
                    <p>Are you sure you want to change the status to "{newStatus}"?</p>
                    <Input.TextArea
                      rows={4}
                      placeholder="Enter a comment (optional)"
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </>
                ),
                onOk: async () => {
                  try {
                    await onChangeStatus(record._id, newStatus, comment);
                    const updatedDataSource = dataSource.map(item =>
                      item._id === record._id ? { ...item, approval_status: newStatus } : item
                    );
                    setDataSource(updatedDataSource);
                
                    message.success("Changed Status Successfully")
                  } catch (error) {
                    console.error("Error updating status:", error);
                    Modal.error({ content: "An error occurred. Please try again later." });
                  }
                },
                onCancel: () => {},
              });
            }}
            options={[
              { value: 'new', label: 'New' },
              { value: 'waiting_approve', label: 'Waiting Approve' },
              { value: 'approve', label: 'Approve' },
              { value: 'reject', label: 'Reject' },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Header className="p-0 bg-white">
          <div className="flex flex-col items-start justify-between mb-4 space-y-4 md:flex-row md:items-center md:space-y-0 bg-[#939fb1] pl-4">
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
        </Header>
        <Content className="m-4">
          <div className="p-4 bg-white">
            <Table
              dataSource={filteredDataSource}
              columns={columns}
              expandable={{
                expandedRowKeys: expandedKeys,
                onExpand: (expanded, record) => handleViewMore(record._id),
                expandedRowRender: (record: Course) => (
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
                      <Col span={7} style={{ textAlign: 'center' }}>
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
        <Footer style={{ textAlign: 'center' }}>Academic_Resources ©2024 Created by Group 4</Footer>
      </Layout>
    </Layout>
  );
};

export default CourseAdmin;
