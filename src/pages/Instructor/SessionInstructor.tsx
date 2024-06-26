import {
  DeleteOutlined,
  DownCircleOutlined,
  EditOutlined,
  ExclamationCircleOutlined // Added for confirmation modal
  ,






  PlusOutlined,
  ReadOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Button, Divider, Form, Input, Layout, List, Modal, Table, Tabs, Typography } from "antd";
import { AlignType } from 'rc-table/lib/interface';
import React, { useState } from 'react';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;
const { TabPane } = Tabs;
const { confirm } = Modal; // Destructure confirm for Antd Modal

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
  preview?: boolean;
}

const sessionsData: SessionType[] = [
  { id: 1, key: '1', title: 'Getting Started', duration: '30 minutes', preview: true },
  { id: 2, key: '2', title: 'Content Management', duration: '30 minutes' },
  { id: 3, key: '3', title: 'Course Download', duration: '30 minutes' },
  { id: 4, key: '4', title: 'Course Download 02', duration: '30 minutes' },
  { id: 5, key: '5', title: 'Contextualising Sustainability for a Changing World', duration: '10 minutes' },
];

const initialDataSource: DataType[] = [
  {
    key: '1',
    image: 'https://via.placeholder.com/50',
    created_at: '2024-01-01',
    name_course: 'Course name'
  },
  {
    key: '2',
    image: 'https://via.placeholder.com/50',
    created_at: '2024-01-02',
    name_course: 'Course name'
  },
  {
    key: '3',
    image: 'https://via.placeholder.com/50',
    name_course: 'Course name',
    created_at: '2024-01-03',
  },
  {
    key: '4',
    image: 'https://via.placeholder.com/50',
    created_at: '2024-01-04',
    name_course: 'Course name'
  },
  {
    key: '5',
    image: 'https://via.placeholder.com/50',
    created_at: '2024-01-05',
    name_course: 'Course name'
  },
  {
    key: '6',
    image: 'https://via.placeholder.com/50',
    created_at: '2024-01-06',
    name_course: 'Course name'
  },
];

