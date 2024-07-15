import React, { useEffect, useState } from 'react';
import { Button, Input, Layout, Table, Modal, Form, message } from "antd";
import { useParams } from 'react-router-dom';
import { createLesson, getLessons, getLesson, updateLesson, deleteLesson } from 'services/Instructor/lessonApiService';
import { PlusCircleOutlined, SearchOutlined, ExclamationCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getSession } from 'services/Instructor/sessionApiService';

const { Header, Content } = Layout;
const { confirm } = Modal;

interface Lesson {
  _id: string;
  name: string;
  course_id: string;
  session_id: string;
  lesson_type: string;
  description: string;
  video_url: string;
  image_url: string;
  full_time: number;
  position_order: number;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean,
}

interface Session {
  _id: string;
  name: string;
  description: string;
  position_order: number;
  created_at: string;
  updated_at: string;
}

const ViewLesson: React.FC = () => {
  const { sessionId, courseId } = useParams<{ sessionId: string, courseId: string }>();
  const [dataSource, setDataSource] = useState<Lesson[]>([]);
  const [filteredDataSource, setFilteredDataSource] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);

  const handleSearch = (value: string) => {
    const filteredData = dataSource.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDataSource(filteredData);
  };

  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionId) {
        console.error("sessionId is undefined");
        message.error('sessionId is undefined');
        return;
      }

      try {
        const response = await getSession(sessionId);
        setSession(response.data);
      } catch (error) {
        console.error("Failed to fetch session", error);
        message.error('Failed to fetch session');
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  useEffect(() => {
    const fetchLessons = async () => {
      if (courseId) {
        try {
          const response = await getLessons('', 1, 10);
          setDataSource(response.data.pageData);
          setFilteredDataSource(response.data.pageData);
        } catch (error) {
          message.error('Failed to fetch lesson');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchLessons();
  }, [sessionId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Loading...</div>;
  }

  const handleAddNewLesson = () => {
    setIsEditMode(false);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleEditLesson = (lesson: Lesson) => {
    setIsEditing(true);
    setModalVisible(true);
    setCurrentLesson(lesson);
    form.setFieldsValue(lesson);
  };

  const handleDeleteLesson = (lessonId: string) => {
    confirm({
      title: 'Do you want to delete this lesson?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone',
      onOk() {
        deleteLesson(lessonId)
          .then(() => {
            const newDataSource = dataSource.filter((item) => item._id !== lessonId);
            setDataSource(newDataSource);
            setFilteredDataSource(newDataSource);
            message.success('Lesson deleted successfully');
          })
          .catch((error) => {
            console.error("Failed to delete lesson", error);
            message.error('Failed to delete lesson');
          });
      },
    });
  };

  const handleSaveLesson = () => {
    form.validateFields()
      .then((values) => {
        form.resetFields();
        if (isEditMode && currentLesson) {
          const updatedValues = {
            ...values,
            course_id: courseId,
            session_id: sessionId,
          };
          updateLesson(currentLesson._id, updatedValues)
            .then(() => {
              const newDataSource = dataSource.map((item) =>
                item._id === currentLesson._id ? { ...item, ...values } : item
              );
              setDataSource(newDataSource);
              setFilteredDataSource(newDataSource);
              message.success('Lesson updated successfully');
            })
            .catch((error) => {
              console.error("Failed to update lesson", error);
              message.error('Failed to update lesson');
            });
        } else {
          const newValues = {
            ...values,
            course_id: courseId,
            session_id: sessionId,
          };
          createLesson(newValues)
            .then((response) => {
              const newRecord = {
                ...response.data,
                key: (dataSource.length + 1).toString(),
                created_at: new Date().toISOString().split("T")[0],
              };
              setDataSource([...dataSource, newRecord]);
              setFilteredDataSource([...dataSource, newRecord]);
              message.success('Lesson created successfully');
            })
            .catch((error) => {
              console.error("Failed to create lesson", error);
              message.error('Failed to create lesson');
            });
        }
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
        message.error('Validation failed');
      });
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
      render: (text: string, lesson: Lesson) => (
        <span>
          <Button onClick={() => handleEditLesson(lesson)} icon={<EditOutlined />} />
          <Button onClick={() => handleDeleteLesson(lesson._id)} icon={<DeleteOutlined />} />
        </span>
      ),
    },
  ];

  return (
    <Layout style={{ height: '100vh' }}>
      <Header className="p-0 bg-white">
        <div className="flex justify-between bg-[#939fb1]">
          <div className="text-lg font-bold my-auto mx-4 text-white">
            Name Course: {session.name}
          </div>
          <div className="mx-4 my-auto">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              style={{ width: 300, borderRight: '2px solid white' }}
              onChange={e => handleSearch(e.target.value)}
            />
            <Button className="font-bold text-white bg-red-500 ml-2" onClick={handleAddNewLesson}>
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
          loading={loading}
          rowKey="_id"
        />
      </Content>
      <Modal
        width={"50%"}
        title={isEditMode ? "Edit Lesson" : "Add New Lesson"}
        visible={isModalVisible}
        onOk={handleSaveLesson}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the lesson name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the lesson description!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="lesson_type"
            label="Lesson Type"
            rules={[{ required: true, message: 'Please enter the lesson type!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="video_url"
            label="Video URL"
            rules={[{ required: true, message: 'Please enter the video URL!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image_url"
            label="Image URL"
            rules={[{ required: true, message: 'Please enter the image URL!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="full_time"
            label="Full Time"
            rules={[{ required: true, message: 'Please enter the full time!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="position_order"
            label="Position Order"
            rules={[{ required: true, message: 'Please enter the position order!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ViewLesson;
