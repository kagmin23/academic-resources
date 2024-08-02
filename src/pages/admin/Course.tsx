import {
  SearchOutlined
} from '@ant-design/icons';
import { Button, Input, Layout, Modal, Select, Spin, Table, Typography, message } from 'antd';
import { Course, LogStatus } from 'models/types';
import moment from "moment";
import { AlignType } from 'rc-table/lib/interface';
import React, { useEffect, useState } from 'react';
import { changeCourseStatus } from 'services/All/changerStatusApiService';
import { getCourses } from 'services/All/getCoursesApiService';
import { logStatus } from 'services/All/logStatusApiService';
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
  const [loading, setLoading] = useState(false);
  const [course_id, setCourseId] = useState<string>("");
  const [logs, setLogs] = useState<LogStatus[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredRole, setFilteredRole] = useState<string>("all");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await getCourses('', 1, 10);
      setDataSource(response.data.pageData);
    } catch (error) {
      message.error('Failed to fetch Courses');
      console.error('Error fetching Courses:', error);
    }
    finally {
      setLoading(false);
    }
  };

  const showLogModal = (courseId: string) => {
    setCourseId(courseId);
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

  const handleSearch = (value: string) => {
    const filteredData = dataSource.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.user_name.toLowerCase().includes(value.toLowerCase()) ||
      item.category_name.toLowerCase().includes(value.toLowerCase())
    );
    setDataSource(filteredData);
  };

  const onChangeStatus = async (courseId: string, newStatus: string, comment: string) => {
    setLoading(true);
    try {
      const response = await changeCourseStatus(courseId, newStatus, comment);
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
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (logModalVisible) {
      fetchLogStatus();
    }
  }, [logModalVisible]);

  const fetchLogStatus = async () => {
    if (!course_id) return;
    setLoading(true);
    try {
      const response = await logStatus(course_id, "", 1, 100);
      setLogs(response.data.pageData);
      setError(null);
    } catch (err) {
      setError("Failed to fetch Logs Status");
    } finally {
      setLoading(false);
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
      render: (name: string, record: Course) => (
        <a onClick={() => showLogModal(record._id)}>{name}</a>
      ),
    },
    {
      title: 'User Name',
      dataIndex: 'user_name',
      key: 'user_id',
      align: "start" as AlignType
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
      align: "end" as AlignType
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
            className="w-24 text-xs"
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
              placeholder="Search..."
              prefix={<SearchOutlined />}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 300 }}
            />
            </div>
            <div className="flex flex-row w-full gap-5">

            <Select
                placeholder="Filter by Course Name"

                value={filteredRole}
                onChange={handleRoleFilterChange}
                className="w-1/6"
              >
                <Option value="">Category</Option>
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
          <div className="p-2 bg-white ">
          {loading ?
              (<div className="flex items-center justify-center h-64">
                <Spin size="large" />
              </div>) : (
            <Table
              dataSource={filteredDataSource}
              columns={columns}
              // expandable={{
              //   expandedRowKeys: expandedKeys,
              //   onExpand: (expanded, record) => handleViewMore(record._id),
              //   expandedRowRender: (record: Course) => (
              //     <div style={{ padding: '10px 20px', backgroundColor: '#f9f9f9', borderRadius: '4px', marginLeft: '25px' }}>
              //       <Row gutter={16}>
              //         <Col span={24}>
              //           <Title level={5} className='text-2xl'>Course Details</Title>
              //         </Col>
              //       </Row>
              //       <Row gutter={16} align="middle" style={{ display: 'flex', justifyContent: 'space-between' }}>
              //         <Col span={8}>
              //           <Text strong>Description:</Text>
              //           <p>{record.description}</p>
              //         </Col>
              //         <Col span={7} style={{ textAlign: 'center' }}>
              //           <Text strong>Price:</Text>
              //           <p>${record.price}</p>
              //         </Col>
              //         <Button className='mt-5' onClick={showLogModal}>View Log</Button>
              //       </Row>
              //     </div>
              //   ),
              //   expandIcon: () => null,
              // }}
              rowKey="key"
              />
            )}
          </div>
          <Modal
                  visible={logModalVisible}
                  onCancel={hideLogModal}
                  footer={null}
                  width={800}
                >
                  {loading ? (
                    <div className="flex items-center justify-center h-64">
                      <Spin size="large" />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-base font-bold">Log Status</h1>
                      <p className="mb-5 text-xs italic">* Prioritize in order of newest</p>
                      <div className="flex mb-5 space-x-5">
                        <Button className="text-white bg-teal-600">All log</Button>
                        <Select defaultValue="All" className="w-40">
                          <Select.Option value="new">New</Select.Option>
                          <Select.Option value="waiting_approve">Waiting approve</Select.Option>
                          <Select.Option value="approve">Approve</Select.Option>
                          <Select.Option value="reject">Reject</Select.Option>
                          <Select.Option value="active">Active</Select.Option>
                          <Select.Option value="inactive">Inactive</Select.Option>
                        </Select>
                      </div>
                      {error && <p className="text-red-500">{error}</p>}
                      {logs.length === 0 ? (
                        <p>No logs available.</p>
                      ) : (
                        logs.map((log, index) => (
                          <div key={index} className="mb-4">
                            <h1>Course Name: {log.course_name}</h1>
                            <h1 className="text-red-500">Old status: {log.old_status}</h1>
                            <h1 className="text-blue-500">New status: {log.new_status}</h1>
                            <h1>Comment: {log.comment}</h1>
                          </div>
                        ))
                      )}
                    </>
                  )}
                </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CourseAdmin;
