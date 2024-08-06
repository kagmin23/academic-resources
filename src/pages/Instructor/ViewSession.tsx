import { BarsOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout, Modal, Table, message, notification } from "antd";
import { Course, Session } from 'models/types';
import moment from 'moment';
import { AlignType } from 'rc-table/lib/interface';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourse } from 'services/Instructor/courseApiService';
import { createSession, deleteSession, getSessions, updateSession } from 'services/Instructor/sessionApiService';

const { Header, Content } = Layout;
const { confirm } = Modal;

const ViewSession: React.FC = () => {
  const { courseId } = useParams<{ courseId: string | undefined }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [dataSource, setDataSource] = useState<Session[]>([]);
  const [filteredDataSource, setFilteredDataSource] = useState<Session[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    const filteredData = dataSource.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDataSource(filteredData);
  };

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) {
        console.error("courseId is undefined");
        message.error('courseId is undefined');
        return;
      }

      try {
        const response = await getCourse(courseId);
        setCourse(response.data);
      } catch (error: any) {
        notification.error({
          message: "Failed to get Courses!",
          description:
            error.message || "Failed to get Courses. Please try again.",
        });
      }
    };
    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    const fetchSessions = async () => {
      if (courseId) {
        try {
          const response = await getSessions('',courseId, 1, 10);
          setDataSource(response.data.pageData);
          setFilteredDataSource(response.data.pageData);
        } catch (error: any) {
          notification.error({
            message: "Failed to get Session!",
            description:
              error.message || "Failed to get Session. Please try again.",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSessions();
  }, [courseId]);

  const handleAddNewSession = () => {
    setIsEditing(false);
    setModalVisible(true);
    form.resetFields();
  };

  const handleEditSession = (session: Session) => {
    setIsEditing(true);
    setModalVisible(true);
    setCurrentSession(session);
    form.setFieldsValue(session);
  };

  const handleDeleteSession = (sessionId: string) => {
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
          .catch((error: any) => {
            notification.error({
              message: "Failed to deleted Session!",
              description:
                error.message || "Failed to deleted Session. Please try again.",
              })
            })
      },
    });
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
              setModalVisible(false);
            })
            .catch((error: any) => {
              notification.error({
                message: "Failed to update Session!",
                description:
                  error.message || "Failed to update Session. Please try again.",
                })
              })
              setModalVisible(true);
        } else {
          createSession({ ...values, course_id: courseId! })
            .then((response) => {
              const newSession = {
                ...response.data,
                key: response.data._id
              };
              setDataSource([...dataSource, newSession]);
              setFilteredDataSource([...dataSource, newSession]);
              message.success('Session created successfully');
              setModalVisible(false);
            })
            .catch((error: any) => {
              notification.error({
                message: "Failed to create Session!",
                description:
                  error.message || "Failed to create Session. Please try again.",
                })
              })
              setModalVisible(true);
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
        message.error('Validation failed');
      });
  };

  const handleViewLesson = (courseId: string | undefined, sessionId: string) => {
    navigate(`/instructor/profile-instructor/manager-instructor-course/${courseId}/manager-session/${sessionId}/manager-lesson`);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Desciption',
      dataIndex: 'description',
      key: 'description',
      width: 400,
    },
    {
      title: 'Position Order',
      dataIndex: 'position_order',
      key: 'position_order',
      align: "center" as AlignType,
    },
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
      title: 'Actions',
      key: 'actions',
      align: "center" as AlignType,
      render: (text: string, session: Session) => (
        <div className="flex flex-row justify-center gap-1">
          <Button size="small" className="text-blue-500" onClick={() => handleEditSession(session)} icon={<EditOutlined />}></Button>
          <Button size="small" className="text-red-500" danger onClick={() => handleDeleteSession(session._id)} icon={<DeleteOutlined />}></Button>
          <Button size="small" onClick={() => handleViewLesson(courseId, session._id)} icon={<BarsOutlined />}></Button>
        </div>
      ),
    },
  ];

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Header className="p-0 bg-white">
        <div className="flex justify-between bg-[#939fb1]">
          <div className="mx-4 my-auto text-lg font-bold text-white">
            Name Course: {course.name}
          </div>
          <div className="mx-4 my-auto">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              style={{ width: 300, borderRight: '2px solid white' }}
              onChange={e => handleSearch(e.target.value)}
            />
            
            <Button className="ml-2 font-bold text-white bg-red-500" onClick={handleAddNewSession}>
              <PlusCircleOutlined />
              Add New Session
            </Button>
          </div>
        </div>
      </Header>
      <Content>
        <Table
          columns={columns}
          dataSource={filteredDataSource}
          loading={loading}
          rowKey="_id"
        />
      </Content>
      <Modal
        title={isEditing ? 'Edit Session' : 'Add New Session'}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleSaveSession}
        okText="Save"
      >
        <Form form={form} layout="vertical">
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
    </Layout>
  );
};

export default ViewSession;