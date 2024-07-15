import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout, Modal, Select, Table, message } from "antd";
import { Lesson, Session } from 'models/types';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createLesson, deleteLesson, getLessons, updateLesson } from 'services/Instructor/lessonApiService';
import { getSession } from 'services/Instructor/sessionApiService';

const { Header, Content } = Layout;
const { confirm } = Modal;

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
          message.error('Failed to Fetch Lesson');
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
      title: 'Do you want to delete this Lesson?',
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
            console.error("Failed to Delete Lesson", error);
            message.error('Failed to Delete Lesson');
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
              console.error("Failed to Update Lesson", error);
              message.error('Failed to Update Lesson');
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
              console.error("Failed to Create lesson", error);
              message.error('Failed to Create lesson');
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
        <span className="flex flex-row gap-1">
          <Button size="small" onClick={() => handleEditLesson(lesson)} icon={<EditOutlined />} />
          <Button size="small" onClick={() => handleDeleteLesson(lesson._id)} icon={<DeleteOutlined />} />
        </span>
      ),
    },
  ];
  
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  
  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Header className="p-0 bg-white">
        <div className="flex justify-between bg-[#939fb1]">
          <div className="mx-4 my-auto text-lg font-bold text-white">
            Name Course: {session.name}
          </div>
          <div className="mx-4 my-auto">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              style={{ width: 300, borderRight: '2px solid white' }}
              onChange={e => handleSearch(e.target.value)}
            />
            <Button className="ml-2 font-bold text-white bg-red-500" onClick={handleAddNewLesson}>
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
            rules={[{ required: true, message: 'Please enter the Lesson Name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the Lesson Description!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          
          <Form.Item
            name="lesson_type"
            label="Lesson Type"
            rules={[{ required: true, message: 'Please select the Lesson Type!' }]}
            >
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="label"
            onChange={onChange}
            onSearch={onSearch}
            options={[
              {
                value: 'text',
                label: 'text',
              },
              {
                value: 'video',
                label: 'video',
              },
              {
                value: 'image',
                label: 'image',
              },
            ]}
          />
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