const ManagerCourseInstructor: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>(initialDataSource);
  const [filteredDataSource, setFilteredDataSource] = useState<DataType[]>(initialDataSource);
  const [sessions, setSessions] = useState<SessionType[]>(sessionsData);
  const [form] = Form.useForm();
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [sessionModalVisible, setSessionModalVisible] = useState(false);
  const [sessionForm] = Form.useForm();
  const [currentSession, setCurrentSession] = useState<SessionType | null>(null);
  const [insertIndex, setInsertIndex] = useState<number | null>(null);
  const [sessionToDelete, setSessionToDelete] = useState<SessionType | null>(null); // State to track session to delete

  const handleViewMore = (key: string) => {
    setExpandedKeys(prevKeys =>
      prevKeys.includes(key) ? prevKeys.filter(k => k !== key) : [...prevKeys, key]
    );
  };

  const handleSearch = (value: string) => {
    const filteredData = dataSource.filter(item =>
      item.name_course.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDataSource(filteredData);
  };

  const showDeleteConfirm = (session: SessionType) => {
    setSessionToDelete(session); // Set session to delete
    confirm({
      title: 'Are you sure you want to delete this session?',
      icon: <ExclamationCircleOutlined />,
      content: `Session: ${session.title}`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleSessionDelete(session); // Proceed with deletion
      },
      onCancel() {
        setSessionToDelete(null); // Reset session to delete if canceled
      },
    });
  };

  const handleSessionSave = () => {
    sessionForm
      .validateFields()
      .then(values => {
        sessionForm.resetFields();
        if (currentSession) {
          const newSessions = sessions.map(session =>
            session.key === currentSession.key ? { ...session, ...values } : session
          );
          setSessions(newSessions);
        } else {
          const newSession = {
            ...values,
            id: sessions.length + 1,
            key: `lesson${sessions.length + 1}`,
          };
          if (insertIndex !== null) {
            const newSessions = [...sessions];
            newSessions.splice(insertIndex, 0, newSession);
            setSessions(newSessions);
            setInsertIndex(null);
          } else {
            setSessions([...sessions, newSession]);
          }
        }
        setSessionModalVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleSessionEdit = (session: SessionType) => {
    setCurrentSession(session);
    sessionForm.setFieldsValue(session);
    setSessionModalVisible(true);
  };

  const handleSessionDelete = (session: SessionType) => {
    const newSessions = sessions.filter(item => item.key !== session.key);
    setSessions(newSessions);
    setSessionToDelete(null); // Reset session to delete after deletion
  };

  const handleAddSessionAfter = (index: number) => {
    setInsertIndex(index + 1);
    setCurrentSession(null);
    setSessionModalVisible(true);
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Layout className="site-layout">
        <Header className="p-0 bg-white">
          <div className="flex flex-wrap items-center justify-end gap-4 p-4 bg-[#939fb1]">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              onChange={e => handleSearch(e.target.value)}
              style={{ width: 300 }}
            />
          </div>
        </Header>
        <Content className="m-4 overflow-y-scroll">
          <Table
            pagination={{ pageSize: 5 }}
            dataSource={filteredDataSource}
            columns={[
              {
                title: 'Course',
                dataIndex: 'image',
                key: 'image',
                render: (text: string) => <img src={text} alt="item" className="w-12 h-12" />,
              },
              {
                title: 'Course Name',
                dataIndex: 'name_course',
                key: 'name_course',
              },
              {
                title: 'Created At',
                dataIndex: 'created_at',
                key: 'created_at',
              },
              {
                title: 'Actions',
                key: 'actions',
                align: 'center' as AlignType,
                render: (text: string, record: DataType) => (
                  <div style={{ textAlign: 'center' }}>
                    <Button icon={<DownCircleOutlined />} onClick={() => handleViewMore(record.key)}></Button>
                  </div>
                ),
              },
            ]}
            expandable={{
              expandedRowKeys: expandedKeys,
              onExpand: (expanded, record) => handleViewMore(record.key),
              expandedRowRender: (record: DataType) => (
                <div style={{ paddingBottom: "10px", backgroundColor: 'white', borderRadius: '4px' }}>
                  <Tabs centered>
                    <TabPane tab={<span style={{ fontSize: '16px' }}>List of course sessions:</span>} key="1" className='w-full'>
                      <List
                        className='px-2'
                        size="small"
                        dataSource={sessions}
                        renderItem={(session, index) => (
                          <List.Item actions={[
                            <Button icon={<PlusOutlined />} className="mr-2 text-white bg-green-600" onClick={() => handleAddSessionAfter(index)}></Button>,
                            <Button icon={<EditOutlined />} className="mr-2 text-white bg-blue-500" onClick={() => handleSessionEdit(session)}></Button>,
                            <Button icon={<DeleteOutlined />} className="mr-2 text-white bg-red-600" onClick={() => showDeleteConfirm(session)}></Button>,
                          ]}>
                            <List.Item.Meta
                              avatar={<ReadOutlined />}
                              title={session.title}
                              description={session.duration}
                            />
                          </List.Item>
                        )}
                      />
                      <Divider className='p-0 m-0' />
                      <div className='flex justify-center w-full pr-5 my-5'>
                        <Button type="dashed" className='text-base text-blue-700' onClick={() => handleAddSessionAfter(sessions.length - 1)}> <PlusOutlined /> Add New Session</Button>
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
        title={currentSession ? 'Edit Session' : 'Add New Session'}
        visible={sessionModalVisible}
        onCancel={() => {
          setCurrentSession(null);
          setSessionModalVisible(false);
        }}
        onOk={handleSessionSave}
        okText="Save"
        destroyOnClose
      >
        <Form form={sessionForm} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter the session title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Duration"
            rules={[{ required: true, message: 'Please enter the session duration!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ManagerCourseInstructor;
