import {
  DeleteOutlined,
  DownCircleOutlined,
  EditOutlined,
  PlusOutlined,
  ReadOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Button, Divider, Form, Input, Layout, List, Modal, Table, Tabs, Typography, Upload } from "antd";
import { AlignType } from 'rc-table/lib/interface';
import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;
const { TabPane } = Tabs;

interface DataType {
  key: string;
  image: string;
  created_at: string;
  description?: string;
  instructor?: string;
  name_course: string;
}

interface SessionType {
  id: number;
  key: string;
  title: string;
  duration: string;
  lessons: LessonType[];
}

interface LessonType {
  id: number;
  key: string;
  title: string;
  duration: string;
  videoUrl?: string;
}

const initialDataSource: DataType[] = [
  { key: '1', image: 'https://via.placeholder.com/50', created_at: '2024-01-01', name_course: 'Course name 1' },
  { key: '2', image: 'https://via.placeholder.com/50', created_at: '2024-01-02', name_course: 'Course name 2' },
  { key: '3', image: 'https://via.placeholder.com/50', created_at: '2024-01-03', name_course: 'Course name 3' },
];

const initialSessions: SessionType[] = [
  { id: 1, key: '1', title: 'Session 1', duration: '30 minutes', lessons: [] },
  { id: 2, key: '2', title: 'Session 2', duration: '45 minutes', lessons: [] },
  { id: 3, key: '3', title: 'Session 3', duration: '60 minutes', lessons: [] },
];

const ManagerCourseInstructor: React.FC = () => {
  const [dataSource] = useState<DataType[]>(initialDataSource);
  const [sessions, setSessions] = useState<SessionType[]>(initialSessions);
  const [lessonModalVisible, setLessonModalVisible] = useState(false);
  const [lessonForm] = Form.useForm();
  const [currentSession, setCurrentSession] = useState<SessionType | null>(null);
  const [currentLesson, setCurrentLesson] = useState<LessonType | null>(null);
  const [addLessonSessionKey, setAddLessonSessionKey] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleViewLessons = (record: DataType) => {
    const session = sessions.find(session => session.key === record.key);
    if (session) {
      setCurrentSession(session);
    }
  };

  const handleLessonAdd = (sessionKey: string) => {
    setAddLessonSessionKey(sessionKey);
    setCurrentLesson(null);
    lessonForm.resetFields();
    setLessonModalVisible(true);
  };

  const handleLessonEdit = (lesson: LessonType) => {
    setCurrentLesson(lesson);
    lessonForm.setFieldsValue(lesson);
    setLessonModalVisible(true);
  };

  const handleLessonSave = () => {
    lessonForm
      .validateFields()
      .then(values => {
        const { title, duration } = values;
        const videoUrl = videoFile ? URL.createObjectURL(videoFile) : undefined;

        lessonForm.resetFields();
        setVideoFile(null); // Reset the video file state

        const session = sessions.find(session => session.key === addLessonSessionKey);
        if (session) {
          if (currentLesson) {
            const updatedLesson = { ...currentLesson, title, duration, videoUrl };
            const updatedLessons = session.lessons.map(lesson =>
              lesson.key === currentLesson.key ? updatedLesson : lesson
            );
            const updatedSession = { ...session, lessons: updatedLessons };
            const updatedSessions = sessions.map(s =>
              s.key === session.key ? updatedSession : s
            );
            setSessions(updatedSessions);
          } else {
            const newLesson: LessonType = {
              id: session.lessons.length + 1,
              key: `lesson-${session.key}-${session.lessons.length + 1}`,
              title,
              duration,
              videoUrl
            };
            const updatedSession = { ...session, lessons: [...session.lessons, newLesson] };
            const updatedSessions = sessions.map(s =>
              s.key === session.key ? updatedSession : s
            );
            setSessions(updatedSessions);
          }
        }
        saveSessionsToLocalStorage([...sessions]);
        setLessonModalVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleLessonDelete = (lesson: LessonType) => {
    const session = sessions.find(session => session.lessons.some(l => l.key === lesson.key));
    if (session) {
      const updatedLessons = session.lessons.filter(l => l.key !== lesson.key);
      const updatedSession = { ...session, lessons: updatedLessons };
      const updatedSessions = sessions.map(s =>
        s.key === session.key ? updatedSession : s
      );
      setSessions(updatedSessions);
      saveSessionsToLocalStorage(updatedSessions);
    }
  };

  const saveSessionsToLocalStorage = (sessions: SessionType[]) => {
    localStorage.setItem('sessions', JSON.stringify(sessions));
  };

  const handleFileChange = (info: any) => {
    if (info.file.status === 'done') {
      setVideoFile(info.file.originFileObj);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="p-0 bg-white">
        <div className="flex items-center justify-end gap-4 p-4 bg-[#939fb1]">
          <Input placeholder="Search..." prefix={<SearchOutlined />} style={{ width: 300 }} />
        </div>
      </Header>
      <Content className="m-4">
        <Table
          dataSource={dataSource}
          columns={[
            { title: 'Course', dataIndex: 'image', key: 'image', render: (text: string) => <img src={text} alt="item" className="w-12 h-12" /> },
            { title: 'Course Name', dataIndex: 'name_course', key: 'name_course' },
            { title: 'Created At', dataIndex: 'created_at', key: 'created_at' },
            {
              title: 'Actions',
              key: 'actions',
              align: 'center' as AlignType,
              render: (text: string, record: DataType) => (
                <Button icon={<DownCircleOutlined />} onClick={() => handleViewLessons(record)} />
              ),
            },
          ]}
          expandable={{
            expandedRowRender: (record: DataType) => (
              <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Lessons" key="1">
                  <List
                    size="small"
                    dataSource={sessions.find(s => s.key === record.key)?.lessons}
                    renderItem={(lesson: LessonType) => (
                      <List.Item
                        actions={[
                          <Button icon={<EditOutlined />} onClick={() => handleLessonEdit(lesson)} />,
                          <Button icon={<DeleteOutlined />} onClick={() => handleLessonDelete(lesson)} />,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<ReadOutlined />}
                          title={lesson.title}
                          description={lesson.duration}
                        />
                        {lesson.videoUrl && (
                          <video width="200" controls>
                            <source src={lesson.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </List.Item>
                    )}
                  />
                  <Divider />
                  <div className="text-center">
                    <Button type="primary" onClick={() => handleLessonAdd(record.key)}>
                      <PlusOutlined /> Add Lesson
                    </Button>
                  </div>
                </TabPane>
              </Tabs>
            ),
            rowExpandable: (record: DataType) => true,
          }}
          rowKey="key"
        />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Academic Resources ©2024 Created by Group 4</Footer>
      <Modal
        title={currentLesson ? "Edit Lesson" : "Add Lesson"}
        visible={lessonModalVisible}
        onCancel={() => setLessonModalVisible(false)}
        onOk={handleLessonSave}
      >
        <Form form={lessonForm} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title of lesson!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="duration" label="Duration" rules={[{ required: true, message: 'Please input the duration of lesson!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="video" label="Upload Video" valuePropName="fileList" getValueFromEvent={(e) => e.fileList}>
            <Upload beforeUpload={() => false} onChange={handleFileChange}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ManagerCourseInstructor;
