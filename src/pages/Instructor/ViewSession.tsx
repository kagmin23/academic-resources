import React, { useEffect, useState } from 'react';
import { Button, Input, Layout, Table, Modal, Form, message } from "antd";
import { useParams } from 'react-router-dom';
import { getSession, getSessions, createSession, updateSession, deleteSession } from 'services/Instructor/sessionApiService';
import { PlusCircleOutlined, SearchOutlined, ExclamationCircleOutlined, BarsOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getCourse } from 'services/Instructor/courseApiService';
import { useNavigate } from 'react-router-dom';
const { Header, Content } = Layout;
const { confirm } = Modal;

interface Session {
  _id: string;
  name: string;
  description: string;
  position_order: number;
  created_at: string;
  updated_at: string;
}

interface Course {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
}

const ViewSession: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
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
      } catch (error) {
        console.error("Failed to fetch course", error);
        message.error('Failed to fetch course');
      }
    };

    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    const fetchSessions = async () => {
      if (courseId) {
        try {
          const response = await getSessions('', 1, 10);
          setDataSource(response.data.pageData);
          setFilteredDataSource(response.data.pageData);
        } catch (error) {
          message.error('Failed to fetch sessions');
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
          .catch((error) => {
            console.error("Failed to delete session", error);
            message.error('Failed to delete session');
          });
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
          })
          .catch((error) => {
            console.error("Failed to update session", error);
            message.error('Failed to update session');
          });
      } else {
        createSession({ ...values, course_id: courseId })
          .then((response) => {
            const newSession = response.data;
            setDataSource([...dataSource, newSession]);
            setFilteredDataSource([...dataSource, newSession]);
            message.success('Session created successfully');
          })
          .catch((error) => {
            console.error("Failed to create session", error);
            message.error('Failed to create session');
          });
      }
      setModalVisible(false);
    })
    .catch((info) => {
      console.log("Validate Failed:", info);
      message.error('Validation failed');
    });
};

const handleViewLesson = (sessionId: string) => {
  navigate(`/instructor/profile-instructor/view-session/${courseId}/manager-lession/${sessionId}`);
};
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Position Order',
      dataIndex: 'position_order',
      key: 'position_order',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, session: Session) => (
        <div>
          <Button onClick={() => handleEditSession(session)}><EditOutlined /></Button>
          <Button danger onClick={() => handleDeleteSession(session._id)}><DeleteOutlined /></Button>
          <Button onClick={() => handleViewLesson(session._id)}><BarsOutlined /></Button>
         
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
          <div className="text-lg font-bold my-auto mx-4 text-white">
            Name Course: {course.name}
          </div>
          <div className="mx-4 my-auto">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              style={{ width: 300, borderRight: '2px solid white' }}
              onChange={e => handleSearch(e.target.value)}
            />
            <Button className="font-bold text-white bg-red-500 ml-2" onClick={handleAddNewSession}>
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
            rules={[{ required: true, message: 'Please enter the session name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the session description!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="position_order"
            label="Position Order"
            rules={[{ required: true, message: 'Please enter the session position order!' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ViewSession;