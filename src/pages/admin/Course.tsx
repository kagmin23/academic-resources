import {
  SearchOutlined
} from '@ant-design/icons';
import { Button, Col, Input, Layout, Modal, Row, Select, Table, Typography, message } from 'antd';
import { Course } from 'models/types';
import moment from "moment";
import { AlignType } from 'rc-table/lib/interface';
import React, { useEffect, useState } from 'react';
import { changeCourseStatus } from 'services/All/changerStatusApiService';
import { getCourses } from 'services/All/getCoursesApiService';
import './stylesAdmin.css';


const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;


const CourseAdmin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dataSource, setDataSource] = useState<Course[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [logModalVisible, setLogModalVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [editingItem, setEditingItem] = useState<Partial<Course>>({});
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredRole, setFilteredRole] = useState<string>("all");



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
      console.log("courseId", courseId);
      console.log(`Changed Status of ${courseId} to Status ${newStatus}`);
      const response = await changeCourseStatus(courseId, newStatus, comment);
      console.log("response", response);
  
      if (response) {
        message.success('Changed Status Successfully!');
        setCourses(prevCourses =>
          prevCourses.map(course =>
            course._id === courseId ? { ...course, status: newStatus } : course
          )
        );
      }

      
    } catch (error) {
      message.error('Please enter the reason of this course!');
      console.error('Error:', error);
    }
  };

  const filteredDataSource = dataSource ? dataSource.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];
  
  const handleRoleFilterChange = (value: any) => {
    setFilteredRole(value);
  };

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
      // align: "center" as AlignType
    },
    {
      title: 'Discount (%)',
      dataIndex: 'discount',
      key: 'discount',
      align: "center" as AlignType
    },
    // {
    //   title: 'Video',
    //   dataIndex: 'video_url',
    //   key: 'video_url',
    //   align: "center" as AlignType,
    //   render: (video_url: string) => (
    //     <div><iframe src={video_url}></iframe></div>
    //   )
    // },
    // {
    //   title: 'Image',
    //   dataIndex: 'image_url',
    //   key: 'image_url',
    //   align: "center" as AlignType,
    //   render: (image_url: string) => (
    //     <div><iframe src={image_url}></iframe></div>
    //   )
    // },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      align: "center" as AlignType,
      render: (created_at: string) => moment(created_at).format("YYYY-MM-DD"),

    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      align: "center" as AlignType,
      render: (updated_at: string) => moment(updated_at).format("YYYY-MM-DD"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center" as AlignType,
      render: (status: string, record: Course) => (
        <div>
          <Select
            size="small"
            className="text-xs"
            showSearch
            optionFilterProp="label"
            defaultValue={status}
            value={status}
            onChange={(newStatus) => {
              Modal.confirm({
                title: "Change Status Confirmation!",
                content: (
                  <>
                    <p className="mb-3">Are you sure you want to change the status to "{newStatus}"?</p>
                    <Input.TextArea
                      rows={4}
                      placeholder="Enter a comment (optional)"
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </>
                ),
                onOk: () => onChangeStatus(record._id, newStatus, comment),
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
          <div className="flex flex-col items-start justify-between mb-4 space-y-4 md:flex-row md:items-center md:space-y-0 bg-[#939fb1] pl-4 gap-5">
            <div className="w-full md:w-1/3">
              <Input
                placeholder="Search"
                prefix={<SearchOutlined />}
                onChange={handleSearchChange}
                className="items-center w-full h-8 text-sm border-2 border-gray-300 border-solid rounded"
                value={searchTerm}
              />
              
            </div>
            <div className="flex flex-row w-full gap-5">

            <Select
                placeholder="Filter by Course Name"

                value={filteredRole}
                onChange={handleRoleFilterChange}
                className="w-1/6"
              >
                <Option value="new">All</Option>
                {/* <Option value="waiting_approve">Waiting Approve</Option>
                <Option value="approve">Approve</Option>
                <Option value="reject">Reject</Option> */}
              </Select>

            <Select
                placeholder="Filter by Status"

                value={filteredRole}
                onChange={handleRoleFilterChange}
                className="w-1/6"
              >
                <Option value="all">All</Option>
                <Option value="new">New</Option>
                <Option value="waiting_approve">Waiting Approve</Option>
                <Option value="approve">Approve</Option>
                <Option value="reject">Reject</Option>
              </Select>
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
      </Layout>
    </Layout>
  );
};

export default CourseAdmin;
