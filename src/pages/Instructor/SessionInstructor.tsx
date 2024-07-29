import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  ReadOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Button, Divider, Form, Input, Layout, List, Modal, Select, Table, Tabs, message } from "antd";
import { Course, Session } from 'models/types';
import moment from 'moment';
import { AlignType } from 'rc-table/lib/interface';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourses } from 'services/All/getCoursesApiService';
import { createSession, deleteSession, getSessions, updateSession } from 'services/Instructor/sessionApiService';

const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;
const { confirm } = Modal;

const ManagerCourseInstructor: React.FC = () => {
  const [dataSource, setDataSource] = useState<Session[]>([]);
  const [filteredDataSource, setFilteredDataSource] = useState<Session[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<Session | null>(null);
  const [form] = Form.useForm();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const { sessionId, courseId } = useParams<{ sessionId: string, courseId: string }>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  
  useEffect(() => {
    fetchSessions();
    fetchCourses();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await getSessions('', 1, 10, 5, 1, '');
      console.log("reponse", response)
      setSessions(response.data.pageData);
      setDataSource(response.data.pageData);
    } catch (error) {
      message.error('Failed to fetch sessions');
      console.error('Error fetching sessions:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await getCourses('', 1, 10);
      console.log("courses", response);

      setCourses(response.data.pageData);
      setFilteredDataSource(response.data.pageData);
    } catch (error) {
      console.error('Failed to fetch courses', error);
      setCourses([]);
      setFilteredDataSource([]);
      message.error('Failed to fetch courses');
    }
  };

  const handleViewMore = (key: string) => {
    setExpandedKeys(prevKeys =>
      prevKeys.includes(key) ? prevKeys.filter(k => k !== key) : [...prevKeys, key]
    );
  };
  

  const handleEdit = (record: Session) => {
    console.log("Edit record:", record);
    setIsEditMode(true);
    setCurrentRecord(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };
  const handleSaveSession = () => {
    form.validateFields()
      .then((values) => {
        if (isEditing && currentSession) {
          updateSession(currentSession._id, { ...values, course_id: courseId })
            .then((response) => {
              const updatedSession = response.data;
              const newDataSource = dataSource.map((item) =>
                item._id === updatedSession._id ? updatedSession : item
              );
              setDataSource(newDataSource);
              setFilteredDataSource(newDataSource);
              message.success('Session updated successfully');
            })
            .catch((error) => {
              console.error("Failed to Update Session", error);
              message.error('Failed to Update Session');
            });
        } else {
          createSession({ ...values, course_id: courseId! })
            .then((response) => {
              const newSession = {
                ...response.data,
                key: response.data._id
              };
              console.log("value",values)

              setDataSource([...dataSource, newSession]);
              setFilteredDataSource([...dataSource, newSession]);
              message.success('Session created successfully');
            })
            .catch((error) => {
              console.error("Failed to Create Session", error);
              message.error('Failed to Create Session');
            });
        }
        setModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
        message.error('Validation failed');
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
            const response = await updateSession(currentRecord._id, newValues);
            const updatedLesson = response.data;

            const newDataSource = dataSource.map((item) =>
              item._id === updatedLesson._id ? updatedLesson : item
            );
            setDataSource(newDataSource);
            setFilteredDataSource(newDataSource);
            message.success('Lesson updated successfully');
          } catch (error) {
            console.error("Failed to Update Lesson", error);
            message.error('Failed to Update Lesson');
          }
        } else {
          message.error("Edit error");
        }
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
        message.error('Validation failed');
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
            setFilteredDataSource(newDataSource);
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
    setFilteredDataSource(filteredData);
  };

  const sortedSessions = [...sessions].sort((a, b) => a.position_order - b.position_order);

  const handleAddNewSession = () => {
    setIsEditing(false);
    setModalVisible(true);
    form.resetFields();
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
              onChange={e => handleSearch(e.target.value)}
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
      >
        <Form form={form} layout="vertical">
        <Form.Item
            name="course_id"
            label="Course"
            rules={[{ required: true, message: "Please select a course!" }]}
          >
            <Select placeholder="Select a course">
              {courses.map((course) => (
                <Select.Option key={course._id} values={course._id}>
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
        <Content className="m-4 overflow-y-scroll">
          <Table
            pagination={{ pageSize: 5 }}
            dataSource={sessions}
            columns={[
              {
                title: 'Session Name',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: 'Position Order',
                dataIndex: 'position_order',
                key: 'position_order',
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
                  <Button size="small" icon={<EyeOutlined />} onClick={() => handleViewMore(session._id)}></Button>
                </div>
                ),
              },
            ]}
            expandable={{
              expandedRowKeys: expandedKeys,
              onExpand: (expanded, record) => handleViewMore(record._id),
              expandedRowRender: (record: Session) => (
                <div style={{ paddingBottom: "10px", backgroundColor: 'white', borderRadius: '4px' }}>
                  <Tabs centered>
                    <TabPane tab={<span style={{ fontSize: '16px' }}>List of course sessions:</span>} key="1" className='w-full'>
                      <List
                        className='px-2'
                        size="small"
                        dataSource={sortedSessions.filter(session => session.course_id === record._id)}
                        renderItem={(session, index) => (
                          <List.Item actions={[
                            <Button icon={<PlusOutlined />} className="mr-2 text-white bg-green-600"></Button>,
                            <Button icon={<DeleteOutlined />} className="mr-2 text-white bg-red-600"></Button>,
                          ]}>
                            <List.Item.Meta
                              avatar={<ReadOutlined />}
                              title={session.name}
                              description={session.description}
                            />
                            <div>Position Order: {session.position_order}</div>
                          </List.Item>
                        )}
                      />
                      <Divider className='p-0 m-0' />
                      <div className='flex justify-center w-full pr-5 my-5'>
                        <Button type="dashed" className='text-base text-blue-700'> <PlusOutlined /> Add New Session</Button>
                      </div>
                    </TabPane>
                  </Tabs>
                </div>
              ),
              expandIcon: () => <></>,
            }}
          />
        </Content>
        <Footer className="text-center bg-white">
          Academic_Resources ©2023 Created by My Team
        </Footer>
      </Layout>

      <Modal
        visible={isModalVisible}
        title={isEditMode ? "Edit Lesson" : "Add Lesson"}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleOnEditLesson}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Lesson Name" rules={[{ required: true, message: 'Please input the lesson name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input the description!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="position_order" label="Position Order" rules={[{ required: true, message: 'Please input the position order!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ManagerCourseInstructor;
