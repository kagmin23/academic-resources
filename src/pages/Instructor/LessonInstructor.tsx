import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, EyeOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout, Modal, Select, Spin, Table, message, notification } from 'antd';
import { Course, Lesson, Session } from 'models/types';
import moment from 'moment';
import { AlignType } from 'rc-table/lib/interface';
import React, { useEffect, useState } from 'react';
import { getCourses } from 'services/All/getCoursesApiService';
import { createLesson, deleteLesson, getLessons, updateLesson } from 'services/Instructor/lessonApiService';
import { getSessions } from 'services/Instructor/sessionApiService';

const { confirm } = Modal;
const { Header, Content } = Layout;

const ManagerLessonInstructor: React.FC = () => {
  const [dataSource, setDataSource] = useState<Lesson[]>([]);
  const [filteredDataSource, setFilteredDataSource] = useState<Lesson[]>([]);
  const [currentRecord, setCurrentRecord] = useState<Lesson | null>(null);
  const [form] = Form.useForm();
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [courseId, setCourseId] = useState<string | undefined>(undefined);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  

  const handleAddNewLesson = () => {
    setIsEditing(false);
    setModalVisible(true);
    setCurrentRecord(null);
    form.resetFields();
    setFilteredSessions([]);
  };

  useEffect(() => {
    fetchLessons();
    fetchCourses();
  }, [sessionId, courseId]);

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const response = await getLessons('', '', '', 1, 10);
      if (response.data && response.data.pageData) {
        setDataSource(response.data.pageData);
        setLessons(response.data.pageData);
      } else {
        message.error('No lessons found');
      }
    } catch (error: any) {
      notification.error({
        message: "Failed to get Lesson!",
        description:
          error.message || "Failed to get Lesson. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleChangeCourse = async (value: string) => {
    setCourseId(value);
    try {
      const response = await getSessions('', value, 1, 10);
      setSessions(response.data.pageData);
    } catch (error: any) {
      notification.error({
        message: "Failed to get Session!",
        description:
          error.message || "Failed to get Session. Please try again.",
      });
    }
  }

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await getCourses("", 1, 10);
      setCourses(response.data.pageData);
      setFilteredDataSource(response.data.pageData);
    } catch (error: any) {
        setCourses([]);
        setFilteredDataSource([]);
        notification.error({
          message: "Failed to get Courses!",
          description:
            error.message || "Failed to get Courses. Please try again.",
        });
    } finally {
      setLoading(false);
    }
  };
  
  const handleViewMore = (key: string) => {
    setExpandedKeys(prevKeys => prevKeys.includes(key) ? prevKeys.filter(k => k !== key) : [...prevKeys, key]);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const handleEdit = async (record: Lesson) => {
    setIsEditing(true);
    setCurrentRecord(record);
    setModalVisible(true);
    
    if (courses.length === 0) {
      await fetchCourses();
    }
    
    setCourseId(record.course_id);
    await handleChangeCourse(record.course_id);
    
    setSessionId(record.session_id);
    
    form.setFieldsValue({
      ...record,
      course_id: record.course_id,
      session_id: record.session_id
    });
  };
  
  const handleSaveLesson = () => {
    form.validateFields()
      .then(async (values) => {
        setLoading(true);
        try {
          const selectedCourse = courses.find(course => course._id === courseId);
          const selectedSession = sessions.find(session => session._id === sessionId);
          
          if (!selectedCourse || !selectedSession) {
            throw new Error('Invalid course or session');
          }
          const lessonData = {
            ...values,
            course_id: courseId,
            session_id: sessionId,
          };
          if (isEditing && currentRecord) {
            const response = await updateLesson(currentRecord._id, lessonData);
            const updatedLesson = response.data;
            setDataSource(dataSource.map(item =>
              item._id === updatedLesson._id ? updatedLesson : item
            ));
            setLessons(lessons.map(item =>
              item._id === updatedLesson._id ? updatedLesson : item
            ));
            message.success('Lesson updated successfully');
          } else {
            const response = await createLesson(lessonData);
            const newLesson = { ...response.data, key: response.data._id };
            setDataSource([newLesson, ...dataSource]);
            setLessons([newLesson, ...lessons]);
            message.success('Lesson created successfully');
          }
          setModalVisible(false);
        } catch (error: any) {
          notification.error({
            message: "Failed to save lesson!",
            description:
              error.message || "Failed to save lesson. Please try again.",
          });
          message.error(isEditing ? 'Failed to update lesson' : 'Failed to create lesson');
          setModalVisible(true);
        } finally {
          setLoading(false);
        }
      })
      .catch((info) => {
        console.error('Validation failed:', info);
        message.error('Please correct the errors in the form.');
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
          .catch((error: any) => {
            notification.error({
              message: "Failed to deleted lesson!",
              description:
                error.message || "Failed to deleted lesson. Please try again.",
              })
            })
      },
    });
  };

  const handleSearch = (value: string) => {
    const filteredData = dataSource.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredDataSource(filteredData);
  };

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

      <Modal
        width={"50%"}
        title={isEditing ? "Edit Lesson" : "Add New Lesson"}
        visible={modalVisible}
        onOk={handleSaveLesson}
        okText="Save"
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="course_id"
            label="Course"
            rules={[{ required: true, message: "Please select a course!" }]}
          >
            <Select placeholder="Select a course"
              onChange={handleChangeCourse}>
              {courses.map((course) => (
                <Select.Option key={course._id} value={course._id}>
                  {course.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
              name="session_name"
              label="Session"
              rules={[{ required: true, message: "Please select a session!" }]}
            >
              <Select placeholder="Select a session"
                onChange={(value) => setSessionId(value)}
                value={sessionId}>
                {sessions.map((session) => (
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
              { required: true, message: "Please input a position_order!" },
              {
                validator: (_, value) =>
                  value <= 100 && value >= 0
                    ? Promise.resolve()
                    : Promise.reject(" Position Order must be greater than or equal to 0 and less than or equal to 100 !"),
              },
            ]}
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
            dataSource={lessons}
            columns={[
              {
                title: 'Lesson Name',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: 'Session Name',
                dataIndex: 'session_name',
                key: 'session_name',
                width: 200
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
                align: "center" as AlignType,
              },
              {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                width: 100
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
                render: (text: string, lesson: Lesson) => (
                  <div className="flex flex-row justify-center gap-1">
                    <Button size="small" icon={<EditOutlined />} className="text-blue-500" onClick={() => handleEdit(lesson)}></Button>
                    <Button size="small" icon={<DeleteOutlined />} className="text-red-500" onClick={() => handleOnDeleteLesson(lesson._id)}></Button>
                    <Button size="small" icon={<EyeOutlined />} className="text-blue-900" onClick={() => handleViewMore(lesson._id)}></Button>
                  </div>
                ),
              },
            ]}
          />
        </Content>
      )}
    </Layout>
  );
};

export default ManagerLessonInstructor;