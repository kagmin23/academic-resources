import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, EyeOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Layout, Modal, Row, Select, Table, Typography, message } from "antd";
import { Lesson, Session } from 'models/types';
import moment from 'moment';
import { AlignType } from 'rc-table/lib/interface';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourse } from 'services/Instructor/courseApiService';
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
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);


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
        setSession(response.data);
      } catch (error) {
        console.error("Failed to fetch session", error);
        message.error('Failed to fetch session');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

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
      if (courseId && sessionId) {
        try {
          const response = await getLessons("", courseId, sessionId, 1, 10);
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
  }, [courseId,sessionId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Loading...</div>;
  }

  const handleAddNewLesson = () => {
    setIsEditMode(false);
    setModalVisible(true);
    form.resetFields();
  };

  const handleEditLesson = (lesson: Lesson) => {
    setIsEditMode(true);
    setModalVisible(true);
    setCurrentLesson(lesson);
    form.setFieldsValue(lesson);
  };

  const handleViewMore = (key: string) => {
    setExpandedKeys((prevKeys) =>
      prevKeys.includes(key)
        ? prevKeys.filter((k) => k !== key)
        : [...prevKeys, key]
    );
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
        const newValues = {
          ...values,
          course_id: courseId,
          session_id: sessionId,
        };
        
        if (isEditMode && currentLesson) {
          updateLesson(currentLesson._id, newValues)
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
        setModalVisible(false);
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
      width: 150
    
    },
    {
      title: 'Position Order',
      dataIndex: 'position_order',
      key: 'position_order',
      align: "center" as AlignType,
    },
    {
      title: 'Desciption',
      dataIndex: 'description',
      key: 'description',
      width: 300
    },
    {
      title: 'Lesson Type',
      dataIndex: 'lesson_type',
      key: 'lesson_type',
    },
    // {
    //   title: 'Video',
    //   dataIndex: 'video_url',
    //   key: 'video_url',
    //   align: "center" as AlignType,
    // },
    // {
    //   title: 'Image',
    //   dataIndex: 'image_url',
    //   key: 'image_url',
    //   align: "center" as AlignType,
    //   render: () => (
    //     <iframe src="image_url"></iframe>
    //   )
    // },
    {
      title: 'Full Time',
      dataIndex: 'full_time',
      key: 'full_time',
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
      render: (created_at: string) => moment(created_at).format("YYYY-MM-DD"),

    },
    {
      title: 'Actions',
      key: 'actions',
      align: "center" as AlignType,
      render: (text: string, lesson: Lesson) => (
        <span className="flex flex-row justify-center gap-1">
          <Button size="small" className="text-blue-500" onClick={() => handleEditLesson(lesson)} icon={<EditOutlined />} />
          <Button size="small" className="text-red-500" onClick={() => handleDeleteLesson(lesson._id)} icon={<DeleteOutlined />} />
          <Button size="small" onClick={() => handleViewMore(lesson._id)} icon={<EyeOutlined/>}></Button>
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
            Name Session: {session.name}
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
          scroll={{x: "max-content"}}
          expandable={{
            expandedRowKeys: expandedKeys,
            onExpand: (expanded, lesson) => handleViewMore(lesson._id),
            expandedRowRender: (lesson: Lesson) => (
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
                      <Typography.Title level={5}>
                        Video:
                      </Typography.Title>
                      <p>{lesson.video_url || "-"}</p>
                    </Col>

                    <Col span={22}>
                      <Typography.Title level={5}>
                        Image:
                      </Typography.Title>
                      <p>{lesson.image_url || "-"}</p>
                    </Col>

                  </Row>
                </div>
              ),
              expandIcon: () => null,
            }}
        />
        
      </Content>
      <Modal
        width={"50%"}
        title={isEditMode ? "Edit Lesson" : "Add New Lesson"}
        visible={modalVisible}
        onOk={handleSaveLesson}
        onCancel={() => setModalVisible(false)}
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
            name="lesson_type"
            label="Lesson Type"
            rules={[{ required: true, message: 'Please select the Lesson Type!' }]}
          >
            <Select
              showSearch
              placeholder="Select a lesson type"
              optionFilterProp="label"
              onChange={onChange}
              onSearch={onSearch}
              options={[
                { value: 'text', label: 'text' },
                { value: 'video', label: 'video' },
                { value: 'image', label: 'image' },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: false, message: 'Please enter the Lesson Description!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          
          <Form.Item
            name="video_url"
            label="Video URL"
            rules={[{ required: false, message: 'Please enter the video URL!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image_url"
            label="Image URL"
            rules={[{ required: false, message: 'Please enter the image URL!' }]}
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