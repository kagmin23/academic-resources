
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, EyeOutlined, FilterOutlined, PlusCircleOutlined, RedoOutlined, SearchOutlined } from "@ant-design/icons";
import { Editor } from '@tinymce/tinymce-react';
import { Button, Col, Form, Image, Input, Layout, Modal, Row, Select, Space, Spin, Table, Typography, message } from "antd";
import { Category, Course, LogStatus } from "models/types";
import moment from "moment";
import { AlignType } from "rc-table/lib/interface";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getCategories } from "services/AdminsApi/categoryApiService";
import { changeCourseStatus } from "services/All/changerStatusApiService";
import { getCourses } from "services/All/getCoursesApiService";
import { logStatus } from "services/All/logStatusApiService";
import { createCourse, deleteCourse, updateCourse } from "services/Instructor/courseApiService";
import './stylesInstructor.css';


const { confirm } = Modal;
const { Header, Content } = Layout;
const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const ManagerCourseInstructor: React.FC = () => {
  const [dataSource, setDataSource] = useState<Course[]>([]);
  const [filteredDataSource, setFilteredDataSource] = useState<Course[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<Course>();
  const [form] = Form.useForm();
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [comment, setComment] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<LogStatus[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [course_id, setCourseId] = useState<string>("");
  const [filterText, setFilterText] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterDate, setFilterDate] = useState<[string, string] | null>(null);
  const [filteredStatus, setFilteredStatus] = useState<string>("all");

  const navigate = useNavigate();

  const [logModalVisible, setLogModalVisible] = useState(false);

  const showLogModal = () => {
    setLogModalVisible(true);
  };

  const hideLogModal = () => {
    setLogModalVisible(false);
  };

  useEffect(() => {
    fetchCategories();
    fetchCourses();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories("", 1, 10);
      setCategories(response.data.pageData);
    } catch (error) {
      console.error("Failed to fetch categories", error);
      setCategories([]);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await getCourses('', 1, 10);
      setDataSource(response.data.pageData);
      setFilteredDataSource(response.data.pageData);
    } catch (error) {
      console.error('Failed to fetch courses', error);
      setDataSource([]);
      setFilteredDataSource([]);
      message.error('Failed to fetch courses');
    }
  };

  const handleEditorChange = (content: any, editor: any) => {
  };

  const handleAddNewCourse = () => {
    setIsEditMode(false);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleEdit = (record: Course) => {
    setIsEditMode(true);
    setCurrentRecord(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const refreshData = () => {
    setFilterText('');
    setFilterStatus('');
    setFilterDate(null);
    fetchCourses();
  };

  const handleViewMore = (key: string) => {
    setCourseId(key);
    setExpandedKeys((prevKeys) =>
      prevKeys.includes(key)
        ? prevKeys.filter((k) => k !== key)
        : [...prevKeys, key]
    );
  };

  const handleDelete = (record: Course) => {
    const newDataSource = dataSource.filter((item) => item._id !== record._id);
    setDataSource(newDataSource);
    setFilteredDataSource(newDataSource);
    deleteCourse(record._id)
      .then(() => {
        message.success('Course deleted successfully');
      })
      .catch((error) => {
        console.error("Failed to delete course", error);
        message.error('Failed to delete course');
      });
  };

  const handleSave = () => {
    form.validateFields()
      .then((values) => {
        if (typeof values.price === 'string') {
          values.price = parseFloat(values.price);
        }
        if (typeof values.discount === 'string') {
          values.discount = parseFloat(values.discount);
        }
        form.resetFields();
        if (isEditMode && currentRecord) {
          updateCourse(currentRecord._id, values)
            .then(() => {
              const newDataSource = dataSource.map((item) =>
                item._id === currentRecord._id ? { ...item, ...values } : item
              );
              setDataSource(newDataSource);
              setFilteredDataSource(newDataSource);
              message.success('Course updated successfully');
            })
            .catch((error) => {
              console.error("Failed to update course", error);
              message.error('Failed to update course');
            });
        } else {
          createCourse(values)
            .then((response) => {
              const newRecord = {
                ...response.data,
                key: response.data._id,
                created_at: new Date().toISOString().split("T")[0],
              };
              setDataSource([newRecord, ...dataSource]);
              setFilteredDataSource([newRecord, ...dataSource]);
              message.success('Course created successfully');
            })
            .catch((error) => {
              console.error("Failed to create course", error);
              message.error('Failed to create course');
            });
        }
        setIsModalVisible(false);
      })
      .catch((info) => {
        message.error('Validation failed');
      });
  };

  const handleSearch = (value: string) => {
    const filteredData = dataSource.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDataSource(filteredData);
  };

  const showConfirm = (record: Course) => {
    confirm({
      title: "Do you want to delete this course?",
      icon: <ExclamationCircleFilled />,
      content: "This action cannot be undone.",
      onOk() {
        handleDelete(record);
      },
      onCancel() {
      },
    });
  };

  const handleViewSession = (courseId: string) => {
    navigate(`/instructor/profile-instructor/manager-instructor-course/${courseId}/manager-session`);
  };

  const onChangeStatus = async (courseId: string, newStatus: string, comment: string) => {
    try {
      const course = courses.find(course => course._id === courseId);

      if (course?.status === 'reject' && (newStatus === 'active' || newStatus === 'inactive')) {
        message.error('This course has been rejected and cannot be changed to Active or Inactive.');
        return;
      }

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
      message.error('Please add your Session and Lesson!');
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (logModalVisible) {
      fetchLogStatus();
    }
  }, [logModalVisible]);

  const fetchLogStatus = async () => {
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

  const statusOptions = (status: string) => {
    const allOptions = [
      { value: 'waiting_approve', label: 'Waiting Approve' },
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ];

    if (['approve', 'active', 'inactive'].includes(status)) {
      return allOptions.filter(option => option.value !== 'waiting_approve');
    }

    return allOptions;
  };

  const columns = [
    {
      title: "Course Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "category_name",
      align: "center" as AlignType
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "end" as AlignType
    },
    {
      title: "Discount (%)",
      dataIndex: "discount",
      key: "discount",
      align: "center" as AlignType
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      align: "center" as AlignType,
      render: (created_at: string) => moment(created_at).format("YYYY-MM-DD"),
    },
    {
      title: "Update At",
      dataIndex: "updated_at",
      key: "updated_at",
      align: "center" as AlignType,
      render: (created_at: string) => moment(created_at).format("YYYY-MM-DD"),
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
                onCancel: () => { },
              });
            }}
            options={statusOptions(status)}
          />
        </div>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      align: "center" as AlignType,
      render: (text: string, record: Course) => (
        <div className="flex flex-row justify-center gap-1">
          <Button
            size="small"
            icon={<EditOutlined />}
            className="text-blue-500"
            onClick={() => handleEdit(record)}
          ></Button>

          <Button
            size="small"
            icon={<DeleteOutlined />}
            className="text-red-400"
            onClick={() => showConfirm(record)}
          ></Button>

          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleViewMore(record._id)}
          ></Button>
        </div>
      ),
    },
  ];

  const handleStatusFilterChange = (value: string) => {
    setFilteredStatus(value);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="p-0 bg-white">
        <div className="flex flex-row items-center justify-between gap-4 p-4 bg-[#939fb1]">
          <div className="mx-4 my-auto text-lg font-bold text-white">
            Manager Course
          </div>
          <div className="h-6 border-r lg:mx-4"></div>
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 300 }}
          />
          <div className="h-6 border-r lg:mx-4"></div>
          <Button
            className="font-bold text-white bg-red-500"
            onClick={handleAddNewCourse}
          >
            <PlusCircleOutlined />
            Add New Course
          </Button>
        </div>
          <div className="flex flex-row items-center justify-end mx-10">
            <Space className="space-x-1 sm:space-x-5" direction="horizontal" size={1}>
              <FilterOutlined /> Reload:
                {/* <Button className="text-xs text-white bg-blue-600" onClick={handleFilter}>Apply</Button> */}
                <Button className="text-white bg-blue-600" onClick={refreshData}><RedoOutlined /></Button>
            </Space>
            </div>
      </Header>
      {loading ? (
          <div className="flex items-center justify-center h-full">
            <Spin size="large" />
          </div>
        ) : (
      <Content className="mx-4 my-16 overflow-y-auto xl:mx-6">
        <Table
          style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 180px)' }}
          pagination={{ pageSize: 10 }}
          dataSource={filteredDataSource}
          columns={columns}
          expandable={{
            expandedRowKeys: expandedKeys,
            onExpand: (expanded, record) => handleViewMore(record._id),
            expandedRowRender: (record: Course) => (
              <div
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                  marginLeft: "25px",
                }}
              >
                <Row gutter={16} className="mb-5" style={{ display: 'flex' }}>
                  <Col span={22} className="mb-5">
                    <Typography.Title level={5}>Description:</Typography.Title>
                    <p>{record.description || "-"}</p>
                  </Col>
                  <Col span={22} className="mb-5">
                    <Typography.Title level={5}>Content:</Typography.Title>
                    <p>{record.content || "-"}</p>
                  </Col>

                  <Col span={11} className="mb-5" style={{ height: '315px' }}>
                    <Typography.Title level={5}>Video:</Typography.Title>
                    <iframe
                      src={record.video_url}
                      style={{ width: '400px', height: '300px' }}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen>
                    </iframe>
                  </Col>

                  <Col span={11} offset={1} className="mb-5" style={{ height: '315px' }}>
                    <Typography.Title level={5}>Image:</Typography.Title>
                    <Image
                      src={record.image_url}
                      style={{ width: '400px', height: '300px', objectFit: 'cover' }}
                    />
                  </Col>
                </Row>

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

                <Form layout="vertical">
                  <div className="flex flex-row gap-4">
                    <Button size="small" className="text-xs text-blue-500" onClick={showLogModal}>Log Status</Button>
                    <Button
                      size="small"
                      className="text-xs text-blue-500"
                      onClick={() => handleViewSession(record._id)}
                    >View Session</Button>
                  </div>

                </Form>
              </div>
            ),
            expandIcon: () => null,
          }}
          rowKey="_id"
        />
      </Content>
        )}

      <Modal
        width={"50%"}
        title={isEditMode ? "Edit Course" : "Add New Course"}
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Course Name"
            rules={[
              { required: true, message: "Please input the course name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="category_id"
            label="Category"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select placeholder="Select a category">
              {categories.map((category) => (
                <Select.Option key={category._id} value={category._id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: false, message: "Please input the description!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="video_url"
            label="Video URL"
            rules={[{ required: false, message: 'Please input the video URL!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="image_url"
            label="Image URL"
            rules={[{ required: false, message: 'Please input the image URL!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Content">
            <Editor
              apiKey="oppz09dr2j6na1m8aw9ihopacggkqdg19jphtdksvl25ol4k"
              initialValue="<p>This is the initial content of the editor</p>"
              init={{
                height: 200,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help",
              }}
              onEditorChange={handleEditorChange}
            />
            </Form.Item>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: 'Please input the price!' }]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item
                name="discount"
                label="Discount"
              >
                <Input type="number" />
              </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ManagerCourseInstructor;
