import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout, Modal, Select, Spin, Table, message } from "antd";
import { Course, Session } from 'models/types';
import moment from 'moment';
import { AlignType } from 'rc-table/lib/interface';
import React, { useEffect, useState } from 'react';
import { getCourses } from 'services/All/getCoursesApiService';
import { createSession, deleteSession, getSessions, updateSession } from 'services/Instructor/sessionApiService';

const { Header, Content, Footer } = Layout;
const { confirm } = Modal;

const ManagerCourseInstructor: React.FC = () => {
  const [dataSource, setDataSource] = useState<Session[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [form] = Form.useForm();
  const [courses, setCourses] = useState<Course[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchSessions();
    fetchCourses();
  }, []);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const response = await getSessions('', '', 1, 10);
      setSessions(response.data.pageData);
      setDataSource(response.data.pageData);
    } catch (error) {
      message.error('Failed to fetch sessions');
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await getCourses('', 1, 10);
      setCourses(response.data.pageData);
      setDataSource(response.data.pageData);
    } catch (error) {
      console.error('Failed to fetch courses', error);
      setCourses([]);
      setDataSource([]);
      message.error('Failed to fetch courses');
    }
  };

  const handleEdit = (record: Session) => {
    setIsEditing(true);
    setCurrentSession(record); // Store the current session being edited
    setModalVisible(true);     // Open the modal
    form.setFieldsValue(record); // Set the form values to the selected session's data
  };

  const handleSaveSession = () => {
    form.validateFields()
      .then(async (values) => {
        setLoading(true); // Show loading spinner during request
        try {
          if (isEditing && currentSession) {
            // Update session logic
            const response = await updateSession(currentSession._id, values);
            const updatedSession = response.data;
            setDataSource(dataSource.map(item =>
              item._id === updatedSession._id ? updatedSession : item
            ));
            setSessions(sessions.map(item =>
              item._id === updatedSession._id ? updatedSession : item
            ));
            message.success('Session updated successfully');
          } else {
            // Create new session logic
            const response = await createSession(values);
            const newSession = { ...response.data, key: response.data._id };
            setDataSource([...dataSource, newSession]);
            setSessions([...sessions, newSession]);
            message.success('Session created successfully');
          }
          setModalVisible(false); // Close the modal
        } catch (error) {
          console.error("Error in saving session", error);
          message.error(isEditing ? 'Failed to update session' : 'Failed to create session');
        } finally {
          setLoading(false); // Hide loading spinner
        }
      })
      .catch((info) => {
        console.error('Validation failed:', info);
        message.error('Please correct the errors in the form.');
      });
  };
  

  const handleOnDeleteSession = (sessionId: string) => {
    confirm({
      title: 'Do you want to delete this session?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone',
      onOk() {
        deleteSession(sessionId)
          .then(() => {
            const newDataSource = dataSource.filter((item) => item._id !== sessionId);
            setDataSource(newDataSource);
            setDataSource(newDataSource);
            message.success('Session deleted successfully');
          })
          .catch((error) => {
            console.error("Failed to delete Session", error);
            message.error('Failed to delete Session');
          });
      },
    });
  };

  const handleSearch = (value: string) => {
    const filteredData = dataSource.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setSessions(filteredData);
  };

  const handleAddNewSession = () => {
    setIsEditing(false); // Set editing mode to false
    setCurrentSession(null); // Clear current session
    setModalVisible(true);   // Open the modal
    form.resetFields();      // Reset the form fields
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Layout className="site-layout">
        <Header className="p-0 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#939fb1]">
            <div className="mx-4 my-auto text-lg font-bold text-white">
              Session Management
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
              onClick={handleAddNewSession}
            >
              <PlusCircleOutlined />
              Add New Session
            </Button>
          </div>
        </Header>

        <Modal
          title={isEditing ? 'Edit Session' : 'Add New Session'}
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onOk={handleSaveSession}
          okText="Save"
          width={"50%"}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="course_id"
              label="Course"
              rules={[{ required: true, message: "Please select a course!" }]}
            >
              <Select placeholder="Select a course">
                {courses.map((course) => (
                  <Select.Option key={course._id} value={course._id}>
                    {course.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter the Session name!' }]}
            >
              <Input />
            </Form.Item>
            
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please enter the Session description!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="position_order"
              label="Position Order"
              rules={[{ required: true, message: 'Please enter the Session position order!' }]}
            >
              <Input type="number" />
            </Form.Item>
          </Form>
        </Modal>

        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Spin size="large" />
          </div>
        ) : (
          <Content className="m-4 overflow-y-scroll">
            <Table
              pagination={{ pageSize: 10 }}
              dataSource={sessions}
              columns={[
                {
                  title: 'Session Name',
                  dataIndex: 'name',
                  key: 'name',
                },
                {
                  title: 'Course Name',
                  dataIndex: 'course_name',
                  key: 'course_name',
                },
                {
                  title: 'Position Order',
                  dataIndex: 'position_order',
                  key: 'position_order',
                  width: 120,
                  align: "center" as AlignType,
                },
                {
                  title: 'Description',
                  dataIndex: 'description',
                  key: 'description',
                },
                {
                  title: 'Created At',
                  dataIndex: 'created_at',
                  key: 'created_at',
                  align: 'center' as AlignType,
                  render: (created_at: string) => moment(created_at).format("YYYY-MM-DD"),
                },
                {
                  title: 'Update At',
                  dataIndex: 'updated_at',
                  key: 'updated_at',
                  align: 'center' as AlignType,
                  render: (created_at: string) => moment(created_at).format("YYYY-MM-DD"),
                },
                {
                  title: 'Actions',
                  key: 'actions',
                  align: 'center' as AlignType,
                  render: (text: string, session: Session) => (
                    <div className="flex flex-row justify-center gap-1">
                      <Button size="small" icon={<EditOutlined />} className="text-blue-500" onClick={() => handleEdit(session)}></Button>
                      <Button size="small" icon={<DeleteOutlined />} className="text-red-500" onClick={() => handleOnDeleteSession(session._id)}></Button>
                    </div>
                  ),
                },
              ]}
            />
          </Content>
        )}
        <Footer style={{ textAlign: 'center' }}>Session Management ©2023 Created by Your Company</Footer>
      </Layout>
    </Layout>
  );
};

export default ManagerCourseInstructor;
