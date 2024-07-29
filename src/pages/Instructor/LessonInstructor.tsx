import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, EyeOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Layout, Modal, Row, Select, Table, Typography, message } from 'antd';
import { Course, Lesson, Session } from 'models/types';
import moment from 'moment';
import { AlignType } from 'rc-table/lib/interface';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourses } from 'services/All/getCoursesApiService';
import { createLesson, deleteLesson, getLessons, updateLesson } from 'services/Instructor/lessonApiService';
import { getSessions } from 'services/Instructor/sessionApiService';

const { confirm } = Modal;
const { Header, Content } = Layout;

const ManagerLessonInstructor: React.FC = () => {
  const [dataSource, setDataSource] = useState<Lesson[]>([]);
  const [filteredDataSource, setFilteredDataSource] = useState<Lesson[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<Lesson | null>(null);
  const [form] = Form.useForm();
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const { sessionId, courseId } = useParams<{ sessionId: string; courseId: string }>();
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);

  const handleAddNewLesson = () => {
    setIsEditMode(false);
    setModalVisible(true);
    form.resetFields();
    setFilteredSessions([]);
  };

  const handleCourseChange = (courseId: string) => {
    form.setFieldsValue({ course_id: courseId });
    const filteredSessions = sessions.filter(session => session.course_id === courseId);
    setFilteredSessions(filteredSessions);
    form.setFieldsValue({ session_id: undefined }); // Reset session field
  };

  useEffect(() => {
    fetchLessons();
    fetchSessions();
    fetchCourses();
  }, [sessionId, courseId]); // Fetch data whenever sessionId or courseId changes

  const fetchLessons = async () => {
    try {
      if (courseId && sessionId) {
        const response = await getLessons(courseId, sessionId, 1, 10, 10, 1, "");
        setLessons(response.data.pageData);
      }
    } catch (error) {
      message.error("Failed to fetch lessons");
      console.error("Error fetching lessons:", error);
    }
  };

  const fetchSessions = async () => {
    try {
      const response = await getSessions("", 1, 10, 5, 1, "");
      console.log("response", response);
      setSessions(response.data.pageData);
      setDataSource(response.data.pageData);
    } catch (error) {
      message.error("Failed to fetch sessions");
      console.error("Error fetching sessions:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await getCourses("", 1, 10);
      console.log("courses", response);
      setCourses(response.data.pageData);
      setFilteredDataSource(response.data.pageData);
    } catch (error) {
      console.error("Failed to fetch courses", error);
      setCourses([]);
      setFilteredDataSource([]);
      message.error("Failed to fetch courses");
    }
  };

  const handleEdit = (record: Lesson) => {
    setIsEditMode(true);
    setCurrentRecord(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleViewMore = (key: string) => {
    setExpandedKeys(prevKeys => prevKeys.includes(key) ? prevKeys.filter(k => k !== key) : [...prevKeys, key]);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const handleSaveLesson = () => {
    form.validateFields()
      .then((values) => {
        form.resetFields();
        const newValues = {
          ...values,
          course_id: courseId,
          session_id: sessionId,
        };
        if (isEditMode && currentLesson) {
          updateLesson(currentLesson._id, newValues)
            .then(() => {
              const newDataSource = dataSource.map(item => item._id === currentLesson._id ? { ...item, ...values } : item);
              setDataSource(newDataSource);
              setFilteredDataSource(newDataSource);
              message.success("Lesson updated successfully");
            })
            .catch((error) => {
              console.error("Failed to Update Lesson", error);
              message.error("Failed to Update Lesson");
            });
        } else {
          createLesson(newValues)
            .then((response) => {
              const newRecord = {
                ...response.data,
                key: (dataSource.length + 1).toString(),
                created_at: new Date().toISOString().split("T")[0],
              };
              setDataSource([...dataSource, newRecord]);
              setFilteredDataSource([...dataSource, newRecord]);
              message.success("Lesson created successfully");
            })
            .catch((error) => {
              console.error("Failed to Create lesson", error);
              message.error("Failed to Create lesson");
            });
        }
        setModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
        message.error("Validation failed");
      });
  };

  const handleOnDeleteLesson = (lessonId: string) => {
    confirm({
      title: "Do you want to delete this Lesson?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone",
      onOk() {
        deleteLesson(lessonId)
          .then(() => {
            const newDataSource = dataSource.filter(item => item._id !== lessonId);
            setDataSource(newDataSource);
            setFilteredDataSource(newDataSource);
            message.success("Lesson deleted successfully");
          })
          .catch((error) => {
            console.error("Failed to Delete Lesson", error);
            message.error("Failed to Delete Lesson");
          });
      },
    });
  };

  const handleOnEditLesson = () => {
    form.validateFields()
      .then(async (values) => {
        form.resetFields();
        const newValues = {
          ...values,
          course_id: courseId,
          session_id: sessionId,
        };
        if (isEditMode && currentRecord) {
          try {
            const response = await updateLesson(currentRecord._id, newValues);
            const updatedLesson = response.data;
            const newDataSource = dataSource.map(item => item._id === updatedLesson._id ? updatedLesson : item);
            setDataSource(newDataSource);
            setFilteredDataSource(newDataSource);
            message.success("Lesson updated successfully");
          } catch (error) {
            console.error("Failed to Update Lesson", error);
            message.error("Failed to Update Lesson");
          }
        } else {
          message.error("Edit error");
        }
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
        message.error("Validation failed");
      });
  };

  const handleSearch = (value: string) => {
    const filteredData = dataSource.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredDataSource(filteredData);
  };

  const columns = [
    {
      title: "Lesson Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Position Order",
      dataIndex: "position_order",
      key: "position_order",
      align: "center" as AlignType,
    },
    {
      title: "Session Name",
      dataIndex: "session_name",
      key: "session_name",
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Full Time",
      dataIndex: "full_time",
      key: "full_time",
      align: "center" as AlignType,
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
      title: "Action",
      key: "actions",
      align: "center" as AlignType,
      render: (text: string, record: Lesson) => (
        <span className="flex flex-row justify-center gap-1">
          <Button size="small" className="text-blue-500" onClick={() => handleEdit(record)} icon={<EditOutlined />} />
          <Button size="small" className="text-red-500" onClick={() => handleOnDeleteLesson(record._id)} icon={<DeleteOutlined />} />
          <Button size="small" onClick={() => handleViewMore(record._id)} icon={<EyeOutlined />} />
        </span>
      ),
    },
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      <Header className="p-0 bg-white">
        <div className="flex flex-row items-center justify-between bg-[#939fb1]">
          <div className="mx-4 my-auto text-lg font-bold text-white">
            Lesson Management
          </div>
          <div className="mx-4 my-auto">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              style={{ width: 300, borderRight: "2px solid white" }}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Button
              className="ml-2 font-bold text-white bg-red-500"
              onClick={handleAddNewLesson}
            >
              <PlusCircleOutlined />
              Add New Lesson
            </Button>
          </div>
        </div>
      </Header>
      <Content>
        <Table
          columns={columns}
          dataSource={filteredDataSource}
          expandable={{
            expandedRowKeys: expandedKeys,
            onExpand: (expanded, record) => handleViewMore(record._id),
            expandedRowRender: (record) => (
              <div
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                  marginLeft: "25px",
                }}
              >
                <Row gutter={16} className="mb-5">
                  <Col span={22} className="mb-5">
                    <Typography.Title level={5}>Video:</Typography.Title>
                    <p>{record.video_url || "-"}</p>
                  </Col>
                  <Col span={22}>
                    <Typography.Title level={5}>Image:</Typography.Title>
                    <p>{record.image_url || "-"}</p>
                  </Col>
                </Row>
              </div>
            ),
            expandIcon: () => null,
          }}
        />
      </Content>
      <Modal
          title={isEditMode ? "Edit Lesson" : "Add New Lesson"}
          visible={modalVisible}
          onOk={isEditMode ? handleOnEditLesson : handleSaveLesson}
          onCancel={() => setModalVisible(false)}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Select Course"
              name="course_id"
              rules={[
                { required: true, message: "Please select a course!" },
              ]}
            >
              <Select
                showSearch
                placeholder="Select a course"
                optionFilterProp="children"
                onChange={handleCourseChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {courses.map((course) => (
                  <Select.Option key={course._id} value={course._id}>
                    {course.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Select Session"
              name="session_id"
              rules={[
                { required: true, message: "Please select a session!" },
              ]}
            >
              <Select
                showSearch
                placeholder="Select a session"
                optionFilterProp="children"
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {filteredSessions.map((session) => (
                  <Select.Option key={session._id} value={session._id}>
                    {session.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            
            <Form.Item
              label="Lesson Name"
              name="name"
              rules={[{ required: true, message: "Please input lesson name!" }]}
            >
              <Input />
            </Form.Item>
            
            <Form.Item
              label="Full Time"
              name="full_time"
              rules={[
                { required: true, message: "Please input full time!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Position Order"
              name="position_order"
              rules={[
                { required: true, message: "Please input position order!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
    </Layout>
  );
};

export default ManagerLessonInstructor;
